const blogsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  }
  const blog = new Blog(newBlog)

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog){
    return response.status(404).json({ error: 'blog does not exist' })
  }

  const user = request.user
  if (blog.user.toString() === user.id.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  } else {
    response.status(403).end()
  }
  
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const body = request.body

  if (blog) {

    blog.title = body.title
    blog.author = body.author
    blog.url = body.url
    blog.likes = body.likes

    
    const updatedBlog = await blog.save()
      response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter