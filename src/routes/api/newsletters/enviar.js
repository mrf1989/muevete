import { getNewsletter } from "$lib/utils";
import { api } from "./api";

export const post = async ({ request }) => {
    const body = await request.json();
    const usuarios = body.usuarios;
    const newsletter = body.newsletter;
    
    const headers = new Headers({
        "Authorization": `Bearer ${process.env.VITE_SENDGRID_API_KEY}`,
        "Content-Type": "application/json"
    });

    const data = {
        personalizations: usuarios.map(usuario => {
            return {
                to: [{ email: usuario.email }],
                subject: `¡Hola, ${usuario.nombre}! Aquí tienes nuestra última newsletter`
            }
        }),
        content: [{
            type: "text/html",
            value: getNewsletter(newsletter)
        }],
        from: {
            email: `${process.env.VITE_SENDGRID_EMAIL}`,
            name: "Muévete APP"
        },
        reply_to: {
            email: `${process.env.VITE_SENDGRID_EMAIL}`,
            name: "Muévete APP"
        }
    }

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data)
    });

    if (response.status == 202) {
        return {
            body: {
                envioNewsletter: true,
                message: "Newsletter enviada con éxito"
            }
        }
    } else {
        return {
            body: {
                envioNewsletter: false,
                message: "La newsletter no ha podido ser enviada. Por favor, contacte con el soporte técnico del sistema"
            }
        }
    }
}

export const put = async ({ request, locals }) => {
    return await api({
        request,
        locals,
        method: "PUT",
        error: "No se ha podido registrar el envío de la newsletter."
    });
}