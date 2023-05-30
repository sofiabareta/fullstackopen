const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }

  const likes = blogs.reduce((acc, blog) => acc + blog.likes, 0)

  return likes
}

module.exports = {
  dummy,
  totalLikes
}