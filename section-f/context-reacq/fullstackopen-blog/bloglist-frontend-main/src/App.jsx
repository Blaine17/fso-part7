import { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/loginForm'
import LogoutButton from './components/logoutButton'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'
import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  const [errorMessage, setErrorMessage] = useContext(NotificationContext)
  const [user, setUser] = useContext(UserContext)

  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({ 
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
     const blogs = queryClient.getQueryData(['blogs'])
     queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
    }
  })

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

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (removedBlog) => {
      console.log(removedBlog)
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.filter(blog => blog.id !== removedBlog.id))
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

  const createBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()
    console.log(blogObject)
    newBlogMutation.mutate(blogObject)
  }

  const handleLikeButton = async (blogToUpdate) => {
   
    updatedBlogMutation.mutate(blogToUpdate)


  }

  const handleDeleteButton = async (id) => {
    console.log('hit delete button')

    removeBlogMutation.mutate(id)
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
  
  return (
    <div>
      <LogoutButton />
      <Router>
        <Link style={padding} to='users'>users</Link>
        <Link style={padding} to='blogs'>blogs</Link>
      <Routes>
        <Route path='users/*' element={<Users/>} />
        <Route path='blogs/*' element={
          <>
             <Notification />
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
              <BlogForm createBlog={createBlog}/>
            </Togglable>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} handleLikeButton={() => handleLikeButton(blog)} handleDeleteButton={() => handleDeleteButton(blog.id)}/>
            )}
          </>
        } />
      </Routes>
      </Router>
    </div>
  )
}

export default App