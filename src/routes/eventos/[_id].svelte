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
export let evento;
</script>

<div class="col-12">
    {#if evento}
    <EventoContainer {evento} />
    {/if}
</div>