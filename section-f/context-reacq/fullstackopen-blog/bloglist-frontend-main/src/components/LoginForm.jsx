import { useState, useContext, useEffect } from 'react'
import Notification from './Notification'
import UserContext, { attemptLogin, useUserDispatch } from '../UserContext'
import { useNotificationDispatch } from '../NotificationContext'

const LoginForm = ({ }) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const setUser = useUserDispatch()
  const setErrorMessage = useNotificationDispatch()


  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {username, password}
    console.log('logging in with', username, password)
    try {
      await attemptLogin(credentials, setUser)
    } catch (error) {
      setErrorMessage({ type: 'ERROR',
        payload: 'wrong username or password' })
      setTimeout(() => {
        setErrorMessage({ type: 'CLEAR' })
      }, 5000)
    }    
   
  }
  return (
    <>
      <h1>log in to application</h1>
      <Notification />
      <form className='m-2' onSubmit={handleLogin}>
      
        username
          <input
            className='m-1 bg-gray-500 rounded-lg placeholder:p-2'
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          password
          <input
          className='m-1 bg-gray-500 rounded-lg placeholder:p-2'
          id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        <button className='m-1 px-2 rounded-lg bg-purple-600 hover:bg-purple-400' id='login-button' type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm