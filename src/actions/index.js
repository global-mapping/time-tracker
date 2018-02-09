import { save, list } from '../api'

export const START_SAVE = 'START_SAVE'
export const DONE_SAVE = 'DONE_SAVE'
export const START_LIST = 'START_LIST'
export const DONE_LIST = 'DONE_LIST'
export const PROCESS_ERROR = 'PROCESS_ERROR'
export const CHANGE_MESSAGE = 'CHANGE_MESSAGE'

export const startSave = () => ({
  type: START_SAVE,
})

export const doneSave = () => ({
  type: DONE_SAVE,
})

export const startList = () => ({
  type: START_LIST,
})

export const doneList = timeSheets => ({
  type: DONE_LIST,
  timeSheets,
})

export const processError = () => ({
  type: PROCESS_ERROR,
})

export const changeMessage = (message, key) => ({
  type: CHANGE_MESSAGE,
  payload: {
    message,
    key,
  },
})

export const saveTimeSheets = timeSheets => async dispatch => {
  dispatch(startSave())

  try {
    const { success } = await save(timeSheets)
    if (success) {
      dispatch(doneSave())
    } else {
      dispatch(processError())
    }
  } catch (err) {
    dispatch(processError())
  }
}

export const listTimeSheets = () => async dispatch => {
  dispatch(startList())

  try {
    const timeSheets = await list()
    if (timeSheets) {
      dispatch(doneList(timeSheets))
    } else {
      dispatch(processError())
    }
  } catch (err) {
    dispatch(processError())
  }
}
