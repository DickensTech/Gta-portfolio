import loaderLogo from '../assets/brand/loader-logo.svg'

export default function LoadingScreen() {
  return (
    <div
      className="loading-screen"
      aria-live="polite"
      aria-label="Loading"
    >
      <img
        src={loaderLogo}
        alt=""
        aria-hidden="true"
        className="loading-logo"
      />
    </div>
  )
}
