<script context="module">
export const load = async ({ fetch, session }) => {
    if (!session.user) {
        return {
            status: 302,
            redirect: "/usuarios/login"
        }
    }

    const responseUsuario = await fetch(`${session.apiURI}/api/usuarios/${session.user.id}`);

    if (responseUsuario.ok) {
        const dataUsuario = await responseUsuario.json();
        return {
            props: {
                dataUsuario,
            }
        }
    } else {
        return {
            status: 400,
            error: new Error("No existe el usuario o no puede localizarse su perfil")
        }
    }
}
</script>

<script>
export let dataUsuario;
</script>

<div class="container">
    <div class="row mb-2">
        <div class="col">
            <h1>{dataUsuario.username} - <small class="text-muted">{dataUsuario.nombre} {dataUsuario.apellidos}</small></h1>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4">
            <ul>
                <li>Email: {dataUsuario.email}</li>
                {#if dataUsuario.telefono}
                <li>Teléfono: {dataUsuario.telefono}</li>
                {/if}
                <li>Fecha de nacimiento: {dataUsuario.fechaNacimiento}</li>
                {#if dataUsuario.ciudad}
                <li>Ciudad: {dataUsuario.ciudad}</li>
                {/if}
            </ul>
        </div>
        <div class="col-md-8">
            <h3>Mis eventos activos</h3>
        </div>
    </div>
</div>