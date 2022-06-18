import { getHeaders } from "$lib/utils";

export const get = async ({ request, locals }) => {
    const headers = getHeaders(request);
    const apiURI = locals.apiURI;

    const response = await fetch(`${apiURI}/api/admin/usuarios`, {
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
                message: "No se han encontrado usuarios en el sistema."
            })
        }
    }
}