import React, { Component } from 'react'

const areas = {
  TOPOGRAFIA: '#AED6F1',
  GEOMATICA: '#D7BDE2',
  ADMINISTRACION: '#F5B7B1',
  OPERACIONES: '#F9E79F',
}

class UserWeekReport extends Component {
  arrayToHash = data => {
    let obj = {}
    data.forEach(d => {
      obj[d.dayKey] = d
    })
    return obj
  }

  render() {
    const { data, email, datesArray, name, picture, nickname, area } = this.props
    if (nickname === 'cpenarrieta') return null
    const timeSheetHash = this.arrayToHash(data)

    return (
      <div className="flex-row week">
        <div className="day-report username">
          <a href={`mailto:${email}`} target="_blank">
            {name}
          </a>
          <img src={picture} alt={'profile pic'} />
          <div className="label" style={{ backgroundColor: areas[area] || '#EAEDED' }}>
            {area}
          </div>
        </div>
        {datesArray.map(({ dateLong, dateKey }, k) => {
          return (
            <div key={`${nickname}_day_week_${k}`} className="day-report">
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
