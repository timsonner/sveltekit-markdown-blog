<h1>A Blog about Hacking, Cybersecurity, and Software Development</h1>

Check out the blog or get in touch.  

    <!-- Display the entire data object -->
    <pre>{JSON.stringify(data, null, 2)}</pre>


<script>
import { onMount } from 'svelte';

let data = {}; // Define the 'data' variable

onMount(async () => {
  // Fetch the user agent data on the client side
  const response = await fetch('/foo'); // Make sure to use the correct endpoint URL
  data = await response.json();
});
</script>

<style>
    body {
    padding: 1rem;
    margin: 2rem auto;
    max-width: 40rem;
  }
</style>
