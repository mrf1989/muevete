<script context="module">
import EventoContainer from "$lib/EventoContainer.svelte";

export const load = async ({ params, fetch, session }) => {
    const API_URI = `${session.apiURI}`;
    const response = await fetch(`${API_URI}/api/eventos/${params._id}`);

    if (response.ok) {
        const evento = await response.json();
        
        return {
            props: {
                evento
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

export let evento;

const getDorsales = async (session) => {
    if (session.user) {
        const response = await fetch("/api/eventos/dorsales");
        if (response.ok) {
            const dorsales = await response.json();
            return dorsales.find(dorsal => dorsal.evento_id == evento._id);
        }
    }
}

const getEsfuerzos = async (evento) => {
    const response = await fetch(`/api/eventos/esfuerzos?evento=${evento._id}`);
    if (response.ok) {
        return await response.json();
    }
}

const resolverPromises = async () => {
    let dorsal = await getDorsales($session);
    let esfuerzos = await getEsfuerzos(evento);

    return {
        dorsal,
        esfuerzos
    }
}

const resuelvePromises = resolverPromises();
</script>

<svelte:head>
    <title>Eventos - Muévete APP</title>
</svelte:head>

<div class="col-12">
    {#if evento}
        {#await resuelvePromises then res}
        <EventoContainer {evento} dorsal={res.dorsal} esfuerzos={res.esfuerzos} />            
        {/await}
    {/if}
</div>