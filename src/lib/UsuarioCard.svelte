<script>
import { goto } from "$app/navigation";
import UsuarioForm from "$lib/UsuarioForm.svelte";

export let usuario;

$ : error = false;
$ : usuario = usuario;

const handleDatosUsuario = async (event) => {
    const data = event.detail;

    if (data.error) {
        error = data.error;
    } else {
        const usuarioEditado = {
            nombre: data.nombre,
            apellidos: data.apellidos,
            email: data.email,
            telefono: data.telefono,
            fechaNacimiento: data.fechaNacimiento,
            ciudad: data.ciudad
        }
    
        const response = await fetch("/api/usuarios/editar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuarioEditado)
        });
    
        if (response.ok) {
            //document.location = "/perfil";
            usuario = await response.json();
            goto("/perfil");
        } else {
            error = await response.json();
        }
    }
}
</script>

<div class="card">
    <div class="card-body">
        <h2 class="card-title">{usuario.username}</h2>
        <h6 class="card-subtitle mb-2 text-muted">{usuario.nombre} {usuario.apellidos}</h6>
        <div class="card-text">
            <ul>
                <li>Email: {usuario.email}</li>
                {#if usuario.telefono}
                <li>Teléfono: {usuario.telefono}</li>
                {/if}
                <li>Fecha de nacimiento: {usuario.fechaNacimiento}</li>
                {#if usuario.ciudad}
                <li>Ciudad: {usuario.ciudad}</li>
                {/if}
            </ul>
            <div class="d-flex flex-row-reverse">
                <button class="btn btn-primary btn-block" data-toggle="modal" data-target="#usuarioForm">Editar</button>
            </div>
            {#if error}
            <div class="alert alert-warning mt-3" role="alert">
                {error}
            </div>
            {/if}
        </div>
    </div>
</div>

<UsuarioForm on:post={handleDatosUsuario} {usuario} />