import "dotenv/config";

export const handle = async ({ event, resolve }) => {
    if (!event.locals.apiURI) {
        event.locals.apiURI = process.env.VITE_MUEVETE_API_URI;
    }

    const response = await resolve(event);

    return response;
}

export const getSession = (event) => {
    return event.locals.apiURI
        ? { apiURI: event.locals.apiURI }
        : {}
}