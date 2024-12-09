import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./css/winnermodal.css";

export default function Leaderboard({ setShowLeaderboard }) {
  const [scores, setScores] = useState([]);
  const [error, setError] = useState(null);

  function formatDate(date) {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });

    return formattedDate;
  }

  useEffect(() => {
    async function getScores() {
      try {
        const response = await fetch("http://localhost:3000/scoreboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setScores(data);
      } catch (err) {
        console.error(err);
        setError(err);
      }
    }

    getScores();
  }, []);

  return (
    <>
      <div className="modal">
        <div className="winner-modal">
          <h1>Scoreboard</h1>
          <table className="scores">
            <tr className="scores-header">
              <th className="scores-header"></th>
              <th className="scores-header">Player</th>
              <th className="scores-header">Time (seconds)</th>
              <th className="scores-header">Date Achieved</th>
            </tr>
            {scores.slice(0, 5).map((score, index) => (
              <tr className="score-row" key={score.id}>
                <td className="score-rank">#{index + 1}</td>
                <td className="score-name">{score.name}</td>
                <td className="score-time">{score.score}</td>
                <td className="score-date">{formatDate(score.createdAt)}</td>
              </tr>
            ))}
          </table>
          <p
            className="close-scores"
            onClick={() => {
              setShowLeaderboard(false);
            }}
          >
            CLOSE
          </p>
        </div>
      </div>
    </>
  );
}

Leaderboard.propTypes = {
  setShowLeaderboard: PropTypes.func,
};
