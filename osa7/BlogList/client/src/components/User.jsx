const User = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs ({user.blogs.length}):</h3>
      <div>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title} by {blog.author}
          </li>
        ))}
      </div>
    </div>
  )
}

export default User
