import { LOGIN_URL, LOGOUT_URL } from "../utilities/URL";
import { GetFromApi } from "../utilities/ApiHelper";
import Cookies from "js-cookie";

function IsLoggedIn() {
  const cookie = Cookies.get("isLoggedIn");
  console.log(cookie);

  return cookie;
}

export function LogUserIn(setStatusToLoggedIn) {
  if (IsLoggedIn()) {
    console.log("cookie exist");
    LogInToApi(setStatusToLoggedIn, "");
  } else {
    console.log("not log in");
  }
}

export function LogInToApi(onSuccesfullLogin, userAuth) {
  const apiUrl = LOGIN_URL;
  const responseOk = (response) => {
    response.json().then((json) => {
      onSuccesfullLogin(json);
      Cookies.set("isLoggedIn", "is logged in: true");
    });
  };
  const responseNotOk = () => {
    Cookies.remove("isLoggedIn");
    console.log("response from server was not 200");
  };
  GetFromApi(apiUrl, userAuth, responseOk, responseNotOk);
}

export function Logout(onSuccesfullLogout) {
  const apiUrl = LOGOUT_URL;
  const responseOk = (response) => {
    onSuccesfullLogout();
    Cookies.remove("isLoggedIn");
    console.log("logged out");
  };
  const responseNotOk = () => {
    console.log("response from server was not 200");
  };
  GetFromApi(apiUrl, "", responseOk, responseNotOk);
}
