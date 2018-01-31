import auth0 from 'auth0-js'
import history from '../history/'

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: process.env.REACT_APP_DOMAIN,
    clientID: process.env.REACT_APP_CLIENT_ID,
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    audience: process.env.REACT_APP_AUDIENCE,
    responseType: process.env.REACT_APP_RESPONSE_TYPE,
    scope: process.env.REACT_APP_SCOPE,
  })

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
      } else if (err) {
        history.replace('/')
        console.log(err)
      }
    })
  }

  setSession = authResult => {
    let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    history.replace('/time-tracker')
  }

  logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    history.replace('/')
  }

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  login = () => {
    this.auth0.authorize()
  }
}
