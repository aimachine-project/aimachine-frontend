import React, { useEffect, useRef, useState } from "react";

function SoccerBoard() {
  const canvasRef = useRef(null);
  const surfaceCols = 11;
  const surfaceRows = 13;
  const fieldLength = 50;
  const width = (surfaceCols + 1) * fieldLength;
  const height = (surfaceRows + 1) * fieldLength;
  const [ctx, setCtx] = useState();

  const boardStyle = { border: "1px solid #000000" };
  useEffect(() => {
    const canvasObj = canvasRef.current;
    const currentctx = canvasObj.getContext("2d");
    setCtx(currentctx);
    if (ctx) {
      // const canvasObj = canvasRef.current;
      drawBoard(canvasObj);
    }
  }, [ctx]);

  const drawBoard = (canvas) => {
    ctx.fillStyle = "#474799";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i <= surfaceCols - 1; i++) {
      for (let j = 0; j <= surfaceRows - 1; j++) {
        drawNode(i, j);
      }
    }

    drawBorder(fieldLength, fieldLength);
  };

  const drawNode = (col, row) => {
    const r = 5;
    const node = getNodeCoordinates(col, row);

    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.stroke();

    if (col === 5 && row === 6) {
      ctx.fillStyle = "#FFFFFF";
    } else {
      ctx.fillStyle = "#b0a8a8";
    }
    ctx.fill();
  };

  const getNodeCoordinates = (col, row) => {
    const cx = (col + 1) * fieldLength;
    const cy = (row + 1) * fieldLength;
    return { x: cx, y: cy };
  };

  const drawLine = (startNode, stopNode) => {
    ctx.strokeStyle = "#d6cfcf";
    ctx.lineWidth = 3;

    const startCoordinates = getNodeCoordinates(startNode.col, startNode.row);
    const stopCoordinates = getNodeCoordinates(stopNode.col, stopNode.row);

    ctx.beginPath();
    ctx.moveTo(startCoordinates.x, startCoordinates.y);
    ctx.lineTo(stopCoordinates.x, stopCoordinates.y);
    ctx.closePath();
    ctx.stroke();
  };

  const drawBorder = (colWidth, rowHeight) => {
    drawLine({ col: 1, row: 1 }, { col: 4, row: 1 });
    drawLine({ col: 4, row: 1 }, { col: 4, row: 0 });
    drawLine({ col: 4, row: 0 }, { col: 6, row: 0 });
    drawLine({ col: 6, row: 0 }, { col: 6, row: 1 });
    drawLine({ col: 6, row: 1 }, { col: 9, row: 1 });
    drawLine({ col: 9, row: 1 }, { col: 9, row: 11 });
    drawLine({ col: 9, row: 11 }, { col: 6, row: 11 });
    drawLine({ col: 6, row: 11 }, { col: 6, row: 12 });
    drawLine({ col: 6, row: 12 }, { col: 4, row: 12 });
    drawLine({ col: 4, row: 12 }, { col: 4, row: 11 });
    drawLine({ col: 4, row: 11 }, { col: 1, row: 11 });
    drawLine({ col: 1, row: 11 }, { col: 1, row: 1 });
  };

  // const handleCanvasClick = (event) => {
  //   console.log("click");
  // };

  return (
    <div className="board">
      <canvas
        ref={canvasRef}
        id="board"
        width={width}
        height={height}
        style={boardStyle}
        // onClick={handleCanvasClick}
      ></canvas>
    </div>
  );
}
export default SoccerBoard;
