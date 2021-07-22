import React from "react";
import "../Navbar.scss";
import { Logout } from "../../utilities/LoginHelper";

function User(props) {
  const isLoggedIn = props.loggedUser !== "";

  const handleLogout = () => {
    const onSuccesfullLogout = () => props.setLoggedUser("");
    Logout(onSuccesfullLogout);
  };

  let content = "";
  if (isLoggedIn) {
    content = (
      <span className="nav-element-content">
        <p>
          hello{" "}
          <a className="user-name" href="/account">
            {props.loggedUser}
          </a>
        </p>
        <p className="user-logout" onClick={handleLogout}>
          Log Out
        </p>
      </span>
    );
  } else {
    content = (
      <a href="/login" className="nav-element-content user-login">
        Log In
      </a>
    );
  }

  return (
    <li key="user" className="nav-element user">
      {content}
    </li>
  );
}

export default User;
