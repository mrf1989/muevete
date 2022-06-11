import { getHeaders } from "$lib/utils";

export const put = async ({ request, locals }) => {
    const headers = getHeaders(request);
    const body = await request.json();
    const articuloId = body._id;
    const apiURI = locals.apiURI;

    delete body._id;

    const response = await fetch(`${apiURI}/api/admin/articulos/${articuloId}`, {
        method: "PUT",
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
                message: "No se ha podido editar el artículo con estos datos."
            })
        }
    }
}