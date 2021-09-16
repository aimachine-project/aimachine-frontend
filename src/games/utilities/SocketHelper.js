export function ConnectToSocket(serverUrl) {
  const socket = new WebSocket(serverUrl);

  return socket;
}


