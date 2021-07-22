import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import PageContent from "../PageContent";
import "./App.scss";
// import { LOGIN_URL } from "../utilities/URL";
// import { GetFromApi } from "../utilities/ApiHelper";
import { LogUserIn } from "../utilities/LoginHelper";
// import Cookies from "js-cookie";

function App() {
  const [loggedUsername, setLoggedUsername] = useState("");

  const onAutomaticLogIn = (json) => {
    setLoggedUsername(json.username);
  };

  useEffect(() => LogUserIn(onAutomaticLogIn), []);

  return (
    <div className="app">
      <Navbar
        loggedUser={loggedUsername}
        setLoggedUser={(username) => setLoggedUsername(username)}
      />
      <PageContent
        setLoggedUsername={(username) => setLoggedUsername(username)}
      />
    </div>
  );
}
export default App;
