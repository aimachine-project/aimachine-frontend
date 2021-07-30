import React, { useEffect, useState } from "react";
import { Redirect } from "react-router";
import PageTitle from "../components/PageTitle";
import "./style.scss";
import { USER_INFO_URL } from "../../utilities/URL";
import { GetFromApi } from "../../utilities/ApiHelper";

function Account(props) {
  const [user, setUser] = useState({ username: "", id: "" });
  const [redirect, setRedirect] = useState(false);

  useEffect(() => fetchUserInfo(), []);

  const fetchUserInfo = () => {
    const apiUrl = USER_INFO_URL;
    const responseOk = (response) => {
      response.json().then((json) => {
        console.log(json);
        setUser({ username: json.username, id: json.id });
      });
    };
    const responseNotOk = () => {
      console.log("response from server was not 200");
      console.log("hello");
      setRedirect(true);
    };
    GetFromApi(apiUrl, "", responseOk, responseNotOk);
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <PageTitle title="Account!" />
      <div className="content">
        <p>Information on currently logged in user:</p>
        <p>username: {user.username}</p>
        <p>id: {user.id}</p>
      </div>
    </>
  );
}
export default Account;
