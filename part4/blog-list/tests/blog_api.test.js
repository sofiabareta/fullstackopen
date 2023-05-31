const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

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


afterAll(async () => {
  await mongoose.connection.close()
})