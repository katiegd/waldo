import Logo from "./assets/logo.png";
import PropTypes from "prop-types";

export default function StartGame({ setGameStart }) {
  return (
    <div className="start-container">
      <img src={Logo} alt="" className="start-logo" /> <br />
      <p>
        You are about to embark on an eyecrossingly arduous journey to find 3
        characters from Futurama!{" "}
      </p>
      <p>
        Be the fastest to find the characters and you'll top the leaderboard!
      </p>
      <p>
        Once you click <b>START</b> you will begin the timer!
      </p>
      <p>Are you ready?</p>
      <button className="start-btn" onClick={() => setGameStart(true)}>
        Start
      </button>
    </div>
  );
}

StartGame.propTypes = {
  setGameStart: PropTypes.func,
};
