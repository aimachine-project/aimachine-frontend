import React, { useState } from "react";
import Popup from "./Popup";
import "./style.scss";

function GameCard(props) {
  const [isPopup, setIsPopup] = useState(false);

  const togglePopup = () => {
    setIsPopup(!isPopup);
    console.log("hello");
  };

  const popupContent = (
    <>
      <h3>{props.title}</h3>
      <p>choose how you want to play</p>
      <a className="card-link-button" href={props.route}>
        with human
      </a>
      <a className="card-link-button" href={props.routeAI}>
        with ai
      </a>
    </>
  );

  return (
    <div className="card-wrapper">
      <Popup
        isPopup={isPopup}
        togglePopup={() => togglePopup()}
        content={popupContent}
      />

      {/* TODO: change to button and fix styling */}
      <div onClick={togglePopup}>
        <div className="card-button">
          <span className="card-title">{props.title}</span>
        </div>
      </div>
      <span className="card-player-info">
        currently playing: {props.players} <strong>totally real</strong> people!
      </span>
    </div>
  );
}

export default GameCard;
