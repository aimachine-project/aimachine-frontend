import React from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle.js";
import { GAMES_LIST } from "../../games/utilities/GamesList.js";
// import GameCard from "../Home/GameCard.js";

function Game() {
  const { gameName, ai } = useParams();
  console.log(ai);

  let content = (
    <>
      <PageTitle title="Error" />
      <h2>Game &quot;{gameName}&quot; doesn&apos;t exist</h2>
    </>
  );

  const game = GAMES_LIST.filter(
    (game) => game.route === gameName.toLowerCase()
  )[0];

  if (game) {
    if (ai === "ai" && game.componentAI) {
      content = game.componentAI;
    } else {
      content = game.component;
    }
  }

  return content;
}

export default Game;
