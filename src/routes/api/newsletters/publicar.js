import { api } from "./api";

export const post = async ({ request, locals }) => {
    return await api({
        request,
        locals,
        method: "POST",
        error: "No se ha podido publicar la newsletter con estos datos."
    });
}