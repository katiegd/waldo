import Nibbler from "../assets/Nibbler.png";
import Scruffy from "../assets/Scruffy.png";
import DaVinci from "../assets/daVinciBot.png";
import Logo from "../assets/logo.png";

export default function Header({ fadeAvatar }) {
  // Put timer and icons of characters you're looking for
  return (
    <div className="header">
      <img src={Logo} alt="" className="logo" />
      <div className="avatar-container">
        <img
          src={Nibbler}
          alt=""
          className={fadeAvatar.nibbler ? "avatar faded" : "avatar"}
        />
        <img
          src={Scruffy}
          alt=""
          className={fadeAvatar.scruffy ? "avatar faded" : "avatar"}
        />
        <img
          src={DaVinci}
          alt=""
          className={fadeAvatar.davinci ? "avatar faded" : "avatar"}
        />
      </div>
      <div className="timer">Timer</div>
    </div>
  );
}
