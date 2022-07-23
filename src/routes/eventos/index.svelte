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
import { filtraEventos } from "$lib/utils.js";
import { session } from "$app/stores";

export let data;

let filtroModalidad;

data = data
    .filter(evento => new Date(evento.fechaFin) >= Date.now())
    .sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));

$ : eventos = data;

const filtrar = () => {
    eventos = filtraEventos(data, filtroModalidad);
}
</script>

<svelte:head>
    <title>Eventos - Muévete APP</title>
</svelte:head>

<div>
    <h1 class="text-center">Eventos deportivos</h1>
    <div class="container">
        {#if $session.user.rol == "admin"}
        <div class="d-flex flex-row-reverse mb-2">
            <a class="btn btn-primary d-none d-sm-inline-block" href="/eventos/form">+ Nuevo evento</a>
            <a class="btn btn-primary d-inline-block d-sm-none" href="/eventos/form">+ Nuevo</a>
        </div>
        {/if}
        <div class="row">
            <div class="col-12">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="filtroModalidadDeportiva">Modalidad</label>
                    </div>
                    <select bind:value={filtroModalidad} class="custom-select" id="filtroModalidadDeportiva">
                        <option selected>Todas</option>
                        <option value="caminata">Caminata</option>
                        <option value="carrera">Carrera</option>
                        <option value="bicicleta">Bicicleta</option>
                        <option value="natacion">Natación</option>
                    </select>
                    <div class="input-group-append">
                        <button on:click={filtrar} class="btn btn-outline-secondary" type="button">Aplicar filtro</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
        {#each eventos as evento }
            <EventoCard {evento} />
        {/each}
        </div>
    </div>
</div>
