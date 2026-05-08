import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {BeatLoader} from 'react-spinners'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Popular = () => {
  const [moviesList, setMoviesList] = useState([])

  const [apiStatus, setApiStatus] = useState(
    apiStatusConstants.initial,
  )

  useEffect(() => {
    getPopularMovies()
  }, [])

  const getPopularMovies = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      'https://apis.ccbp.in/movies-app/popular-movies',
      options,
    )

    const data = await response.json()

    if (response.ok) {
      setMoviesList(data.results)

      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const renderLoadingView = () => (
    <div
      className="loader-container"
      data-testid="loader"
    >
      <BeatLoader
        color="#D81F26"
        size={15}
      />
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/movies-app-failure-view-img.png"
        alt="failure view"
        className="failure-image"
      />

      <p className="failure-text">
        Something went wrong.
        Please try again
      </p>

      <button
        type="button"
        className="try-again-button"
        onClick={getPopularMovies}
      >
        Try Again
      </button>
    </div>
  )

  const renderSuccessView = () => (
    <div className="movies-grid">
      {moviesList.map(eachMovie => (
        <Link
          to={`/movies/${eachMovie.id}`}
          key={eachMovie.id}
          className="movie-link"
        >
          <img
            src={eachMovie.poster_path}
            alt={eachMovie.title}
            className="movie-image"
          />
        </Link>
      ))}
    </div>
  )

  const renderAllViews = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoadingView()

      case apiStatusConstants.success:
        return renderSuccessView()

      case apiStatusConstants.failure:
        return renderFailureView()

      default:
        return null
    }
  }

  return (
    <div className="popular-container">
      <Header />

      <div className="popular-content">
        {renderAllViews()}
      </div>
    </div>
  )
}

export default Popular