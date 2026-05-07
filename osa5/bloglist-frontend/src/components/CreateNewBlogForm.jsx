import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const CreateNewBlogForm = ({ addNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const createBlog = event => {
    event.preventDefault()
    addNewBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h3> Create new blog </h3>
      <form onSubmit={createBlog}>
        <div>
          <TextField
            label = 'title'
            value = {title}
            onChange={event => setTitle(event.target.value)} 
          />
        </div>
        <div>
          <TextField
            label = 'author'
            value = {author}
            onChange={event => setAuthor(event.target.value)} 
          />
        </div>
        <div>
          <TextField
            label = 'url'
            value = {url}
            onChange={event => setUrl(event.target.value)} 
          />
        </div>
        <Button
          type="submit" variant="contained" style={{ marginTop: 10 }}>create
        </Button>
      </form>
    </div>
  )
}
export default CreateNewBlogForm