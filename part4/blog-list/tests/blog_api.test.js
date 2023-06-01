const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('all blogs are returned', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs have "id" property as unique verifier', async () => {
  const result = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const content = result.body.map(item => item.id)
  expect(content).toBeDefined()
})

test('a new blog is added', async () => {
  const newBlog = {
    title: 'Blog da pofinha',
    author: 'Pofinha',
    url: 'http://pofinha',
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.blogsInDb()
  expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1)

})

test('all blogs have "like" property', async () => {
  const newBlog = {
    title: 'Blog da pofinha',
    author: 'Pofinha',
    url: 'http://pofinha',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

test('all blogs have "title" and "url" property', async () => {
  const newBlog = {
    author: 'Pofinha',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

test('deletion of a blog succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
})


afterAll(async () => {
  await mongoose.connection.close()
})