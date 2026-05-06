import { useState, useEffect, useRef } from 'react'
import loginService from '../services/login'

const LoginForm = ({ handleLogin, handleLogout }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const newLogin = async (event) => {
    event.preventDefault()
    handleLogin({
      username: username,
      password: password
    })
    setUsername('')
    setPassword('')
  }

 
return (
    <div><h2>Log in to application</h2>
        <form onSubmit={newLogin}>
          <div>
            <label>
            username
              <input
                type='text'
                value={username}
                onChange={({ target }) =>
                  setUsername(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
            password
              <input
                type='password'
                value={password}
                onChange={({ target }) =>
                  setPassword(target.value)}
              />
            </label>
          </div>
          <button
            type='submit'>login
          </button>
        </form>
      </div>
    )
}


export default LoginForm