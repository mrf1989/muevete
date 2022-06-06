export const get = async ({ request }) => {
    const headers = new Headers(request.headers);
    headers.set("referer", `${request.headers.referer}/api/articulos`);
    const response = await fetch(`${process.env.VITE_MUEVETE_API_URI}/api/articulos`, {
        headers
    });
        
    return response;
}