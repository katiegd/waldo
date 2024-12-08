import { useEffect, useState } from "react";
import Nibbler from "../assets/Nibbler.png";
import Scruffy from "../assets/Scruffy.png";
import DaVinci from "../assets/daVinciBot.png";

export default function ModalMenu({
  setClicked,
  modalMenu,
  coords,
  setSelected,
  setFadeAvatar,
  setPopUpMessage,
}) {
  // Show popUp for 5 seconds, then hides and clears the message.

  async function handleSelection(char) {
    // Save time & username to database.
    try {
      const response = await fetch("http://localhost:3000/check-coordinates", {
        // Need to change fetch endpoint to be dynamic.
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          x: Math.round(coords.x),
          y: Math.round(coords.y),
          name: char,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data.msg || "Fetch failed.");
        return;
      }
      if (data.coordMatch) {
        setSelected((prevState) => [...prevState, data.coordMatch.name]);
        setFadeAvatar((prevState) => ({
          ...prevState,
          [data.coordMatch.name]: true,
        }));
        setPopUpMessage(`You found ${data.coordMatch.name}!`);
      } else {
        setPopUpMessage("Sorry, that's not right!");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
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
            className="davinci char-modal"
            onClick={() => handleSelection("DaVinci")}
          >
            <img src={DaVinci} alt="" className="avatar" />{" "}
            <h5>Robot DaVinci</h5>
          </div>
        </div>
      </div>
    </>
  );
}
