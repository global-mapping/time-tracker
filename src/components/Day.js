import React, { Component } from 'react'

class Day extends Component {
  state = {
    message: '',
  }

  handleChangeMessage = e => {
    e.preventDefault()
    this.setState({ message: e.value })
  }

  render() {
    const { date, isToday } = this.props
    const { message } = this.state

    return (
      <div className={`day ${isToday ? 'today' : ''}`}>
        <div className="flex-row flex-center">{date}</div>
        <textarea className="message" value={message} onChange={this.handleChangeMessage} />
      </div>
    )
  }
}

export default Day
