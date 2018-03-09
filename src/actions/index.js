import {
  save,
  list,
  getUsers,
  getUser,
  reportByWeek as reportByWeekApi,
  updateUserProfileApi,
} from '../api'

export const START_SAVE = 'START_SAVE'
export const DONE_SAVE = 'DONE_SAVE'
export const START_LIST = 'START_LIST'
export const DONE_LIST = 'DONE_LIST'
export const PROCESS_ERROR = 'PROCESS_ERROR'
export const CHANGE_MESSAGE = 'CHANGE_MESSAGE'
export const UPDATE_USER = 'UPDATE_USER'
export const START_REPORT_WEEK = 'START_REPORT_WEEK'
export const DONE_REPORT_WEEK = 'DONE_REPORT_WEEK'
export const DONE_LIST_USERS = 'DONE_LIST_USERS'
export const START_UPDATE_USER_PROFILE = 'START_UPDATE_USER_PROFILE'
export const DONE_UPDATE_USER_PROFILE = 'DONE_UPDATE_USER_PROFILE'

export const startSave = () => ({
  type: START_SAVE,
})

export const doneSave = () => ({
  type: DONE_SAVE,
})

export const startList = () => ({
  type: START_LIST,
})

export const startUpdateUserProfile = () => ({
  type: START_UPDATE_USER_PROFILE,
})

export const doneList = timeSheets => ({
  type: DONE_LIST,
  timeSheets,
})

export const doneListUsers = users => ({
  type: DONE_LIST_USERS,
  users,
})

export const doneUpdateUserProfile = users => ({
  type: DONE_UPDATE_USER_PROFILE,
  users,
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

export const saveTimeSheets = request => async dispatch => {
  dispatch(startSave())

  try {
    const { success } = await save(request)
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

export const updateUserProfile = user => async dispatch => {
  dispatch(startUpdateUserProfile())

  try {
    const users = await updateUserProfileApi(user)
    dispatch(doneUpdateUserProfile(users))
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

export const listUsers = () => async dispatch => {
  dispatch(startList())

  try {
    const users = await getUsers()
    if (users instanceof Error === false) {
      dispatch(doneListUsers(users))
    } else {
      dispatch(processError(users))
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

export const me = () => async dispatch => {
  dispatch(startUpdateUserProfile())

  try {
    const user = await getUser()
    dispatch(updateUser(user))
    return user
  } catch (err) {
    dispatch(processError(err))
  }
}
