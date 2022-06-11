<script context="module">
import EventoForm from "$lib/EventoForm.svelte";

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
    const response = await fetch(`${API_URI}/api/eventos/${params._id}`);

    if (response.ok) {
        const evento = await response.json();

        return {
            props: {
                evento,
            }
        }
    } else {
        return {
            status: 404,
            error: new Error("El evento no existe o es imposible acceder a él.")
        }
    }
}
</script>

<script>
import { session } from "$app/stores";
import { goto } from "$app/navigation";

export let evento;

let error;

const handleDatosEvento = async (event) => {
    const data = event.detail;

    const eventoEditado = {
        _id: evento._id,
        nombre: data.nombre,
        descripcion: data.descripcion,
        objetivoKm: data.objetivoKm,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        modalidad: data.modalidad
    }
    
    const response = await fetch("/api/eventos/editar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(eventoEditado)
    });

    if (response.ok) {
        goto(`/eventos/${evento._id}`);
    } else {
        error = await response.json();
    }
}
</script>

<div class="col-lg-8 offset-lg-2">
    <div class="text-center">
        <h1>Editar artículo</h1>
    </div>
    {#if evento && $session.user.rol == "admin"}
    <EventoForm on:post={handleDatosEvento} {evento} />
    {/if}
    {#if error}
    <div class="alert alert-warning" role="alert">
        {error.message}
    </div>
    {/if}
</div>