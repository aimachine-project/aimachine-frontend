import React, { useState } from "react";
import GameDetails from "../utilities/GameDetails";
import { useGame } from "../utilities/GameHooks";
import SoccerBoard from "./components/SoccerBoard";

function Soccer(props) {
  const [currentNode, setCurrentNode] = useState({ col: 5, row: 6 });
  const [newNode, setNewNode] = useState(null);

  const markMove = (data) => {
    const node = { col: data.colIndex, row: data.rowIndex };
    setNewNode(node);
  };

  const game = useGame(props.socketUrl, markMove);

  const chooseNode = (node) => {
    if (game.currentPlayer !== game.clientId) {
      return;
    }

    const colDiff = Math.abs(currentNode.col - node.col);
    const rowDiff = Math.abs(currentNode.row - node.row);

    if (colDiff <= 1 && rowDiff <= 1 && colDiff + rowDiff !== 0) {
      game.socket.send(
        JSON.stringify({
          eventType: "make_move",
          eventMessage: {
            gameId: game.gameId,
            rowIndex: node.row,
            colIndex: node.col,
          },
        })
      );
    }
  };

  return (
    <div className="game-page-wrapper">
      <GameDetails
        isSocketDisconnected={
          game.socket == null || game.socket.readyState === 0
        }
        gameId={game.gameId}
        isTurn={game.currentPlayer === game.clientId}
        message={game.message}
      />
      <SoccerBoard
        chooseNode={(node) => chooseNode(node)}
        currentNode={currentNode}
        newNode={newNode}
        setCurrentNode={(node) => setCurrentNode(node)}
        players={game.players}
      />
    </div>
  );
}

export default Soccer;
