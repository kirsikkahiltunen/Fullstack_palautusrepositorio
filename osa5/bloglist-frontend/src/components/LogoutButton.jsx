const LogoutButton = ({ handleLogout }) => {

  const newLogout = async (event) => {
    event.preventDefault()
    handleLogout()
  }


  return (
      <button onClick={newLogout}>logout</button>
  )
}
export default LogoutButton