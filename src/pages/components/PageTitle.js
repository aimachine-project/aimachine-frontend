import React from "react";
import "./PageTitle.scss";

function PageTitle(props) {
  return <h1 className="page-title">{props.title}</h1>;
}

export default PageTitle;
