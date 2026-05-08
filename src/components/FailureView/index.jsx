import './index.css'

const FailureView = props => {
  const {retryFunction} = props

  return (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dkft9jijg/image/upload/v1756104694/failure-view_btw8c7.png"
        alt="failure view"
        className="failure-view-image"
      />

      <p className="failure-view-text">
        Something went wrong. Please try again
      </p>

      <button
        type="button"
        className="failure-button"
        onClick={retryFunction}
      >
        Try Again
      </button>
    </div>
  )
}

export default FailureView