import React from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(function(requestConfig) {
  const token = localStorage.getItem('token');
  requestConfig.headers.authorization = token;
  return requestConfig;
});

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem('token');
      const notLoggedIn = (
        <>
          <div className='example-joke'>
            <h3>Dad: Why do we drive on a parkway and park in a driveway?</h3>
            <h3>Children: ...</h3>
          </div>
          <div className='CTA'>
            <h3>Want more dad jokes?</h3>
            <h1>Sign up and sign in!</h1>
          </div>
        </>
      );
      return <>{token ? <Component /> : notLoggedIn}</>;
    }
  };
}
