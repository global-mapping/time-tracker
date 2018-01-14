const initialState = {
  user: {
    name: 'cristian',
  },
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state }
    case 'DECREMENT':
      return { ...state }
    default:
      return state
  }
}
