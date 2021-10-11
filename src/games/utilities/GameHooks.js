import { useState, useEffect, useRef } from "react";

export function useGame(socketUrl, markMove) {
  const [socket, setSocket] = useState(null);
  const [gameId, setGameId] = useState(null);
  const clientId = useRef("");
  const [players, setPlayers] = useState({ first: "", second: "" });
  const [currentPlayer, setCurrentPlayer] = useState("");
  //   const [message, setMessage] = useState("");
  const [gameState, setGameState] = useState("waiting for opponent");

  useEffect(() => {
    const ws = new WebSocket(socketUrl);
    ws.onopen = () => {};
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
        case "players_count": {
          console.log("player count: " + json.eventMessage);
          break;
        }
        case "players_in_game": {
          const data = JSON.parse(json.eventMessage);
          const player1 =
            data.player1 === clientId.current ? "you" : "opponent";
          const player2 =
            data.player2 === clientId.current ? "you" : "opponent";
          setPlayers({ first: player1, second: player2 });
          break;
        }
        case "game_started": {
          setGameState("game started");
          break;
        }
        case "game_ended": {
          setGameState("game ended: " + json.eventMessage);
          break;
        }
        case "game_disbanded": {
          setGameState("game has been disbanded");
          break;
        }
        case "new_move_to_mark": {
          const data = JSON.parse(json.eventMessage);
          markMove(data);
          break;
        }
        case "current_player": {
          setCurrentPlayer(json.eventMessage);
          break;
        }
        case "server_message": {
          //   setMessage(json.eventMessage);
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
    // message: message,
    gameState: gameState,
  };
}
