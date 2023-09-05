import axios from "axios";
import cookie from "cookie";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      // Validate input
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required." });
      }

      // Send request to the external API
      const response = await axios.post(`${process.env.API_URL}users/sign_in`, {
        user: { email: email, password: password },
      });

      const data = await response.data;

      console.log("data", data.user.tokens);

      try {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", String(data.user.tokens), {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: "strict",
            path: "/",
          })
        );
      } catch (error) {
        console.log(error);
      }

      // Return the response from the external API
      return res.status(response.status).json(data);
    } catch (error) {
      if (error.response) {
        // If the external API returned an error, we'll capture its response here
        return res.status(error.response.status).json(error.response.data);
      }

      // If there's an issue in the axios request itself, this will capture it
      return res.status(500).json({ error: "Internal Server Error." });
    }
  } else {
    // Handle other HTTP methods (optional)
    res.status(405).end(); // Method Not Allowed
  }
}
