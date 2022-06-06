<script> 
import Navbar from "$lib/Navbar.svelte";
import Footer from "$lib/Footer.svelte";
</script>

<div class="container">
    <Navbar />
    <div class="row">
        <slot></slot>
    </div>
    <Footer />
</div>