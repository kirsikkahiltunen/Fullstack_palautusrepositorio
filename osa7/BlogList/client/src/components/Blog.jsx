import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Card, CardContent, Button, Typography, CardActions } from '@mui/material'
import NotFound from './NotFound'

const Blog = ({ blog, addLikes, deleteBlogs, user }) => {
  const [visible, setVisible] = useState(false)

  const id = useParams().id

  if(!blog) {
    return <NotFound/>
  }

  const handleLike = event => {
    event.preventDefault()
    addLikes({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user,
      likes: blog.likes +1
    })
  }

  const handleDeletion = event => {
    event.preventDefault()
    if (window.confirm(`Do you want to remove ${blog.title} by ${blog.author}?`)){
      deleteBlogs({
        id: blog.id
      })
    } else {
      console.log('blog was not deleted')
    }
  }

  const removeButton = () => (
    <div>
      <Button onClick={handleDeletion} variant='contained' color='error'> remove </Button>
    </div>
  )

  if (!user) {
    return (
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant='h4' component='div' style={{ marginTop: 10, marginBottom: 10 }}>
            {blog.title}
          </Typography>
          <Typography variant='h5' component='div' style={{ marginTop: 10, marginBottom: 10 }}>
            by {blog.author}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            Url: {blog.url}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            Added by {blog.user.name}
          </Typography>
          <Typography variant='h6' component='div'>
            likes: {blog.likes}
          </Typography>
        </CardContent>
      </Card>
  )}
  return (
    <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant='h4' component='div' style={{ marginTop: 10, marginBottom: 10 }}>
            {blog.title}
          </Typography>
          <Typography variant='h5' component='div'style={{ marginTop: 10, marginBottom: 10 }}>
            by {blog.author}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            Url: {blog.url}
          </Typography>
          <Typography variant='body2' sx={{ color: 'text.secondary' }}>
            Added by {blog.user.name}
          </Typography>
          <Typography variant='h6' component='div'>
            likes: {blog.likes}
          </Typography>
          <CardActions>
            <Button onClick={handleLike} variant='contained'> like </Button>
            {blog.user.name === user.name && removeButton()}
          </CardActions>
        </CardContent>
    </Card>
  )
}
export default Blog