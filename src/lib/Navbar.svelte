<script>
import { session } from "$app/stores";
import { goto } from "$app/navigation";

const logout = () => {
    document.cookie = "MDAUTHID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "MDAUTHID.sig=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    $session.user = false;
    goto("/usuarios/login");
}
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
    <a class="navbar-brand" href="/">Muévete APP</a>
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
            <li class="nav-item">
                <a class="nav-link" href="/admin">Administración</a>
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