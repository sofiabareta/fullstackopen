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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}