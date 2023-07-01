// src/routes/blog/[slug]/+page.js
export async function load({ params }){
    const post = await import(`../${params.slug}.md`)
    const { title, date } = post.metadata
    const content = post.default
  
    return {
      content,
      title,
      date,
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