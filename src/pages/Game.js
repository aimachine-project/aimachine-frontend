import React from "react";
import { useParams } from "react-router-dom";
import TicTacToe from "../games/TicTacToe/index.js";

function Game() {
  const { gameName } = useParams();

  let content = (
    <div>
      <h1>Error</h1>
      <h2>Game &quot;{gameName}&quot; doesn&apos;t exist</h2>
    </div>
  );

  if (gameName.toLowerCase() === "tictactoe") {
    content = <TicTacToe />;
  }
  return content;
}

export default Game;
