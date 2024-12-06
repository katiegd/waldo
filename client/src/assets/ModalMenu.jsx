import Nibbler from "../assets/Nibbler.png";
import Scruffy from "../assets/Scruffy.png";
import DaVinci from "../assets/daVinciBot.png";

export default function ModalMenu({
  setClicked,
  modalMenu,
  coords,
  setSelected,
  setFadeAvatar,
}) {
  async function handleSelection(xCoord, yCoord, char) {
    // Replace this coords logic with backend comms.
    // Save time & username to database.

    try {
      const response = await fetch("http://localhost:3000/check-coordinates", {
        method: "POST",
        body: JSON.stringify({
          x: coords.x,
          y: coords.y,
          name: char,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData.msg || "Fetch failed.");
        return;
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // if (
  //   char === "DaVinci" &&
  //   coords.x >= 780 &&
  //   coords.x <= 850 &&
  //   coords.y <= 1850 &&
  //   coords.y >= 1790
  // ) {
  //   setSelected((prevState) => [...prevState, "DaVinci"]);
  //   setFadeAvatar((prevState) => ({ ...prevState, davinci: true }));
  //   console.log("You found DaVinci!");
  // } else if (
  //   char === "Scruffy" &&
  //   coords.x >= 630 &&
  //   coords.x <= 680 &&
  //   coords.y <= 2420 &&
  //   coords.y >= 2350
  // ) {
  //   setSelected((prevState) => [...prevState, "Scruffy"]);
  //   setFadeAvatar((prevState) => ({ ...prevState, scruffy: true }));
  //   console.log("You found Scruffy!");
  // } else if (
  //   char === "Nibbler" &&
  //   coords.x >= 2110 &&
  //   coords.x <= 2150 &&
  //   coords.y <= 700 &&
  //   coords.y >= 640
  // ) {
  //   setSelected((prevState) => [...prevState, "Nibbler"]);
  //   setFadeAvatar((prevState) => ({ ...prevState, nibbler: true }));
  //   console.log("You found Nibbler!");
  // } else {
  //   console.log("Sorry, that's not right!");
  // }

  return (
    <div
      className="modal"
      onClick={() => {
        setClicked(false);
      }}
    >
      <div
        className="modal-content"
        style={{
          top: `${modalMenu.y}px`,
          left: `${modalMenu.x}px`,
          transform: `translate(${modalMenu.translateX}, ${modalMenu.translateY})`,
        }}
      >
        <div
          className="nibbler char-modal"
          onClick={() => handleSelection("Nibbler")}
        >
          <img src={Nibbler} alt="" className="avatar" />
          <h5>Nibbler</h5>
        </div>
        <div
          className="scruffy char-modal"
          onClick={() => handleSelection("Scruffy")}
        >
          <img src={Scruffy} alt="" className="avatar" /> <h5>Scruffy</h5>
        </div>
        <div
          className="scruffy char-modal"
          onClick={() => handleSelection("DaVinci")}
        >
          <img src={DaVinci} alt="" className="avatar" /> <h5>Robot DaVinci</h5>
        </div>
      </div>
    </div>
  );
}
