import React from "react";
import GameDetails from "../utilities/GameDetails";
import SoccerBoard from "./components/SoccerBoard";

class Soccer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSocket: null,
      gameId: "",
      clientId: "",
      players: { first: "", second: "" },
      currentPlayer: "",
      message: "",
      currentNode: { col: 5, row: 6 },
      newNode: null,
    };
  }

  componentDidMount() {
    const socket = connectSocket(this.props.socketUrl, (err, serverMessage) => {
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
          console.log(json.eventMessage);
          break;
        }
        case "game_starting": {
          const data = JSON.parse(json.eventMessage);
          const player1 =
            data.player1 === client.state.clientId ? "you" : "opponent";
          const player2 =
            data.player2 === client.state.clientId ? "you" : "opponent";
          client.setState({ players: { first: player1, second: player2 } });
          break;
        }
        // TODO: should it be "field to be marked" or maybe something like "chosen_node". Or something more general like "recent move"
        case "field_to_be_marked": {
          const data = JSON.parse(json.eventMessage);
          const node = { col: data.colIndex, row: data.rowIndex };
          client.markLine(node);
          break;
        }
        case "movement_allowed": {
          client.setState({ currentPlayer: json.eventMessage });
          break;
        }
        case "server_message": {
          client.setState({ message: json.eventMessage });
          console.log(json.eventMessage);
          break;
        }
        default: {
          console.log("message not handled: " + event.data);
        }
      }
    };
  }

  chooseNode(node) {
    if (this.state.currentPlayer !== this.state.clientId) {
      return;
    }
    console.log("chosen!");

    const currentNode = this.state.currentNode;

    const colDiff = Math.abs(currentNode.col - node.col);
    const rowDiff = Math.abs(currentNode.row - node.row);

    if (colDiff <= 1 && rowDiff <= 1 && colDiff + rowDiff !== 0) {
      console.log("wysyłam!");
      this.state.currentSocket.send(
        JSON.stringify({
          eventType: "field_clicked",
          eventMessage: {
            gameId: this.state.gameId,
            rowIndex: node.row,
            colIndex: node.col,
          },
        })
      );
    }
  }

  markLine(node) {
    this.setState({ newNode: node });
  }

  // setPlayers(data) {
  //   const player1 = data.player1 === this.state.clientId ? "you" : data.player1;
  //   const player2 = data.player2 === this.state.clientId ? "you" : data.player2;
  //   this.setState({ players: { first: player1, second: player2 } });
  // }

  render() {
    const isSocketDisconnected =
      this.state.currentSocket == null ||
      this.state.currentSocket.readyState === 0;
    const isTurn = this.state.currentPlayer === this.state.clientId;

    return (
      <div className="game-page-wrapper">
        <GameDetails
          isSocketDisconnected={isSocketDisconnected}
          gameId={this.state.gameId}
          isTurn={isTurn}
          message={this.state.message}
        />
        {/* <button
          onClick={() =>
            this.setPlayers({ player1: this.state.clientId, player2: "drugi" })
          }
        >
          set players
        </button> */}
        <SoccerBoard
          chooseNode={(node) => this.chooseNode(node)}
          currentNode={this.state.currentNode}
          newNode={this.state.newNode}
          setCurrentNode={(node) => this.setState({ currentNode: node })}
          players={this.state.players}
        />
      </div>
    );
  }
}

function connectSocket(serverUrl, cb) {
  const socket = new WebSocket(serverUrl);
  socket.onopen = () => {
    cb(null, "Connected to server");
  };

  return socket;
}

export default Soccer;
