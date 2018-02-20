import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reportByWeek as reportByWeekAction } from '../actions'

class Reports extends Component {
  async componentDidMount() {
    const { reportByWeek } = this.props
    await reportByWeek()
  }

  render() {
    const { report } = this.props

    return <div className="flex-column flex-center">Reportes</div>
  }
}

const mapStateToProps = ({ data }) => ({
  report: data.report,
})

const mapDispatchToProps = dispatch => ({
  reportByWeek: () => dispatch(reportByWeekAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
