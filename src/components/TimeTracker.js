import React, { Component } from 'react'
import { connect } from 'react-redux'
import Day from './Day'
import {
  saveTimeSheets as saveTimeSheetsAction,
  listTimeSheets as listTimeSheetsAction,
  me as meAction,
} from '../actions'
import moment from 'moment'
import 'moment/locale/es'
import SweetAlert from 'sweetalert-react'

moment.locale('es')
const numDays = new Array(7)
numDays.fill(1)

class TimeTracker extends Component {
  state = {
    show: false,
    loading: false,
  }

  async componentDidMount() {
    const { listTimeSheets, me } = this.props
    this.setState({ loading: true })
    await me()
    await listTimeSheets()
    this.setState({ loading: false })
  }

  logout = e => {
    e.preventDefault()
    this.props.auth.logout()
  }

  handleSave = async () => {
    const { timeSheets, saveTimeSheets, userId } = this.props
    const success = await saveTimeSheets({ timeSheets, userId })
    if (success) {
      this.setState({ show: true })
    }
  }

  handleReports = () => {
    this.props.history.push('/reportes')
  }

  handleUsuarios = () => {
    this.props.history.push('/users')
  }

  getDateKey = date => `${date.year()}-${date.month() + 1}-${date.date()}`

  render() {
    const { email, isAdmin, isAllReports } = this.props
    const today = moment()
    const start = moment()
      .subtract(1, 'week')
      .startOf('isoWeek')
      .subtract(1, 'day')
    let curr = moment(start)

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
          {isAllReports && (
            <div className="button -alge center" onClick={this.handleUsuarios}>
              Usuarios
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
        <SweetAlert
          show={this.state.show}
          title="Listo"
          text="Data Guadada con exito"
          onConfirm={() => this.setState({ show: false })}
          onEscapeKey={() => this.setState({ show: false })}
          onOutsideClick={() => this.setState({ show: false })}
        />
        <SweetAlert show={this.state.loading} title="Loading" text="Cargando data..." />
      </div>
    )
  }
}

const mapStateToProps = ({ data }) => ({
  timeSheets: data.timeSheets,
  email: data.user ? data.user.email : '',
  userId: data.user ? data.user._id : '',
  isAdmin: data.user ? data.user.isAdmin : false,
  isAllReports: data.user ? data.user.isAllReports : false,
})

const mapDispatchToProps = dispatch => ({
  saveTimeSheets: timesheets => dispatch(saveTimeSheetsAction(timesheets)),
  listTimeSheets: () => dispatch(listTimeSheetsAction()),
  me: () => dispatch(meAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TimeTracker)
