import auth0 from 'auth0-js'
import history from '../history/'

const {
  REACT_APP_DOMAIN,
  REACT_APP_CLIENT_ID,
  REACT_APP_REDIRECT_URI,
  REACT_APP_AUDIENCE,
  REACT_APP_RESPONSE_TYPE,
  REACT_APP_SCOPE,
} = process.env

export default class Auth {
  constructor() {
    this.isAdmin = false
  }

  auth0 = new auth0.WebAuth({
    domain: REACT_APP_DOMAIN,
    clientID: REACT_APP_CLIENT_ID,
    redirectUri: REACT_APP_REDIRECT_URI,
    audience: REACT_APP_AUDIENCE,
    responseType: REACT_APP_RESPONSE_TYPE,
    scope: REACT_APP_SCOPE,
  })

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken && authResult.idTokenPayload) {
        this.setSession(authResult)
      } else if (err) {
        console.log(err)
        history.replace('/')
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
