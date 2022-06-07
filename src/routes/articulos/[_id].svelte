<script context="module">
import ArticuloContainer from "$lib/ArticuloContainer.svelte";

export const load = async ({ params, fetch, session }) => {
    const API_URI = `${session.apiURI}`;
    const articuloResponse = await fetch(`${API_URI}/api/articulos/${params._id}`);

    if (articuloResponse.ok) {
        const articulo = await articuloResponse.json();
        const autorResponse = await fetch(`${API_URI}/api/usuarios/${articulo.usuario_id}`);

        if (autorResponse.ok) {
            const autor = await autorResponse.json();
            return {
                props: {
                    articulo,
                    autor
                }
            }
        }
    } else {
        return {
            status: 404,
            error: new Error("El artículo no existe o es imposible acceder a él.")
        }
    }
}
</script>

<script>
export let articulo;
export let autor;
</script>

<div class="col-12">
    {#if articulo && autor}
    <ArticuloContainer articulo={articulo} autor={autor}/>
    {/if}
</div>