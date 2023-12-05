import { useContext } from "react"
import NotificationContext, { useNotificationValue } from "../NotificationContext"

const Notification = ({  }) => {
  
  const errorMessage = useNotificationValue()

  if (errorMessage === null) {
    return (
      <div></div>
    )
  } else {
    return (
      <div className={errorMessage.type}>{errorMessage.message}</div>
    )
  }
}

export default Notification