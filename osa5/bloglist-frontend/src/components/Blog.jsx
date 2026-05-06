import { useState } from 'react'

const Blog = ({ blog, addNewLike, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = event => {
    event.preventDefault()
    addNewLike({
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
      removeBlog({
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

  if (visible) {
    return (
      <div className='blogStyle'>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>
              hide
          </button>
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
  return (
    <div className='blogStyle'>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>
        view
      </button>
    </div>
  )
}
export default Blog