<script>
export let articulo;

const procesarSubtitulo = (str) => {
    let subtitulo = str;
    const dimension = 190;
    const longitud = str.length;
    if (longitud > dimension) {
        subtitulo = str.substring(0, dimension + 1) + "...";
    }
    return subtitulo;
}
</script>

<div class="col-md-4">
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{articulo.titulo}</h5>
            <p class="card-text">{procesarSubtitulo(articulo.subtitulo)}</p>
            <a href={`/articulos/${articulo._id}`} class="btn btn-primary">Leer</a>
        </div>
    </div>    
</div>