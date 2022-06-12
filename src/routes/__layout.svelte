<script> 
import Navbar from "$lib/Navbar.svelte";
import Footer from "$lib/Footer.svelte";
</script>

<div class="container">
    <Navbar />
    <main class="row">
        <slot></slot>
    </main>
    <Footer />
</div>