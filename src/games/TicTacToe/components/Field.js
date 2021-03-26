import React from "react";
import "../style.scss";

function Field(props) {
  return (
    <button
      data-testid="field"
      className="field border-2 border-gray-500 focus:outline-none"
      onClick={() => props.onClick()}
    >
      {props.value}
    </button>
  );
}

export default Field;
