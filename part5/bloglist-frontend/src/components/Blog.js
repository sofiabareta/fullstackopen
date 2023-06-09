import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, toggleBlogInfo, addNewLike }) => {
  const [likes, setLikes] = useState(blog.likes || 0)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (!blog.user) return null

  const addLike = async () => {

    blog.likes = blog.likes + 1 || 1

    const response = await blogService.update(blog.id, blog)

    try {
      addNewLike()
      setLikes(response.likes)
    } catch (exception){
      console.log(exception)
    }
  }

  const removeBlog = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      return null
    }

    await blogService.remove(blog.id, blog)
  }

  return (
    <div style={blogStyle} className='blog'>
      <span>{blog.title}</span>
      <span>{blog.author}</span>
      <button onClick={toggleBlogInfo} className='button__toggle'>{toggleBlogInfo ? 'hide' : 'show'}</button>
      <div style={{ display: toggleBlogInfo ? 'block' : 'none' }}>
        <p>{blog.url}</p>
        <span>likes {likes}</span>
        <button onClick={addLike} id="button__like">like</button>
        <p>{user.name}</p>
        {
          user.id && blog.user.id &&
          user.id === blog.user.id &&
            <button onClick={removeBlog}>Remove</button>
        }
      </div>
    </div>
  )
}
export default Blog