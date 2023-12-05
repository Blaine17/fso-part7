import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    set(state, action) {
      const message = action.payload
      return message
    },
    clear(state, action) {
      return null
    }
  }
})

export const setNotification = (content, seconds) => {
  return async dispatch => {
    dispatch(set(content))
    setTimeout(()=> {
      dispatch(clear())
    }, seconds * 1000)
  }
}

export const { set, clear } = notificationSlice.actions

export default notificationSlice.reducer