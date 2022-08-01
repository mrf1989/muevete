<script context="module">
export const load = async ({ session }) => {
    const redirectToLogin = {
        status: 302,
        redirect: "/usuarios/login"
    };

    if (!session.user) {
        return redirectToLogin;
    } else if (session.user.rol != "admin") {
        return redirectToLogin;
    }

    const responseArticulos = await fetch(`${session.apiURI}/api/articulos`);
    const responseEventos = await fetch(`${session.apiURI}/api/eventos`);

    if (responseArticulos.ok && responseEventos) {
        const articulos = await responseArticulos.json();
        const eventos = await responseEventos.json();
        return {
            props: {
                articulos,
                eventos
            }
        }
    }

    return {};
}
</script>

<script>
import { goto } from "$app/navigation";
import NewsletterForm from "$lib/NewsletterForm.svelte";

export let articulos, eventos;

$ : error = false;

const handleDatosNewsletter = async (event) => {
    const data = event.detail;

    if (data.error) {
        error = data.error;
    } else {
        const nuevaNewsletter = {
            titulo: data.titulo,
            cuerpo: data.cuerpo,
            enlaces: data.enlaces
        }
        
        const response = await fetch("/api/newsletters/publicar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevaNewsletter)
        });
    
        if (response.ok) {
            goto("/admin/newsletters");
        } else {
            error = await response.json();
        }
    }
}
</script>

<svelte:head>
    <title>Eventos - Muévete APP</title>
</svelte:head>

<div class="col-lg-8 offset-lg-2">
    <div class="text-center">
        <h1>Nueva newsletter</h1>
    </div>
    <NewsletterForm on:post={handleDatosNewsletter} {articulos} {eventos} />
    {#if error}
    <div class="alert alert-warning mt-3" role="alert">
        {error}
    </div>
    {/if}
</div>