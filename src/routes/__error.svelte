<script context="module">
export const load = ({ error, status }) => {
    return {
        props: {
            error,
            status
        }
    }
}
</script>

<script>
export let error;
export let status;
</script>

<div class="col-12 text-center">
    <h1>Ups! Lo sentimos, pero algo sucede...</h1>
    {#if status == 404}
        <p class="lead">{error.message}</p>
    {/if}
    <p>Sentimos las molestias, inténtelo de nuevo o vuelva más tarde.</p>
    <p>Si sigue experimentando problemas, contacte con el administrador del sitio.</p>
    <a href="/" class="btn btn-primary">Volver a la principal</a>
</div>
