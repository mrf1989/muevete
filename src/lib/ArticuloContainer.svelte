<script>
import { session } from "$app/stores";

export let articulo;
export let autor;

const colArticulo = articulo.enlaceImagen ? 7 : 12;
</script>

<article>
    <header>
        <h4 class="text-muted text-uppercase mt-2">{articulo.categoria}</h4>
        <h1>{articulo.titulo}</h1>
        <p class="lead">{articulo.subtitulo}</p>
        <small>
            {autor.nombre} {autor.apellidos} - {articulo.fecha}
            {#if $session.user.rol == "admin"}
             - <a href="/articulos/form/{articulo._id}">Editar artículo</a>
            {/if}
        </small>
    </header>
    <main class="row">
        {#if articulo.enlaceImagen}
        <div class="col-lg-5 order-lg-2">
            <img class="img-fluid" src="{articulo.enlaceImagen}" alt="Imagen que acompaña al artículo {articulo.titulo}">
        </div>
        {/if}
        <div class="col-lg-{colArticulo} order-lg-1">
            {articulo.cuerpo}    
        </div>
    </main>
    {#if articulo.referencia}
    <footer>
        <p>Referencia web: <a target="_blank" href="{articulo.referencia}">{articulo.referencia}</a></p>
    </footer>
    {/if}
</article>