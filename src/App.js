import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NumberInput from './components/NumberInput';
import ResultMessage from './components/ResultMessage';
import Button from './components/Button';
import './App.css';

const App = () => {
  const secretNumber = 69;

  const [message, setMessage] = useState('');
  const [count, setCount] = useState(5); // Start with the maximum number of guesses
  const [isWon, setIsWon] = useState(false); // Add this line
  const maxCount = 5;

  const remainingAttempts = count;

  const handleGuess = (value) => {
    const guessNum = parseInt(value);
    if (count > 0) {
      if (guessNum === secretNumber) {
        setMessage('Congratulations! You guessed it right!');
        setCount(0); // Set count to 0 to prevent further guessing
        setIsWon(true); // Add this line
      } else if (guessNum > secretNumber) {
        setMessage('You guessed too high. Try again!');
        setCount(count - 1);
      } else if (guessNum < secretNumber) {
        setMessage('You guessed too low. Try again!');
        setCount(count - 1);
      }
    }
  };

  const resetGame = () => { 
    setMessage('');
    setCount(maxCount);
    setIsWon(false); // 
  };

  useEffect(() => {
    if (isWon) {
      document.body.classList.add('won');
    } else {
      document.body.classList.remove('won');
    }
  }, [isWon]);

  return (
    <>
      <Header />
      <div className="container">
        <div className="card">
          <div className="content">
            <NumberInput onSubmit={handleGuess} />
            <ResultMessage message={message} />
            {count === 0 && (
              <Button onClick={resetGame} text="Restart Game" />
            )}
          </div>
          <div className="attempts">
            <p>Remaining attempts: {remainingAttempts}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
