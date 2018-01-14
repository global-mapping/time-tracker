import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import NoMatch from './components/NoMatch'
import registerServiceWorker from './registerServiceWorker'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import reducers from './reducers'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import logger from 'redux-logger'

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  applyMiddleware(middleware, logger),
)

const About = () => <div>about</div>

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/about" component={About} />
        <Route component={NoMatch} />
      </Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
