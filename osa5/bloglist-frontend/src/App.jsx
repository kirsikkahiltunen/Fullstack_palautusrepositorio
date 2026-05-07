import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useParams, useNavigate} from 'react-router-dom'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import CreateNewBlogForm from './components/CreateNewBlogForm'
import BlogList from './components/BlogList'
import LogoutButton from './components/LogoutButton'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()

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

  const handleLogin = async userObject => {
    try {
      const user = await loginService.login({ username: userObject.username, password: userObject.password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      navigate('/')
    } catch {
      setErrorMessage('Incorrect username or password')
      setTimeout(() => {
        setErrorMessage(null)}, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    navigate('/')
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

  const padding = {
    padding: 5
  }

  return (
    <div>
      <div>
        <Link style={padding} to='/'>blogs</Link>
        {!user ? <Link style={padding} to='/login'>login</Link>: <LogoutButton handleLogout={handleLogout}/> }
      </div>
      <Routes>
        <Route path='/' element={
          <BlogList blogs={blogs} addNewBlog={addNewBlog} addLikes={addLikes} deleteBlogs={deleteBlogs} />
        } />
        <Route path='/login' element={
          <LoginForm handleLogin={handleLogin} errorMessage={errorMessage} />
        } />
      </Routes>
    </div>
  )
}

export default App