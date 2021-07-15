// import Cookies from "js-cookie";
import React, { useState } from "react";
import "../style.scss";
import { LOGIN_URL } from "../../../utilities/URL";
import { GetFromApi } from "../../../utilities/ApiHelper";

function LoginForm(props) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();

    validateInput();
    if (isInputValid === false) return;

    const apiUrl = LOGIN_URL;
    const userAuth = "Basic " + btoa(user.username + ":" + user.password);
    const responseOk = (response) => {
      response.json().then((json) => {
        onSuccesfullSubmit(json);
      });
    };
    const responseNotOk = () => {
      console.log("response from server was not 200");
      setErrorMessage(
        "Can't log in. Check if your username and password is correct"
      );
    };
    GetFromApi(apiUrl, userAuth, responseOk, responseNotOk);
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
    setUser(json);
    props.setRedirect(true);
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
