import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import * as BiIcons from "react-icons/bi";
import User from "./components/User";
import "./Navbar.scss";

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const renderSidebarData = (
    <>
      <User loggedUser={props.loggedUser} setLoggedUser={props.setLoggedUser} />
      <li key="home" className="nav-element">
        <a href="/" className="nav-element-content" onClick={showSidebar}>
          <BiIcons.BiHome />
          <span className="nav-element-text">Home</span>
        </a>
      </li>
      {/* <li key="login" className="nav-element">
        <a href="/" className="nav-element-content" onClick={showSidebar}>
          <BiIcons.BiQuestionMark />
          <span className="nav-element-text">Other Link</span>
        </a>
      </li> */}
    </>
  );

  return (
    <div className="nav">
      <a href="#" className="navbar-toggle open">
        <BiIcons.BiMenu onClick={showSidebar} />
      </a>
      <nav className={sidebar ? "navbar active" : "navbar"}>
        <IconContext.Provider value={{ color: "#fff" }}>
          <a href="#" className="navbar-toggle">
            <BiIcons.BiX onClick={showSidebar} />
          </a>
          <ul className="navbar-elements">{renderSidebarData}</ul>
        </IconContext.Provider>
      </nav>
    </div>
  );
}

export default Navbar;
