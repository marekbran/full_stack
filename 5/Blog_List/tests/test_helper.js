const Blog = require('../models/blog')
const User = require('../models/user')

const initialblogs = [
  {
    _id: '668d39265278c26667d03476',
    title: 'b',
    author: 'b',
    url: 'b',
    likes: 8,
    __v: 0
  },
  {
    title: 'aa',
    author: 'a',
    url: 'aa',
    likes: 9,
    id: '668d6a8d3beec5126cf4d852',
    __v: 0
  }
]

const nonExistingId = async () => {
  const blog = new Blog(    {
    title: 'b',
    author: 'b',
    url: 'b',
    likes: 8,
    __v: 0
  })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialblogs, nonExistingId, blogsInDb, usersInDb
}