<script>
import { session } from "$app/stores";
import { getDate } from "$lib/utils";

export let evento;
export let dorsal;

const literalModalidad = evento.modalidad.length > 1 ?
    "Modalidades deportivas permitidas" :
    "Modalidad deportiva permitida";
</script>

<article>
    <header>
        <h4 class="text-muted text-uppercase mt-2">Evento deportivo solidario</h4>
        <h1>{evento.nombre}</h1>
        <p class="lead">{evento.descripcion}</p>
        <small>
            {#if $session.user.rol == "admin"}
            <a href="/eventos/form/{evento._id}">Editar evento</a>
            {/if}
        </small>
        <div class="d-flex flex-row-reverse">
            {#if !dorsal}
            <a href="#" class="btn btn-primary">Obtener dorsal</a>
            {:else}
            <p><strong>Número de dorsal {dorsal.num.toString().padStart(4, 0)}</strong></p>
            {/if}
        </div>
    </header>
    <main class="row">
        <div class="col-12 text-center">
            <p class="display-1">{evento.objetivoKm} km</p>
        </div>
        <div class="col-12">
            <p><strong>{literalModalidad}</strong></p>
            <ul>
                {#each evento.modalidad as mod}
                <li class="text-capitalize">{mod}</li>
                {/each}
            </ul>
        </div>
        <div class="col-sm-6">
            <p><strong>Fecha de inicio</strong> {getDate(new Date(evento.fechaInicio))}</p>
        </div>
        <div class="col-sm-6">
            <p><strong>Fecha de finalización</strong> {getDate(new Date(evento.fechaFin))}</p> 
        </div>
    </main>
</article>