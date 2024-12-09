import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function Timer({ gameStart, gameWon, time, setTime }) {
  useEffect(() => {
    let interval;

    if (gameStart && !gameWon) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    if (gameWon || !gameStart) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [gameStart, gameWon]);
  return (
    <div className="timer">
      <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>:
      <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
    </div>
  );
}

Timer.propTypes = {
  gameStart: PropTypes.bool,
  gameWon: PropTypes.bool,
  time: PropTypes.number,
  setTime: PropTypes.func,
};
