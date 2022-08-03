<script>
export let usuario;
</script>

<div class="card mb-2">
    <div class="card-body">
        <div class="d-flex justify-content-between">
            <span>
                {#if usuario.pos > 0}
                    <span class={`ranking pos-${usuario.pos}`}>{usuario.pos}</span>
                {/if}
                <strong>{usuario.username}</strong></span>
            <span>{usuario.numKm} km</span>
        </div>
    </div>
</div>

<style>
.ranking {
    font-weight: 700;
    border: 1px solid lightgray;
    padding: 5px 10px;
    border-radius: 16px;
    margin-right: 5px;
}
.pos-1 {
    color: gold
}
.pos-2 {
    color: silver;
}
.pos-3 {
    color: lightsalmon;
}
</style>