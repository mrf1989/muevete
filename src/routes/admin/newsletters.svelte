<script context="module">
export const load = async ({ fetch, session }) => {
    const redirectToLogin = {
        status: 302,
        redirect: "/usuarios/login"
    };

    if (!session.user) {
        return redirectToLogin;
    } else if (session.user.rol != "admin") {
        return redirectToLogin;
    }

    const response = await fetch(`${session.apiURI}/api/admin/newsletters`);

    if (response.ok) {
        const newsletters = await response.json();
        return {
            props: {
                newsletters
            }
        }
    }
    return {};
}
</script>

<script>
import { session } from "$app/stores";
import NewsletterList from "$lib/NewsletterList.svelte";
import { getUltimaNewsletterEnviada, diasEntreFechas } from "$lib/utils";

export let newsletters;
const ultimaNewsletterEnviada = getUltimaNewsletterEnviada(newsletters);

$ : envioDisponible = ultimaNewsletterEnviada ?
    diasEntreFechas(new Date(ultimaNewsletterEnviada.fechaEnvio), new Date(Date.now())) >= 15
    : true;

const handleEnvioDisponible = (event) => {
    envioDisponible = event.detail.envioDisponible;
}

</script>

<svelte:head>
    <title>Administración - Newsletters - Muévete APP</title>
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
                        <h3>Newsletters</h3>
                        <div>
                            <a class="btn btn-primary d-none d-sm-inline-block" href="/newsletters/form">+ Nueva newsletter</a>
                            <a class="btn btn-primary d-inline-block d-sm-none" href="/newsletters/form">+ Nueva</a>
                        </div>
                    </div>
                    {#if newsletters}
                        {#each newsletters as newsletter}
                        <NewsletterList on:post={handleEnvioDisponible} {newsletter} {envioDisponible}/>
                        {/each}
                    {:else}
                        <p>No existen newsletters.</p>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>