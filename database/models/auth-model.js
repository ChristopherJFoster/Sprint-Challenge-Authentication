const db = require('../dbConfig');
const bcrypt = require('bcryptjs');

const checkUsername = async username => {
  if (
    await db('users')
      .where({ username })
      .first()
  ) {
    return 'taken';
  } else {
    return 'available';
  }
};

const registerUser = async user => {
  const password = bcrypt.hashSync(user.password, 8);
  return db('users').insert({
    username: user.username,
    password
  });
};

const getUserForLogin = username => {
  return db('users')
    .where({ username })
    .first();
};

module.exports = {
  checkUsername,
  registerUser,
  getUserForLogin
};
