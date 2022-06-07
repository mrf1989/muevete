export const post = async ({ request, locals }) => {
    const headers = new Headers(request.headers);
    headers.set("content-type", "application/json");
    const body = await request.json();
    const apiURI = locals.apiURI;

    const response = await fetch(`${apiURI}/api/login`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    });

    if (response.ok) {
        return {
            status: 200,
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