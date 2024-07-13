import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newMessage, setNewMessage] = useState(null)
  const [newError, setNewError] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blog) => {
    setBlogs(blogs.concat(blog))
    blogFormRef.current.toggleVisibility()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNewMessage(`Welcome ${user.username}`)
      setTimeout(() => setNewMessage(null), 5000)
    } catch (exception) {
      setNewError('Wrong credentials')
      setTimeout(() => setNewError(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  return (
    <div>
      <Notification message={newMessage} />
      <Error message={newError} />

      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      )}
      
      {user && (
        <div>
          <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm addBlog={addBlog} />
          </Togglable>
          <h2>blogs</h2>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
        </div>
      )}
    </div>
  )
}

export default App
