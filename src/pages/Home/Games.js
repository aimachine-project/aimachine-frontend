import React from "react";
import GameCard from "./GameCard";
import { GAMES_LIST } from "../../games/utilities/GamesList";

function Games() {
  return (
    <div>
      {GAMES_LIST.map((game, index) => (
        <GameCard
          key={index}
          title={game.name}
          route={`/games/${game.route}`}
          pathAi={game.pathAi}
          players={Math.floor(Math.random() * 50)}
        />
      ))}
    </div>
  );
}

export default Games;
