import { AuthService } from "./auth.service";

export const authService = new AuthService(
  "https://client-backend.ngrok.io/api/v1/"
);
