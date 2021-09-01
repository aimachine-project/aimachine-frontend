const baseApi = "http://" + document.domain + ":8080";
export const REGISTER_URL = baseApi + "/api/register";
export const LOGIN_URL = baseApi + "/api/users/self";
export const LOGOUT_URL = baseApi + "/api/logout";
export const USER_INFO_URL = baseApi + "/api/users/self";

const protocol = location.protocol.replace("http", "ws");
const baseWebSocket = protocol + "//" + document.domain + ":8080";
export const TICTACTOE_URL = baseWebSocket + "/games/tictactoe";
