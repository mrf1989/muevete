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

data.sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));
</script>

<div>
    <h1 class="text-center">Eventos</h1>
    <div class="container">
        {#if $session.user.rol == "admin"}
        <div class="d-flex flex-row-reverse mb-2">
            <a class="btn btn-primary d-none d-sm-inline-block" href="/eventos/form">+ Nuevo evento</a>
            <a class="btn btn-primary d-inline-block d-sm-none" href="/eventos/form">+ Nuevo</a>
        </div>
        {/if}
        <div class="row mt-3">
        {#each data as evento }
            <EventoCard {evento} />
        {/each}
        </div>
    </div>        
</div>
