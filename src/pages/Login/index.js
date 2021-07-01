import React, { useState } from "react";
import "./style.scss";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");

  return (
    <>
      <div className="error-message">{errorMessage}</div>
      <div className="server-message">{serverMessage}</div>
      <LoginForm
        setErrorMessage={(message) => setErrorMessage(message)}
        setServerMessage={(message) => setServerMessage(message)}
      />
      <RegistrationForm
        setErrorMessage={(message) => setErrorMessage(message)}
        setServerMessage={(message) => setServerMessage(message)}
      />
    </>
  );
}
export default Login;
