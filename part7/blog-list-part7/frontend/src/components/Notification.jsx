import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification || !notification.message) {
    console.log('no notification to show')
    console.log(notification.message)
    return null
  }

  return <div className={notification.type || 'error'}>{notification.message}</div>
}

export default Notification
