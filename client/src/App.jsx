import { useEffect, useState } from "react";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import StartGame from "./StartGame";
import ModalMenu from "./ModalMenu";
import WinnerModal from "./WinnerModal";
import Leaderboard from "./Leaderboard";
import futurama from "../src/assets/main-image-cropped.png";
import "./App.css";

function App() {
  const [selected, setSelected] = useState([]);
  const [gameStart, setGameStart] = useState(false); //Reset to false before deploy
  const [clicked, setClicked] = useState(false);
  const [modalMenu, setModalMenu] = useState({
    x: null,
    y: null,
    translateX: null,
    translateY: null,
  });
  const [coords, setCoords] = useState({});
  const [gameWon, setGameWon] = useState(false);
  const [fadeAvatar, setFadeAvatar] = useState({
    Scruffy: false,
    DaVinci: false,
    Nibbler: false,
  });
  const [popUpMessage, setPopUpMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [time, setTime] = useState(0);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  function restartGame() {
    setSelected([]);
    setFadeAvatar({ Scruffy: false, DaVinci: false, Nibbler: false });
    setTime(0);
    setGameWon(false);
    setGameStart(false);
    setGameStart(true);
  }

  useEffect(() => {
    const winningSelections = ["Scruffy", "DaVinci", "Nibbler"];
    if (winningSelections.every((item) => selected.includes(item))) {
      setGameWon(true);
      setShowWinnerModal(true);
    }
  }, [selected]);

  useEffect(() => {
    if (popUpMessage) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setPopUpMessage("");
      }, 2000);
    }
  }, [popUpMessage]);

  function clickHandler(e) {
    setClicked(true);

    const pageX = e.pageX;
    const pageY = e.pageY;

    // Original image dimensions
    const origWidth = 2362;
    const origHeight = 3199;

    // Image dimensions based on page width
    const imgWidth = e.target.width;
    const imgHeight = e.target.height;

    // Offset of img on page
    const imgOffsetX = e.target.offsetLeft;
    const imgOffsetY = e.target.offsetTop;

    // Location of target regardless of page size
    const imgX = (pageX - imgOffsetX) * (origWidth / imgWidth);
    const imgY = (pageY - imgOffsetY) * (origHeight / imgHeight);

    setCoords({
      x: imgX,
      y: imgY,
    });

    // Get bounding box of image to account for scroll dimensions
    const imgRect = e.target.getBoundingClientRect();

    let modalX = pageX + imgRect.left - imgOffsetX;
    let modalY = pageY + imgRect.top - imgOffsetY;
    let translateX = "0%";
    let translateY = "0%";

    if (pageX > window.innerWidth - 200) {
      // 200 is modal width
      translateX = "-101%";
    } else if (pageX < 200) {
      translateX = "1%";
    }

    if (pageY > window.innerHeight - 300) {
      // 300 is the modal height{
      translateY = "-101%";
    } else if (pageY - window.innerHeight < 300) {
      translateY = "1%";
    }

    setModalMenu({
      x: modalX,
      y: modalY,
      translateX: translateX,
      translateY: translateY,
    });
  }

  return (
    <>
      {gameStart ? (
        <>
          {showMessage && (
            <div className="popup-modal">
              <div className={"popup-content"}>{popUpMessage}</div>
            </div>
          )}
          {showLeaderboard && (
            <Leaderboard setShowLeaderboard={setShowLeaderboard} />
          )}
          {gameWon && showWinnerModal && (
            <WinnerModal
              time={time}
              setGameWon={setGameWon}
              setShowWinnerModal={setShowWinnerModal}
              setShowLeaderboard={setShowLeaderboard}
            />
          )}
          <Header
            gameStart={gameStart}
            fadeAvatar={fadeAvatar}
            gameWon={gameWon}
            time={time}
            setTime={setTime}
            restartGame={restartGame}
            setShowLeaderboard={setShowLeaderboard}
          />

          <div className="main-image">
            {clicked ? (
              <ModalMenu
                setClicked={setClicked}
                modalMenu={modalMenu}
                coords={coords}
                selected={selected}
                setSelected={setSelected}
                setFadeAvatar={setFadeAvatar}
                setPopUpMessage={setPopUpMessage}
              />
            ) : (
              ""
            )}
            <img
              src={futurama}
              alt=""
              className="futurama-img"
              onClick={(e) => {
                clickHandler(e);
              }}
            />
          </div>
          <Footer />
        </>
      ) : (
        <StartGame setGameStart={setGameStart} />
      )}
    </>
  );
}

export default App;
