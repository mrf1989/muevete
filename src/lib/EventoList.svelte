<script>
import { session } from "$app/stores";
export let evento;

const borrarEvento = async () => {
    const response = await fetch("/api/eventos/borrar", {
        method: "DELETE",
        body: JSON.stringify({
            eventoId: evento._id
        })
    });

    if (response.ok) {
        document.location = "/admin/eventos";
    }
}
</script>

<div class="card mb-2">
    <div class="card-body">
        <h5 class="card-title"><a href={`/eventos/${evento._id}`}>{evento.nombre}</a> <small class="card-subtitle text-muted">{evento.objetivoKm} km</small></h5>
        <div class="card-text">
            {#if evento.dorsal}
            <div class="d-flex flex-row">
                Dorsal: {evento.dorsal.num.toString().padStart(4, 0)}
            </div>
            {/if}
            <div class="d-flex flex-row justify-content-between">
                <div>
                    Fecha de finalización del evento: {new Date(evento.fechaFin).toLocaleDateString()}
                </div>
                <div class="btn-group align-items-center" role="group">
                    {#if $session.user.rol == "admin"}
                    <a href={`/eventos/form/${evento._id}`} class="btn btn-primary">Editar</a>
                    <button data-toggle="modal" data-target="#borrar{evento._id}" class="btn btn-secondary">Eliminar</button>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="borrar{evento._id}" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">¿Seguro que quieres eliminar el evento?</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Se va a eliminar el evento "{evento.nombre}"</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button on:click={borrarEvento} type="button" class="btn btn-danger" data-dismiss="modal">Sí, eliminar</button>
            </div>
        </div>
    </div>
</div>