import React from "react";
import "./style.scss";

function Popup(props) {
  if (props.isPopup) {
    return (
      <>
        <div className="popup-background" onClick={props.togglePopup}></div>
        <div className="popup-wrapper">{props.content}</div>
      </>
    );
  } else {
    return <></>;
  }
}

export default Popup;
