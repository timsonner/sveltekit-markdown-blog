// src/routes/blog/[slug]/+page.js
// This function loads the file from disk, exports 
export async function load({ params }){
    const post = await import(`../${params.slug}.md`)
    const { title, date, hero } = post.metadata
    const content = post.default
    return {
      content,
      title,
      date,
      hero,
    }
  }

//   <!-- Alternate approach! -->
// <script>
//   export let data
//   const { title, date, Content } = data
// </script>

// <article>
//   <h1>{title}</h1>
//   <p>Published: {date}</p>
//   <Content />
// </article>