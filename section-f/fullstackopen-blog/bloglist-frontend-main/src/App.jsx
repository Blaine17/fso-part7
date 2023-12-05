import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/loginForm'
import LogoutButton from './components/logoutButton'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogReducer, { initializeBlogs, sendBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import notificationReducer, { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from './reducers/userReducer'


const App = () => {
  // const [blogs, setBlogs] = useState([])
  // const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const blogs = useSelector(({blogs}) => blogs)
  const user = useSelector(({user}) => user)
  console.log(blogs)

  useEffect(() => {
    console.log('inside use effect')
    dispatch(initializeBlogs())
    // blogService.getAll()
    //   .then(blogs => {
    //     const sortedBlogs = blogs.sort((a, b) =>  {
    //       return b.likes - a.likes
    //     })
    //     console.log(sortedBlogs[0])
    //     setBlogs( sortedBlogs )
    //   })
  }, [])

  //check is user logged in and update state if so
  useEffect(() => {
    console.log('inside login effect')
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON)
    console.log(user)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  

  const createBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    console.log(blogObject)
    dispatch(sendBlog(blogObject))
    dispatch(setNotification({ type: 'success',
    message: 'created blog' }, 5))
  }

  const handleLikeButton = async (id) => {
    console.log('hit like button')

    const updatedBlog = blogs.find(blog => blog.id === id)
    console.log(id)
    console.log(updatedBlog)
    dispatch(likeBlog(updatedBlog))
    dispatch(setNotification({ type: 'success',
    message: 'liked blog' }, 5))
  }

  const handleDeleteButton = async (id) => {
    if (window.confirm('Do you really want to delete?')) {
      dispatch(removeBlog(id))
      dispatch(setNotification({ type: 'success',
    message: 'removed blog' }, 5))
    }

    // try {
    //   if (window.confirm('Do you really want to delete?')) {
    //     await blogService.remove(id)
    //     console.log(deleteBlog)
    //     // const deleteBlog = blogs.find(blog => blog.id === id)
    //     const updatedBlogs = blogs.filter(blog => blog.id !== id)
    //     setBlogs(updatedBlogs)
    //     dispatch(setNotification({ type: 'success',
    //   message: 'removed blog' }, 5))
    //   }
    //   return
    // } catch (exception) {
    //   dispatch(setNotification({ type: 'error',
    //   message: 'unable to delete' }, 5))
    
    // }
  }


  console.log(user)
  if (user === null) {
    return (
      <>
        <Togglable buttonLabel='login'>
          <LoginForm errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
        </Togglable>
      </>
    )
  }


  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <LogoutButton user={user} setUser={setUser}/>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm setErrorMessage={setErrorMessage} createBlog={createBlog}/>
      </Togglable>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} user={user} blog={blog} handleLikeButton={() => handleLikeButton(blog.id)} handleDeleteButton={() => handleDeleteButton(blog.id)}/>
      )}
    </div>
  )
}

export default App