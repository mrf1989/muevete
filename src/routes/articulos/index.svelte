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

function dividir (data, n) {
    const principalArray = data;
    let res = [];
    while (data.length > 0) {
        const row = principalArray.splice(0, n);
        res.push(row);
    }

    return res;
}
</script>

<div>
    <h1 class="text-center">Artículos</h1>
    <div class="container">
        {#each dividir(data, 3) as rows }
        <div class="row">
            {#each rows as articulo}
            <ArticuloCard articulo={articulo}/> 
            {/each}
        </div>
        {/each}
    </div>        
</div>
