import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [show, setShow] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [alertMessage, setAlertMessage] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService
        .getAll()
        .then(blogs => {
          blogs.sort((a, b) => b.likes || 0 - a.likes || 0)
          setBlogs(blogs)
        }
        )
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setAlertMessage('')
    } catch (exception) {
      setTimeout(() => {
        setAlertMessage('Wrong username or password')
      }, 2000)

    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser('')
    setAlertMessage('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <p>{alertMessage}</p>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogObject.user = user

    blogService
      .create(blogObject)
      .then(response => {
        setAlertMessage(`a new blog ${response.title} by ${response.author} added`)
      })
      .then(() =>  blogService
        .getAll()
        .then(blogs => setBlogs( blogs )))
  }

  const handleAddNewLike = () => {
    blogService
      .getAll()
      .then(blogs => {
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs( blogs )}
      )
  }

  return (
    <div>
      {!user && loginForm()}
      {user && <>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        <p>{alertMessage}</p>
        <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
          <h2>Create new</h2>
          <BlogForm createBlog={addBlog}/>
        </Togglable>
        <h2>blogs</h2>
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} toggleBlogInfo={() => setShow(!show)} addNewLike={handleAddNewLike}/>
          )}
      </>
      }
    </div>
  )
}

export default App