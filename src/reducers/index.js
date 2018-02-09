import {
  START_SAVE,
  DONE_SAVE,
  START_LIST,
  DONE_LIST,
  UPDATE_USER,
  CHANGE_MESSAGE,
  PROCESS_ERROR,
} from '../actions'

const initialState = {
  user: {},
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
    case UPDATE_USER: {
      return { ...state, user: action.user }
    }
    default:
      return state
  }
}

export default {
  data: reducer,
}
