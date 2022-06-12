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
    const mes = (date.getMonth() + 1).toString().padStart(2, 0);
    const dia = date.getDate().toString().padStart(2, 0);
    return `${date.getFullYear()}-${mes}-${dia}`;
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