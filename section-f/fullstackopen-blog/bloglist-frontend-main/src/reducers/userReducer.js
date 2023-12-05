import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

// logn and save user to local storage, 
const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      console.log(action.payload)
      return action.payload
    },
    logoutUser(state, action) {
      return null
    }
  }
})

export const loginUser = (loginParms) => {
  console.log(loginParms)
  return async dispatch => {
    const user = await loginService.login(loginParms)
    blogService.setToken(user.token)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    console.log(user)
    dispatch(setUser(user))
  }
}
export const { setUser, logoutUser } = userSlice.actions
export default userSlice.reducer 