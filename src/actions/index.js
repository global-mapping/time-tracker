import { save } from '../api'

export const START_SAVE = 'START_SAVE'
export const DONE_SAVE = 'DONE_SAVE'
export const PROCESS_ERROR = 'PROCESS_ERROR'

export const startSave = () => ({
  type: START_SAVE,
})

export const doneSave = () => ({
  type: DONE_SAVE,
})

export const processError = () => ({
  type: PROCESS_ERROR,
})

export const saveTimeSheets = timesheets => async dispatch => {
  dispatch(startSave())

  try {
    const { success } = await save(timesheets)
    if (success) {
      dispatch(doneSave())
    } else {
      dispatch(processError())
    }
  } catch (err) {
    dispatch(processError())
  }
}