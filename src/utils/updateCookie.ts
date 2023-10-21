import Cookies from "js-cookie";

// update currentUser cookie with new user info

export function updateCookie(cookie: any, headers: any) {
    if (headers.accessToken) {
        console.log("updateCookie: ", headers);
            Cookies.set("currentUser", JSON.stringify(headers));
    }

    return {
        'test': headers
    }

};