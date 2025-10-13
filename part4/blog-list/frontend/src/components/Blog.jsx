import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  //const [likes, setLikes] = useState(0)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikes = () => {
    const updatedBlog = blog
    updatedBlog.likes++
    updateBlog(updatedBlog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {<button onClick={toggleVisibility}>{!visible ? "view" : "hide"}</button>}
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          likes: {blog.likes} {<button onClick={handleLikes}>like</button>}
        </div>
        <div>
          {blog.author}
        </div>
      </div>
    </div>
  )
}

export default Blog