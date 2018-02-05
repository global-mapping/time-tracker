import React, {Component} from 'react'
import Day from './Day'
import moment from 'moment'

const numDays = new Array(21)
numDays.fill(1)

class TimeTracker extends Component {
  logout = e => {
    e.preventDefault()
    this.props.auth.logout()
  }

  render () {
    const start = moment().subtract(1, 'week').startOf('isoWeek').subtract(1, 'day')
    let curr = start
    return (
      <div className="flex-column flex-center">
        <span>you can view this page only if you are logged in</span>
        <a onClick={this.logout}>Log out</a>
        <div>
          {numDays.map((i, k) => {
            curr = curr.add(1, 'day')
            return <Day key={`day_${k}`} date={curr.toString()} />
          })}
        </div>
      </div>
    )
  }
}

export default TimeTracker
