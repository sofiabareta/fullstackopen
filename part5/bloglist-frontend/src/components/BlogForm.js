import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = event => {
    event.preventDefault()

    const blogObj = {
      title: title,
      author: author,
      url: url
    }

    createBlog(blogObj)
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
    <form onSubmit={handleCreateBlog}>
      <label htmlFor="title" id="title">Title:</label>
      <input name="title" aria-labelledby="title" type="text" onChange={handleTitle} /><br />
      <label htmlFor="author" id="author">Author:</label>
      <input name="author" aria-labelledby="author" type="text" onChange={handleAuthor} /><br />
      <label htmlFor="url" id="url">URL:</label>
      <input name="url" aria-labelledby="url" type="text" onChange={handleUrl} />
      <button type="submit">Create</button>
    </form>
  )
}

export default BlogForm