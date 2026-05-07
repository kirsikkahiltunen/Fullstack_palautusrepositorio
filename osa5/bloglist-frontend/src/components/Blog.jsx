import { useParams } from 'react-router-dom'
import { useState } from 'react'

const Blog = ({ blog, addLikes, deleteBlogs, user }) => {
  const [visible, setVisible] = useState(false)

  const id = useParams().id

  if(!blog) {
    return null
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
      <button onClick={handleDeletion}> remove </button>
    </div>
  )

  if (!user) {
    return (
    <div className='blogStyle'>
        <div>
          <h2>{blog.author}: {blog.title} </h2>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes: {blog.likes}
        </div>
        <div>
          {blog.user.name}
        </div>
      </div>
  )}
  return (
    <div className='blogStyle'>
        <div>
          <h2>{blog.author}: {blog.title}</h2>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes: {blog.likes}
          <button onClick={handleLike}> like </button>
        </div>
        <div>
          {blog.user.name}
        </div>
        {blog.user.name === user.name && removeButton()}
      </div>
  )
}
export default Blog