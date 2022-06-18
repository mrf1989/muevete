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

    const response = await fetch(`${session.apiURI}/api/articulos`);

    if (response.ok) {
        const articulos = await response.json();
        articulos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        return {
            props: {
                articulos
            }
        }
    }
    return {};
}
</script>

<script>
import { session } from "$app/stores";
import ArticuloList from "$lib/ArticuloList.svelte";

export let articulos;
</script>

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
                        <h3>Artículos</h3>
                        <a class="btn btn-primary" href="/articulos/form">Nuevo artículo</a>
                    </div>
                    {#if articulos}
                        {#each articulos as articulo}
                        <ArticuloList {articulo} />
                        {/each}
                    {:else}
                        <p>No existen artículos.</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>