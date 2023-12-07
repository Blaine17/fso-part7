import {
  useParams, 
} from 'react-router-dom'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, redirect} from 'react-router-dom'



const UserBlogs = ({ user }) => {
  const navigate = useNavigate()
  const id = useParams().id
  console.log(id)

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll()
    .then(blogs => {
      return blogs.sort((a, b) =>  {
        b.likes - a.likes
      })
    }),
    refetchOnWindowFocus: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  const filteredData = result.data.filter(blog => blog.user.id === id);

  // if (result.isLoading) {
  //   return null 
  // }
  const handleClick = (blog) => {
    console.log('clicked')
    navigate(`/blogs/${blog.id}`)
  }
  console.log(user)
  if(!user) {
    return null
  }
  
  return (
    <>
    <h2>{user.username}</h2>
    <h3>added blogs</h3>
    <ul>
       {filteredData.map(blog => <li onClick={() => handleClick(blog)} key={blog.id}>
          <div className='m-2 p-2 border-2 rounded-lg border-2text-lg hover:text-purple-400 hover:border-purple-400'>{blog.title}</div>
        </li>)}
    </ul>
    </>
    
  )
}

export default UserBlogs