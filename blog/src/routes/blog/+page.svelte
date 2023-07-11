<!-- src/routes/blog/+page.svelte -->
<!-- Main blog page user navigates to -->
<script>
    export let data
    </script>

<body>
    <h1>Blog</h1>
      
    <ul>
      {#each data.posts as post}
        <li>
          <img src={post.meta.hero} alt="">
          <h2>
            <a href={post.path}>
              {post.meta.title}
            </a>
          </h2>
          Published {post.meta.date}
          <h2>
            {post.meta.description}
          </h2>
        </li>
      {/each}
    </ul>
</body>

<style>
  h1 {
    padding: 1rem;
  }

  img {
    padding: 0px;
    max-width: 100%;
  }

  li {
    border: solid 2px lightgray;
    /* padding-bottom: 2rem; */
    margin-bottom: 2rem;
    max-width: 50%;
    list-style: none;
    padding: 3rem;
  }
</style>