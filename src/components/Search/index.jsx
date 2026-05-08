import {useEffect, useState} from 'react'

import {useSearchParams, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {BeatLoader} from 'react-spinners'

import Header from '../Header'

import FailureView from '../FailureView'

import noMoviesImage from '../../assets/no-movies.jpg'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Search = () => {
  const [moviesList, setMoviesList] = useState([])

  const [apiStatus, setApiStatus] = useState(
    apiStatusConstants.initial,
  )

  const [searchParams] = useSearchParams()

  const searchQuery = searchParams.get('search')

  useEffect(() => {
    getSearchMovies()
  }, [searchQuery])

  const getSearchMovies = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchQuery}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok === true) {
      setMoviesList(data.results)

      setApiStatus(apiStatusConstants.success)
    } else {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <BeatLoader color="#D81F26" size={15} />
    </div>
  )

  const renderFailureView = () => (
    <FailureView retryFunction={getSearchMovies} />
  )

  const renderNoResultsView = () => (
    <div className="no-results-container">
      <img
        src={noMoviesImage}
        alt="no movies"
        className="no-movies-image"
      />

      <p className="no-results-text">
        Your search for {searchQuery} did not find any
        matches.
      </p>
    </div>
  )

  const renderSuccessView = () => {
    if (moviesList.length === 0) {
      return renderNoResultsView()
    }

    return (
      <div className="search-movies-grid">
        {moviesList.map(eachMovie => (
          <Link
            to={`/movies/${eachMovie.id}`}
            key={eachMovie.id}
          >
            <img
              src={eachMovie.poster_path}
              alt={eachMovie.title}
              className="search-movie-image"
            />
          </Link>
        ))}
      </div>
    )
  }

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
    <div className="search-container">
      <Header />

      <div className="search-results-container">
        {renderAllViews()}
      </div>
    </div>
  )
}

export default Search