<script>
export let articulo;
export let autor;
</script>

<article>
    <header>
        <h1>{articulo.titulo}</h1>
        <p class="lead">{articulo.subtitulo}</p>
        <small>{autor.nombre} {autor.apellidos} - {articulo.fecha}</small>
    </header>
    <main class="row">
        {#if articulo.enlaceImagen}
        <div class="col-lg-5 order-lg-2">
            <img class="img-fluid" src="{articulo.enlaceImagen}" alt="Imagen que acompaña al artículo {articulo.titulo}">
        </div>
        {/if}
        <div class="col-lg-7 order-lg-1">
            {articulo.cuerpo}    
        </div>
    </main>
    {#if articulo.referencia}
    <footer>
        <p>Referencia web: <a target="_blank" href="{articulo.referencia}">{articulo.referencia}</a></p>
    </footer>
    {/if}
</article>