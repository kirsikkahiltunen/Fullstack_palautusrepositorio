import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Blog from './Blog'
import SuccessNotification from './SuccessNotification'
import CreateNewBlogForm from './CreateNewBlogForm'
import Togglable from './Togglable'

const BlogList = ({ blogs, addNewBlog, addLikes, deleteBlogs, successMessage, user}) => {

  const createNewBlogFormRef = useRef()

  throw new Error('simulated error')


  return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification message={successMessage}/>
      {blogs.map(blog =>
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
        </li>
      )}
    </div>
  )
}

export default BlogList