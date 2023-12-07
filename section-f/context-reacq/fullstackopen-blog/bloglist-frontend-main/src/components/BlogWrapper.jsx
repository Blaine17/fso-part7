import { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import Blog from './Blog'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import Notification from './Notification'
import Togglable from './Togglable'
import UserContext from '../UserContext'
import { useContext } from 'react'
import BlogView from './BlogView'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const BlogWrapper = ({ blogs, handleLikeButton, }) => {
  const navigate = useNavigate()
  const [user, setUser] = useContext(UserContext)
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({ 
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
     const blogs = queryClient.getQueryData(['blogs'])
     queryClient.setQueryData(['blogs'], blogs.concat(newBlog))
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

  const handleDeleteButton = async (id) => {
    console.log('hit delete button')

    removeBlogMutation.mutate(id)
    navigate('/blogs')
  }

  const blogFormRef = useRef()
  console.log(blogFormRef)

  const createBlog = (blogObject) => {
    console.log(blogFormRef)
    blogFormRef.current.toggleVisibility()
    newBlogMutation.mutate(blogObject)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      setUser({type: 'LOGIN', payload: user})
      blogService.setToken(user.token)

    }
  }, [])


  return (
    <>
      <Routes>
        <Route path='' element={
           <>
           <Notification />
          <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog}/>
          </Togglable>
          <h1 className='font-bold text-2xl'>blogs</h1>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLikeButton={() => handleLikeButton(blog)} handleDeleteButton={() => handleDeleteButton(blog.id)}/>
          )}
        </>
        } />
        <Route path=':id' element={<BlogView blogs={blogs} handleLikeButton={handleLikeButton} handleDeleteButton={handleDeleteButton}/>} />
      </Routes>
    </>
  )
}

export default BlogWrapper