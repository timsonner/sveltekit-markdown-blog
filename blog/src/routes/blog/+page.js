// src/routes/blog/+page.js

// Server side load function, makes a reuest to the backedn for posts. 
// Posts are sent to the front via this load function, which +page.svelte runs imediately.
// Results are a JSON array of post objects.
// These results will be available to the front (+page.svelte) via the 'data' object.
export const load = async ({ fetch }) => {
    const response = await fetch(`/api/posts`)
    const posts = await response.json()
  
    return {
      posts
    }
  }