<script>
export let usuario;

$ : usuario.enabled = usuario.enabled;

const cambiaEstadoUsuario = async () => {
    const response = await fetch("/api/usuarios/estado", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usuario_id: usuario._id,
            enabled: !usuario.enabled
        })
    });

    if (response.ok) {
        usuario.enabled = !usuario.enabled;
    } else {
        console.log("ERROR EN EL CAMBIO DE ESTADO DE USUARIO");
    }
}
</script>

<div class="card mb-2">
    <div class="card-body">
        <div class="d-flex justify-content-between">
            <span><strong>{usuario.username}</strong> <a href="mailto:{usuario.email}">{usuario.email}</a></span>
            <div class="form-check">
                <input on:click={cambiaEstadoUsuario} class="form-check-input" type="checkbox" id={`estadoUsuario${usuario.username}`} checked={usuario.enabled}>
                <label class="form-check-label" for={`estadoUsuario${usuario.username}`}>Activado</label>
            </div>
        </div>
    </div>
</div>