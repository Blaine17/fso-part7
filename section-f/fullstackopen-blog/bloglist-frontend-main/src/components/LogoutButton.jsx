import { useState, useEffect } from 'react'
import { setUser, logoutUser } from '../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'


const LogoutButton = ({ }) => {
  const dispatch = useDispatch()

  const user = useSelector(({user}) => user)
  const handleLogout = () => {
    console.log('hit logout')
    // event.preventDefault()
    // blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logoutUser())
  }

  return (
    <div>
      {`${user.name} logged in`}
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default LogoutButton