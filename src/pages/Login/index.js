import React, { useState } from "react";
import { Redirect } from "react-router";
import "./style.scss";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
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
    </>
  );
}
export default Login;
