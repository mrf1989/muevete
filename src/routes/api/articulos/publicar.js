import { getHeaders } from "$lib/utils";

export const post = async ({ request, locals }) => {
    const headers = getHeaders(request);
    const body = await request.json();
    const apiURI = locals.apiURI;

    const response = await fetch(`${apiURI}/api/admin/articulos`, {
        method: "POST",
        headers,
        body: JSON.stringify(body)
    });

    if (response.ok) {
        return {
            status: 201,
            headers: response.headers,
            body: await response.json()
        }
    } else {
        return {
            status: 500,
            body: JSON.stringify({
                message: "No se ha podido publicar el artículo con estos datos."
            })
        }
    }
}