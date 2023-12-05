import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  console.log(newObject)
  const config = {
    headers: { Authorization: token }
  }

  console.log(token)
  const response = await axios.post(baseUrl, newObject, config)
  console.log(response)
  return response.data
}

const remove = async id => {
  console.log(id)
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)

  console.log(response)
  return response.data

}

const like = async (blogObject) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log(blogObject)
  const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject, config)
  console.log(response)
  return response.data
}

export default { setToken, getAll, create, like, remove }