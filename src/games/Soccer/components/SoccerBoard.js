import React, { useEffect, useRef, useState } from "react";

function SoccerBoard() {
  const canvasRef = useRef(null);

  const boardStyle = { border: "1px solid #000000" };
  useEffect(() => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext("2d");
    ctx.beginPath();
    ctx.arc(95, 50, 40, 0, 2 * Math.PI);
    ctx.stroke();
  });
  const handleCanvasClick = (event) => {
    // on each click get current mouse location
    const currentCoord = { x: event.clientX, y: event.clientY };
    // add the newest mouse location to an array in state
    console.log(currentCoord.x + " " + currentCoord.y);
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext("2d");
    ctx.moveTo(0, 0);
    ctx.lineTo(currentCoord.x, currentCoord.y);
    ctx.stroke();
    setCoordinates([...coordinates, currentCoord]);
  };

  return (
    <div className="board">
      <canvas
        ref={canvasRef}
        id="board"
        width="200"
        height="100"
        style={boardStyle}
        onClick={handleCanvasClick}
      ></canvas>
    </div>
  );
}
export default SoccerBoard;
