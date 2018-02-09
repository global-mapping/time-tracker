import {
  START_SAVE,
  DONE_SAVE,
  START_LIST,
  DONE_LIST,
  PROCESS_ERROR,
  CHANGE_MESSAGE,
} from '../actions'

const initialState = {
  user: {
    email: '',
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
    case START_LIST:
      return { ...state }
    case DONE_LIST: {
      const { timeSheets } = action
      const timeSheetsHashMap = {}
      timeSheets.forEach(({ dayKey, message }) => {
        timeSheetsHashMap[dayKey] = message
      })
      return { ...state, timeSheets: timeSheetsHashMap }
    }
    case PROCESS_ERROR:
      return { ...state }
    case CHANGE_MESSAGE: {
      const { message, key } = action.payload
      const timeSheets = Object.assign({}, state.timeSheets)
      timeSheets[key] = message
      return { ...state, timeSheets }
    }
    default:
      return state
  }
}

export default {
  data: reducer,
}
