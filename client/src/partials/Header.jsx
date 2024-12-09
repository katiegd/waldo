import PropTypes from "prop-types";
import Nibbler from "../assets/Nibbler.png";
import Scruffy from "../assets/Scruffy.png";
import DaVinci from "../assets/daVinciBot.png";
import Logo from "../assets/logo.png";
import Timer from "./Timer";
import "../css/header.css";

export default function Header({
  fadeAvatar,
  gameStart,
  gameWon,
  time,
  setTime,
  restartGame,
  setShowLeaderboard,
}) {
  function showScores() {
    setShowLeaderboard(true);
  }

  return (
    <div className="header">
      <div className="header-top">
        <img src={Logo} alt="" className="logo" />
        <div className="avatar-container">
          <img
            src={Nibbler}
            alt=""
            className={fadeAvatar.Nibbler ? "avatar faded" : "avatar"}
          />
          <img
            src={Scruffy}
            alt=""
            className={fadeAvatar.Scruffy ? "avatar faded" : "avatar"}
          />
          <img
            src={DaVinci}
            alt=""
            className={fadeAvatar.DaVinci ? "avatar faded" : "avatar"}
          />
        </div>
        <div className="avatars-btns">
          <div className="action-btns">
            {" "}
            <div
              className="scoreboard"
              onClick={() => {
                showScores();
              }}
            >
              <span>SCORES</span>
            </div>
            <div
              className="restart"
              onClick={() => {
                restartGame();
              }}
            >
              <span>RESTART</span>
            </div>
          </div>
          <Timer
            gameStart={gameStart}
            gameWon={gameWon}
            time={time}
            setTime={setTime}
          />
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  fadeAvatar: PropTypes.object,
  gameStart: PropTypes.bool,
  gameWon: PropTypes.bool,
  time: PropTypes.number,
  setTime: PropTypes.func,
  restartGame: PropTypes.func,
  setShowLeaderboard: PropTypes.func,
};
