import React from 'react'
import moment from 'moment'

const UserWeekReport = ({ data, email }) => {
  const username = email.slice(0, email.indexOf('@'))
  if (username === 'cpenarrieta') return null

  return (
    <div className="flex-row week">
      <div className="day-report username">{username}</div>
      {data.map(d => {
        const date = moment(d.dayKey, 'YYYY-MM-DD')
        const dateFormat = date.format('dddd, D MMM YYYY')
        return (
          <div key={d._id} className="day-report">
            <div className="flex-row flex-center">{dateFormat}</div>
            <div className="message">{d.message}</div>
          </div>
        )
      })}
    </div>
  )
}

export default UserWeekReport
