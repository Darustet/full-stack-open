import { createContext, useReducer } from 'react'

const NotificationContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return { content: action.payload }
    case 'CLEAR_NOTIFICATION':
      return { content: '' }
    default:
      return state
  }
}

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(reducer, { content: '' })

  return (
    <NotificationContext.Provider value={{ notification, notificationDispatch: dispatch }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

