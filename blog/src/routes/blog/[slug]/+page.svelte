<!-- src/routes/[slug]/+page.svelte -->
<script>
    export let data;
  </script>
  
  <article>
    <!-- <img src={ data.hero } alt=""> -->
    <h1>{ data.title }</h1>
    <p>Published: {data.date}</p>
    <svelte:component this={data.content} />
  </article>