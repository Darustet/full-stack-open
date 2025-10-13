import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, owner}) => {
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

  const handleDelete = () => {
    const text = "Do you want to permanently remove " + blog.title + " from bloglist?"
    if (confirm(text) == true) {
      const blogToDelete = blog
      deleteBlog(blogToDelete)
    }
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
        <div>
          {owner && <button onClick={handleDelete}>remove</button>}
        </div>
      </div>
    </div>
  )
}

export default Blog