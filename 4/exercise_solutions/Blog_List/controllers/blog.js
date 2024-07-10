const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  console.log(blogs)
  response.json(blogs)
})

/*
blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(Blog => {
      if (Blog) {
        response.json(Blog)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})
*/
blogsRouter.post('/', async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'title or url missing' });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

/*
blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const body = request.body

  const Blog = {
    content: body.content,
    important: body.important,
  }

  Blog.findByIdAndUpdate(request.params.id, Blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))
})
*/
module.exports = blogsRouter