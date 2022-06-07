<script context="module">
import ArticuloCard from "$lib/ArticuloCard.svelte";

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
export let data;
</script>

<div class="col-12">
    <h1 class="text-center">Artículos</h1>
    <div class="container">
        <div class="row">
        {#each data as articulo}
            <ArticuloCard articulo={articulo}/>
        {/each}
        </div>        
    </div>
</div>
