const baseApi = "http://" + document.domain + ":8080";
export const REGISTER_URL = baseApi + "/api/register";
export const LOGIN_URL = baseApi + "/api/users/self";
export const LOGOUT_URL = baseApi + "/logout";
export const USER_INFO_URL = baseApi + "/api/users/self";

const protocol = location.protocol.replace("http", "ws");
const baseWebSocket = protocol + "//" + document.domain + ":8080";
export const TICTACTOE_URL = baseWebSocket + "/game/tictactoe";
export const TICTACTOEEXP_URL = baseWebSocket + "/games/tictactoenfields";
