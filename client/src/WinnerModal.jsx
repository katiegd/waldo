import { useState } from "react";
import "./css/winnermodal.css";
import PropTypes from "prop-types";

export default function WinnerModal({
  time,
  setShowWinnerModal,
  setShowLeaderboard,
}) {
  const formattedTime = (time / 1000).toFixed(2);
  const minutes = Math.floor(formattedTime / 60);
  const seconds = (formattedTime % 60).toFixed(2);
  const [error, setError] = useState(null);
  const [initials, setInitials] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "initials") {
      const uppValue = value.toUpperCase();
      setInitials(uppValue);
    }
  }

  async function postScores(e) {
    e.preventDefault();

    if (initials === "" || initials.length < 3) {
      setError("Please enter 3 initials.");
      return;
    }

    try {
      await fetch("http://localhost:3000/scoreboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time: formattedTime,
          initials: initials,
        }),
      });
    } catch (err) {
      setError(err);
      console.error(err);
    }
    setShowWinnerModal(false);
    setTimeout(() => {
      setShowLeaderboard(true);
    }, 100);
  }

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
              value={initials}
              onChange={(e) => {
                handleChange(e);
              }}
              required
            />
            <br />
            {error && <div className="error-message">{error}</div>}
            <button
              type="submit"
              className="initials-btn"
              onClick={(e) => {
                postScores(e);
              }}
            >
              Submit
            </button>
          </form>
          <p
            className="close-modal"
            onClick={() => {
              setShowWinnerModal(false);
            }}
          >
            No, thanks.
          </p>
        </div>
      </div>
    </>
  );
}

WinnerModal.propTypes = {
  time: PropTypes.number,
  setShowWinnerModal: PropTypes.func,
  setShowLeaderboard: PropTypes.func,
};
