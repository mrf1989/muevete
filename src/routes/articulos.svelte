<script context="module">
    export const load = async ({ fetch }) => {
        const response = await fetch(`${import.meta.env.VITE_MUEVETE_API_URI}/api/articulos`);
        
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
            body: {
                message: "Not Found"
            }
        }
    }
}
</script>

<script>
import ArticuloCard from "$lib/ArticuloCard.svelte";

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
