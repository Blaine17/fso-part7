import { useSelector } from "react-redux"

const Notification = ({}) => {
 
  const errorMessage = useSelector(({notification}) => notification)
  console.log(errorMessage)

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