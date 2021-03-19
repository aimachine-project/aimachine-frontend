import React from "react";
import Field from "./Field";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // squares: this.props.board,
      xIsNext: true,
    };
  }

  // chooseSquare(i) {
  //   const squares = this.state.squares.slice();
  //   if (squares[i] || !this.props.isCurrentPlayer) {
  //     return;
  //   }
  //   squares[i] = this.state.xIsNext ? "x" : "o";
  //   this.setState({ squares: squares });
  //   this.setState({ xIsNext: !this.state.xIsNext });
  // }

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
      <div>
        <div className="board-size lg:board-size-desktop grid grid-rows-3 grid-cols-3 bg-blue-900">
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
      </div>
    );
  }
}

export default Board;
