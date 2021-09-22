import React, { useEffect, useRef } from "react";

function SoccerBoard() {
  const canvasRef = useRef(null);
  const surfaceCols = 11;
  const surfaceRows = 13;
  const fieldLength = 50;
  const width = (surfaceCols + 1) * fieldLength;
  const height = (surfaceRows + 1) * fieldLength;

  const boardStyle = { border: "1px solid #000000" };
  useEffect(() => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext("2d");
    drawBoard(ctx, canvasObj);
  }, []);

  const drawBoard = (ctx, canvas) => {
    ctx.fillStyle = "#474799";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i <= surfaceCols - 1; i++) {
      for (let j = 0; j <= surfaceRows - 1; j++) {
        drawNode(ctx, i, j);
        canvas.addEventListener("click", (e) => {
          // handleCanvasClick(e, cx, cy, i, j);
          console.log("row: " + i + ", col: " + j);
        });
      }
    }

    drawBorder(ctx, fieldLength, fieldLength);
    const node1 = getNodeCoordinates(0, 0);
    const node2 = getNodeCoordinates(0, 1);
    drawLine(ctx, node1, node2);
  };

  const drawNode = (ctx, col, row) => {
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

  const drawLine = (ctx, startNode, stopNode) => {
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

  const drawBorder = (ctx, colWidth, rowHeight) => {
    drawLine(ctx, { col: 1, row: 1 }, { col: 4, row: 1 });
    drawLine(ctx, { col: 4, row: 1 }, { col: 4, row: 0 });
    drawLine(ctx, { col: 4, row: 0 }, { col: 6, row: 0 });
    drawLine(ctx, { col: 6, row: 0 }, { col: 6, row: 1 });
    drawLine(ctx, { col: 6, row: 1 }, { col: 9, row: 1 });
    drawLine(ctx, { col: 9, row: 1 }, { col: 9, row: 11 });
    drawLine(ctx, { col: 9, row: 11 }, { col: 6, row: 11 });
    drawLine(ctx, { col: 6, row: 11 }, { col: 6, row: 12 });
    drawLine(ctx, { col: 6, row: 12 }, { col: 4, row: 12 });
    drawLine(ctx, { col: 4, row: 12 }, { col: 4, row: 11 });
    drawLine(ctx, { col: 4, row: 11 }, { col: 1, row: 11 });
    drawLine(ctx, { col: 1, row: 11 }, { col: 1, row: 1 });
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
