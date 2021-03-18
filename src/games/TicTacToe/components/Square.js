import React from "react";

function Square(props) {
  return (
    <button
      className=" border-2 border-gray-500 focus:outline-none font-bold text-7xl text-gray-100"
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

export default Square;
