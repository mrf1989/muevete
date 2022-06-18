<script>
export let objetivoKm;
export let kmCompletados;

$: progreso = kmCompletados * 100 / objetivoKm;
</script>

<div class="mb-3">
    <div class="progress">
        <div class="progress-bar" role="progressbar" style="width: {progreso}%" aria-valuenow="{progreso}" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
</div>