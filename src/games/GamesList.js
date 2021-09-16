import React from "react";
import TicTacToe from "./TicTacToe";
import TicTacToeExpanded from "./TicTacToeExpanded";

export const GAMES_LIST = [
  { name: "Tic Tac Toe", route: "tictactoe", component: <TicTacToe /> },
  {
    name: "Tic Tac Toe Expanded",
    route: "tictactoeexp",
    component: <TicTacToeExpanded />,
  },
];
