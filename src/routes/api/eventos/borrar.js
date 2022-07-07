import { getHeaders } from "$lib/utils";

export const del = async ({ request, locals }) => {
    const headers = getHeaders(request);
    const body = await request.json();
    const eventoId = body.eventoId;
    const apiURI = locals.apiURI;

    const response = await fetch(`${apiURI}/api/admin/eventos/${eventoId}`, {
        method: "DELETE",
        headers
    });

    if (response.ok) {
        return {
            status: 201,
            headers: response.headers
        }
    } else {
        return {
            status: 500,
            body: JSON.stringify({
                message: "No se ha podido eliminar el evento."
            })
        }
    }
}