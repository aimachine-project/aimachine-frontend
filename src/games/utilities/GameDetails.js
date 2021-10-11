import React from "react";

function GameDetails(props) {
  const isSocketDisconnected = props.isSocketDisconnected;
  const gameId = props.gameId;
  const isTurn = props.isTurn;
  // const message = props.message;

  if (isSocketDisconnected) {
    return (
      <div className="game-details">
        {/* TO DO: Fix styling so the alert is centered without a hack */}
        <h1></h1>
        <h1 className="game-details-error">
          There has been an error while connecting to the server
        </h1>
        <h1></h1>
      </div>
    );
  } else {
    return (
      <div className="game-details">
        <h3 className="game-details-title">{gameId}</h3>
        <div className="game-details-content">
          <p>
            Is it your turn: <strong>{isTurn ? "yes" : "no"}</strong>
          </p>
          <div className="game-details-message">
            <p>{props.gameState}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default GameDetails;
