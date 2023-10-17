import axios from "axios";
import Cookies from "js-cookie";
import { getCookie } from "cookies-next";
import { getAuthorizationHeader } from "../../../../utils/getAuthorizationHeader";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const cookie = getCookie("currentUser", { req, res });

            if (!cookie) {
                return res.status(400).json({ error: "You must be logged in." });
            }

            const headers = getAuthorizationHeader(cookie);

            const { id } = req.query;
            // Send request to the external API
            const response = await axios.get(
                `${process.env.API_URL}users/1/course_accesses/${id}`,
                {
                    headers: headers,
                }
            );

            const data = await response.data.course_access.data;

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
    }
}
