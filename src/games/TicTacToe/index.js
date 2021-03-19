import React from "react";
import socketIOClient from "socket.io-client";
import Board from "./components/Board";
import "./TicTacToe.css";

// TO DO: change to env variable
const ENDPOINT = "http://127.0.0.1:5000";

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSocket: null,
      gameId: "",
      clientId: "",
      currentPlayer: "",
      message: "",
      board: Array(9).fill(null),
    };
  }

  componentDidMount() {
    const socket = connectSocket((err, serverMessage) => {
      this.setState({ message: serverMessage });
      console.log(err);
    });
    this.setState({ currentSocket: socket });

    socket.on("game_id", (data) => {
      this.setState({ gameId: data });
    });
    socket.on("client_id", (data) => {
      this.setState({ clientId: data });
    });
    socket.on("field_to_be_marked", (data) => {
      const index = data.rowIndex * 3 + data.colIndex;

      // TO DO: should data.fieldToken be 1/-1 if the server message at the end is "X/O won"?
      const token = data.fieldToken === 1 ? "x" : "o";
      this.markField(index, token);
    });

    // TO DO: change "movement_allowed" to something more fitting
    socket.on("movement_allowed", (data) => {
      this.setState({ currentPlayer: data });
    });
  }

  chooseField(i) {
    if (
      this.state.currentPlayer !== this.state.clientId ||
      this.state.board[i]
    ) {
      this.setState({ message: "You can't choose already marked field" });
      return;
    }
    const row = Math.floor(i / 3);
    const col = i % 3;
    this.state.currentSocket.emit("field_clicked", {
      gameId: this.state.gameId,
      rowIndex: row,
      colIndex: col,
    });
  }

  markField(i, token) {
    const newBoard = this.state.board.slice();
    newBoard[i] = token;
    this.setState({ xIsNext: !this.state.xIsNext });
    this.setState({ board: newBoard });
  }

  render() {
    return (
      <div className="flex flex-col lg:flex-row-reverse">
        <div className="flex-auto lg:pt-5">
          <p className="text-xl">{this.state.gameId}</p>
          <p>
            Is it your turn:{" "}
            <strong>
              {this.state.currentPlayer === this.state.clientId ? "yes" : "no"}
            </strong>
          </p>
          <div>
            <p className="underline">message from server</p>
            <p>{this.state.message}</p>
          </div>
        </div>
        <Board
          isCurrentPlayer={this.state.currentPlayer === this.state.clientId}
          board={this.state.board}
          chooseField={(i) => this.chooseField(i)}
        />
      </div>
    );
  }
}

function connectSocket(cb) {
  const socket = socketIOClient(ENDPOINT, {
    transports: ["websocket"],
  });
  socket.on("connect", () => {
    cb(null, "Connected to server");
  });
  socket.on("server_message", (data) => {
    cb(null, data);
  });

  return socket;
}

export default TicTacToe;
