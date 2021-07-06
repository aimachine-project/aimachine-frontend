import React, { useState } from "react";
import { Redirect } from "react-router";
import "./style.scss";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";

function Login(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const url = "http://" + document.domain + ":8080/api/users/self";
  const handleClick = (event) => {
    event.preventDefault();

    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log(json);
          });
        } else {
          console.log("response from server was not 200");
        }
      })
      .catch((error) => console.log(error));
  };

  if (redirect && true === false) {
    return <Redirect to="/account" />;
  }
  return (
    <>
      <div className="error-message">{errorMessage}</div>
      <div className="server-message">{serverMessage}</div>
      <LoginForm
        setErrorMessage={(message) => setErrorMessage(message)}
        setServerMessage={(message) => setServerMessage(message)}
        setRedirect={(bool) => setRedirect(bool)}
      />
      <RegistrationForm
        setErrorMessage={(message) => setErrorMessage(message)}
        setServerMessage={(message) => setServerMessage(message)}
      />
      <button onClick={handleClick}>fetch user info</button>
    </>
  );
}
export default Login;
