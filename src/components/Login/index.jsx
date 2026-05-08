import {useState} from 'react'
import {useNavigate, Navigate} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [showSubmitError, setShowSubmitError] = useState(false)

  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    localStorage.setItem('username', username)
    localStorage.setItem('password', password)

    navigate('/', {replace: true})
  }

  const onSubmitFailure = errorMessage => {
    setShowSubmitError(true)

    setErrorMsg(errorMessage)
  }

  const submitForm = async event => {
    event.preventDefault()

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }

  return (
    <div className="login-bg-container">
     <img
  src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426908/lg-devices-logo_rpfa68.png"
  alt="login website logo"
  className="login-logo"
/>

      <form className="login-form-container" onSubmit={submitForm}>
        <h1 className="login-heading">Login</h1>

        <label className="label" htmlFor="username">
          USERNAME
        </label>

        <input
          type="text"
          id="username"
          className="input"
          placeholder="Username"
          value={username}
          onChange={onChangeUsername}
        />

        <label className="label" htmlFor="password">
          PASSWORD
        </label>

        <input
          type="password"
          id="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
        />

        <button type="submit" className="login-button">
          Login
        </button>

        {showSubmitError && (
          <p className="error-message">*{errorMsg}</p>
        )}
      </form>
    </div>
  )
}

export default Login