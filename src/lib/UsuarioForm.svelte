<script>
import { createEventDispatcher } from "svelte";
import { getDate } from "$lib/utils";

export let usuario;

let nombre, apellidos, email, telefono, fechaNacimiento, ciudad;

if (usuario) {
    nombre = usuario.nombre;
    apellidos = usuario.apellidos;
    email = usuario.email;
    telefono = usuario.telefono;
    fechaNacimiento = getDate(new Date(usuario.fechaNacimiento));
    ciudad = usuario.ciudad
}

const dispatch = createEventDispatcher();

const getDatosUsuario = () => {
    dispatch("post", { nombre, apellidos, email, telefono, fechaNacimiento, ciudad });
}
</script>

<div class="modal fade" id="usuarioForm" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Editar datos de usuario</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Cerrar">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input bind:value={nombre} type="text" class="form-control" id="nombre">
                    </div>
                    <div class="form-group">
                        <label for="apellidos">Apellidos</label>
                        <input bind:value={apellidos} type="text" class="form-control" id="apellidos">
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input bind:value={email} type="email" class="form-control" id="email">
                    </div>
                    <div class="form-group">
                        <label for="telefono">Teléfono</label>
                        <input bind:value={telefono} type="tel" class="form-control" id="telefono">
                    </div>
                    <div class="form-group">
                        <label for="fechaNacimiento">Fecha de nacimiento</label>
                        <input bind:value={fechaNacimiento} type="date" class="form-control" id="fechaNacimiento">
                    </div>
                    <div class="form-group">
                        <label for="ciudad">Ciudad</label>
                        <input bind:value={ciudad} type="text" class="form-control" id="ciudad">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                <button on:click={getDatosUsuario} type="button" class="btn btn-primary" data-dismiss="modal">Guardar</button>
            </div>
        </div>
    </div>
</div>