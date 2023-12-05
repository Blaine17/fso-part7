import { createContext, useReducer, useContext } from "react";
import NotificationContext from "./NotificationContext";
import loginService from './services/login'
import blogService from './services/blogs'


const userReducer = (state, action) => {
  console.log('state', state)
  console.log('action', action)
  switch(action.type) {
    case 'LOGIN':
      console.log(action.payload)
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const attemptLogin = async (credentials, userDispatch) => {
  try {
    const user = await loginService.login(credentials)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    userDispatch({type: 'LOGIN', payload: user})
    console.log(user.token)
  } catch (error) {
    throw error
  } 
}


const UserContext = createContext()

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, userDispatch]} >
        {props.children}
    </UserContext.Provider>
  )
}

export default UserContext