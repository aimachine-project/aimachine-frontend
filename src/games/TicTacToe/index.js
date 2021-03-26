import React from "react";
import socketIOClient from "socket.io-client";
import Board from "./components/Board";
import "./style.scss";

// TO DO: change to env variable
const ENDPOINT = process.env.REACT_APP_SOCKET_SERVER_URL;

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
      if (err) console.log(err);
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
    const socketConnected =
      this.state.currentSocket == null ||
      this.state.currentSocket.id === undefined;
    const isTurn = this.state.currentPlayer === this.state.clientId;

    return (
      <div className="page-wrapper flex flex-col lg:flex-row-reverse">
        <Details
          socketConnected={socketConnected}
          gameId={this.state.gameId}
          isTurn={isTurn}
          message={this.state.message}
        />
        <Board
          isCurrentPlayer={this.state.currentPlayer === this.state.clientId}
          board={this.state.board}
          chooseField={(i) => this.chooseField(i)}
        />
      </div>
    );
  }
}

function Details(props) {
  if (props.socketConnected) {
    return (
      <div className="details">
        {/* TO DO: Fix styling so the alert is centered without a hack */}
        <h1></h1>
        <h1 className="details-error">
          There has been an error while connecting to the server
        </h1>
        <h1></h1>
      </div>
    );
  } else {
    return (
      <div className="details">
        <h3 className="details-title">{props.gameId}</h3>
        <div className="details-content">
          <p>
            Is it your turn: <strong>{props.isTurn ? "yes" : "no"}</strong>
          </p>
          <div className="details-message">
            <p>message from server:</p>
            <p> {props.message}</p>
          </div>
        </div>
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
