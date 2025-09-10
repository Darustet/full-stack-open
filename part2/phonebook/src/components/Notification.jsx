const Notification = ({ message, style }) => {
  if (style === undefined) {
    console.log('no style defined')
    style = "notification"
  }
  if (message === null || message === '') {
    return null
  }

  return (
    <div className={style}>
      {message}   
    </div>
  )
}

export default Notification