import { useEffect, useState } from "react";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import StartGame from "./StartGame";
import ModalMenu from "./assets/ModalMenu";
import futurama from "../src/assets/main-image-cropped.png";
import "./App.css";

function App() {
  const [selected, setSelected] = useState([]);
  const [gameStart, setGameStart] = useState(true); //Reset to false before deploy
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

  useEffect(() => {
    const winningSelections = ["Scruffy", "DaVinci", "Nibbler"];

    if (winningSelections.every((item) => selected.includes(item))) {
      setGameWon(true);
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
          <Header
            gameStart={gameStart}
            fadeAvatar={fadeAvatar}
            gameWon={gameWon}
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
