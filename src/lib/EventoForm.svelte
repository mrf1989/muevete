<script>
import { createEventDispatcher } from "svelte";
import { getDate } from "$lib/utils";

export let evento;

let nombre, descripcion, objetivoKm, fechaInicio, fechaFin, modalidad = [];

if (evento) {
    nombre = evento.nombre;
    descripcion = evento.descripcion;
    objetivoKm = evento.objetivoKm;
    fechaInicio = getDate(new Date(evento.fechaInicio));
    fechaFin = getDate(new Date(evento.fechaFin));
    modalidad = evento.modalidad;
}

const dispatch = createEventDispatcher();

const getDatosEvento = () => {
    dispatch("post", {
        nombre, descripcion, objetivoKm, fechaInicio, fechaFin, modalidad
    });
}

const validarDatos = () => {
    if (nombre && descripcion && objetivoKm &&
        fechaInicio && fechaFin && (modalidad.length > 0)) {
            if (validarFechas(fechaInicio, fechaFin)) {
                getDatosEvento();
            } else {
                dispatch("post", { error: "Las fechas introducidas no son válidas. Además, la duración mínima del evento debe ser de 7 días." });
            }
    } else {
        dispatch("post", { error: "Debe completar todos los campos obligatorios marcados con un asterisco (*)" });
    }
}

const validarFechas = (inicio, fin) => {
    const fechaActual = new Date(getDate(new Date(Date.now())));
    const fechaInicioValida = new Date(inicio) >= fechaActual;
    const duracionMinima = ((new Date(fin) - new Date(inicio)) / 86400000) >= 7;
    return fechaInicioValida && duracionMinima;
}
</script>

<form>
    <div class="form-group">
        <label for="nombre">Nombre*</label>
        <input bind:value={nombre} type="text" class="form-control" id="nombre">
    </div>
    <div class="form-group">
        <label for="descripcion">Descripción*</label>
        <textarea bind:value={descripcion} rows="5" class="form-control" id="descripcion"></textarea>
    </div>
    <div class="form-row">
        <div class="form-group col-lg-6">
            <label for="objetivoKm">Objetivo kilométrico*</label>
            <input bind:value={objetivoKm} type="number" class="form-control" id="objetivoKm">
        </div>
        <div class="form-group col-lg-6">
            <label for="modalidad">Modalidad deportiva*</label>
            <select bind:value={modalidad} multiple class="form-control" id="modalidad">
                <option value="caminata">Caminata</option>
                <option value="carrera">Carrera</option>
                <option value="bicicleta">Bicicleta</option>
                <option value="natacion">Natación</option>
            </select>
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-lg-6">
            <label for="fechaInicio">Fecha de inicio*</label>
            <input bind:value={fechaInicio} type="date" class="form-control" id="fechaInicio">
        </div>
        <div class="form-group col-lg-6">
            <label for="fechaFin">Fecha de finalización*</label>
            <input bind:value={fechaFin} type="date" class="form-control" id="fechaFin">
        </div>
    </div>
    <button on:click|preventDefault={validarDatos} class="btn btn-primary btn-block">
    {#if !evento}
        Publicar
    {:else}
        Actualizar
    {/if} evento
    </button>
</form>