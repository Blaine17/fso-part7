import { useState } from 'react'
import { useUserValue } from '../UserContext'
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'



const Blog = ({ blog, handleLikeButton, handleDeleteButton }) => {

  const [preview, setPreview] = useState(true)
  const user = useUserValue()

  const handleButtonClick = () => {
    setPreview(!preview)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (preview) {
    return (
      
        <Link to={`${blog.id}`}>
          <div className='m-2 p-2 border-2 rounded-lg border-2text-lg hover:text-purple-400 hover:border-purple-400'>{blog.title}</div>
        </Link>
      
    )
  } else {
    return (
      <div className='' style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={handleButtonClick}>hide</button>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>{blog.likes}
          <button onClick={handleLikeButton}>like</button>
        </div>
        {blog.user.name}
        <div>
          {user.username === blog.user.username
            ? <button onClick={handleDeleteButton}>Remove </button>
            : <div></div>}
        </div>
      </div>
    )
  }
}

export default Blog