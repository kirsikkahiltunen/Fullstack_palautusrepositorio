import {
  Card,
  CardContent,
  Button,
  Typography,
  CardActions,
} from "@mui/material"
const User = ({ user }) => {
  return (
    <Card sx={{ maxWidth: 1600 }}>
      <Typography
        variant="h4"
        component="div"
        style={{ marginTop: 20, marginBottom: 20, marginLeft: 20 }}
        sx={{ color: "blue" }}
      >
        {user.name}
      </Typography>
      <Typography
        variant="h5"
        component="div"
        style={{ marginTop: 10, marginBottom: 10, marginLeft: 20 }}
      >
        added blogs ({user.blogs.length}):
      </Typography>
      <Typography
        variant="body1"
        style={{ marginTop: 10, marginBottom: 10, marginLeft: 80 }}
      >
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title} by {blog.author}
          </li>
        ))}
      </Typography>
    </Card>
  )
}

export default User
