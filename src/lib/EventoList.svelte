<script>
export let evento;
</script>

<div class="card mb-2">
    <div class="card-body">
        <h5 class="card-title">{evento.nombre} <small class="card-subtitle text-muted">{evento.objetivoKm} km</small></h5>
        <div class="card-text">
            <div class="d-flex flex-row">
                Dorsal: {evento.dorsal.num.toString().padStart(4, 0)}
            </div>
            <div class="d-flex flex-row justify-content-between">
                <div>
                    Fecha de finalización del evento: {new Date(evento.fechaFin).toLocaleDateString()}
                </div>
                <div>
                    <a href={`/eventos/${evento._id}`} class="btn btn-primary">Ir a evento</a>
                </div>
            </div>
        </div>
    </div>
</div>