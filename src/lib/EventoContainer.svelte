<script>
import DorsalForm from "$lib/DorsalForm.svelte";
import { session } from "$app/stores";
import { getDate } from "$lib/utils";
import { goto } from "$app/navigation";

export let evento;
export let dorsal;

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
            {#if $session.user}
                {#if !dorsal}
                <button class="btn btn-primary" data-toggle="modal" data-target="#dorsalForm">Obtener dorsal</button>
                    {#if error}
                    <span class="text-danger">{error.message}</span>
                    {/if}
                {:else}
                <p><strong>Número de dorsal {dorsal.num.toString().padStart(4, 0)}</strong></p>
                {/if}
            {:else}
            <a href="/usuarios/login" class="btn btn-primary">Obtener dorsal</a>
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

<DorsalForm on:post={handleDatosDorsal} />