import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:4001";

function TestSockets() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    // const socket = socketIOClient(ENDPOINT);
    const socket = socketIOClient("http://localhost:4001", {
      transports: ["websocket"],
    });
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      It is <time dateTime={response}>{response}</time>
    </p>
  );
}

export default TestSockets;
