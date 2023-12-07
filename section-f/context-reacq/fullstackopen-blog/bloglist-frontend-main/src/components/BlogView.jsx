import { useState } from 'react'
import { useUserValue } from '../UserContext'
import Comments from './Comments'
import { BrowserRouter as Router, Routes, Route, Link, useParams} from 'react-router-dom'



const Blog = ({ blogs, handleLikeButton, handleDeleteButton }) => {

  console.log('made it to blogview')
  const [preview, setPreview] = useState(true)
  const user = useUserValue()

  const handleButtonClick = () => {
    setPreview(!preview)
  }

  const id = useParams().id

  const blog = blogs.find(blog => blog.id === id)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


    return (
      <div>
        <h2 className='font-bold text-2xl text-purple-600'>{blog.title}</h2>
        <div><a className='underline  text-purple-400' href={blog.url}>{blog.url}</a></div>
        <div>{blog.likes}
          <button className='m-1 px-2 rounded-lg bg-purple-600 hover:bg-purple-400' onClick={() => handleLikeButton(blog)}>like</button>
        </div>
        {`added by ${blog.user.name}`}
        <div>
          {user.username === blog.user.username
            ? <button onClick={() => handleDeleteButton(blog.id)}>Remove </button>
            : <div></div>}
            <Comments blogId={blog.id} comments={blog.comments} />
        </div>
      </div>
    )
}

export default Blog