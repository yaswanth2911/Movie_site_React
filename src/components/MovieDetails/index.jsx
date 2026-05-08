import {useEffect, useState} from 'react'

import {Link, useParams} from 'react-router-dom'

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

const MovieDetails = () => {
  const {id} = useParams()

  const [movieData, setMovieData] = useState({})

  const [apiStatus, setApiStatus] = useState(
    apiStatusConstants.initial,
  )

  useEffect(() => {
    getMovieDetails()
  }, [id])

  const getMovieDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      `https://apis.ccbp.in/movies-app/movies/${id}`,
      options,
    )

    const data = await response.json()

    if (response.ok) {
      setMovieData(data.movie_details)

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
        onClick={getMovieDetails}
      >
        Try Again
      </button>
    </div>
  )

  const renderSuccessView = () => {
    const {
      title,
      backdrop_path,
      overview,
      runtime,
      release_date,
      vote_average,
      vote_count,
      budget,
      genres,
      spoken_languages,
      similar_movies,
    } = movieData

    return (
      <>
        <div
          className="movie-details-banner"
          style={{
            backgroundImage: `url(${backdrop_path})`,
          }}
        >
          <div className="overlay">
            <Header />

            <div className="movie-content">
              <h1 className="movie-title">
                {title}
              </h1>

              <p className="movie-runtime">
                {runtime}m
              </p>

              <p className="movie-overview">
                {overview}
              </p>

              <button
                type="button"
                className="play-button"
              >
                Play
              </button>
            </div>
          </div>
        </div>

        <div className="movie-info-section">
          <div className="info-row">
            <div className="info-column">
              <h1 className="info-heading">
                Genres
              </h1>

              {genres?.map(eachGenre => (
                <p
                  key={eachGenre.id}
                  className="info-text"
                >
                  {eachGenre.name}
                </p>
              ))}
            </div>

            <div className="info-column">
              <h1 className="info-heading">
                Audio Available
              </h1>

              {spoken_languages?.map(eachLang => (
                <p
                  key={eachLang.id}
                  className="info-text"
                >
                  {eachLang.english_name}
                </p>
              ))}
            </div>

            <div className="info-column">
              <h1 className="info-heading">
                Rating Count
              </h1>

              <p className="info-text">
                {vote_count}
              </p>

              <h1 className="info-heading rating-heading">
                Rating Average
              </h1>

              <p className="info-text">
                {vote_average}
              </p>
            </div>

            <div className="info-column">
              <h1 className="info-heading">
                Budget
              </h1>

              <p className="info-text">
                {budget}
              </p>

              <h1 className="info-heading rating-heading">
                Release Date
              </h1>

              <p className="info-text">
                {release_date}
              </p>
            </div>
          </div>

          <div className="similar-section">
            <h1 className="similar-heading">
              More Like This
            </h1>

            <div className="similar-movies-container">
              {similar_movies?.map(eachMovie => (
                <Link
                  to={`/movies/${eachMovie.id}`}
                  key={eachMovie.id}
                  className="similar-movie-link"
                >
                  <img
                    src={eachMovie.poster_path}
                    alt={eachMovie.title}
                    className="similar-movie-image"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </>
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
    <div className="movie-details-container">
      {renderAllViews()}
    </div>
  )
}

export default MovieDetails