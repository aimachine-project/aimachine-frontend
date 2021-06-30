import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import * as BiIcons from "react-icons/bi";
import "./Navbar.scss";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const renderSidebarData = (
    <>
      <li key="home" className="nav-text">
        <a href="/">
          <BiIcons.BiHome />
          <span className="ml-3">Home</span>
        </a>
      </li>
      <li key="login" className="nav-text">
        <a href="/login">
          <BiIcons.BiUser />
          <span className="ml-3">Log In</span>
        </a>
      </li>
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
          <ul className="navbar-elements" onClick={showSidebar}>
            {renderSidebarData}
          </ul>
        </IconContext.Provider>
      </nav>
    </div>
  );
}

export default Navbar;
