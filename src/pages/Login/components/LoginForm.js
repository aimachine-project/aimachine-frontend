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
    LogInToApi(onSuccesfullSubmit, userAuth);
  };

  const validateInput = () => {
    if (user.username === "" || user.password === "") {
      setErrorMessage("fields can't be empty");
      setIsInputValid(false);
    } else {
      setIsInputValid(true);
    }
  };
  const onSuccesfullSubmit = (json) => {
    props.setRedirect(true);
    console.log(json.username);
    props.setLoggedUsername(json.username);
    console.log(json);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="error-message">{errorMessage}</div>
        <label>
          username:
          <input type="text" name="username" onChange={onChange} />
        </label>
        <label>
          password:
          <input type="password" name="password" onChange={onChange} />
        </label>
        <input type="submit" value="Login" />
      </form>
    </>
  );
}
export default LoginForm;
