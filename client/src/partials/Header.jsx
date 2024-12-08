import Nibbler from "../assets/Nibbler.png";
import Scruffy from "../assets/Scruffy.png";
import DaVinci from "../assets/daVinciBot.png";
import Logo from "../assets/logo.png";
import Timer from "./Timer";

export default function Header({
  fadeAvatar,
  gameStart,
  gameWon,
  time,
  setTime,
}) {
  // Put timer and icons of characters you're looking for
  return (
    <div className="header">
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
      <div className="timer">
        <Timer
          gameStart={gameStart}
          gameWon={gameWon}
          time={time}
          setTime={setTime}
        />
      </div>
    </div>
  );
}
