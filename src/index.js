import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import NoMatch from './components/NoMatch'
import TimeTracker from './components/TimeTracker'
import registerServiceWorker from './registerServiceWorker'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './reducers'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import history from './history/'
import logger from 'redux-logger'
import Auth from './Auth'
import Callback from './Auth/Callback'

const auth = new Auth()
const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  applyMiddleware(middleware, logger),
)

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
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
