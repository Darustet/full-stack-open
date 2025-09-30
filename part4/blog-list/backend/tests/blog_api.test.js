const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, 2)
})

test('id is correctly defined', async () => {
  const blogs = await helper.blogsInDb()
  
  blogs.forEach(blog => {
    assert.strictEqual(blog.id, blog.id.toString())
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "New blog",
    author: "John Doe",
    url: "http://newblog.com",
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsAtEnd.map(b => b.title)
  assert.ok(titles.includes('New blog'))

/*   const addedBlog = blogsAtEnd.find(blog => blog.title === 'New blog')
  assert.equal(addedBlog === newBlog) */
})

after(async () => {
  await mongoose.connection.close()
})