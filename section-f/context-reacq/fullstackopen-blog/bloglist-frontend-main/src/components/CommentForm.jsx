import { useState, useContext } from 'react'
import blogService from '../services/blogs' 
import NotificationContext, { useNotificationDispatch, useNotificationValue} from "../NotificationContext"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'


const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('')
  const queryClient = useQueryClient()

  const commentBlogMutation = useMutation({
    mutationFn: blogService.postComment,
    onSuccess: (updatedBlog) => {
      console.log(updatedBlog)
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(blog => {
          return blog.id === updatedBlog.id
          ? updatedBlog
          : blog
      }))
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(event.target)
    console.log('post to api/blogs/:id/comments')
    try {
      console.log(comment)
      commentBlogMutation.mutate({blogId, comment})
      // const response = await blogService.postComment(blogId, comment)
      setComment('')
    } catch (exception) {
      console.log(exception)
    }
    
  }

  const handleChange = (value) => {
    console.log(value)
    setComment(value)
    return 
  }

  return (
    <form onSubmit={handleSubmit}>
    <input className='bg-gray-500 rounded-lg' onChange={({ target }) => handleChange(target.value)} value={comment} />
    <button className='m-1 px-2 rounded-lg bg-purple-600 hover:bg-purple-400'>Post</button>
    </form>
  )
}

export default CommentForm 