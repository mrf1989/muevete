<script>
import { getDorsalPDF } from "$lib/utils";

export let dorsal;
export let evento;

const dorsalPDFPromise = getDorsalPDF(dorsal, evento);
</script>

<div class="modal fade" id="pdfModal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Descargar dorsal</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                {#await dorsalPDFPromise then dorsalPDF}
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe src={dorsalPDF} title="Dorsal de participación" frameborder="0" style="width: 100%; height: 100%;"></iframe>
                </div>
                {/await}
            </div>
        </div>
    </div>
</div>