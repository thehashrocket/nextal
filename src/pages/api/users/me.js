import axios from "axios";
import { cookies } from "next/headers";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // const cookies = new Cookies(req, res)
      try {
        const token = cookies.get("token");

        console.log("token", token);
      } catch (error) {
        console.log(error);
      }

      // Validate input
      if (!token) {
        return res.status(400).json({ error: "Token is required." });
      }

      // Send request to the external API
      const response = await axios.get(`${process.env.API_URL}users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.data;

      // Return the response from the external API
      return res.status(response.status).json(data);
    } catch (error) {
      if (error.response) {
        console.log("error.response", error.response);
        // If the external API returned an error, we'll capture its response here
        return res.status(error.response.status).json(error.response.data);
      }

      // If there's an issue in the axios request itself, this will capture it
      return res.status(500).json({ error: "Internal Server Error." });
    }
  }
}
