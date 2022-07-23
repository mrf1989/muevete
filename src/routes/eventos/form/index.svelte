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
import { goto } from "$app/navigation";;
import EventoForm from "$lib/EventoForm.svelte";

$ : error = false;

const handleDatosEvento = async (event) => {
    const data = event.detail;

    if (data.error) {
        error = data.error;
    } else {
        const nuevoEvento = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            objetivoKm: data.objetivoKm,
            fechaInicio: data.fechaInicio,
            fechaFin: data.fechaFin,
            modalidad: data.modalidad
        }
        
        const response = await fetch("/api/eventos/publicar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoEvento)
        });
    
        if (response.ok) {
            goto("/eventos");
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
        <h1>Nuevo evento</h1>
    </div>
    <EventoForm on:post={handleDatosEvento} />
    {#if error}
    <div class="alert alert-warning mt-3" role="alert">
        {error}
    </div>
    {/if}
</div>