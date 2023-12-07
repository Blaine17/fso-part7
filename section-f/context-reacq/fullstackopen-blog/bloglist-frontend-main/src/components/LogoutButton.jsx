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
    <>
      <span className='justify-self-end m-1 p-3 col-span-3'>{`${user.name} logged in`}</span>
      <a className='justify-self-end col-span-1 m-1 p-3 rounded-lg bg-purple-600 hover:bg-purple-400' onClick={handleLogout}>logout</a>
    </>
  )
}

export default LogoutButton