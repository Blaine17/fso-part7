import { useState, useEffect, useContext } from 'react'
import UserContext from '../UserContext'

const LogoutButton = () => {

  const [user, setUser] = useContext(UserContext)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser({type: 'LOGOUT'})
  }

  return (
    <div>
      {`${user.name} logged in`}
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default LogoutButton