import { useState } from "react"
import blogService from '../services/blogs'

const BlogForm = () => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const handleClick = event => {
        event.preventDefault()

        const blogObj = {
            title: title,
            author: author,
            url: url
        }

        blogService
            .create(blogObj)
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
        <>
            <h2>Create new</h2>
            <form>
                <label htmlFor="title">Title:</label>
                <input name="title" type="text" onChange={handleTitle} /><br />
                <label htmlFor="author">Author:</label>
                <input name="author" type="text" onChange={handleAuthor} /><br />
                <label htmlFor="url">URL:</label>
                <input name="url" type="text" onChange={handleUrl} />
                <button onClick={handleClick}>Create</button>
            </form>
        </>
    )
}

export default BlogForm