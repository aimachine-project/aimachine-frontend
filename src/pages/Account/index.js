import React, { useEffect, useState } from "react";
import "./style.scss";

function Account(props) {
  const [user, setUser] = useState({ username: "", id: "" });

  useEffect(() => fetchUserInfo(), []);

  const url = "http://" + document.domain + ":8080/api/users/self";
  const fetchUserInfo = () => {
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log(json);
            setUser({ username: json.username, id: json.id });
          });
        } else {
          console.log("response from server was not 200");
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <h2>Account</h2>
      <p>Information on currently logged in user:</p>
      <p>username: {user.username}</p>
      <p>id: {user.id}</p>
    </>
  );
}
export default Account;
