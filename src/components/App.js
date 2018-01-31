import React, { Component } from 'react'

class App extends Component {
  goTo = route => {
    this.props.history.replace(`/${route}`)
  }

  login = e => {
    e.preventDefault()
    this.props.auth.login()
  }

  logout = e => {
    e.preventDefault()
    this.props.auth.logout()
  }

  render() {
    return (
      <div className="App">
        <div>home page</div>
        <a onClick={this.login}>Login</a>
      </div>
    )
  }
}

export default App
