import * as cookie from "cookie";

export const getHeaders = (request) => {
    return new Headers({
        accept: "*/*",
        "accept-encoding": "gzip, deflate, br",
        "content-type": "application/json",
        connection: "keep-alive",
        cookie: request.headers.get("cookie")
    });
}

export const getDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

export const getUserInformation = async (data, uri) => {
    const cookies = cookie.parse(data || "");
    if (cookies.MDAUTHID) {
        const id = cookies.MDAUTHID.split("-")[0];
        const response = await fetch(`${uri}/api/usuarios/${id}`);
        return await response.json();
    }

    return false;
}