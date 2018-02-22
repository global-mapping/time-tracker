import React, { Component } from 'react'

class UserWeekReport extends Component {
  arrayToHash = data => {
    let obj = {}
    data.forEach(d => {
      obj[d.dayKey] = d
    })
    return obj
  }

  render() {
    const { data, email, datesArray } = this.props
    const username = email.slice(0, email.indexOf('@'))
    if (username === 'cpenarrieta') return null
    const timeSheetHash = this.arrayToHash(data)

    return (
      <div className="flex-row week">
        <div className="day-report username">{username}</div>
        {datesArray.map(({ dateLong, dateKey }, k) => {
          return (
            <div key={`${username}_day_week_${k}`} className="day-report">
              <div className="flex-row flex-center date-report">{dateLong}</div>
              <div className="message">
                {(timeSheetHash[dateKey] && timeSheetHash[dateKey].message) || ''}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default UserWeekReport
