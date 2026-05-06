import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import CreateNewBlogForm from './components/CreateNewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(function(a, b){return a.likes - b.likes}).reverse() )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createNewBlogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('Incorrect username or password')
      setTimeout(() => {
        setErrorMessage(null)}, 5000)
    }
    console.log('logging in with', username)
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
  }

  const addNewBlog = blogObject => {
    createNewBlogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then(() => {
      blogService.getAll().then(blogs =>
        setBlogs( blogs.sort(function(a, b){return a.likes - b.likes}).reverse() ))
      setSuccessMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    })
  }

  const addLikes = blogObject => {
    blogService.addLike(blogObject.id, blogObject).then(() => {
      blogService.getAll().then(blogs =>
        setBlogs( blogs.sort(function(a, b){return a.likes - b.likes}).reverse() ))
    }
    )
  }

  const deleteBlogs = blogObject => {
    blogService.deleteBlog(blogObject.id).then(() => {
      blogService.getAll().then(blogs =>
        setBlogs( blogs.sort(function(a, b){return a.likes - b.likes}).reverse() ))
    }
    )
  }

  if (user === null) {
    return (
      <div><h2>Log in to application</h2>
        <ErrorNotification message={errorMessage}/>
        <form onSubmit={handleLogin}>
          <div>
            <label>
            username
              <input
                type='text'
                value={username}
                onChange={({ target }) =>
                  setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
            password
              <input
                type='password'
                value={password}
                onChange={({ target }) =>
                  setPassword(target.value)}
              />
            </label>
          </div>
          <button
            type='submit'>login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <SuccessNotification message={successMessage}/>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel = "create new blog" cancelButtonLabel = "cancel" ref={createNewBlogFormRef}>
        <CreateNewBlogForm createNewBlog={addNewBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} addNewLike={addLikes} removeBlog={deleteBlogs}/>
      )}
    </div>
  )
}

export default App