import React from "react";
import Board from "./components/Board";
import {
  ConnectToSocket,
  ReactToSocketMessage,
} from "../utilities/SocketHelper";
import "./style.scss";

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSocket: null,
      gameId: "",
      clientId: "",
      currentPlayer: "",
      message: "",
      board: Array(Math.pow(this.props.boardSize, 2)).fill(null),
    };
  }

  componentDidMount() {
    const socket = ConnectToSocket(this.props.socketUrl);
    this.setState({ currentSocket: socket });
    const client = this;

    socket.onmessage = (event) => {
      ReactToSocketMessage(event, client);
    };
  }

  chooseField(i) {
    if (
      this.state.currentPlayer !== this.state.clientId ||
      this.state.board[i]
    ) {
      return;
    }
    const row = Math.floor(i / this.props.boardSize);
    const col = i % this.props.boardSize;
    this.state.currentSocket.send(
      JSON.stringify({
        eventType: "field_clicked",
        eventMessage: {
          gameId: this.state.gameId,
          rowIndex: row,
          colIndex: col,
        },
      })
    );
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
      this.state.currentSocket.readyState === 0;
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
          boardSize={this.props.boardSize}
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

export default TicTacToe;
