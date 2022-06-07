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
    <main>
        {articulo.cuerpo}
    </main>
</article>