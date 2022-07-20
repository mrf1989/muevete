<script>
export let articulo;

const borrarArticulo = async () => {
    const response = await fetch("/api/articulos/borrar", {
        method: "DELETE",
        body: JSON.stringify({
            articuloId: articulo._id
        })
    });

    if (response.ok) {
        document.location = "/admin/articulos";
    }
}
</script>

<div class="card mb-2">
    <div class="card-body">
        <a href={`/articulos/${articulo._id}`}><h5 class="card-title">{articulo.titulo}</h5></a>
        <div class="card-text">
            <div class="d-flex flex-row justify-content-between">
                <div>
                    Fecha de publicación: {new Date(articulo.fecha).toLocaleDateString()}
                </div>
                <div class="btn-group align-items-center" role="group">
                    <a href={`/articulos/form/${articulo._id}`} class="btn btn-primary">Editar</a>
                    <button data-toggle="modal" data-target="#borrar{articulo._id}" class="btn btn-secondary">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="borrar{articulo._id}" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">¿Seguro que quieres eliminar el artículo?</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <p>Se va a eliminar el artículo "{articulo.titulo}"</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button on:click={borrarArticulo} type="button" class="btn btn-danger" data-dismiss="modal">Sí, eliminar</button>
            </div>
        </div>
    </div>
</div>