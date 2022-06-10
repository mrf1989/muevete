<script>
import { createEventDispatcher } from "svelte";

let titulo, subtitulo, cuerpo, categoria, referencia, enlaceImagen;

const dispatch = createEventDispatcher();

const getDatosArticulo = () => {
    dispatch("post", {
        titulo, subtitulo, cuerpo, categoria, referencia, enlaceImagen
    });
}
</script>

<form>
    <div class="form-group">
        <label for="titulo">Título</label>
        <input bind:value={titulo} type="text" class="form-control" id="titulo">
    </div>
    <div class="form-group">
        <label for="subtitulo">Subtítulo</label>
        <input bind:value={subtitulo} type="text" class="form-control" id="subtitulo">
    </div>
    <div class="form-group">
        <label for="cuerpo">Cuerpo del artículo</label>
        <textarea bind:value={cuerpo} rows="5" class="form-control" id="cuerpo"></textarea>
    </div>
    <div class="form-row">
        <div class="form-group col-lg-6">
            <label for="categoria">Categoría</label>
            <select bind:value={categoria} class="form-control" for="categoria" id="categoria">
                <option value="noticias">Noticias</option>
                <option value="comunicados">Comunicados</option>
                <option value="divulgacion">Divulgación</option>
            </select>
        </div>
        <div class="form-group col-lg-6">
            <label for="referencia">Referencia web</label>
            <input bind:value={referencia} type="url" class="form-control" id="referencia">
        </div>
    </div>
    <div class="form-group">
        <label for="enlaceImagen">Enlace de imagen</label>
        <input bind:value={enlaceImagen} type="url" class="form-control" id="enlaceImagen">
    </div>
    <button on:click|preventDefault={getDatosArticulo} class="btn btn-primary btn-block">Publicar artículo</button>
</form>