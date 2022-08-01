<script context="module">
export const load = async ({ session }) => {
    const redirectToLogin = {
        status: 302,
        redirect: "/usuarios/login"
    };

    if (!session.user) {
        return redirectToLogin;
    } else if (session.user.rol != "admin") {
        return redirectToLogin;
    }

    return {};
}
</script>

<script>
import { session } from "$app/stores";
import UsuarioList from "$lib/UsuarioList.svelte";

const getUsuarios = async (session) => {
    const response = await fetch("/api/admin/usuarios");

    if (response.ok) {
        const usuarios = await response.json();
        usuarios.sort((a, b) => a.username.localeCompare(b.username));
        return usuarios;
    } else false;
}

let usuariosPromise = getUsuarios($session);
</script>

<svelte:head>
    <title>Administración - Usuarios - Muévete APP</title>
</svelte:head>

<div class="container">
    <div class="row">
        <div class="col-12">
            <h1>Hola, administrador <small class="text-muted">{$session.user.username}</small></h1>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex flex-row justify-content-between card-title">
                        <h3>Usuarios registrados</h3>
                    </div>
                    {#await usuariosPromise then usuarios}
                        <p>Usuarios totales en el sistema: {usuarios.length}</p>
                        {#each usuarios as usuario}
                        <UsuarioList {usuario} />
                        {/each}
                    {/await}
                </div>
            </div>
        </div>
    </div>
</div>