import React from "react";
import Field from "./Field";
import "../style.scss";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
    };
  }

  renderField(i) {
    return (
      <Field
        value={this.props.board[i]}
        onClick={() => this.props.chooseField(i)}
      />
    );
  }

  renderAllFields() {
    const fields = [];
    for (let i = 0; i < this.props.board.length; i++) {
      fields.push(
        <Field
          value={this.props.board[i]}
          onClick={() => this.props.chooseField(i)}
        />
      );
    }
    return fields;
  }

  render() {
    const boardStyle = {
      gridTemplateColumns: `repeat(${this.props.boardSize}, 1fr)`,
      gridTemplateRows: `repeat(${this.props.boardSize}, 1fr)`,
    };
    return (
      <div className="board bg-blue-900" style={boardStyle}>
        {this.renderAllFields()}
      </div>
    );
  }
}

export default Board;
