<script> 
import Navbar from "$lib/Navbar.svelte";
import Footer from "$lib/Footer.svelte";
</script>

<div class="container-fluid">
    <Navbar />
</div>
<div class="container">
    <main class="row">
        <slot></slot>
    </main>
</div>
<div class="container-fluid">
    <Footer />
</div>