import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import PageContent from "../PageContent";
import "./App.scss";

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const checkLoggedIn = () => {
    const url = "http://" + document.domain + ":8080/api/users/self";
    fetch(url, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            console.log(json);
            setLoggedUser(json.username);
          });
        } else {
          console.log("response from server was not 200");
        }
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => checkLoggedIn(), []);

  return (
    <div className="app">
      <Navbar loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
      <PageContent />
    </div>
  );
}
export default App;
