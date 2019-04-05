import React, { useEffect, useState } from 'react';
import axios from 'axios';

import requiresAuth from '../utilities/requiresAuth';
import Joke from './Joke';

const Jokes = () => {
  const [jokes, setJokes] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const jokes = await axios.get('Jokes');
        setJokes(jokes.data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  return (
    <div className='jokes-list'>
      {jokes.length > 0 && (
        <div className='Jokes'>
          <h1>Dad Jokes</h1>
          {jokes.map((joke, index) => (
            <Joke key={joke.id} number={index + 1} joke={joke} />
          ))}
        </div>
      )}
    </div>
  );
};

export default requiresAuth(Jokes);
