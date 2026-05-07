import { useState, useEffect, useRef } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import loginService from '../services/login'
import ErrorNotification from './ErrorNotification'
import SuccessNotification from './SuccessNotification'
import CreateNewBlogForm from './CreateNewBlogForm'
import Togglable from './Togglable'

const BlogList = ({ blogs, addNewBlog, addLikes, deleteBlogs }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const createNewBlogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification message={successMessage}/>
      <Togglable buttonLabel = "create new blog" cancelButtonLabel = "cancel" ref={createNewBlogFormRef}>
        <CreateNewBlogForm createNewBlog={addNewBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} addNewLike={addLikes} removeBlog={deleteBlogs}/>
      )}
    </div>
  )
}

export default BlogList