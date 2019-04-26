import React, { Component } from 'react'

class App extends Component {
  login = async e => {
    e.preventDefault()
    this.props.auth.login()
  }

  render() {
    return (
      <div className="App">
        <div className="login-title">Global Mapping Time Tracker</div>
        <div className="button -green center" onClick={this.login}>
          Iniciar Sesión
        </div>
      </div>
    )
  }
}

export default App
