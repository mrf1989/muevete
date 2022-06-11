<script context="module">
export const load = async ({ fetch, session }) => {
    const response = await fetch(`${session.apiURI}/api/articulos`);
    
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
            error: new Error("No existen artículos o es imposible acceder a ellos")
        }
    }
}
</script>

<script>
import ArticuloCard from "$lib/ArticuloCard.svelte";
import { session } from "$app/stores";

export let data;
</script>

<div>
    <h1 class="text-center">Artículos</h1>
    <div class="container">
        {#if $session.user.rol == "admin"}
        <div class="d-flex flex-row-reverse mb-2">
            <a class="btn btn-primary" href="/articulos/form">Nuevo artículo</a>
        </div>
        {/if}
        <div class="row">
        {#each data as articulo }
            <ArticuloCard articulo={articulo}/>
        {/each}
        </div>
    </div>        
</div>
