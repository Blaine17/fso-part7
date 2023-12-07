import { useState, useContext } from 'react'
import NotificationContext, { useNotificationDispatch, useNotificationValue} from "../NotificationContext"


const BlogForm = ({ createBlog }) => {

  // const [errorMessage, setErrorMessage] = useContext(NotificationContext)
  const setErrorMessage = useNotificationDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    console.log('post to api/blogs', title, author, url)

    try {
        await createBlog({ title: title,
        author: author,
        url: url })
      setErrorMessage({ type: 'SUCCESS',
        payload:`a new blog ${title} by ${author} added`
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setTimeout(() => {
        setErrorMessage({ type: 'CLEAR' })
      }, 5000)
    } catch (exception) {
      console.log(exception)
      setErrorMessage({ type: 'ERROR',
        message: 'something went wrong' })
      setTimeout(() => {
        setErrorMessage({ type: 'CLEAR' })
      }, 5000)
    }
  }

  return (
    <>
      <form className='m-2' onSubmit={handleBlogSubmit}>
        <div>
        title:
          <input className='m-1 bg-gray-500 rounded-lg placeholder:p-2'
            id='title'
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder='title'
          />
        </div>
        <div>
          author:
          <input className='m-1 bg-gray-500 rounded-lg placeholder:p-2'
            id='author'
            type="author"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder='author'
          />
        </div>
        <div>
          url:
          <input className='m-1 bg-gray-500 rounded-lg '
            id='url'
            type="url"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder='link to blog'
          />
        </div>
        <button className='m-1 px-2 rounded-lg bg-purple-600 hover:bg-purple-400' id='post' type="submit">post</button>
      </form>
    </>
  )
}

export default BlogForm