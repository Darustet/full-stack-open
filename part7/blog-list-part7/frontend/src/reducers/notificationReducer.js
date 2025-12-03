import { createSlice } from '@reduxjs/toolkit'

const initialState = ('', '')

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearNotification() {
      return ('','')
    },
    addNotification(state, action) {
      return action.payload
    }
  }
})

export const { addNotification, clearNotification } = notificationSlice.actions

export const setNotification = (content) => {
  return async dispatch => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }
}

export default notificationSlice.reducer