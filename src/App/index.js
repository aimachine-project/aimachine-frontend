import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import PageContent from "../PageContent";
import "./App.scss";
import { LOGIN_URL } from "../utilities/URL";
import { GetFromApi } from "../utilities/ApiHelper";

function App() {
  const [loggedUsername, setLoggedUsername] = useState("");
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
        setUser(json);
        console.log("zalogowano z API");
      });
    };
    const responseNotOk = () => {
      Cookies.remove("isLoggedIn");
      console.log("response from server was not 200");
    };
    GetFromApi(apiUrl, "", responseOk, responseNotOk);
  };

  const setUser = (json) => {
    const in30Minutes = 1 / 24;
    Cookies.set("isLoggedIn", "is logged in: true", { expires: in30Minutes });
    setLoggedUsername(json.username);
  };

  useEffect(() => checkLoggedIn(), []);

  return (
    <div className="app">
      <Navbar
        loggedUser={loggedUsername}
        setLoggedUser={(username) => setLoggedUsername(username)}
      />
      <PageContent setUser={(username) => setUser(username)} />
    </div>
  );
}
export default App;
