import { useState } from "react";
import "./css/winnermodal.css";

export default function WinnerModal({ time, setGameWon, setShowModal }) {
  const formattedTime = time / 1000;
  const minutes = Math.floor(formattedTime / 60);
  const seconds = formattedTime % 60;

  // Set up POST function here to send to back end.

  return (
    <>
      <div className="modal">
        <div className="winner-modal">
          <h1>Congratulations!</h1>
          <p className="winning-message">
            You beat the game in {minutes}{" "}
            {minutes > 1 || minutes === 0 ? "minutes" : "minute"} and {seconds}{" "}
            seconds. <br />
            Enter your initials here to go onto the leaderboard!
          </p>
          <form action="/scoreboard" method="post">
            <label htmlFor="initials"></label>
            <input
              className="initials-input"
              type="text"
              name="initials"
              id="initials"
              maxLength={3}
              placeholder="- - - "
              required
            />
            <br />
            <button type="submit" className="initials-btn">
              Submit
            </button>
          </form>
          <p className="close-modal" onClick={() => setShowModal(false)}>
            No, thanks.
          </p>
        </div>
      </div>
    </>
  );
}
