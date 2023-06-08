import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [alertMessage, setAlertMessage] = useState("")

  const blogFormRef = useRef()

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )  
    }
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
        setAlertMessage("Wrong username or password")
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

  const handleCreateBlog = event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const blogObj = {
        title: title,
        author: author,
        url: url
    }

    blogService
        .create(blogObj)
        .then(response => {
          setAlertMessage(`a new blog ${response.title} by ${response.author} added`)
        })
        .then(response =>  blogService
          .getAll()
          .then(blogs => setBlogs( blogs )))
  }

  const handleAuthor = (e) => {
      setAuthor(e.target.value)
  }

  const handleTitle = (e) => {
      setTitle(e.target.value)
  }

  const handleUrl = (e) => {
      setUrl(e.target.value)
  }

  return (
    <div>
      {!user && loginForm()} 
      {user && <>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <p>{alertMessage}</p>
          <Togglable buttonLabel="New note" ref={blogFormRef}>
            <h2>Create new</h2>
            <form onSubmit={handleCreateBlog}>
                <label htmlFor="title">Title:</label>
                <input name="title" type="text" onChange={handleTitle} /><br />
                <label htmlFor="author">Author:</label>
                <input name="author" type="text" onChange={handleAuthor} /><br />
                <label htmlFor="url">URL:</label>
                <input name="url" type="text" onChange={handleUrl} />
                <button>Create</button>
            </form>
          </Togglable>
          <h2>blogs</h2>
            {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
            )}
        </>
      }
    </div>
  )
}

export default App