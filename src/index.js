import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import NoMatch from './components/NoMatch'
import TimeTracker from './components/TimeTracker'
import Reports from './components/Reports'
import Users from './components/Users'
import registerServiceWorker from './registerServiceWorker'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './reducers'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import history from './history/'
import logger from 'redux-logger'
import Auth from './Auth'
import Callback from './Auth/Callback'
import { getUser } from './api'

const auth = new Auth()
const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  applyMiddleware(middleware, logger, thunk),
)

const handleAuthentication = async (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

const roles = {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
}

class AdminRoute extends Component {
  state = {
    user: null,
    userDispached: false,
  }

  dispatchUser = () => {
    getUser()
      .then(user => {
        this.setState({ user, userDispached: true })
      })
      .catch(() => this.setState({ user: null, userDispached: true }))
  }

  render() {
    const { component: Component, ...rest } = this.props
    const { user, userDispached } = this.state

    return (
      <Route
        {...rest}
        render={props => {
          if (!auth.isAuthenticated()) {
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          } else if (userDispached) {
            if (user && user.role === roles.ADMIN) {
              return <Component {...props} user={user} />
            } else {
              return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            }
          } else {
            this.dispatchUser()
          }
          return null
        }}
      />
    )
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated() ? (
        <Component {...props} auth={auth} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    }
  />
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          path="/"
          render={props =>
            !auth.isAuthenticated() ? (
              <App auth={auth} {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/time-tracker',
                  state: { from: props.location },
                }}
              />
            )
          }
        />
        <PrivateRoute exact path="/time-tracker" component={TimeTracker} />
        <AdminRoute exact path="/reportes" component={Reports} />
        <AdminRoute exact path="/users" component={Users} />
        <Route
          exact
          path="/callback"
          render={props => {
            handleAuthentication(props)
            return <Callback {...props} />
          }}
        />
        <Route component={NoMatch} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
