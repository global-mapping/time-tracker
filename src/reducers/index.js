const initialState = {
  user: {
    name: 'cristian',
  },
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state }
    case 'DECREMENT':
      return { ...state }
    default:
      return state
  }
}

export default {
  user: userReducer
}