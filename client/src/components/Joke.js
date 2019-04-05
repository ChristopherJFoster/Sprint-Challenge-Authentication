import React from 'react';

export const Joke = ({ joke, number }) => {
  return (
    <div className='joke'>
      <h2>{number}</h2>
      <p>{joke.joke}</p>
    </div>
  );
};

export default Joke;
