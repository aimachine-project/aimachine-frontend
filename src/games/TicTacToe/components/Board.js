import React from "react";
import Square from "./Square";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  chooseSquare(i) {
    const squares = this.state.squares.slice();
    if (squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "x" : "o";
    this.setState({ squares: squares });
    this.setState({ xIsNext: !this.state.xIsNext });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.chooseSquare(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-size lg:board-size-desktop grid grid-rows-3 grid-cols-3 bg-blue-900">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;
