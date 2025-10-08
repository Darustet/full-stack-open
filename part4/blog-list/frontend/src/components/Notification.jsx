const Notification = ({ message, notificationType }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={notificationType || "error"}>
      {message}
    </div>
  )
}

export default Notification