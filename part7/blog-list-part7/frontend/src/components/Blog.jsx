import { useState } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, updateBlog, deleteBlog, isOwner }) => {
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikes = () => {
    dispatch(setNotification({ message: `You liked '${blog.title}' by ${blog.author}`, type: 'success' }))
    const updatedBlog = blog
    updatedBlog.likes++
    updateBlog(updatedBlog)
  }

  const handleDelete = () => {
    const text =
      'Do you want to permanently remove ' + blog.title + ' from bloglist?'
    if (confirm(text) === true) {
      const blogToDelete = blog
      deleteBlog(blogToDelete)
    }
  }

  return (
    <div data-testid="blog" style={blogStyle}>
      {blog.title} {blog.author}{' '}
      {<button onClick={toggleVisibility}>{!visible ? 'view' : 'hide'}</button>}
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes: {blog.likes} {<button onClick={handleLikes}>like</button>}
        </div>
        <div>{blog.user.name}</div>
        <div>{isOwner && <button onClick={handleDelete}>remove</button>}</div>
      </div>
    </div>
  )
}

export default Blog
