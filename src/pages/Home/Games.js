import React from "react";
import GameCard from "./GameCard";
import { GAMES_LIST } from "../../games/GamesList";

function Games() {
  return (
    <div>
      {GAMES_LIST.map((game, index) => (
        <GameCard
          key={index}
          title={game.name}
          route={`/games/${game.route}`}
          players={Math.floor(Math.random() * 50)}
        />
      ))}
    </div>
  );
}

export default Games;
