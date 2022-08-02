<script>
import { session } from "$app/stores";

export let evento;

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
            {#if new Date(evento.fechaInicio) > Date.now()}
            <h6 class="text-info">Próximamente</h6>
            {/if}
            <h5 class="card-title">{evento.nombre}</h5>
            <p class="card-text">{procesarSubtitulo(evento.descripcion)}</p>
            <div class="row">
                <p class="col"><strong>Objetivo km:</strong> {evento.objetivoKm}</p>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <strong>Fecha de inicio:</strong> {new Date(evento.fechaInicio).toLocaleDateString()}
                </div>
                <div class="col-sm-6">
                    <strong>Fecha de fin:</strong> {new Date(evento.fechaFin).toLocaleDateString()}
                </div>
            </div>
            <div class="row mt-3 align-items-center">
                <div class="col">
                    <a href={`/eventos/${evento._id}`} class="btn btn-primary">Más info</a>
                </div>
                {#if $session.user.rol == "admin"}
                <div class="col text-right">
                    <a href={`/eventos/form/${evento._id}`}>Editar</a>
                </div>
                {/if}
            </div>
        </div>
    </div>
</div>