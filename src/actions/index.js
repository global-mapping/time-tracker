import { save, list, reportByWeek as reportByWeekApi } from '../api'

export const START_SAVE = 'START_SAVE'
export const DONE_SAVE = 'DONE_SAVE'
export const START_LIST = 'START_LIST'
export const DONE_LIST = 'DONE_LIST'
export const PROCESS_ERROR = 'PROCESS_ERROR'
export const CHANGE_MESSAGE = 'CHANGE_MESSAGE'
export const UPDATE_USER = 'UPDATE_USER'
export const START_REPORT_WEEK = 'START_REPORT_WEEK'
export const DONE_REPORT_WEEK = 'DONE_REPORT_WEEK'

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

export const startReportByWeek = () => ({
  type: START_REPORT_WEEK,
})

export const doneReportByWeek = report => ({
  type: DONE_REPORT_WEEK,
  report,
})

export const updateUser = user => ({
  type: UPDATE_USER,
  user,
})

export const processError = error => ({
  type: PROCESS_ERROR,
  error,
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
      console.log('done saveTimeSheets')
      return success
    } else {
      dispatch(processError())
    }
  } catch (err) {
    dispatch(processError(err))
  }
}

export const listTimeSheets = () => async dispatch => {
  dispatch(startList())

  try {
    const timeSheets = await list()
    if (timeSheets instanceof Error === false) {
      dispatch(doneList(timeSheets))
    } else {
      dispatch(processError(timeSheets))
    }
  } catch (err) {
    dispatch(processError(err))
  }
}

export const reportByWeek = start => async dispatch => {
  dispatch(startReportByWeek())

  try {
    const report = await reportByWeekApi(start)
    if (report instanceof Error === false) {
      dispatch(doneReportByWeek(report))
    } else {
      dispatch(processError(report))
    }
  } catch (err) {
    dispatch(processError(err))
  }
}

export const updateUserInfo = auth => dispatch => {
  const accessToken = localStorage.getItem('access_token')
  auth.auth0.client.userInfo(accessToken, (err, user) => {
    if (err) {
      auth.logout()
    } else {
      const admins = process.env.REACT_APP_ADMINS.split(',')
      const isAdmin = admins.includes(user.email)
      dispatch(updateUser(Object.assign({}, user, { isAdmin })))
    }
  })
}
