import React from "react";
import Board from "./components/Board";
import "./style.scss";

// TO DO: change to env variable
// const ENDPOINT = process.env.REACT_APP_SOCKET_SERVER_URL;

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
    const client = this;

    socket.onmessage = (event) => {
      const json = JSON.parse(event.data);
      switch (json.eventType) {
        case "game_id": {
          client.setState({ gameId: json.eventMessage });
          break;
        }
        case "client_id": {
          client.setState({ clientId: json.eventMessage });
          break;
        }
        case "field_to_be_marked": {
          const data = JSON.parse(json.eventMessage);
          const rowIndex = data.rowIndex;
          const colIndex = data.colIndex;
          const index = rowIndex * 3 + colIndex;
          // TO DO: should data.fieldToken be 1/-1 if the server message at the end is "X/O won"?
          const token = data.fieldToken === 1 ? "x" : "o";
          client.markField(index, token);
          break;
        }
        case "movement_allowed": {
          // TO DO: change "movement_allowed" to something more fitting
          client.setState({ currentPlayer: json.eventMessage });
          break;
        }
        case "server_message": {
          // TO DO: rethink messages from server to avoid repetition
          client.setState({ message: json.eventMessage });
          break;
        }
        default: {
          console.log("message not handled: " + event.data);
        }
      }
    };
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
  const protocol = location.protocol.replace("http", "ws");
  const serverUrl = protocol + "//backend:8080/game/tictactoe";
  const socket = new WebSocket(serverUrl);
  socket.onopen = () => {
    cb(null, "Connected to server");
  };

  return socket;
}

export default TicTacToe;
