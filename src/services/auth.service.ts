import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  login = (username: string, password: string) => {
    return this.instance
      .post("users/sign_in", {
        user: {
          email: username,
          password: password,
        },
      })
      .then((res) => {
        return {
          username: res.data.user.email,
          client: res.headers.client,
          uid: res.headers.uid,
          id: res.data.user.id,
          accessToken: res.headers["access-token"],
        };
      });
  };

  // getMe = (userId: string) => {
  //   return this.instance
  //     .get(`users/${userId}`, {
  //       headers: getAuthorizationHeader(),
  //     })
  //     .then((res) => {
  //       return res.data;
  //     });
  // };

  // uploadAvatar = (userId: string, newAvatar: File) => {
  //   const formData = new FormData();
  //   formData.append("file", newAvatar);
  //   return this.instance
  //     .post(`/users/${userId}/upload`, formData, {
  //       headers: getAuthorizationHeader(),
  //     })
  //     .then((res) => {
  //       return {
  //         newAvatar: res.data.data.url,
  //       };
  //     });
  // };
}
