import React, {Component} from 'react'

class Day extends Component {
  render () {
    const {date} = this.props
    return (
      <div style={{borderColor: '#E74C3C', borderWidth: '1px', borderStyle: 'solid', marginBottom: '5px'}}>
        <span>Single Day</span>
        <div>{date}</div>
      </div>
    )
  }
}

export default Day
