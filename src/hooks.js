import "dotenv/config";

export const handle = async ({ event, resolve }) => {
    console.log(process.env);

    return await resolve(event);
}