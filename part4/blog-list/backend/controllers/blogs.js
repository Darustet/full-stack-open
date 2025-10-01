const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

/* blogsRouter.get('/', (request, response) => {
  response.send('<h1>Welcome to Blog List!</h1>')
}) */

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title or url is missing' })
  }

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

// Implement functionality for deleting a single blog post resource.

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

// Implement functionality for updating the information of an individual blog post.

blogsRouter.put('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  } else {
    const { title, author, url, likes } = request.body

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const updatedBlog = await blog.save()
    response.json(updatedBlog)
  }
})

module.exports = blogsRouter