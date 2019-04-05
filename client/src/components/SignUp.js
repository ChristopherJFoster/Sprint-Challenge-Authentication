import React from 'react';
import axios from 'axios';

import { useInput } from '../utilities/useInput';

const SignUp = ({ history }) => {
  const usernameSignUp = useInput();
  const passwordSignUp = useInput();

  const signUp = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('register', {
        username: usernameSignUp.value,
        password: passwordSignUp.value
      });
      console.log(response.data.message);
      usernameSignUp.setValue('');
      passwordSignUp.setValue('');
      history.push('signin');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='signup'>
      <h1 className='title'>Dad Jokes Sign Up</h1>
      <form onSubmit={signUp}>
        <input
          required
          type='text'
          value={usernameSignUp.value}
          name='usernameSignUp'
          onChange={usernameSignUp.updateValue}
          placeholder='username'
        />
        <input
          required
          type='password'
          value={passwordSignUp.value}
          name='passwordSignUp'
          onChange={passwordSignUp.updateValue}
          placeholder='password'
        />
        <button type='submit' className='signup-button'>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
