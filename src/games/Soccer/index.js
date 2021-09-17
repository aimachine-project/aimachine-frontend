import React from "react";
import GameDetails from "../utilities/GameDetails";
import SoccerBoard from "./components/SoccerBoard";

class Soccer extends React.Component {
  render() {
    return (
      <div className="game-page-wrapper">
        <GameDetails
          isSocketDisconnected={false}
          gameId={2}
          isTurn={true}
          message={"test"}
        />
        <SoccerBoard />
      </div>
    );
  }
}

export default Soccer;
