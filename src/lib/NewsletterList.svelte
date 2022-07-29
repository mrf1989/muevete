<script>
export let newsletter;
$ : msgExitoEnvio = false;
$ : msgFracasoEnvio = false;
$ : newsletter.fechaEnvio = false;

export const enviarNewsletter = async (newsletter) => {
    const response = await fetch("/api/admin/usuarios");
    const headers = new Headers({
        "Content-Type": "application/json"
    })

    if (response.ok) {
        const usuarios = await response.json();

        const responseEnvioNewsletter = await fetch("/api/newsletters/enviar", {
            method: "POST",
            headers,
            body: JSON.stringify({
                newsletter,
                usuarios
            })
        });

        const confirmacionEnvio = await responseEnvioNewsletter.json();

        if (confirmacionEnvio.envioNewsletter) {
            const responseRegistroEnvio = await fetch("/api/newsletters/enviar", {
                method: "PUT",
                headers,
                body: JSON.stringify({
                    id: newsletter._id
                })
            });

            if (responseRegistroEnvio.ok) {
                msgExitoEnvio = confirmacionEnvio.message;
                console.log(await responseRegistroEnvio.json());
                newsletter.fechaEnvio = new Date(Date.now());
            } else {
                msgFracasoEnvio = "La newsletter se ha enviado, pero el sistema no ha podido registrar la fecha de envío";
            }
        } else {
            msgFracasoEnvio = confirmacionEnvio.message;
        }
    }
}
</script>

<div class="card mb-2">
    <div class="card-body">
        {#if msgExitoEnvio}
        <div>
            <div class="alert alert-success" role="alert">
                {msgExitoEnvio}
            </div>
        </div>
        {:else if msgFracasoEnvio}
        <div>
            <div class="alert alert-warning" role="alert">
                {msgFracasoEnvio}
            </div>
        </div>
        {/if}
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
            <button
                class="btn btn-primary"
                data-toggle="modal"
                data-target={`#modal${newsletter._id}`}>Enviar newsletter
            </button>
            {:else}
            <p>Newsletter enviada el {new Date(newsletter.fechaEnvio).toLocaleDateString()}</p>
            {/if}
        </div>
    </div>
</div>

<div id={`modal${newsletter._id}`} class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Confirmación para el envío de newsletter</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cancelar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>¿Seguro que desea enviar la newsletter '{newsletter.titulo}' a la dirección de correo de los usuarios de la aplicación?</p>
                <p>Esta operación no podrá deshacerse en ningún momento desde el instante de su aprobación.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button on:click={enviarNewsletter(newsletter)} type="button" class="btn btn-primary" data-dismiss="modal">Sí, enviar</button>
            </div>
        </div>
    </div>
</div>