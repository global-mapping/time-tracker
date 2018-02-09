import { save, list } from '../api'

export const START_SAVE = 'START_SAVE'
export const DONE_SAVE = 'DONE_SAVE'
export const START_LIST = 'START_LIST'
export const DONE_LIST = 'DONE_LIST'
export const PROCESS_ERROR = 'PROCESS_ERROR'
export const CHANGE_MESSAGE = 'CHANGE_MESSAGE'
export const UPDATE_USER = 'UPDATE_USER'

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

export const updateUser = user => ({
  type: UPDATE_USER,
  user,
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

export const updateUserInfo = auth0 => dispatch => {
  const accessToken = localStorage.getItem('access_token')
  auth0.client.userInfo(accessToken, (err, user) => {
    if (err) {
      // handle token expired
    } else {
      const admins = process.env.REACT_APP_ADMINS.split(',')
      const isAdmin = admins.includes(user.email)
      dispatch(updateUser(Object.assign({}, user, { isAdmin })))
    }
  })
}
