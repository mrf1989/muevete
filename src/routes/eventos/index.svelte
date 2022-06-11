<script context="module">
export const load = async ({ fetch, session }) => {
    const response = await fetch(`${session.apiURI}/api/eventos`);
    
    if (response.ok) {
        const data = await response.json();
        return {
            props: {
                data
            }
        }
    } else {
        return {
            status: 404,
            error: new Error("No existen eventos o es imposible acceder a ellos")
        }
    }
}
</script>

<script>
import EventoCard from "$lib/EventoCard.svelte";
import { session } from "$app/stores";

export let data;
</script>

<div>
    <h1 class="text-center">Eventos</h1>
    <div class="container">
        {#if $session.user.rol == "admin"}
        <div class="d-flex flex-row-reverse mb-2">
            <a class="btn btn-primary" href="/eventos/form">Nuevo evento</a>
        </div>
        {/if}
        <div class="row">
        {#each data as evento }
            <EventoCard {evento} />
        {/each}
        </div>
    </div>        
</div>
