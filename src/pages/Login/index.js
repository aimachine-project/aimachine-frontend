import React, { useState } from "react";
import { Redirect } from "react-router";
import "./style.scss";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";
import PageTitle from "../components/PageTitle";

function Login(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/account" />;
  }
  return (
    <>
      <div className="content">
        <section className="content-section">
          <PageTitle title="Login!" />
          <div className="error-message">{errorMessage}</div>
          <div className="server-message">{serverMessage}</div>
          <LoginForm
            setErrorMessage={(message) => setErrorMessage(message)}
            setServerMessage={(message) => setServerMessage(message)}
            setRedirect={(bool) => setRedirect(bool)}
            setLoggedUser={(username) => props.setLoggedUser(username)}
          />
        </section>
        <section className="content-section">
          <PageTitle title="or Register" />
          <RegistrationForm
            setErrorMessage={(message) => setErrorMessage(message)}
            setServerMessage={(message) => setServerMessage(message)}
          />
        </section>
      </div>
    </>
  );
}
export default Login;
