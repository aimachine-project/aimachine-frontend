import React from "react";
import "../Navbar.scss";
import { LOGOUT_URL } from "../../utilities/URL";
import { GetFromApi } from "../../utilities/ApiHelper";

function User(props) {
  const isLoggedIn = props.loggedUser !== "";

  const logout = () => {
    const apiUrl = LOGOUT_URL;
    const responseOk = (response) => {
      props.setLoggedUser("");
      console.log("logged out");
    };
    const responseNotOk = () => {
      console.log("response from server was not 200");
    };
    GetFromApi(apiUrl, "", responseOk, responseNotOk);
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
        <p className="user-logout" onClick={logout}>
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
