import React from "react";
import { useParams } from "react-router-dom";
import TicTacToe from "../../games/TicTacToe/index.js";
import PageTitle from "../components/PageTitle.js";

function Game() {
  const { gameName } = useParams();

  let content = (
    <>
      <PageTitle title="Error" />
      <h2>Game &quot;{gameName}&quot; doesn&apos;t exist</h2>
    </>
  );

  if (gameName.toLowerCase() === "tictactoe") {
    content = <TicTacToe />;
  }
  return content;
}

export default Game;
