import { getHeaders, getUserInformation } from "$lib/utils";

export const post = async ({ request, locals }) => {
    const headers = getHeaders(request);
    const body = await request.json();
    const apiURI = locals.apiURI;

    const response = await fetch(`${apiURI}/api/login`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    });

    if (response.ok) {
        const user = await getUserInformation(
            response.headers.get("set-cookie"),
            apiURI
        );

        response.headers.delete("content-length");

        return {
            status: 200,
            headers: response.headers,
            body: JSON.stringify({
                id: user._id,
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