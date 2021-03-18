import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Board from "./components/Board";
import "./TicTacToe.css";

// TO DO: change to env variable
const ENDPOINT = "http://127.0.0.1:5000";

function TicTacToe() {
  const [gameId, setGameId] = useState("");
  const [clientId, setClientId] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("");

  useEffect(() => {
    const socket = connectSocket();
    socket.on("game_id", (data) => {
      setGameId(data);
    });
    socket.on("client_id", (data) => {
      setClientId(data);
    });

    // TO DO: change "movement_allowed" to something more fitting
    socket.on("movement_allowed", (data) => {
      setCurrentPlayer(data);
    });
    socket.on("field_to_be_marked", (data) => {
      // update board
    });
  }, []);

  return (
    <div className="flex flex-col lg:flex-row-reverse">
      <div className="flex-auto lg:pt-5">
        <p>game id: {gameId}</p>
        <p>client id: {clientId}</p>
        <p>Is it your turn: {currentPlayer === clientId ? "yes" : "no"}</p>
      </div>
      <Board />
    </div>
  );
}

function connectSocket() {
  const socket = socketIOClient(ENDPOINT, {
    transports: ["websocket"],
  });
  socket.on("connect", () => {
    console.log("connected to server!");
  });
  socket.on("server_message", (data) => {
    console.log("Server message: " + data);
  });

  return socket;
}

export default TicTacToe;
