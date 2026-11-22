import { HERO_CONTENT, LINKS } from '../content'
import desktopLogo from '../assets/site/hero/desktop/poster-logo.avif'
import desktopPoster from '../assets/site/hero/desktop/poster.avif'
import mobileLogo from '../assets/site/hero/mobile/poster-logo.avif'
import mobilePoster from '../assets/site/hero/mobile/poster.avif'

export default function Hero() {
  const handleHireClick = (e) => {
    e.preventDefault()
    document.getElementById('hire-me')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollDown = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div className="hero-poster">
        <picture className="hero-poster-art-layer">
          <source media="(max-width: 700px)" srcSet={mobilePoster} />
          <img
            src={desktopPoster}
            alt="Grand Theft Developer Artwork Collage"
            className="hero-poster-art"
          />
        </picture>
        <picture className="hero-poster-logo-layer">
          <source media="(max-width: 700px)" srcSet={mobileLogo} />
          <img
            src={desktopLogo}
            alt="Grand Theft Developer VI"
            className="hero-poster-logo"
          />
        </picture>
      </div>
      <div className="hero-controls">
        <div className="hero-role">
          <p>{HERO_CONTENT.tagline.role}</p>
          <p>{HERO_CONTENT.tagline.availability}</p>
        </div>
        <div className="hero-hire-wrap">
          <a
            href={LINKS.hireMe}
            className="hero-hire"
            onClick={handleHireClick}
          >
            {HERO_CONTENT.buttonText}
          </a>
        </div>
        <div className="hero-tech">
          <p>REACT</p>
          <p>NODE.JS</p>
          <p>POSTGRESQL</p>
        </div>
      </div>
      <p className="hero-disclaimer">{HERO_CONTENT.disclaimer}</p>
      <div
        className="hero-chevron"
        role="button"
        tabIndex={0}
        aria-label="Scroll down to About section"
        onClick={handleScrollDown}
        onKeyDown={(e) => e.key === 'Enter' && handleScrollDown()}
        style={{ cursor: 'pointer' }}
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </div>
    </section>
  )
}
