export const post = async ({ request, locals }) => {
    const headers = new Headers(request.headers);
    headers.set("Content-Type", "application/json");
    const body = await request.json();
    const apiURI = locals.apiURI;

    const response = await fetch(`${apiURI}/api/usuarios`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    });

    if (response.ok) {
        return {
            status: 201,
            body: await response.json()
        }
    } else {
        return {
            status: 500,
            body: JSON.stringify({
                message: "No se ha podido registrar un usuario con estos datos."
            })
        }
    }
}