import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearNotification(state, action) {
      return ''
    },
    addNotification(state, action) {
      return action.payload
    }
  }
})

export const { addNotification, clearNotification } = notificationSlice.actions

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(addNotification('You voted ' + content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer