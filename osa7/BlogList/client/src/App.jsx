import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useMatch } from 'react-router-dom'
import { Container, AppBar, Toolbar, Button, Typography } from '@mui/material'
import blogService from './services/blogs'
import loginService from './services/login'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'
import CreateNewBlogForm from './components/CreateNewBlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import ErrorBoundary from './components/ErrorBoundary'

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

  const style = { '&:hover' : { bgcolor: 'rgba(255, 255, 255, 0.5)' } }

  return (
    <Container>
      <div>
        <div>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                Blog List App
              </Typography>
              <Button color='inherit' component={Link} to='/' sx={style}>
                blogs
              </Button>
              {user && 
                <Button color='inherit'component={Link} to='/new_blog' sx={style}>
                  new blog
                </Button>}
              {!user ? 
                <Button color='inherit'component={Link}  to='/login' sx={style}>
                  login
                </Button> :
                <Button color='inherit' onClick={handleLogout} sx={style}>
                  Logout
                </Button> }
            </Toolbar>
          </AppBar>
        </div>
        <Routes>
          <Route path='/new_blog' element={
            <ErrorBoundary>
              <CreateNewBlogForm addNewBlog={addNewBlog} />
            </ErrorBoundary>
          } />
          <Route path='/blogs/:id' element={
            <ErrorBoundary>
              <Blog blog={blog} addLikes={addLikes} deleteBlogs={deleteBlogs} user={user}/>
            </ErrorBoundary>
          } />
          <Route path='/' element={
            <ErrorBoundary>
              <BlogList blogs={blogs} addNewBlog={addNewBlog} addLikes={addLikes} deleteBlogs={deleteBlogs} successMessage={successMessage} user={user}/>
            </ErrorBoundary>
          } />
          <Route path='/login' element={
            <ErrorBoundary>
              <LoginForm handleLogin={handleLogin} errorMessage={errorMessage} />
            </ErrorBoundary>
          } />
        </Routes>
      </div>
    </Container>
  )
}

export default App