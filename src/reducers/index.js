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
      return { ...state, error: {} }
    case DONE_SAVE:
      return { ...state, error: {} }
    case START_LIST:
      return { ...state, error: {} }
    case DONE_LIST: {
      const { timeSheets } = action
      const timeSheetsHashMap = {}
      if (timeSheets instanceof Error === false) {
        timeSheets.forEach(({ dayKey, message }) => {
          timeSheetsHashMap[dayKey] = message
        })
      }
      return { ...state, timeSheets: timeSheetsHashMap, error: {} }
    }
    case PROCESS_ERROR:
      return { ...state, error: action.error }
    case CHANGE_MESSAGE: {
      const { message, key } = action.payload
      const timeSheets = Object.assign({}, state.timeSheets)
      timeSheets[key] = message
      return { ...state, timeSheets, error: {} }
    }
    case UPDATE_USER: {
      return { ...state, user: action.user, error: {} }
    }
    default:
      return state
  }
}

export default {
  data: reducer,
}
