import Cookies from "js-cookie";
import { getCookie } from "cookies-next";

// expects to be passed a cookie
export function getAuthorizationHeader(cookie: string) {
  // console.log("cookie", cookie);
  // console.log(cookie, JSON.parse(cookie.toString() || ""));
  // cookie contains a json string with the user info
  // contains client, uid, and accessToken

  return {
    client: JSON.parse(cookie || "").client,
    uid: JSON.parse(cookie || "").uid,
    "access-token": JSON.parse(cookie || "").accessToken,
  };
}
