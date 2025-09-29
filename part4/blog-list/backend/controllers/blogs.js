const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  response.send('<h1>Welcome to Blog List!</h1>')
})

blogsRouter.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
    console.log(blogs)
  })
})

blogsRouter.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  console.log(blog)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = blogsRouter