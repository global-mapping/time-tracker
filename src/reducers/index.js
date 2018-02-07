import { START_SAVE, DONE_SAVE, PROCESS_ERROR } from '../actions'

const initialState = {
  user: {
    name: 'cristian',
  },
  timeSheets: [],
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
    default:
      return state
  }
}

export default {
  data: reducer,
}
