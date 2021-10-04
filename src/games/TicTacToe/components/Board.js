import React from "react";
import Field from "./Field";
import "../style.scss";

function Board(props) {
  const renderField = (i) => {
    return (
      <Field
        key={i}
        value={props.board[i]}
        onClick={() => props.chooseField(i)}
      />
    );
  };

  const renderAllFields = () => {
    const fields = [];
    for (let i = 0; i < props.board.length; i++) {
      fields.push(renderField(i));
    }
    return fields;
  };

  const boardStyle = {
    gridTemplateColumns: `repeat(${props.boardSize}, 1fr)`,
    gridTemplateRows: `repeat(${props.boardSize}, 1fr)`,
  };
  return (
    <div className="board tictactoe-board" style={boardStyle}>
      {renderAllFields()}
    </div>
  );
}

export default Board;
