<script context="module">
import ArticuloForm from "$lib/ArticuloForm.svelte";

export const load = async ({ params, fetch, session }) => {
    const redirectToLogin = {
        status: 302,
        redirect: "/usuarios/login"
    };

    if (!session.user) {
        return redirectToLogin;
    } else if (session.user.rol != "admin") {
        return redirectToLogin;
    }
    
    const API_URI = `${session.apiURI}`;
    const articuloResponse = await fetch(`${API_URI}/api/articulos/${params._id}`);

    if (articuloResponse.ok) {
        const articulo = await articuloResponse.json();

        return {
            props: {
                articulo,
            }
        }
    } else {
        return {
            status: 404,
            error: new Error("El artículo no existe o es imposible acceder a él.")
        }
    }
}
</script>

<script>
import { session } from "$app/stores";
import { goto } from "$app/navigation";

export let articulo;

let error;

const handleDatosArticulo = async (event) => {
    const data = event.detail;
    const articuloEditado = {
        _id: articulo._id,
        titulo: data.titulo,
        subtitulo: data.subtitulo,
        cuerpo: data.cuerpo,
        categoria: data.categoria,
        referencia: data.referencia,
        enlaceImagen: data.enlaceImagen,
    }
    
    const response = await fetch("/api/articulos/editar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(articuloEditado)
    });

    if (response.ok) {
        goto(`/articulos/${articulo._id}`);
    } else {
        error = await response.json();
    }
}
</script>

<div class="col-lg-8 offset-lg-2">
    <div class="text-center">
        <h1>Editar artículo</h1>
    </div>
    {#if articulo && $session.user.rol == "admin"}
    <ArticuloForm on:post={handleDatosArticulo} articulo={articulo} />
    {/if}
</div>