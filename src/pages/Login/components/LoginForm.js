import Cookies from "js-cookie";
import React, { useState } from "react";
// import { Redirect } from "react-router-dom";
import "../style.scss";

function LoginForm(props) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const url = "http://" + document.domain + ":8080/api/users/self";
  const handleSubmit = (event) => {
    event.preventDefault();

    validateInput();
    if (isInputValid === false) return;

    fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Basic " + btoa(user.username + ":" + user.password),
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            onSuccesfullSubmit(json);
          });
        } else {
          console.log("response from server was not 200");
          setErrorMessage(
            "Can't log in. Check if your username and password is correct"
          );
        }
      })
      .catch((error) => console.log(error));
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
    const in30Minutes = 1 / 24;
    Cookies.set("isLoggedIn", "is logged in: true", { expires: in30Minutes });
    props.setRedirect(true);
    props.setLoggedUser(json.username);
    console.log(json);
    setErrorMessage("");
    setServerMessage("user " + user.username + " was logged in.");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="error-message">{errorMessage}</div>
        <div className="server-message">{serverMessage}</div>
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
