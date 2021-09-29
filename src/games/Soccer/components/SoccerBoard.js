import React, { useEffect, useRef, useState } from "react";

function SoccerBoard(props) {
  const surfaceRef = useRef(null);
  const canvasRef = useRef(null);
  const surfaceCols = 11;
  const surfaceRows = 13;
  const [fieldLength, setFieldLength] = useState(0);
  // TODO: move width and height to state, but for now it for some reason streches out canvas
  let width = (surfaceCols + 1) * fieldLength;
  let height = (surfaceRows + 1) * fieldLength;
  const boardStyle = { border: "1px solid #000000" };

  useEffect(() => {
    const surfaceDimentions = getSurfaceDimentions();
    const optimalFieldLength = getOptimalFieldLength(
      surfaceDimentions.width,
      surfaceDimentions.height
    );
    setFieldLength(optimalFieldLength);

    width = (surfaceCols + 1) * fieldLength;
    height = (surfaceRows + 1) * fieldLength;
  }, [surfaceRef]);

  const getSurfaceDimentions = () => {
    const width = surfaceRef.current.offsetWidth;
    const height = surfaceRef.current.offsetHeight;
    return { width: width, height: height };
  };

  const getOptimalFieldLength = (surfaceWidth, surfaceHeight) => {
    const widthFieldLength = surfaceWidth / (surfaceCols + 1);
    const heightFieldLength = surfaceHeight / (surfaceRows + 1);
    return Math.min(widthFieldLength, heightFieldLength);
  };

  const getCanvasCtx = () => {
    const canvasObj = canvasRef.current;
    const ctx = canvasObj.getContext("2d");

    return ctx;
  };

  useEffect(() => {
    if (fieldLength) {
      drawBoard();
    }
  }, [fieldLength]);

  useEffect(() => {
    console.log("got players");
    drawPlayersNames(props.players);
  }, [props.players]);

  const drawPlayersNames = (players) => {
    drawPlayerName(players.first, 7, 12);
    drawPlayerName(players.second, 7, 0);
  };

  const drawPlayerName = (name, col, row) => {
    const ctx = getCanvasCtx();
    const fontSize = fieldLength * 0.75;
    ctx.font = fontSize + "px Arial";
    const margin = fontSize / 2;

    const textStart = getNodeCoordinates(col, row);
    const width = ctx.measureText(name).width;

    ctx.fillStyle = "#474799";
    ctx.fillRect(
      textStart.x - margin,
      textStart.y + margin,
      width + margin * 2,
      -fontSize - margin
    );
    ctx.fillStyle = "#ffffff";
    ctx.fillText(name, textStart.x, textStart.y);
  };

  useEffect(() => {
    if (props.newNode) {
      drawLine(props.currentNode, props.newNode);
      drawNode(props.currentNode.col, props.currentNode.row, false);
      drawNode(props.newNode.col, props.newNode.row, true);
      props.setCurrentNode(props.newNode);
    }
  }, [props.newNode]);

  const drawBoard = () => {
    const ctx = getCanvasCtx();
    ctx.fillStyle = "#474799";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i <= surfaceCols - 1; i++) {
      for (let j = 0; j <= surfaceRows - 1; j++) {
        const isActive =
          i === (surfaceCols - 1) / 2 && j === (surfaceRows - 1) / 2;
        drawNode(i, j, isActive);
      }
    }

    drawBorder(fieldLength, fieldLength);
  };

  const drawNode = (col, row, isActive) => {
    const r = 5;
    const node = getNodeCoordinates(col, row);
    const ctx = getCanvasCtx();

    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.stroke();

    if (isActive) {
      ctx.fillStyle = "#cc0080";
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

  const getNodeIndex = (coordinates) => {
    const colIndex = Math.abs(Math.round(coordinates.x / fieldLength - 1));
    const rowIndex = Math.abs(Math.round(coordinates.y / fieldLength - 1));
    return { col: colIndex, row: rowIndex };
  };

  const drawLine = (startNode, stopNode) => {
    const ctx = getCanvasCtx();
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

  const getOffset = () => {
    const canvasObj = canvasRef.current;
    return { left: canvasObj.offsetLeft, top: canvasObj.offsetTop };
  };

  const handleCanvasClick = (event) => {
    const offset = getOffset();
    const clickedX = event.clientX - offset.left;
    const clickedY = event.clientY - offset.top;
    const clickedCoordinates = { x: clickedX, y: clickedY };

    const clickedNode = getNodeIndex(clickedCoordinates);

    props.chooseNode(clickedNode);
  };

  return (
    <div className="board" ref={surfaceRef}>
      <canvas
        ref={canvasRef}
        id="board"
        width={width}
        height={height}
        style={boardStyle}
        onClick={handleCanvasClick}
      ></canvas>
    </div>
  );
}
export default SoccerBoard;
