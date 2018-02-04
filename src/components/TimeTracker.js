import React, {Component} from 'react'

class TimeTracker extends Component {
  logout = e => {
    e.preventDefault()
    this.props.auth.logout()
  }

  render () {
    return (
      <div className="flex-column flex-center">
        <span>you can view this page only if you are logged in</span>
        <a onClick={this.logout}>Log out</a>
      </div>
    )
  }
}

export default TimeTracker
