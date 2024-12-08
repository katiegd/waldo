import { useEffect, useState } from "react";

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
