<script>
export let newsletter;
</script>

<div class="card mb-2">
    <div class="card-body">
        <h5 class="card-title">{newsletter.titulo}</h5>
        <div class="card-text">
            <div class="d-flex flex-row justify-content-between">
                <div>
                    <small><p>Fecha de publicación: {new Date(newsletter.fecha).toLocaleDateString()}</p></small>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <p>{newsletter.cuerpo}</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-7">
                    <h6>Artículos</h6>
                    <ul>
                    {#each newsletter.enlaces as enlace}
                        {#if enlace.tipo == "articulos"}
                        <li>{enlace.titulo}</li>
                        {/if}
                    {/each}
                    </ul>
                </div>
                <div class="col-md-5">
                    <h6>Eventos</h6>
                    <ul>
                    {#each newsletter.enlaces as enlace}
                        {#if enlace.tipo == "eventos"}
                        <li>{enlace.titulo}</li>
                        {/if}
                    {/each} 
                    </ul>
                </div>
            </div>
            {#if !newsletter.fechaEnvio}
            <button class="btn btn-primary">Enviar</button>
            {:else}
            <p>Newsletter enviada el {new Date(newsletter.fechaEnvio).toLocaleDateString()}</p>
            {/if}
        </div>
    </div>
</div>
