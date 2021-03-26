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

  render() {
    return (
      <div className="board bg-blue-900">
        {this.renderField(0)}
        {this.renderField(1)}
        {this.renderField(2)}
        {this.renderField(3)}
        {this.renderField(4)}
        {this.renderField(5)}
        {this.renderField(6)}
        {this.renderField(7)}
        {this.renderField(8)}
      </div>
    );
  }
}

export default Board;
