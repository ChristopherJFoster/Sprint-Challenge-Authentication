import React from 'react';
import { Route, NavLink, withRouter, Redirect } from 'react-router-dom';

import SignUp from './SignUp';
import SignIn from './SignIn';
import Jokes from './Jokes';

const App = ({ history }) => {
  const signOut = () => {
    localStorage.removeItem('token');
    history.push('/signin');
  };

  return (
    <div className='container'>
      <header>
        <NavLink to='/signup'>Sign Up</NavLink>
        &nbsp;|&nbsp;
        <NavLink to='/signin'>Sign In</NavLink>
        &nbsp;|&nbsp;
        <NavLink to='/jokes'>Jokes</NavLink>
        &nbsp;|&nbsp;
        <button onClick={signOut}>Sign Out</button>
      </header>
      <main>
        {/* It's your favorite: Default route is a redirect: */}
        <Route exact path='/' render={() => <Redirect to='/jokes' />} />
        <Route path='/signup' component={SignUp} />
        <Route path='/signin' component={SignIn} />
        <Route path='/jokes' component={Jokes} />
      </main>
    </div>
  );
};

export default withRouter(App);
