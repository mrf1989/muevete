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
import EventoList from "$lib/EventoList.svelte";

export let eventos;
</script>

<svelte:head>
    <title>Administración - Muévete APP</title>
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
                    {#if eventos} 
                        {#each eventos as evento}
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