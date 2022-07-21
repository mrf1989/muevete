<script>
import DorsalForm from "$lib/DorsalForm.svelte";
import EsfuerzoForm from "$lib/EsfuerzoForm.svelte";
import EventoProgressBar from "$lib/EventoProgressBar.svelte";
import DorsalContainer from "$lib/DorsalContainer.svelte";
import { session } from "$app/stores";
import { getDate, getKmCompletados } from "$lib/utils";
import { goto } from "$app/navigation";

export let evento;
export let dorsal;
export let esfuerzos;

$: kmCompletados = getKmCompletados(esfuerzos);
$: listaEsfuerzos = esfuerzos;

let error;

const literalModalidad = evento.modalidad.length > 1 ?
    "Modalidades deportivas permitidas" :
    "Modalidad deportiva permitida";

const handleDatosDorsal = async (event) => {
    const data = event.detail;

    const nuevoDorsal = {
        lema: data.lema,
        usuario_id: $session.user.id,
        evento_id: evento._id
    }

    const response = await fetch("/api/dorsal/crear", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoDorsal)
    });

    if (response.ok) {
        goto("/eventos");
    } else {
        error = await response.json();
    }
}

const handleDatosEsfuerzo = async (event) => {
    const data = event.detail;

    const nuevoEsfuerzo = {
        comentario: data.comentario,
        numKm: data.numKm,
        modalidad: data.modalidad,
        dorsal_id: data.dorsal_id,
        usuario_id: $session.user.id,
        evento_id: evento._id
    }

    const response = await fetch("/api/esfuerzos/crear", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoEsfuerzo)
    });

    if (response.ok) {
        kmCompletados = kmCompletados + nuevoEsfuerzo.numKm;
        listaEsfuerzos = [...listaEsfuerzos, nuevoEsfuerzo];
    } else {
        error = await response.json();
    }
}
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
        {#if new Date(evento.fechaInicio) <= Date.now() && new Date(evento.fechaFin) >= Date.now()}
        <div class="d-flex flex-row-reverse mb-2">
            {#if $session.user}
                {#if !dorsal}
                <button class="btn btn-primary" data-toggle="modal" data-target="#dorsalForm">Obtener dorsal</button>
                    {#if error}
                    <span class="text-danger">{error.message}</span>
                    {/if}
                {:else}
                <div class="btn-group align-items-center" role="group">
                    <button class="btn btn-primary" data-toggle="modal" data-target="#esfuerzoForm">
                        Añadir km con dorsal {dorsal.num.toString().padStart(4, 0)}
                    </button>
                    <button class="btn btn-secondary" data-toggle="modal" data-target="#pdfModal">Descargar dorsal</button>
                </div>
                {/if}
            {:else}
            <a href="/usuarios/login" class="btn btn-primary">Obtener dorsal</a>
            {/if}
        </div>
        {/if}
    </header>
    <main class="row">
        <div class="col-12 text-center">
            <p class="display-2">{kmCompletados}/<small class="text-muted">{evento.objetivoKm} km</small></p>
        </div>
        <div class="col-12">
            <EventoProgressBar {kmCompletados} objetivoKm={evento.objetivoKm} />
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
    {#if esfuerzos.length > 0}
    <footer>
        <h2>Esfuerzos realizados</h2>
        {#each listaEsfuerzos as esfuerzo}
        <div class="card mb-2">
            <div class="card-body">
                <strong>{esfuerzo.numKm} km</strong> ({esfuerzo.modalidad}) {esfuerzo.comentario}
            </div>
        </div>
        {/each}
    </footer>
    {/if}
</article>

<DorsalForm on:post={handleDatosDorsal} />
{#if dorsal}
<EsfuerzoForm on:post={handleDatosEsfuerzo} {dorsal} />
<DorsalContainer {dorsal} {evento} />
{/if}