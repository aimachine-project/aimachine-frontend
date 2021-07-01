import React, { useState } from "react";
import "./style.scss";
import RegistrationForm from "./components/RegisterForm";

function Login() {
  const [errorMessage, setErrorMessage] = useState("error");
  const [serverMessage, setServerMessage] = useState("blank");

  return (
    <>
      <div className="error-message">{errorMessage}</div>
      <div className="server-message">{serverMessage}</div>
      <RegistrationForm
        setErrorMessage={(message) => setErrorMessage(message)}
        setServerMessage={(message) => setServerMessage(message)}
      />
    </>
  );
}
export default Login;
