import React, { useState } from "react";
import "../style.scss";

function RegistrationForm() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [serverMessage, setServerMessage] = useState("");
  const [repeatedPassword, setReapeatedPassword] = useState("");
  const [doesPasswordMatch, setDoesPasswordMatch] = useState(true);
  const [isInputValid, setIsInputValid] = useState(false);

  const url = "http://" + document.domain + ":8080/api/register";
  const handleSubmit = (event) => {
    event.preventDefault();

    validateInput();
    if (isInputValid === false) return;

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            onSuccesfullSubmit(json);
            // window.location.reload();
          });
        } else {
          console.log("response from server was not 200");
          setErrorMessage("can't create user. try other username");
          setServerMessage("");
        }
      })
      .catch((error) => console.log(error));
  };

  const validateInput = () => {
    if (
      user.username === "" ||
      user.password === "" ||
      repeatedPassword === ""
    ) {
      setErrorMessage("fields can't be empty");
      setIsInputValid(false);
    } else if (doesPasswordMatch === false) {
      setErrorMessage("password does not match");
      setIsInputValid(false);
    } else {
      setIsInputValid(true);
    }
  };
  const onSuccesfullSubmit = (json) => {
    setUser({ username: "", password: "" });
    setReapeatedPassword("");
    console.log(json);
    setErrorMessage("");
    setServerMessage(
      "user " + user.username + " was created. \n You can now log in"
    );
  };

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const confirmPassword = (e) => {
    const value = e.target.value;
    setReapeatedPassword(value);

    if (value === user.password) {
      setDoesPasswordMatch(true);
    } else {
      setDoesPasswordMatch(false);
    }
  };

  const passwordAlert =
    doesPasswordMatch || repeatedPassword === "" ? (
      ""
    ) : (
      <p className="password-error">password does not match</p>
    );

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="error-message">{errorMessage}</div>
        <div className="server-message">{serverMessage}</div>
        <label>
          username:
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={onChange}
          />
        </label>
        <label>
          password:
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={onChange}
          />
        </label>
        <label>
          confirm password:
          <input
            type="password"
            name="repeatedPassword"
            value={repeatedPassword}
            onChange={confirmPassword}
          />
        </label>
        {passwordAlert}
        <input type="submit" value="Register" />
      </form>
    </>
  );
}
export default RegistrationForm;
