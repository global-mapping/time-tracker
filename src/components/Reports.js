import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reportByWeek as reportByWeekAction } from '../actions'
import UserWeekReport from './UserWeekReport'
import moment from 'moment'

moment.locale('es')
const numDays = new Array(7)
numDays.fill(1)

const areas = {
  TOPOGRAFIA: '#AED6F1',
  GEOMATICA: '#D7BDE2',
  ADMINISTRACION: '#F5B7B1',
  OPERACIONES: '#F9E79F',
  'TODAS LAS AREAS': '#A9DFBF',
}

class Reports extends Component {
  state = {
    start: null,
    menuAreas: {
      TOPOGRAFIA: false,
      GEOMATICA: false,
      ADMINISTRACION: false,
      OPERACIONES: false,
      'TODAS LAS AREAS': true,
    },
  }

  getDateKey = date => `${date.year()}-${date.month() + 1}-${date.date()}`

  componentWillMount = () => {
    const start = moment()
      .startOf('isoWeek')
      .subtract(1, 'day')
    this.setState({ start })
  }

  async componentDidMount() {
    const { reportByWeek } = this.props
    const { start } = this.state
    await reportByWeek(this.getDateKey(start))
  }

  handleBack = async e => {
    e.preventDefault()
    const { reportByWeek } = this.props
    const { start } = this.state
    const startBack = moment(start).subtract(1, 'week')
    await reportByWeek(this.getDateKey(startBack))
    this.setState({ start: startBack })
  }

  handleNext = async e => {
    e.preventDefault()
    const { reportByWeek } = this.props
    const { start } = this.state
    const startNext = moment(start).add(1, 'week')
    await reportByWeek(this.getDateKey(startNext))
    this.setState({ start: startNext })
  }

  menuFilterClick = area => {
    this.setState({
      menuAreas: Object.assign(
        {},
        {
          TOPOGRAFIA: false,
          GEOMATICA: false,
          ADMINISTRACION: false,
          OPERACIONES: false,
          'TODAS LAS AREAS': false,
        },
        { [area]: true },
      ),
    })
  }

  render() {
    const { start, menuAreas } = this.state
    const { report, usersList, isAdmin } = this.props
    if (!isAdmin) return null

    const selectedMenuArea = Object.entries(menuAreas).find(([k, v]) => v)[0]
    const usersWithoutReport = usersList.filter(u => {
      if (menuAreas['TODAS LAS AREAS']) {
        return !report[u.email]
      }
      return u.area === selectedMenuArea && !report[u.email]
    })

    let curr = moment(start)
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
          <a onClick={this.handleBack}>{'<- semana anterior'}</a>
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
          <a onClick={this.handleNext}>{'semana siguiente ->'}</a>
        </div>
        <div className="menu-filter">
          {Object.keys(areas).map(a => (
            <div
              key={`filter-menu-${a}`}
              className="menu-label"
              style={{
                backgroundColor: areas[a] || '#EAEDED',
                opacity: menuAreas[a] ? 1 : 0.4,
              }}
              onClick={() => this.menuFilterClick(a)}
            >
              {a}
            </div>
          ))}
        </div>
        {Object.keys(report)
          .filter(r => {
            if (menuAreas['TODAS LAS AREAS']) {
              return true
            } else {
              const user = report[r].length > 0 ? report[r][0].user : null
              const userArea = user && user.area
              return userArea === selectedMenuArea
            }
          })
          .map(r => {
            const user = report[r].length > 0 ? report[r][0].user : null
            return (
              <UserWeekReport
                key={r}
                data={report[r]}
                email={r}
                name={user && user.name}
                picture={user && user.picture}
                nickname={user && user.nickname}
                datesArray={datesArray}
                area={user && (user.area !== 'ALL_REPORTS' ? user.area : '')}
              />
            )
          })}
        {usersWithoutReport.map(user => (
          <UserWeekReport
            key={user.email}
            data={[]}
            email={user.email}
            name={user && user.name}
            picture={user && user.picture}
            nickname={user && user.nickname}
            datesArray={datesArray}
            area={user && (user.area !== 'ALL_REPORTS' ? user.area : '')}
          />
        ))}
      </div>
    )
  }
}

const mapStateToProps = ({ data }, ownProps) => ({
  report: data.report,
  usersList: data.usersList,
  isAdmin: ownProps.user ? ownProps.user.role === 'ADMIN' : false,
})

const mapDispatchToProps = dispatch => ({
  reportByWeek: start => dispatch(reportByWeekAction(start)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Reports)
