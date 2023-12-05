import {
  useParams, 
} from 'react-router-dom'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'


const UserBlogs = ({ user }) => {

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
  console.log(user)
  if(!user) {
    return null
  }
  
  return (
    <>
    <h2>{user.username}</h2>
    <h3>added blogs</h3>
    <ul>
       {filteredData.map(blog => <li key={blog.id}>{blog.title}</li>)}
    </ul>
    </>
    
  )
}

export default UserBlogs