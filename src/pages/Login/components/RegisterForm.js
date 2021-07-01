import React, { useState } from "react";
import "../style.scss";

function RegistrationForm() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [doesPasswordMatch, setDoesPasswordMatch] = useState(true);

  const url = "http://" + document.domain + ":8080/api/register";
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    })
      .then((response) => {
        console.log("test");
        if (response.ok) {
          response.json().then((json) => {
            console.log(json);
            alert("user " + user.username + " was created");
            window.location.reload();
          });
        } else {
          console.log("response from server is not ok");
        }
      })
      .catch((error) => console.log(error));
  };

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const confirmPassword = (e) => {
    const value = e.target.value;
    if (value === "" || value === user.password) {
      setDoesPasswordMatch(true);
    } else {
      setDoesPasswordMatch(false);
    }
  };

  const passwordAlert = doesPasswordMatch ? (
    ""
  ) : (
    <>
      <small>password does not match</small>
    </>
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          username:
          <input type="text" name="username" onChange={onChange} />
        </label>
        <label>
          password:
          <input type="password" name="password" onChange={onChange} />
        </label>
        <label>
          confirm password:
          <input
            type="password"
            name="confirmPassword"
            onChange={confirmPassword}
          />
          {passwordAlert}
        </label>
        <input type="submit" value="Register" />
      </form>
    </>
  );
}
export default RegistrationForm;
