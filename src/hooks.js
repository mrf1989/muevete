import "dotenv/config";

export const getSession = (event) => {
    return { apiURI: process.env.VITE_MUEVETE_API_URI };
}