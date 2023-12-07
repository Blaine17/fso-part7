import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom'
import blogService from './services/blogs'
import LoginForm from './components/loginForm'
import LogoutButton from './components/logoutButton'
import Togglable from './components/Togglable'
import Users from './components/Users'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'
import BlogWrapper from './components/BlogWrapper'
import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const [errorMessage, setErrorMessage] = useContext(NotificationContext)
  const [user, setUser] = useContext(UserContext)

  const queryClient = useQueryClient()


  const updatedBlogMutation = useMutation({
    mutationFn: blogService.like,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(blog => {
          return blog.id === updatedBlog.id
          ? updatedBlog
          : blog
      }))
    }
  })


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

  
const blogs = result.data
console.log(blogs)
console.log(JSON.parse(JSON.stringify(result)))
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      setUser({type: 'LOGIN', payload: user})
      blogService.setToken(user.token)

    }
  }, [])

  

  const handleLikeButton = async (blogToUpdate) => {
   
    updatedBlogMutation.mutate(blogToUpdate)
  }
  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  console.log(user)
  if (user === null) {
    return (
      <>
        <Togglable buttonLabel='login'>
          <LoginForm />
        </Togglable>
      </>
    )
  }

  const padding = {
    padding: 5
  }

  const scriptStyle = {
    backgroundColor: 'lightgrey',
}
  
  return (
    <div className="p-2 text-white bg-gray-600 h-full">
      <Router>
        <nav className='rounded-lg grid grid-cols-6 gap- flex-row p-1 bg-slate-800'>
        <Link className='justify-self-center m-1 p-3 col-span-1 rounded-lg bg-purple-600 hover:bg-purple-400' to='users'>users</Link>
        <Link className='justify-self-center m-1 p-3 col-span-1 rounded-lg  bg-purple-600 hover:bg-purple-400' to='blogs'>blogs</Link>
        <LogoutButton />
        </nav>
  
      <Routes>
        <Route path='users/*' element={<Users/>} />
        <Route path='blogs/*' element={<BlogWrapper blogs={blogs} handleLikeButton={handleLikeButton}/>} />
      </Routes>
      </Router>
    </div>
  )
}

export default App