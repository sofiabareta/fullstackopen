import { useState } from 'react';

const Blog = ({ blog, user }) => {
  const [show, setShow] = useState(false)
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <span>{blog.title} {blog.author}</span>
      <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'}</button>
      {show && <>
        <p>{blog.url}</p>
        <span>likes {blog.likes}</span>
        <button>like</button>
        <p>{user}</p>
        </>
      }
    </div>  
  )
}
export default Blog