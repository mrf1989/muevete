<script>
import { createEventDispatcher } from "svelte";

let username, password, nombre, apellidos, email, telefono, fechaNacimiento, ciudad;

const dispatch = createEventDispatcher();

const getDatosUsuario = () => {
    dispatch("signin", {
        username, password, nombre, apellidos, email, telefono, fechaNacimiento, ciudad 
    });
}
</script>

<form>
    <div class="form-row">
        <div class="form-group col-lg-6">
            <label for="username">Nombre de usuario</label>
            <input bind:value={username} type="text" class="form-control" id="username" placeholder="username">
        </div>
        <div class="form-group col-lg-6">
            <label for="password">Contraseña</label>
            <input bind:value={password} type="password" class="form-control" id="password" placeholder="*******">
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-lg-6">
            <label for="nombre">Nombre</label>
            <input bind:value={nombre} type="text" class="form-control" id="nombre" placeholder="Juan">
        </div>
        <div class="form-group col-lg-6">
            <label for="apellidos">Apellidos</label>
            <input bind:value={apellidos} type="text" class="form-control" id="apellidos" placeholder="García">
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-lg-6">
            <label for="email">E-mail</label>
            <input bind:value={email} type="email" class="form-control" id="email" placeholder="juanga@dominio.com">
        </div>
        <div class="form-group col-lg-6">
            <label for="telefono">Teléfono</label>
            <input bind:value={telefono} type="tel" class="form-control" id="telefono" placeholder="123456789">
        </div>
    </div>
    <div class="form-row">
        <div class="form-group col-lg-6">
            <label for="fechaNacimiento">Fecha de nacimiento</label>
            <input bind:value={fechaNacimiento} type="date" class="form-control" id="fechaNacimiento">
        </div>
        <div class="form-group col-lg-6">
            <label for="ciudad">Ciudad</label>
            <input bind:value={ciudad} type="text" class="form-control" id="ciudad" placeholder="Madrid">
        </div>
    </div>
    <button on:click|preventDefault={getDatosUsuario} class="btn btn-primary btn-block">Crear perfil</button>
</form>