import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import { Container } from '@mui/material'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import CreateNewBlogForm from './components/CreateNewBlogForm'
import BlogList from './components/BlogList'
import LogoutButton from './components/LogoutButton'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const navigate = useNavigate()
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(blog => blog.id === match.params.id) : null

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
    blogService.create(blogObject).then(() => {
      blogService.getAll().then(blogs =>
        setBlogs( blogs.sort(function(a, b){return a.likes - b.likes}).reverse() ))
      setSuccessMessage(`A new blog ${blogObject.title} by ${blogObject.author} added`)
      navigate('/')
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
        navigate('/')
    }
    )
  }

  const padding = {
    padding: 5
  }

  return (
    <Container>
      <div>
        <div>
          <Link style={padding} to='/'>blogs</Link>
          {user && <Link style={padding} to='/new_blog'>new_blog</Link>}
          {!user ? <Link style={padding} to='/login'>login</Link>: <LogoutButton handleLogout={handleLogout}/> }
        </div>
        <Routes>
          <Route path='/new_blog' element={
            <CreateNewBlogForm addNewBlog={addNewBlog} />
          } />
          <Route path='/blogs/:id' element={
            <Blog blog={blog} addLikes={addLikes} deleteBlogs={deleteBlogs} user={user}/>
          } />
          <Route path='/' element={
            <BlogList blogs={blogs} addNewBlog={addNewBlog} addLikes={addLikes} deleteBlogs={deleteBlogs} successMessage={successMessage} user={user}/>
          } />
          <Route path='/login' element={
            <LoginForm handleLogin={handleLogin} errorMessage={errorMessage} />
          } />
        </Routes>
      </div>
    </Container>
  )
}

export default App