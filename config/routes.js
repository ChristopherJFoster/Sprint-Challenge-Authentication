const axios = require('axios');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const Auth = require('../database/models/auth-model');
const generateToken = require('../auth/generate-token');
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

const loginSchema = Joi.object().keys({
  username: Joi.required(),
  password: Joi.required()
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

async function login(req, res) {
  const { username, password } = req.body;
  // I get that using Joi to validate login is overkill—just trying to keep using the libary.
  const result = Joi.validate({ username, password }, loginSchema);
  if (result.error) {
    res.status(400).json({ error: `${result.error}` });
  } else {
    try {
      const user = await Auth.getUserForLogin(username);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({
          error: 'Invalid credentials.'
        });
      }
    } catch (err) {
      res.status(500).json({
        error: `There was an error while logging in the user. ${err}`
      });
    }
  }
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
