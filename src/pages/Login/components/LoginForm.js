import React, { useState } from "react";
import "../style.scss";

function LoginForm(props) {
  const [user, setUser] = useState({ username: "", password: "" });
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
      // credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            onSuccesfullSubmit(json);
            // window.location.reload();
          });
        } else {
          console.log("response from server was not 200");
        }
      })
      .catch((error) => console.log(error));
  };

  const validateInput = () => {
    if (user.username === "" || user.password === "") {
      props.setErrorMessage("fields can't be empty");
      setIsInputValid(false);
    } else {
      setIsInputValid(true);
    }
  };
  const onSuccesfullSubmit = (json) => {
    console.log(json);
    props.setErrorMessage("");
    props.setServerMessage("user " + user.username + " was logged in.");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          username:
          <input type="text" name="username" onChange={onChange} />
        </label>
        <label>
          password:
          <input type="text" name="password" onChange={onChange} />
        </label>
        <input type="submit" value="Login" />
      </form>
    </>
  );
}
export default LoginForm;
