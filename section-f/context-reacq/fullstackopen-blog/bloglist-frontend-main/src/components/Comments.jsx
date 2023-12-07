import { useState } from 'react'
import CommentForm from './CommentForm'

const Comments = ({ blogId, comments }) => {

  return (
    <div className='my-4'>
       <h3>Comments</h3>
       <CommentForm blogId={blogId} />
       <ul>
       {comments.length === 0
       ? <li className='round-full' key={1}>No Comments yet</li>
       : comments.map(comment => <li className='my-2 p-2 bg-gray-500 rounded-lg placeholder:p-2'key={comment._id}>{comment.body}</li>)}
       </ul>
    </div>
  )
}

export default Comments