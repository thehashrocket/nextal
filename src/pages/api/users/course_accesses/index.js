import axios from "axios";
import Cookies from "js-cookie";
import { getCookie } from "cookies-next";
import { getAuthorizationHeader } from "../../../../utils/getAuthorizationHeader";
import { updateCookie } from '../../../../utils/updateCookie';

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const cookie = getCookie("currentUser", { req, res });

      if (!cookie) {
        return res.status(400).json({ error: "You must be logged in." });
      }

      const headers = getAuthorizationHeader(cookie);
      // Send request to the external API
      const response = await axios.get(
        `${process.env.API_URL}users/1/course_accesses`,
        {
          headers: headers,
        }
      );

      const data = await response.data.my_courses.data;
      const responseHeaders = {
        client: response.headers.client,
        expiry: response.headers.expiry,
        accessToken: response.headers["access-token"],
        uid: response.headers.uid,
        username: response.headers.uid
      }

      // Return the response from the external API
      return res.status(response.status).json({ data: data, headers: responseHeaders }).headers(responseHeaders);
    } catch (error) {
      if (error.response) {
        // If the external API returned an error, we'll capture its response here
        return res.status(error.response.status).json(error.response.data);
      }

      // If there's an issue in the axios request itself, this will capture it
      return res.status(500).json({ error: "Internal Server Error." });
    }
  }
}
