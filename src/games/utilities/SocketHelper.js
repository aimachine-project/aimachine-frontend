export function ConnectToSocket(serverUrl) {
  const socket = new WebSocket(serverUrl);

  return socket;
}

export function ReactToSocketMessage(event, client) {
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
      const index = rowIndex * this.props.boardSize + colIndex;
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
}
