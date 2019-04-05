const axios = require('axios');
const Joi = require('joi');
const Auth = require('../database/models/auth-model');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

const registerSchema = Joi.object().keys({
  username: Joi.string()
    .max(255)
    .required(),
  password: Joi.string()
    .max(255)
    .required()
});

async function register(req, res) {
  const { username, password } = req.body;
  const result = Joi.validate({ username, password }, registerSchema);
  if (result.error) {
    res.status(400).json({ error: `${result.error}` });
  } else {
    try {
      const checkUsername = await Auth.checkUsername(username);
      if (checkUsername === 'taken') {
        res.status(400).json({
          error: 'That username is already taken. Please try another.'
        });
      } else {
        try {
          await Auth.registerUser(req.body);
          res.status(201).json({ message: `The user has been registered.` });
        } catch (err) {
          res.status(500).json({
            error: `There was an error while registering the user. ${err}`
          });
        }
      }
    } catch (err) {
      res.status(500).json({
        error: `There was an error while checking the username. ${err}`
      });
    }
  }
}

function login(req, res) {
  // implement user login
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' }
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
