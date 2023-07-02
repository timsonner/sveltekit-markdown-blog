<!-- src/routes/blog/+page.svelte -->
<!-- Main blog page user navigates to -->
<script>
    export let data
    </script>
    
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
        </li>
      {/each}
    </ul>