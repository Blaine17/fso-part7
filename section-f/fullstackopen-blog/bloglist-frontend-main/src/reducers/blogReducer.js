import blogs from '../services/blogs'
import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    }, 
    editBlog(state, action) {
      const editedBlog = action.payload
      return state.map(blog => blog.id === editedBlog.id ? editedBlog : blog)
    },
    deleteBlog(state, action) {
      const id = action.payload
      const newState = state.filter(blog => blog.id !== id)
      
      return newState
    },
  }
})

export const { setBlogs, appendBlog, editBlog, deleteBlog, sortBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const newBlog = await blogService.getAll()
    const sortedBlogs = newBlog.sort((a, b) =>  {
      return b.likes - a.likes
    })
    dispatch(setBlogs(sortedBlogs))
  }
}

export const sendBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
    return async dispatch => {
    const updatedBlog = await blogService.like(blog, blog.id)
    dispatch(editBlog(updatedBlog))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(deleteBlog(id))
  }
}



export default blogSlice.reducer