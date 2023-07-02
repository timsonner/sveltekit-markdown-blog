// This whole function is basically dealing with the markdown files on the filesystem.
// Searches a directory path for files, does a bit of slicing to remove the .md from the filename
// so we can use it as a post path.
export const fetchMarkdownPosts = async () => {
    const allPostFiles = import.meta.glob('/src/routes/blog/*.md')
    const iterablePostFiles = Object.entries(allPostFiles)
    
    const allPosts = await Promise.all(
      iterablePostFiles.map(async ([path, resolver]) => {
        const { metadata } = await resolver()
        const postPath = path.slice(11, -3)
  
        return {
          meta: metadata,
          path: postPath,
        }
      })
    )
  
    return allPosts
  }