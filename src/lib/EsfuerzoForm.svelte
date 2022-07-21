<script>
import { createEventDispatcher } from "svelte";

export let dorsal;

let numKm, comentario, modalidad, dorsal_id = dorsal._id;

const dispatch = createEventDispatcher();

const getDatosEsfuerzo = () => {
    dispatch("post", { numKm, comentario, modalidad, dorsal_id });
}

const validarDatos = () => {
    if (numKm && modalidad && dorsal_id) {
        getDatosEsfuerzo();
    } else {
        dispatch("post", { error: "Debe completar todos los campos obligatorios marcados con un asterisco (*)" });
    }
}
</script>

<div class="modal fade" id="esfuerzoForm" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Añadir esfuerzo realizado</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="comentario">Comentario</label>
                        <textarea bind:value={comentario} class="form-control" rows="3" id="lema"></textarea>
                    </div>
                    <div class="form-row">
                        <div class="col-md-6">
                            <label for="numKm">Kilómetros*</label>
                            <input bind:value={numKm} type="number" name="numKm" id="numKm" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label for="modalidad">Modalidad*</label>
                            <select bind:value={modalidad} class="form-control" name="modalidad" id="modalidad">
                                <option disabled>Selecciona</option>
                                <option value="caminata">Caminata</option>
                                <option value="carrera">Carrera</option>
                                <option value="bicicleta">Bicicleta</option>
                                <option value="natacion">Natación</option>
                            </select>
                        </div>
                        <input bind:value={dorsal_id} type="hidden" name="dorsal_id">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button on:click={validarDatos} type="button" class="btn btn-primary" data-dismiss="modal">Añadir esfuerzo</button>
            </div>
        </div>
    </div>
</div>