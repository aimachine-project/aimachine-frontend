// import { useState } from "react";

import { useState, useEffect, useRef } from "react";

export function useGame(socketUrl, makeMove) {
  const [socket, setSocket] = useState(null);
  const [gameId, setGameId] = useState(1);
  const clientId = useRef("");
  const [players, setPlayers] = useState({ first: "", second: "" });
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket(socketUrl);
    ws.onopen = () => {
      console.log("connect second");
    };
    setSocket(ws);
  }, []);

  if (socket) {
    socket.onmessage = (event) => {
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
          makeMove(node);
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
  }

  return {
    socket: socket,
    gameId: gameId,
    clientId: clientId.current,
    players: players,
    currentPlayer: currentPlayer,
    message: message,
  };
}
