import { getHeaders } from "$lib/utils";
import * as cookie from "cookie";

export const post = async ({ request, locals }) => {
    const headers = getHeaders(request);
    const body = await request.json();
    const apiURI = locals.apiURI;

    const response = await fetch(`${apiURI}/api/login`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    });

    if (response.ok && response.headers.get("set-cookie")) {
        const cookies = cookie.parse(response.headers.get("set-cookie")).MDAUTHID;
        const id = cookies.split("-")[0];
        const res = await fetch(`${apiURI}/api/usuarios/${id}`);
        const user = await res.json();
        response.headers.delete("content-length");

        return {
            status: 200,
            headers: response.headers,
            body: JSON.stringify({
                id,
                username: user.username,
                rol: user.rol
            })
        }
    } else {
        return {
            status: 401,
            body: JSON.stringify({
                message: "Usuario y contraseña no válidos."
            })
        }
    }
}