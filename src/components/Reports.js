import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reportByWeek as reportByWeekAction } from '../actions'
import UserWeekReport from './UserWeekReport'
import moment from 'moment'

moment.locale('es')
const numDays = new Array(7)
numDays.fill(1)

class Reports extends Component {
  state = {
    start: null,
  }

  getDateKey = date => `${date.year()}-${date.month() + 1}-${date.date()}`

  componentWillMount = () => {
    const start = moment()
      .startOf('isoWeek')
      .subtract(1, 'day')
    this.setState({ start })
  }

  async componentDidMount() {
    const { reportByWeek } = this.props
    const { start } = this.state
    await reportByWeek(this.getDateKey(start))
  }

  handleBack = async e => {
    e.preventDefault()
    const { reportByWeek } = this.props
    const { start } = this.state
    const startBack = moment(start).subtract(1, 'week')
    await reportByWeek(this.getDateKey(startBack))
    this.setState({ start: startBack })
  }

  handleNext = async e => {
    e.preventDefault()
    const { reportByWeek } = this.props
    const { start } = this.state
    const startNext = moment(start).add(1, 'week')
    await reportByWeek(this.getDateKey(startNext))
    this.setState({ start: startNext })
  }

  render() {
    const { start } = this.state
    let curr = moment(start)
    const { report, usersList } = this.props
    const datesArray = numDays.map((i, k) => {
      curr = curr.add(1, 'day')
      return {
        dateLong: curr.format('dddd, D MMM YYYY'),
        dateKey: this.getDateKey(curr),
      }
    })

    return (
      <div className="flex-column flex-center">
        <div className="back-next">
          <a onClick={this.handleBack}>{'<- semana anterior'}</a>
          <span>
            Semana del{' '}
            <span className="start">
              {moment(start)
                .add(1, 'day')
                .format('dddd D MMM YYYY')}
            </span>{' '}
            al{' '}
            <span className="end">
              {moment(start)
                .add(1, 'week')
                .format('dddd D MMM YYYY')}
            </span>
          </span>
          <a onClick={this.handleNext}>{'semana siguiente ->'}</a>
        </div>
        {Object.keys(report).map(r => {
          let user = usersList.filter(u => u.email === r)
          user = user && user[0]
          return (
            <UserWeekReport
              key={r}
              data={report[r]}
              email={r}
              name={user && user.name}
              picture={user && user.picture}
              nickname={user && user.nickname}
              datesArray={datesArray}
            />
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = ({ data }) => ({
  report: data.report,
  usersList: data.usersList,
})

const mapDispatchToProps = dispatch => ({
  reportByWeek: start => dispatch(reportByWeekAction(start)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
