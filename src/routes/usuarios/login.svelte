<script context="module">
export const load = async ({ session }) => {
    if (session.user) {
        return {
            status: 302,
            redirect: "/"
        };
    }

    return {};
}
</script>

<script>
import { goto } from "$app/navigation";
import { session } from "$app/stores";

let username, password, error;

const handleLogin = async () => {
    const response = await fetch("/api/usuarios/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    if (response.ok) {
        $session.user = await response.json()
        goto("/");
    } else {
        error = await response.json()
    }
}
</script>

<div class="col-md-6 offset-md-3">
    <h1 class="text-center">Login</h1>
    <form class="mb-4">
        <div class="form-group">
            <label for="username">Nombre de usuario</label>
            <input bind:value={username} type="text" class="form-control" id="username">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input bind:value={password} type="password" class="form-control" id="password">
        </div>
        <button on:click|preventDefault={handleLogin} type="submit" class="btn btn-primary btn-block">Acceder</button>
    </form>
    <p class="text-center">¿Quieres registrarte? <a href="/usuarios/registro">Házlo aquí</a></p>
    {#if error}
    <div class="alert alert-warning" role="alert">
        {error.message}
    </div>
    {/if}
</div>