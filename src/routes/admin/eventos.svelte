<script context="module">
export const load = async ({ fetch, session }) => {
    const redirectToLogin = {
        status: 302,
        redirect: "/usuarios/login"
    };

    if (!session.user) {
        return redirectToLogin;
    } else if (session.user.rol != "admin") {
        return redirectToLogin;
    }

    const response = await fetch(`${session.apiURI}/api/eventos`);

    if (response.ok) {
        const eventos = await response.json();
        return {
            props: {
                eventos
            }
        }
    }
    return {};
}
</script>

<script>
import { session } from "$app/stores";
import { filtraEventos } from "$lib/utils.js";
import EventoList from "$lib/EventoList.svelte";

export let eventos;

let filtroModalidad;

eventos = eventos.sort((a, b) => new Date(a.fechaInicio) - new Date(b.fechaInicio));

$ : data = eventos;

const filtrar = () => {
    data = filtraEventos(eventos, filtroModalidad);
}
</script>

<svelte:head>
    <title>Administración - Eventos - Muévete APP</title>
</svelte:head>

<div class="container">
    <div class="row">
        <div class="col-12">
            <h1>Hola, administrador <small class="text-muted">{$session.user.username}</small></h1>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex flex-row justify-content-between card-title">
                        <h3>Eventos deportivos</h3>
                        <div>
                            <a class="btn btn-primary d-none d-sm-inline-block" href="/eventos/form">+ Nuevo evento</a>
                            <a class="btn btn-primary d-inline-block d-sm-none" href="/eventos/form">+ Nuevo</a>
                        </div>
                    </div>
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
                    {#if data} 
                        {#each data as evento}
                        <EventoList {evento} />
                        {/each}
                    {:else}
                        <p>No existen eventos deportivos solidarios.</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>