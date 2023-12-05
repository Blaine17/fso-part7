import { useState, useEffect } from 'react'
import userService from '../services/users'
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useMatch} from 'react-router-dom'
import UserBlogs from './UserBlogs'
import UserList from './UserList'

const BlogWrapper = ({ props }) => {

  console.log(users)
  const match = useMatch('/users/:id')
  const user = match 
    ? users.find(user => user.id === match.params.id)
    : null 

  if (!users) {
    return null
  }

  console.log(user)
  return (
    <div>
      <Routes>
        <Route path='' element={<Blogs users={users} />} />
        <Route path=':id' element={<UserBlogs user={user}/>} />
      </Routes>
    </div>
  )
}

export default Users