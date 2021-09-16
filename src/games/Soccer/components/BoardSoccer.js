import React from "react";
import Node from "./Node";
import "../style.scss";
import CanvasComponent from "./CanvasComponent";

class BoardSoccer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
    };
  }

  renderField(i) {
    return (
      <Node
        value={this.props.board[i]}
        onClick={() => this.props.chooseField(i)}
      />
    );
  }

  renderAllFields() {
    const c = document.getElementById("sysq_canvas");
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(200, 200, 550, 300);
    // const fields = [];
    // for (let i = 0; i < this.props.board.length; i++) {
    // fields.push(
    //   <Node
    //     value={this.props.board[i]}
    //     onClick={() => this.props.chooseField(i)}
    //   />
    // );
    // }
    // return fields;
  }

  render() {
    return (
        <div id="container">
          <CanvasComponent />
        </div>
    );
  }
}

export default BoardSoccer;
