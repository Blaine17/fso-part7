import { createContext, useContext, useReducer } from 'react'


const errorReducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case 'SUCCESS':
      console.log({type: 'success', message: action.payload})
      return {type: 'success', message: action.payload}
    case 'ERROR':
      console.log(action)
      return {type: 'error', message: action.payload}
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [errorMessage, errorDispatch] = useReducer(errorReducer, null)

  return (
    <NotificationContext.Provider value={[errorMessage, errorDispatch]} >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
