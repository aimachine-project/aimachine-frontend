import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import PageContent from "../PageContent";
import "./App.scss";
import { LOGIN_URL } from "../utilities/URL";
import { GetFromApi } from "../utilities/ApiHelper";

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const checkLoggedIn = () => {
    const cookie = Cookies.get("isLoggedIn");

    if (cookie) {
      console.log(cookie);
      logUserIn();
    } else {
      console.log("not log in");
    }
  };

  const logUserIn = () => {
    const apiUrl = LOGIN_URL;
    const responseOk = (response) => {
      response.json().then((json) => {
        Cookies.set("isLoggedIn", "is logged in: true");
        setLoggedUser(json.username);
        setTimeout(() => {
          console.log("zalogowano z API");
        }, 1000);
        // const in1hour = 1 / 24;
      });
    };
    const responseNotOk = () => {
      Cookies.remove("isLoggedIn");
      console.log("response from server was not 200");
    };
    GetFromApi(apiUrl, "", responseOk, responseNotOk);
  };

  useEffect(() => checkLoggedIn(), []);

  return (
    <div className="app">
      <Navbar
        loggedUser={loggedUser}
        setLoggedUser={(username) => setLoggedUser(username)}
      />
      <PageContent setLoggedUser={(username) => setLoggedUser(username)} />
    </div>
  );
}
export default App;
