import { useParams, useNavigate } from 'react-router-dom'

const LogoutButton = ({ handleLogout }) => {
  const navigate = useNavigate()
  
  const newLogout = async (event) => {
    event.preventDefault()
    handleLogout()
    navigate('/')
  }


  return (
      <button onClick={newLogout}>logout</button>
  )
}
export default LogoutButton