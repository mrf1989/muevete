<script>
import { goto } from "$app/navigation";
import RegistroForm from "$lib/RegistroForm.svelte";

let error;

const handleDatosUsuario = async (event) => {
    const data = event.detail;
    const nuevoUsuario = {
        username: data.username,
        password: data.password,
        nombre: data.nombre,
        apellidos: data.apellidos,
        email: data.email,
        telefono: data.telefono,
        fechaNacimiento: data.fechaNacimiento,
        ciudad: data.ciudad,
        rol: "voluntario"
    }
    
    const response = await fetch("/api/usuarios/registro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(nuevoUsuario)
    });

    if (response.ok) {
        goto("/usuarios/login")
    } else {
        error = await response.json();
    }
}
</script>

<div class="col-md-8 offset-md-2">
    <div class="text-center">
        <h1>Registro</h1>
        <p class="lead">A través del siguiente formulario puedes darte de alta en la plataforma para poder participar en todos los eventos deportivos solidarios que promueve Muévete por los que no pueden. ¡Suma kilómetros para ayudarnos al alcanzar los objetivos marcados!</p>
    </div>
    <RegistroForm on:signin={handleDatosUsuario} />
    {#if error}
    <div class="alert alert-warning" role="alert">
        {error.message}
    </div>
    {/if}
</div>
