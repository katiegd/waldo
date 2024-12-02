import { useState } from "react";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import "./App.css";
import futurama from "../src/assets/main-image-cropped.png";

function App() {
  // Magnifier?
  return (
    <>
      <Header />
      <div className="main-image">
        <img src={futurama} alt="" className="futurama-img" />
      </div>
      <Footer />
    </>
  );
}

export default App;
