import React, { useState } from "react";
import "../style.scss";

function RegistrationForm() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [doesPasswordMatch, setDoesPasswordMatch] = useState(true);
  // const [test, setTest] = useState("");

  const handleSubmit = () => {
    if (user.username === "" || user.password === "") {
      alert("nie można!");
      return;
    }
    fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      // mode: "no-cors",
    })
      // .then((response) => console.log(response.status))
      .then((response) => response.json())
      .then((json) => console.log(json));
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
      <div>
        <p>user: {user.username}</p>
        <p>password: {user.password}</p>
        {/* <p>test: {test}</p> */}
      </div>
    </>
  );
}
export default RegistrationForm;
