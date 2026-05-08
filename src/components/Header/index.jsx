import {useState} from 'react'

import {Link, useNavigate} from 'react-router-dom'

import {HiOutlineSearch} from 'react-icons/hi'

import './index.css'

const Header = () => {
  const [searchInput, setSearchInput] = useState('')

  const navigate = useNavigate()

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearch = () => {
    navigate(`/search?search=${searchInput}`)
  }

  const onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      onClickSearch()
    }
  }

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426908/lg-devices-logo_rpfa68.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>

        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/popular" className="nav-link">
          Popular
        </Link>
      </div>

      <div className="nav-right">
        <div className="header-search-container">
          <input
            type="search"
            placeholder="Search"
            className="header-search-input"
            value={searchInput}
            onChange={onChangeSearchInput}
            onKeyDown={onKeyDownSearch}
          />

          <button
            type="button"
            className="header-search-button"
            onClick={onClickSearch}
            data-testid="searchButton"
          >
            <HiOutlineSearch className="search-icon" />
          </button>
        </div>

        <Link to="/account">
          <img
            src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426927/account-avatar_irmhck.png"
            alt="profile"
            className="profile-image"
          />
        </Link>
      </div>
    </nav>
  )
}

export default Header