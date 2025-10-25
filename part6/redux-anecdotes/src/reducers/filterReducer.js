const filterReducer = (state = 'ALL', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.payload
    default:
      return state
  }
}

export const filterChange = (value) => {
  return {
    type: 'FILTER',
    payload: value
  }
}

export default filterReducer