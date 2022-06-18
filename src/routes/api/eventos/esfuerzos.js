import { getHeaders } from "$lib/utils";

export const get = async ({ request, locals, url }) => {
    const headers = getHeaders(request);
    const eventoId = url.searchParams.get("evento");
    const apiURI = locals.apiURI;

    const response = await fetch(`${apiURI}/api/esfuerzos/evento/${eventoId}`, {
        headers,
    });
    
    if (response.ok) {
        return {
            status: 200,
            headers: response.headers,
            body: await response.json()
        }
    } else {
        return {
            status: 404,
            body: JSON.stringify({
                message: "No se han esfuerzos para este evento."
            })
        }
    }
}