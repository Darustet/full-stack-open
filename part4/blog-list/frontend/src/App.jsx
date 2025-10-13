import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleNotification = (message, type) => {
    setErrorMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setErrorMessage(null)
      setNotificationType(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      const name = username
      handleNotification('Welcome back ' + name + '!', 'success')
      setUsername('')
      setPassword('')
    } catch {
      handleNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const logoutButton = () => (
    <button onClick={handleLogout} type="submit">logout</button>
  )

  const addBlog = (blogObject) => {
    if (!blogObject.title || !blogObject.author || !blogObject.url) {
      handleNotification('Please fill all fields when creating a new blog.')
      return null
    }

    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        blogService.getAll().then(blogs => setBlogs(blogs))
        handleNotification('Added new blog ' + returnedBlog.title + ' by ' + returnedBlog.author, 'success')
      })
  }

  const updateBlog = (blogObject) => {
    if (!blogObject.title || !blogObject.author || !blogObject.url || !blogObject.likes || !blogObject.user) {
      handleNotification('Error updating blog')
      return null
    }

    blogService
      .update(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
        //setBlogs(blogs.concat(returnedBlog))
        blogService.getAll().then(blogs => setBlogs(blogs))
      })
  }

  const deleteBlog = (blogObject) => {
    blogService
      .remove(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        blogService.getAll().then(blogs => setBlogs(blogs))
      })
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const blogsToShow = () => {
    if (user !== null) {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

      return (
        <div>
          {sortedBlogs.map(blog =>
            <Blog
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              key={blog.id}
              blog={blog}
              owner={blog.user && user.username === blog.user.username}
            />
          )}
        </div>
      )
    }
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} notificationType={notificationType}/>

      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in {logoutButton()}</p>
        </div>
      )}
      {user && (
        <div>
          <h2>Create a new blog</h2>
          {blogForm()}
        </div>
      )}
      {blogsToShow()}
    </div>
  )
}

export default App