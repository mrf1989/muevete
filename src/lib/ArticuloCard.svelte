<script>
import { session } from "$app/stores";

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

<div class="col-lg-4">
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">{articulo.titulo}</h5>
            <p class="card-text">{procesarSubtitulo(articulo.subtitulo)}</p>
            <div class="row align-items-center">
                <div class="col">
                    <a href={`/articulos/${articulo._id}`} class="btn btn-primary">Leer</a>
                </div>
                {#if $session.user.rol == "admin"}
                <div class="col text-right">
                    <a href={`/articulos/form/${articulo._id}`}>Editar</a>
                </div>
                {/if}
            </div>
        </div>
    </div>
</div>