import React, { useState } from "react";
import "../style.scss";
import { LogInToApi } from "../../../utilities/LoginHelper";

function LoginForm(props) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();

    validateInput();
    if (isInputValid === false) return;

    const userAuth = "Basic " + btoa(user.username + ":" + user.password);
    LogInToApi(onSuccessfulSubmit, userAuth);
  };

  const validateInput = () => {
    if (user.username === "" || user.password === "") {
      setErrorMessage("fields can't be empty");
      setIsInputValid(false);
    } else {
      setIsInputValid(true);
    }
  };
  const onSuccessfulSubmit = (json) => {
    props.setRedirect(true);
    console.log(json.username);
    props.setLoggedUsername(json.username);
    console.log(json);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="error-message">{errorMessage}</div>
        <label className="form-section">
          <span className="form-section-label">username:</span>
          <input
            type="text"
            name="username"
            onChange={onChange}
            className="form-section-input"
          />
        </label>
        <label className="form-section">
          <span className="form-section-label">password:</span>
          <input
            type="password"
            name="password"
            onChange={onChange}
            className="form-section-input"
          />
        </label>
        <input type="submit" value="Login" className="form-submit" />
      </form>
    </>
  );
}
export default LoginForm;
