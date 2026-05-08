import Cookies from 'js-cookie'

import {useNavigate} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Account = () => {
  const navigate = useNavigate()

  const username = localStorage.getItem('username')

  const password = localStorage.getItem('password')

  const onClickLogout = () => {
    Cookies.remove('jwt_token')

    navigate('/login')
  }

  return (
    <div className="account-container">
      <Header />

      <div className="account-content">
        <h1 className="account-heading">Account</h1>

        <hr className="line" />

        <div className="membership-container">
          <p className="membership-heading">Member ship</p>

          <div>
            <p className="membership-text">{username}</p>

            <p className="membership-text">
              Password : ************
            </p>
          </div>
        </div>

        <hr className="line" />

        <div className="plan-container">
          <p className="membership-heading">Plan details</p>

          <div className="plan-details">
            <p className="membership-text">Premium</p>

            <p className="ultra-hd">Ultra HD</p>
          </div>
        </div>

        <hr className="line" />

        <div className="logout-container">
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="footer-container">
        <p className="contact-text">Contact Us</p>
      </div>
    </div>
  )
}

export default Account