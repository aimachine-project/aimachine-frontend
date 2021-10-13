import React, { useState } from "react";
import Board from "./components/Board";
import GameDetails from "../utilities/GameDetails";
import { useGame } from "../utilities/GameHooks";
import "../utilities/style.scss";
import "./style.scss";

function TicTacToe(props) {
  const [board, setBoard] = useState(
    Array(Math.pow(props.boardSize, 2)).fill(null)
  );

  const markMove = (data) => {
    const rowIndex = data.rowIndex;
    const colIndex = data.colIndex;
    const index = rowIndex * props.boardSize + colIndex;
    // TO DO: should data.fieldToken be 1/-1 if the server message at the end is "X/O won"?
    const token = data.fieldToken === 1 ? "x" : "o";

    const _board = board.slice();
    _board[index] = token;

    setBoard(_board);
  };

  const game = useGame(props.socketUrl, markMove);

  const chooseField = (i) => {
    if (game.currentPlayer !== game.clientId || board[i]) {
      return;
    }
    const row = Math.floor(i / props.boardSize);
    const col = i % props.boardSize;
    game.socket.send(
      JSON.stringify({
        eventType: "make_move",
        eventMessage: {
          gameId: game.gameId,
          rowIndex: row,
          colIndex: col,
        },
      })
    );
  };

  return (
    <div className="game-page-wrapper">
      <GameDetails
        isSocketDisconnected={
          game.socket == null || game.socket.readyState === 0
        }
        gameId={game.gameId}
        isTurn={game.currentPlayer === game.clientId}
        gameState={game.gameState}
      />
      <Board
        isCurrentPlayer={game.currentPlayer === game.clientId}
        board={board}
        chooseField={(i) => chooseField(i)}
        boardSize={props.boardSize}
      />
    </div>
  );
}

export default TicTacToe;
