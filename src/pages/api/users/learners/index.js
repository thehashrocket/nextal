import axios from "axios";
import { getCookie } from "cookies-next";
import { getAuthorizationHeader } from "../../../../utils/getAuthorizationHeader";

// Returns a list of courses that belongs to the user to /courses
export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const cookie = getCookie("currentUser", { req, res });

            if (!cookie) {
                return res.status(400).json({ error: "You must be logged in." });
            }

            const headers = getAuthorizationHeader(cookie);
            console.log('headers', headers);
            // Send request to the external API
            const response = await axios.get(
                `${process.env.API_URL}users/1/learners`,
                {
                    headers: headers,
                }
            );


            const data = await response.data.learners.data;
            const responseHeaders = {
                client: response.headers.client,
                expiry: response.headers.expiry,
                accessToken: response.headers["access-token"],
                uid: response.headers.uid,
                username: response.headers.uid
            }
            console.log('responseHeaders', responseHeaders);

            const encodedHeaders = Object.entries(responseHeaders).reduce((acc, [key, value]) => {
                acc[key] = encodeURIComponent(value);
                return acc;
            }, {});

            const cookieValue = JSON.stringify(encodedHeaders);
            if (response.headers["access-token"]) {
                res.setHeader('Set-Cookie', `currentUser=${cookieValue}; Path=/; HttpOnly; SameSite=Lax;`);
            }

            // Return the response from the external API
            return res.status(response.status).json({ data: data });
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
