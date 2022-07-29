<script>
import { createEventDispatcher } from "svelte";

export let articulos, eventos;

let titulo, cuerpo, enlaces = [], enlacesArticulos = [], enlacesEventos = [];

const dispatch = createEventDispatcher();

const getDatosNewsletter = () => {
    const mapEnlacesArticulos = enlacesArticulos.map(e => {
        const articulo = e.split("#A#");
        return {
            titulo: articulo[1],
            enlace: articulo[0],
            tipo: "articulos"
        }
    });

    const mapEnlacesEventos = enlacesEventos.map(e => {
        const evento = e.split("#E#");
        return {
            titulo: evento[1],
            enlace: evento[0],
            tipo: "eventos"
        }
    });

    enlaces = [...mapEnlacesArticulos, ...mapEnlacesEventos];
    dispatch("post", {
        titulo, cuerpo, enlaces
    });
}
</script>

<form>
    <div class="form-group">
        <label for="titulo">Título*</label>
        <input bind:value={titulo} type="text" class="form-control" id="titulo" required>
    </div>
    <div class="form-group">
        <label for="cuerpo">Cuerpo del artículo</label>
        <textarea bind:value={cuerpo} rows="10" class="form-control" id="cuerpo"></textarea>
    </div>
    <div class="form-row">
        <div class="form-group col-lg-12">
            <label for="enlacesArticulos">Artículos*</label>
            <select multiple bind:value={enlacesArticulos} class="form-control" for="enlacesArticulos" id="enlacesArticulos" required>
                {#await articulos then dataArticulos}
                    {#each dataArticulos as articulo}
                    <option value={`${articulo._id}#A#${articulo.titulo}`}>{articulo.titulo}</option>
                    {/each}
                {/await}
            </select>
        </div>
        <div class="form-group col-lg-12">
            <label for="enlacesEventos">Eventos*</label>
            <select multiple bind:value={enlacesEventos} class="form-control" for="enlacesEventos" id="enlacesEventos" required>
                {#await eventos then dataEventos}
                    {#each dataEventos as evento}
                    <option value={`${evento._id}#E#${evento.nombre}`}>{evento.nombre}</option>
                    {/each}
                {/await}
            </select>
        </div>
    </div>
    <button on:click|preventDefault={getDatosNewsletter} class="btn btn-primary btn-block">Publicar newsletter</button>
</form>
