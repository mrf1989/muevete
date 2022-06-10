<script>
import { goto } from "$app/navigation";
import { session } from "$app/stores";
import ArticuloForm from "$lib/ArticuloForm.svelte";
import { getDate } from "$lib/utils";

let error;

const handleDatosArticulo = async (event) => {
    const data = event.detail;
    const nuevoArticulo = {
        titulo: data.titulo,
        subtitulo: data.subtitulo,
        fecha: getDate(new Date()),
        cuerpo: data.cuerpo,
        categoria: data.categoria,
        referencia: data.referencia,
        enlaceImagen: data.enlaceImagen,
        usuario_id: $session.user.id
    }
    
    const response = await fetch("/api/articulos/publicar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoArticulo)
    });

    if (response.ok) {
        goto("/articulos");
    } else {
        error = await response.json();
    }
}
</script>

<div class="col-lg-8 offset-lg-2">
    <div class="text-center">
        <h1>Nuevo artículo</h1>
    </div>
    <ArticuloForm on:post={handleDatosArticulo} />
</div>