import { useState, useEffect } from 'react'
import Notification from './components/Notification'
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
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in to application</h2>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const logoutButton = () => (
    <button onClick={handleLogout} type="submit">logout</button>
  )

  const addBlog = (event) => {
    event.preventDefault()

    if (!newTitle || !newAuthor || !newUrl) {
      handleNotification("Please fill all fields when creating a new blog.")
      return null
    }

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      blogService.getAll().then(blogs => setBlogs(blogs))
      handleNotification('Added new blog ' + newTitle + ' by ' + newAuthor, 'success')
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    })
  }

  const blogForm = () => (
    <form onSubmit={addBlog} style={{ marginBottom: 20 }}>
      <div>
        <label>
          title:
          <input 
            type="text"
            value={newTitle} 
            onChange={({ target }) => setNewTitle(target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input 
            type="text"
            value={newAuthor} 
            onChange={({ target }) => setNewAuthor(target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input 
            type="text"
            value={newUrl} 
            onChange={({ target }) => setNewUrl(target.value)} 
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )

  const blogsToShow = () => {
    if (user !== null) {
      return (
        <div>
          {blogs.map(blog =>
            blog.user && user.username === blog.user.username
              ? <Blog key={blog.id} blog={blog} />
              : null
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