import "dotenv/config";
import { getUserInformation } from "$lib/utils";

export const handle = async ({ event, resolve }) => {
    if (!event.locals.apiURI) {
        event.locals.apiURI = process.env.VITE_MUEVETE_API_URI;
        event.locals.user = await getUserInformation(
            event.request.headers.get("cookie"),
            event.locals.apiURI
        );
    }

    return  await resolve(event);
}

export const getSession = ({ locals }) => {
    return {
        apiURI: locals.apiURI && locals.apiURI,
        user: locals.user && {
            id: locals.user._id,
            username: locals.user.username,
            rol: locals.user.rol
        }
    }
}