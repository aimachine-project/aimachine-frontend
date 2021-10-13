import React from "react";
import Soccer from "../Soccer";
import TicTacToe from "../TicTacToe";

const protocol = location.protocol.replace("http", "ws");
const baseWebSocket = protocol + "//" + document.domain + ":8080";
const baseAiPath = location.protocol + "//" + document.domain + ":8081";
export const GAMES_LIST = [
  {
    name: "Tic Tac Toe",
    route: "tictactoe",
    pathAi: baseAiPath + "/tictactoe",
    socketUrl: baseWebSocket + "/games/tictactoe",
    component: (
      <TicTacToe
        boardSize="3"
        socketUrl={baseWebSocket + "/games/tictactoe?gameType=HumanVsHuman"}
      />
    ),
    componentAI: (
      <TicTacToe
        boardSize="3"
        socketUrl={baseWebSocket + "/games/tictactoe?gameType=HumanVsAi"}
      />
    ),
  },
  {
    name: "Tic Tac Toe Expanded",
    route: "tictactoeexp",
    pathAi: baseAiPath + "/tictactoeextended",
    socketUrl: baseWebSocket + "/games/tictactoenfields",
    component: (
      <TicTacToe
        boardSize="14"
        socketUrl={
          baseWebSocket + "/games/tictactoenfields?gameType=HumanVsHuman"
        }
      />
    ),
    componentAI: (
      <TicTacToe
        boardSize="14"
        socketUrl={baseWebSocket + "/games/tictactoenfields?gameType=HumanVsAi"}
      />
    ),
  },
  {
    name: "Soccer",
    route: "soccer",
    pathAi: baseAiPath + "/soccer",
    socketUrl: baseWebSocket + "/games/soccer",
    component: (
      <Soccer
        socketUrl={baseWebSocket + "/games/soccer?gameType=HumanVsHuman"}
      />
    ),
    componentAI: (
      <Soccer socketUrl={baseWebSocket + "/games/soccer?gameType=HumanVsAi"} />
    ),
  },
];
