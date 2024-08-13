import  { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ addBlog }) => {
  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')
  const [newMessage, setNewMessage] = useState(null)
  const [newError, setNewError] = useState(null)

  const handleAuthorChange = (event) => setNewAuthor(event.target.value)
  const handleTitleChange = (event) => setNewTitle(event.target.value)
  const handleUrlChange = (event) => setNewUrl(event.target.value)
  const handleLikesChange = (event) => setNewLikes(event.target.value)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const blogObject = {
      author: newAuthor,
      title: newTitle,
      url: newUrl,
      likes: newLikes
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      addBlog(returnedBlog)
      setNewAuthor('')
      setNewTitle('')
      setNewUrl('')
      setNewLikes('')
      setNewMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => setNewMessage(null), 5000)
    } catch (exception) {
      console.error(exception)
      setNewError('Error adding blog')
      setTimeout(() => setNewError(null), 5000)
    }
  }
// Updated BlogForm with placeholders
  return (
    <form onSubmit={handleSubmit}>
      <div>
        author
        <input
          data-testid="author"
          placeholder="Author"
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        title
        <input
          data-testid="title"
          placeholder="Title"
          value={newTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        url
        <input
          data-testid="url"
          placeholder="URL"
          value={newUrl}
          onChange={handleUrlChange}
        />
      </div>
      <div>
        likes
        <input
          data-testid="likes"
          placeholder="Likes"
          value={newLikes}
          onChange={handleLikesChange}
        />
      </div>
      <button type="submit">save</button>
      {newMessage && <div className='notification'>{newMessage}</div>}
      {newError && <div className='error'>{newError}</div>}
    </form>
  );

  
}

export default BlogForm
