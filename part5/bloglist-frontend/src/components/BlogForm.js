import { useState } from "react"

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

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
            <label htmlFor="title">Title:</label>
            <input name="title" type="text" onChange={handleTitle} /><br />
            <label htmlFor="author">Author:</label>
            <input name="author" type="text" onChange={handleAuthor} /><br />
            <label htmlFor="url">URL:</label>
            <input name="url" type="text" onChange={handleUrl} />
            <button>Create</button>
        </form>
    )
}

export default BlogForm