import React from "react";
import Soccer from "../Soccer";
import TicTacToe from "../TicTacToe";
// import TicTacToeExpanded from "./TicTacToeExpanded";

const protocol = location.protocol.replace("http", "ws");
const baseWebSocket = protocol + "//" + document.domain + ":8080";
export const GAMES_LIST = [
  {
    name: "Tic Tac Toe",
    route: "tictactoe",
    socketUrl: baseWebSocket + "/games/tictactoe",
    component: (
      <TicTacToe boardSize="3" socketUrl={baseWebSocket + "/games/tictactoe"} />
    ),
  },
  {
    name: "Tic Tac Toe Expanded",
    route: "tictactoeexp",
    socketUrl: baseWebSocket + "/games/tictactoenfields",
    component: (
      <TicTacToe
        boardSize="14"
        socketUrl={baseWebSocket + "/games/tictactoenfields"}
      />
    ),
  },
  {
    name: "Soccer",
    route: "soccer",
    socketUrl: baseWebSocket + "/games/soccer",
    component: (
      <Soccer boardSize="14" socketUrl={baseWebSocket + "/games/soccer"} />
    ),
  },
];
