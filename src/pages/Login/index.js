import React, { useState } from "react";
import { Redirect } from "react-router";
import "./style.scss";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";
import PageTitle from "../components/PageTitle";

function Login(props) {
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/account" />;
  }
  return (
    <>
      <div className="content">
        <section className="content-section">
          <PageTitle title="Login!" />
          <LoginForm
            setRedirect={(bool) => setRedirect(bool)}
            setLoggedUsername={(username) => props.setLoggedUsername(username)}
          />
        </section>
        <section className="content-section">
          <PageTitle title="or Register" />
          <RegistrationForm />
        </section>
      </div>
    </>
  );
}
export default Login;
