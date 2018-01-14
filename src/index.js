import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

const About = () => <div>about</div>

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={App}/>
      <Route exact path="/about" component={About}/>
    </div>
  </Router>, 
  document.getElementById('root')
)
registerServiceWorker()
