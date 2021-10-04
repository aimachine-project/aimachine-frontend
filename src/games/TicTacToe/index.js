import React, { useEffect, useRef, useState } from "react";
import Board from "./components/Board";
import GameDetails from "../utilities/GameDetails";
import "../utilities/style.scss";
import "./style.scss";

function TicTacToe(props) {
  const socket = useRef(null);
  const clientId = useRef("");
  const [gameId, setGameId] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [message, setMessage] = useState("");
  const [board, setBoard] = useState(
    Array(Math.pow(props.boardSize, 2)).fill(null)
  );

  useEffect(() => {
    socket.current = connectSocket(props.socketUrl, (err, serverMessage) => {
      setMessage(serverMessage);
      if (err) console.log(err);
    });
  }, []);

  if (socket.current) {
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
        case "field_to_be_marked": {
          const data = JSON.parse(json.eventMessage);
          const rowIndex = data.rowIndex;
          const colIndex = data.colIndex;
          const index = rowIndex * props.boardSize + colIndex;
          // TO DO: should data.fieldToken be 1/-1 if the server message at the end is "X/O won"?
          const token = data.fieldToken === 1 ? "x" : "o";
          markField(index, token);
          break;
        }
        case "movement_allowed": {
          // TO DO: change "movement_allowed" to something more fitting
          setCurrentPlayer(json.eventMessage);
          break;
        }
        case "server_message": {
          // TO DO: rethink messages from server to avoid repetition
          setMessage(json.eventMessage);
          break;
        }
        default: {
          console.log("message not handled: " + event.data);
        }
      }
    };
  }

  const chooseField = (i) => {
    if (currentPlayer !== clientId.current || board[i]) {
      return;
    }
    const row = Math.floor(i / props.boardSize);
    const col = i % props.boardSize;
    socket.current.send(
      JSON.stringify({
        eventType: "field_clicked",
        eventMessage: {
          gameId: gameId,
          rowIndex: row,
          colIndex: col,
        },
      })
    );
  };

  const markField = (i, token) => {
    const _board = board.slice();
    _board[i] = token;

    setBoard(_board);
  };

  return (
    <div className="game-page-wrapper">
      <GameDetails
        isSocketDisconnected={
          socket.current == null || socket.current.readyState === 0
        }
        gameId={gameId}
        isTurn={currentPlayer === clientId.current}
        message={message}
      />
      <Board
        isCurrentPlayer={currentPlayer === clientId.current}
        board={board}
        chooseField={(i) => chooseField(i)}
        boardSize={props.boardSize}
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

export default TicTacToe;
