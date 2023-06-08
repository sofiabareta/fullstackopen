import { useState } from 'react';
import blogService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [show, setShow] = useState(false)
  const [likes, setLikes] = useState(blog.likes || 0)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async () => {
    blog.likes = 1 || blog.likes + 1

    const response = await blogService.update(blog.id, blog)

    try {
      setLikes(response.likes)
    } catch (exception){
      console.log(exception)
    }

  }

  return (
    <div style={blogStyle}>
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
      {show && <>
        <p>{blog.url}</p>
        <span>likes {likes}</span>
        <button onClick={addLike}>like</button>
        <p>{user}</p>
        </>
      }
    </div>  
  )
}
export default Blog