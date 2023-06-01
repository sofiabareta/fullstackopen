const Blog = require('../models/blog')

const initialBlogs = [
  {
    'title': 'Gabs blog',
    'author': 'Gabs',
    'url': 'http://gabs.com',
    'likes': 2
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}