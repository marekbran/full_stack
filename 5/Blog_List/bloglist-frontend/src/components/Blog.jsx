import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const returnedBlog = await blogService.update(blog.id, updatedBlog)
    updateBlog(returnedBlog)
  }

  const handleDelete = async () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      await blogService.del(blog.id)
      deleteBlog(blog.id)
    }
  }

  return (
    <div>
      <div>
        {blog.title} 
        <button onClick={toggleVisibility}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          <p>author: {blog.author}</p>
          <p>url : {blog.url}</p>
          <p>{blog.likes} likes <button onClick={handleLike}>like</button></p>
          <button onClick={handleDelete}>delete</button>
        </div>
      )}
    </div>
  )
}

export default Blog
