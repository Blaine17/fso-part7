import { BrowserRouter as Router, Routes, Route, Link, Outlet} from 'react-router-dom'


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'


const UserList = ({ users }) => {

  console.log(users)
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Users</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
        {users.map(user => <tr  key={user.id}><td className='hover:text-purple-400'><Link to={`/users/${user.id}`}> {user.username}</Link></td><td>{user.blogs.length}</td></tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default UserList