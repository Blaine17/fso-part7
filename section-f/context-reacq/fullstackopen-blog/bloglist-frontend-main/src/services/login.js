import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  console.log('inside login sevices')
  console.log(credentials)
  const response = await axios.post(baseUrl, credentials)
  console.log('line 7', response.status)
  return response.data
}

export default { login }