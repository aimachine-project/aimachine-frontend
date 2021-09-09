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

  renderAllFields(number) {
    const fields = [];
    for (let i = 0; i < number; i++) {
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
    return <div className="board bg-blue-900">{this.renderAllFields(196)}</div>;
  }
}

export default Board;
