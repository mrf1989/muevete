<script>
import { session } from "$app/stores";
import { goto } from "$app/navigation";

const logout = () => {
    document.cookie = "MDAUTHID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "MDAUTHID.sig=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    $session.user = false;
    goto("/");
}
</script>

<nav class="row navbar navbar-expand-lg navbar-light bg-light mb-3">
    <a class="navbar-brand text-primary" href="/">Muévete APP</a>
    {#if $session.user}
    <span>¡Hola, {$session.user.username}!</span>
    {/if}
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <a class="nav-link" href="/articulos">Artículos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/eventos">Eventos</a>
            </li>
            {#if !$session.user}
            <li class="nav-item">
                <a class="nav-link" href="/usuarios/login">Login</a>
            </li>
            {:else if $session.user.rol == "admin"}
            <li class="nav-item">
                <a class="nav-link" href="/perfil">Mi perfil</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="/admin" id="adminMenuDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Administración</a>
                <div class="dropdown-menu" aria-labelledby="adminMenuDropdown">
                    <a href="/admin/eventos" class="dropdown-item">Eventos</a>
                    <a href="/admin/articulos" class="dropdown-item">Artículos</a>
                    <a href="/admin/usuarios" class="dropdown-item">Usuarios</a>
                    <a href="/admin/newsletters" class="dropdown-item">Newsletters</a>
                </div>
            </li>
            {:else}
            <li class="nav-item">
                <a class="nav-link" href="/perfil">Mi perfil</a>
            </li>
            {/if}
            {#if $session.user}
            <li class="nav-item">
                <a on:click|preventDefault={logout} class="nav-link" href="/api/usuarios/logout">Logout</a>
            </li>
            {/if}
        </ul>
    </div>
</nav>

<style>
.navbar {
    border-bottom: 1px solid #eee;   
}
</style>