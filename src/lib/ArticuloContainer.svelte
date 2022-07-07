<script>
import { session } from "$app/stores";
import { marked } from "marked";

export let articulo;
export let autor;

const colArticulo = articulo.enlaceImagen ? 7 : 12;

$: markup = marked(articulo.cuerpo);
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
            {@html markup}    
        </div>
    </main>
    {#if articulo.referencia}
    <footer class="row">
        <div class="col">
            <p><a target="_blank" href="{articulo.referencia}">Referencia web</a></p>
        </div>
    </footer>
    {/if}
</article>