const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0
  }

  const likes = blogs.reduce((acc, blog) => acc + blog.likes, 0)

  return likes
}

const favoriteBlog = blogs => {
  const moreLikes = blogs.reduce((prev, current) => prev.likes > current.likes ? prev : current)

  return { title: moreLikes.title, author: moreLikes.author, likes: moreLikes.likes }
}

const mostBlogs = blogs => {
  let authorsList = {}

  blogs.map(blog => {
    const authorKey = blog.author
    return authorsList[authorKey] = authorsList[authorKey] === undefined ? 1 : authorsList[authorKey] + 1
  })

  return Object.keys(authorsList).reduce((prev, current) => {
    return authorsList[prev] > authorsList[current] ? { 'author': prev, 'blogs': authorsList[prev] } : { 'author': current, 'blogs': authorsList[current] }
  })

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}