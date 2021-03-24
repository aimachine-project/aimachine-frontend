import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { IconContext } from "react-icons";
import * as BiIcons from "react-icons/bi";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const renderSidebarData = (
    <div>
      <li key="home" className="nav-text">
        <a href="/">
          <BiIcons.BiHome />
          <span className="ml-3">Home</span>
        </a>
      </li>
      <li key="login" className="nav-text">
        <a href="/">
          <BiIcons.BiUser />
          <span className="ml-3">Log In</span>
        </a>
      </li>
    </div>
  );

  return (
    <>
      <Link to="#" className="navbar-toggle open">
        <BiIcons.BiMenu onClick={showSidebar} />
      </Link>
      <nav className={sidebar ? "navbar active" : "navbar"}>
        <ul className="" onClick={showSidebar}>
          <IconContext.Provider value={{ color: "#fff" }}>
            <li className="navbar-toggle">
              <Link to="#">
                <BiIcons.BiX />
              </Link>
            </li>
            {renderSidebarData}
          </IconContext.Provider>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
