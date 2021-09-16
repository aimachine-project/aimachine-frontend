import React from "react";
import { useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle.js";
import { GAMES_LIST } from "../../games/utilities/GamesList.js";

function Game() {
  const { gameName } = useParams();

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
    content = game.component;
  }

  return content;
}

export default Game;
