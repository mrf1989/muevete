<script context="module">
export const load = async ({ fetch, session }) => {
    if (!session.user) {
        return {
            status: 302,
            redirect: "/usuarios/login"
        }
    }

    const responseUsuario = await fetch(`${session.apiURI}/api/usuarios/${session.user.id}`);
    const responseEsfuerzos = await fetch(`${session.apiURI}/api/esfuerzos/usuario/${session.user.id}`);

    if (responseUsuario.ok && responseEsfuerzos.ok) {
        const dataUsuario = await responseUsuario.json();
        const dataEsfuerzos = await responseEsfuerzos.json();

        return {
            props: {
                dataUsuario,
                dataEsfuerzos
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
import UsuarioCard from "$lib/UsuarioCard.svelte";
import EventoList from "$lib/EventoList.svelte";

export let dataUsuario;
export let dataEsfuerzos;

const usuario = dataUsuario.usuario;
const eventos = dataUsuario.eventos;
const dorsales = dataUsuario.dorsales;

const asignarDorsales = () => {
    eventos.forEach(evento => {
        evento.dorsal = dorsales.find(d => {
            return d.evento_id == evento._id;
        })
    });
}

asignarDorsales();
let eventosProcesados = eventos
    .filter(evento => new Date(evento.fechaFin) >= Date.now())
    .sort((a, b) => new Date(a.fechaFin) - new Date(b.fechaFin));

// TODO Obtener esfuerzos en los últimos 7 días
console.log(dataEsfuerzos);
</script>

<svelte:head>
    <title>Mi perfil - Muévete APP</title>
</svelte:head>

<div class="container">
    <div class="row mb-2">
        <div class="col-md-4">
            <UsuarioCard {usuario} />
        </div>
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Mis eventos activos</h3>
                    {#each eventosProcesados as evento}
                        <EventoList {evento} />
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>