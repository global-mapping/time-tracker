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

  componentWillMount = () => {
    const start = moment()
      .startOf('isoWeek')
      .subtract(1, 'day')
    this.setState({ start })
  }

  async componentDidMount() {
    const { reportByWeek } = this.props
    await reportByWeek()
  }

  getDateKey = date => `${date.year()}-${date.month() + 1}-${date.date()}`

  handleBack = e => {
    e.preventDefault()
    const { start } = this.state
    const startBack = moment(start).subtract(1, 'week')
    this.setState({ start: startBack })
  }

  handleNext = e => {
    e.preventDefault()
    const { start } = this.state
    const startNext = moment(start).add(1, 'week')
    this.setState({ start: startNext })
  }

  render() {
    const { start } = this.state
    let curr = moment(start)
    const { report } = this.props
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
          <a onClick={this.handleBack}>{'<- back'}</a>
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
          <a onClick={this.handleNext}>{'next ->'}</a>
        </div>
        {Object.keys(report).map(r => (
          <UserWeekReport key={r} data={report[r]} email={r} datesArray={datesArray} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ data }) => ({
  report: data.report,
})

const mapDispatchToProps = dispatch => ({
  reportByWeek: () => dispatch(reportByWeekAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
