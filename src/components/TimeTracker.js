import React, { Component } from 'react'
import { connect } from 'react-redux'
import Day from './Day'
import {
  saveTimeSheets as saveTimeSheetsAction,
  listTimeSheets as listTimeSheetsAction,
  updateUserInfo as updateUserInfoAction,
} from '../actions'
import moment from 'moment'
import 'moment/locale/es'

moment.locale('es')
const numDays = new Array(7)
numDays.fill(1)

class TimeTracker extends Component {
  async componentDidMount() {
    const { listTimeSheets, updateUserInfo, auth } = this.props
    updateUserInfo(auth.auth0)
    await listTimeSheets()
  }

  logout = e => {
    e.preventDefault()
    this.props.auth.logout()
  }

  handleSave = async () => {
    const { timeSheets, saveTimeSheets } = this.props
    await saveTimeSheets(timeSheets)
  }

  handleReports = () => {
    this.props.history.push('/reportes')
  }

  getDateKey = date => `${date.year()}-${date.month() + 1}-${date.date()}`

  render() {
    const { email, isAdmin } = this.props
    const today = moment()
    const start = moment()
      .subtract(1, 'week')
      .startOf('isoWeek')
      .subtract(1, 'day')

    let curr = start
    return (
      <div className="flex-column flex-center">
        <div className="header flex-center">
          <span>Global Mapping Time Tracker</span>
          <div className="button -blue center" onClick={this.handleSave}>
            Guardar
          </div>
          {isAdmin && (
            <div className="button -sun center" onClick={this.handleReports}>
              Reportes
            </div>
          )}
          <span>{`usuario: ${email}`}</span>
          <div className="button -salmon center" onClick={this.logout}>
            Cerrar Sesión
          </div>
        </div>
        <div className="flex-row week">
          {numDays.map((i, k) => {
            curr = curr.add(1, 'day')
            return (
              <Day
                key={`day_week1_${k}`}
                title={curr.format('dddd, D MMM YYYY')}
                dateKey={this.getDateKey(curr)}
              />
            )
          })}
        </div>
        <div className="flex-row week">
          {numDays.map((i, k) => {
            curr = curr.add(1, 'day')
            return (
              <Day
                key={`day_week2_${k}`}
                title={curr.format('dddd, D MMM YYYY')}
                dateKey={this.getDateKey(curr)}
                isToday={today.isSame(curr, 'day')}
              />
            )
          })}
        </div>
        <div className="flex-row week">
          {numDays.map((i, k) => {
            curr = curr.add(1, 'day')
            return (
              <Day
                key={`day_week3_${k}`}
                title={curr.format('dddd, D MMM YYYY')}
                dateKey={this.getDateKey(curr)}
              />
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ data }) => ({
  timeSheets: data.timeSheets,
  email: data.user ? data.user.email : '',
  isAdmin: data.user ? data.user.isAdmin : false,
})

const mapDispatchToProps = dispatch => ({
  saveTimeSheets: timesheets => dispatch(saveTimeSheetsAction(timesheets)),
  listTimeSheets: () => dispatch(listTimeSheetsAction()),
  updateUserInfo: auth0 => dispatch(updateUserInfoAction(auth0)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TimeTracker)
