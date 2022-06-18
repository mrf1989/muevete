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
import { session } from "$app/stores";
import UsuarioCard from "$lib/UsuarioCard.svelte";
import EventoList from "$lib/EventoList.svelte";

export let dataUsuario;

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
eventos.sort((a, b) => new Date(a.fechaFin) - new Date(b.fechaFin));
</script>

<div class="container">
    <div class="row mb-2">
        <div class="col-md-4">
            <UsuarioCard {usuario} />
        </div>
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Mis eventos activos</h3>
                    {#each eventos as evento}
                        <EventoList {evento} />
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>