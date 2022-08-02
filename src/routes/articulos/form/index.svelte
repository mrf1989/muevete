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

    return {};
}
</script>

<script>
import { goto } from "$app/navigation";
import { session } from "$app/stores";
import { getDate } from "$lib/utils";
import ArticuloForm from "$lib/ArticuloForm.svelte";

$ : error = false;

const handleDatosArticulo = async (event) => {
    const data = event.detail;

    if (data.error) {
        error = data.error;
    } else {
        const nuevoArticulo = {
            titulo: data.titulo,
            subtitulo: data.subtitulo,
            fecha: getDate(new Date()),
            cuerpo: data.cuerpo,
            categoria: data.categoria,
            referencia: data.referencia,
            enlaceImagen: data.enlaceImagen,
            usuario_id: $session.user.id
        }
        
        const response = await fetch("/api/articulos/publicar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoArticulo)
        });
    
        if (response.ok) {
            goto("/articulos");
        } else {
            error = await response.json();
        }
    }
}
</script>

<svelte:head>
    <title>Artículos - Muévete APP</title>
</svelte:head>

<div class="col-lg-8 offset-lg-2">
    <div class="text-center">
        <h1>Nuevo artículo</h1>
    </div>
    <ArticuloForm on:post={handleDatosArticulo} />
    {#if error}
    <div class="alert alert-warning mt-3" role="alert">
        {error}
    </div>
    {/if}
</div>