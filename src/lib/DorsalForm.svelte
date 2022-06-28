<script>
import { createEventDispatcher } from "svelte";

let lema;

const dispatch = createEventDispatcher();

const getDatosDorsal = () => {
    dispatch("post", { lema });
}
</script>

<div class="modal fade" id="dorsalForm" tabindex="-1" role="dialog">
  <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title">Inscripción al evento</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                  <span aria-hidden="true">&times;</span>
              </button>
          </div>
          <div class="modal-body">
              <form>
                  <div class="form-group">
                      <label for="lema">Lema para el dorsal</label>
                      <input bind:value={lema} type="text" class="form-control" id="lema" placeholder="Escribe algo inspirador...">
                  </div>
              </form>
          </div>
          <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
              <button on:click={getDatosDorsal} type="button" class="btn btn-primary" data-dismiss="modal">Inscribirse</button>
          </div>
      </div>
  </div>
</div>