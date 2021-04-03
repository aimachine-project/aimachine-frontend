import React from "react";
import Board from "./components/Board";
import "./TicTacToe.css";

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
    socket.onmessage = function (event) {
      const json = JSON.parse(event.data);
      switch (json.eventType) {
        case "game_id": {
          client.setState({ gameId: json.eventMessage });
          console.log("game id: " + client.state.gameId);
          break;
        }
        case "client_id": {
          client.setState({ clientId: json.eventMessage });
          console.log("player id: " + client.state.clientId);
          break;
        }
        case "field_to_be_marked": {
          const data = JSON.parse(json.eventMessage);
          const rowIndex = data.rowIndex;
          const colIndex = data.colIndex;
          const fieldToken = data.fieldToken;
          console.log(
            "field to be marked (row, col, token): ",
            rowIndex,
            colIndex,
            fieldToken
          );
          const index = data.rowIndex * 3 + data.colIndex;
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
          console.log(json.eventMessage);
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
    let gameDetails;
    if (
      this.state.currentSocket == null ||
      this.state.currentSocket.id === undefined
    ) {
      gameDetails = <h1>You cannot connect to the server</h1>;
    } else {
      gameDetails = (
        <div>
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
      );
    }

    return (
      <div className="flex flex-col lg:flex-row-reverse">
        <div className="flex-auto lg:pt-5">{gameDetails}</div>
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
  const protocol = location.protocol.replace("http", "ws");
  const serverUrl = protocol + "//" + document.domain + ":8080/game/tictactoe";
  const socket = new WebSocket(serverUrl);
  socket.onopen = () => {
    console.log("connected");
    cb(null, "Connected to server");
  };

  return socket;
}

export default TicTacToe;
