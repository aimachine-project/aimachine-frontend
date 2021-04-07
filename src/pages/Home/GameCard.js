import React from "react";
import "./style.scss";

function GameCard(props) {
  return (
    <div className="card-wrapper">
      <a href={props.route}>
        <div className="card-button">
          <span className="card-title">{props.title}</span>
        </div>
      </a>
      <span className="card-player-info">
        currently playing: {props.players} <strong>totally real</strong> people!
      </span>
    </div>
  );
}

export default GameCard;
