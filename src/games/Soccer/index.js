import React, { useEffect, useState, useRef } from "react";
import GameDetails from "../utilities/GameDetails";
import SoccerBoard from "./components/SoccerBoard";

function Soccer(props) {
  // TODO: make more research on useRef vs useState
  const [gameId, setGameId] = useState("");
  const clientId = useRef("");
  const [players, setPlayers] = useState({ first: "", second: "" });
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [message, setMessage] = useState("");
  const [currentNode, setCurrentNode] = useState({ col: 5, row: 6 });
  const [newNode, setNewNode] = useState(null);
  const socket = useRef(null);

  useEffect(() => {
    const ws = connectSocket(props.socketUrl, (err, serverMessage) => {
      setMessage(serverMessage);
      if (err) console.log(err);
    });
    socket.current = ws;

    socket.current.onmessage = (event) => {
      const json = JSON.parse(event.data);
      switch (json.eventType) {
        case "game_id": {
          setGameId(json.eventMessage);
          break;
        }
        case "client_id": {
          clientId.current = json.eventMessage;
          break;
        }
        case "game_starting": {
          const data = JSON.parse(json.eventMessage);
          const player1 =
            data.player1 === clientId.current ? "you" : "opponent";
          const player2 =
            data.player2 === clientId.current ? "you" : "opponent";
          setPlayers({ first: player1, second: player2 });
          break;
        }
        // TODO: should it be "field to be marked" or maybe something like "chosen_node". Or something more general like "recent move"
        case "field_to_be_marked": {
          const data = JSON.parse(json.eventMessage);
          const node = { col: data.colIndex, row: data.rowIndex };
          markLine(node);
          break;
        }
        case "movement_allowed": {
          setCurrentPlayer(json.eventMessage);
          break;
        }
        case "server_message": {
          setMessage(json.eventMessage);
          console.log(json.eventMessage);
          break;
        }
        default: {
          console.log("message not handled: " + event.data);
        }
      }
    };
  }, []);

  const chooseNode = (node) => {
    if (currentPlayer !== clientId.current) {
      return;
    }

    const colDiff = Math.abs(currentNode.col - node.col);
    const rowDiff = Math.abs(currentNode.row - node.row);

    if (colDiff <= 1 && rowDiff <= 1 && colDiff + rowDiff !== 0) {
      socket.current.send(
        JSON.stringify({
          eventType: "field_clicked",
          eventMessage: {
            gameId: gameId,
            rowIndex: node.row,
            colIndex: node.col,
          },
        })
      );
    }
  };

  const markLine = (node) => {
    setNewNode(node);
  };

  const isSocketDisconnected =
    socket.current == null || socket.current.readyState === 0;

  return (
    <div className="game-page-wrapper">
      <GameDetails
        isSocketDisconnected={isSocketDisconnected}
        gameId={gameId}
        isTurn={currentPlayer === clientId.current}
        message={message}
      />
      <SoccerBoard
        chooseNode={(node) => chooseNode(node)}
        currentNode={currentNode}
        newNode={newNode}
        setCurrentNode={(node) => setCurrentNode(node)}
        players={players}
      />
    </div>
  );
}

function connectSocket(serverUrl, cb) {
  const socket = new WebSocket(serverUrl);
  socket.onopen = () => {
    cb(null, "Connected to server");
  };

  return socket;
}

export default Soccer;
