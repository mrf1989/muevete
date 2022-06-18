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
</script>

<div class="container">
    <div class="row">
        <div class="col-12">
            <h1>Hola, administrador <small class="text-muted">{$session.user.username}</small></h1>
        </div>
    </div>
    <div class="row">
        
    </div>
</div>