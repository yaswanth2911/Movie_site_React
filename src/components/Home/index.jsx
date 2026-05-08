import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'
import Slider from 'react-slick'

import Header from '../Header'
import Footer from '../Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
}

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([])
  const [originalMovies, setOriginalMovies] = useState([])

  useEffect(() => {
    getTrendingMovies()
    getOriginalMovies()
  }, [])

  const getTrendingMovies = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      'https://apis.ccbp.in/movies-app/trending-movies',
      options,
    )

    const data = await response.json()

    if (response.ok) {
      setTrendingMovies(data.results)
    }
  }

  const getOriginalMovies = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      'https://apis.ccbp.in/movies-app/originals',
      options,
    )

    const data = await response.json()

    if (response.ok) {
      setOriginalMovies(data.results)
    }
  }

  const SlickSlider = Slider.default
    ? Slider.default
    : Slider

  return (
    <div className="home-container">
      <Header />

      <div className="hero-section">
        <div className="overlay">
          <div className="hero-content">
            <h1 className="hero-heading">
              Venom
            </h1>

            <p className="hero-description">
             Investigative journalist Eddie Brock attempts a comeback following a scandal, but accidentally becomes the host of Venom, a violent, super powerful alien symbiote.
            </p>

            <button
              className="play-button"
              type="button"
            >
              Play
            </button>
          </div>
        </div>
      </div>

      <div className="movies-section">
        <div className="movies-category">
          <h1 className="movies-heading">
            Trending Now
          </h1>

          <div className="slick-wrapper">
            <SlickSlider {...settings}>
              {trendingMovies.map(eachMovie => (
                <Link
                  to={`/movies/${eachMovie.id}`}
                  key={eachMovie.id}
                  className="movie-link"
                >
                  <div className="movie-item">
                    <img
                      src={eachMovie.poster_path}
                      alt={eachMovie.title}
                      className="movie-image"
                    />
                  </div>
                </Link>
              ))}
            </SlickSlider>
          </div>
        </div>

        <div className="movies-category">
          <h1 className="movies-heading">
            Originals
          </h1>

          <div className="slick-wrapper">
            <SlickSlider {...settings}>
              {originalMovies.map(eachMovie => (
                <Link
                  to={`/movies/${eachMovie.id}`}
                  key={eachMovie.id}
                  className="movie-link"
                >
                  <div className="movie-item">
                    <img
                      src={eachMovie.poster_path}
                      alt={eachMovie.title}
                      className="movie-image"
                    />
                  </div>
                </Link>
              ))}
            </SlickSlider>
          </div>
        </div>
<Footer />

      </div>
    </div>
  )
}

export default Home