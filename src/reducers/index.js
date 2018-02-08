import { START_SAVE, DONE_SAVE, PROCESS_ERROR, CHANGE_MESSAGE } from '../actions'

const initialState = {
  user: {
    name: 'cristian',
  },
  timeSheets: {},
  error: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case START_SAVE:
      return { ...state }
    case DONE_SAVE:
      return { ...state }
    case PROCESS_ERROR:
      return { ...state }
    case CHANGE_MESSAGE:
      const { message, key } = action.payload
      const timeSheets = Object.assign({}, state.timeSheets)
      timeSheets[key] = message
      return { ...state, timeSheets }
    default:
      return state
  }
}

export default {
  data: reducer,
}
