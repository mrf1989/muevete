<script>
import { goto } from "$app/navigation";

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
        goto("/");
    } else {
        error = await response.json()
    }
}
</script>

<div class="col-md-6 offset-md-3">
    <h1 class="text-center">Login</h1>
    <form>
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
    {#if error}
    <div class="alert alert-warning" role="alert">
        {error.message}
    </div>
    {/if}
</div>