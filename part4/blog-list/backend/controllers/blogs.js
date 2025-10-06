const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

/* blogsRouter.get('/', (request, response) => {
  response.send('<h1>Welcome to Blog List!</h1>')
}) */

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  //const user = await User.findById(body.id)

  let user = await User.findById(body.user)

  console.log('User from request body:', user)

  if (!user) {
    users = await User.aggregate([{ $sample: { size: 1 } }])
    user = await User.findById(users[0]._id)
    console.log('No user specified, selected random user:', user.username)
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (!blog.title || !blog.url) {
    return response.status(400).json({ error: 'title or url is missing' })
  }

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

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