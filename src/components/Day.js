import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeMessage } from '../actions'

class Day extends Component {
  handleChangeMessage = e => {
    e.preventDefault()
    const { changeMessage, dateKey } = this.props
    changeMessage(e.target.value, dateKey)
  }

  render() {
    const { title, dateKey, isToday, timeSheets } = this.props
    const message = timeSheets[dateKey] || ''

    return (
      <div className={`day ${isToday ? 'today' : ''}`}>
        <div className="flex-row flex-center">{title}</div>
        <textarea className="message" value={message} onChange={this.handleChangeMessage} />
      </div>
    )
  }
}

const mapStateToProps = ({ data }) => ({
  timeSheets: data.timeSheets,
})

const mapDispatchToProps = dispatch => ({
  changeMessage: (message, key) => dispatch(changeMessage(message, key)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Day)
