import { useRef } from 'react'
import hostedMedia from '../assets/hosted-media.json'
import { SERVICES } from '../content'
import cardShort from '../assets/site/services/card-short.avif'
import cardTallDesktop from '../assets/site/services/card-tall-desktop.avif'
import cardTallMobile from '../assets/site/services/card-tall-mobile.avif'
import useScrollScrubVideo from '../useScrollScrubVideo'
import { useModal } from '../context/ModalContext'

export default function Services() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const { openModal } = useModal()

  useScrollScrubVideo(sectionRef, videoRef, hostedMedia.services.video)

  const handleSeeIncluded = (e) => {
    e.preventDefault()
    openModal('services-included')
  }

  const handleStartProject = (e) => {
    e.preventDefault()
    openModal('start-project')
  }

  return (
    <section className="services-section" id="services" ref={sectionRef}>
      <div className="services-sticky">
        <video
          ref={videoRef}
          src={hostedMedia.services.video}
          className="services-video"
          poster={cardTallDesktop}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="services-video-shade" />
        <div className="services-content">
          <div className="services-heading">
            <p className="section-eyebrow">{SERVICES.eyebrow}</p>
            <h2>{SERVICES.title}</h2>
          </div>

          <div className="services-grid">
            <article className="service-card service-card-tall">
              <picture>
                <source media="(max-width: 700px)" srcSet={cardTallMobile} />
                <img src={cardTallDesktop} alt="Neon sign reading Code Rescue" loading="eager" decoding="async" />
              </picture>
              <div className="service-card-copy">
                <h3>{SERVICES.cards[0].title}</h3>
                <p>{SERVICES.cards[0].text}</p>
                <a href="#services" onClick={handleSeeIncluded} role="button">
                  {SERVICES.cards[0].button}
                </a>
              </div>
            </article>

            <article className="service-card service-card-wide">
              <img src={cardShort} alt="Developer working on a rooftop" loading="eager" decoding="async" />
              <div className="service-card-copy">
                <p className="section-eyebrow">{SERVICES.cards[1].eyebrow}</p>
                <h3>{SERVICES.cards[1].title}</h3>
                <p>{SERVICES.cards[1].text}</p>
                <a href="#contact" onClick={handleStartProject} role="button">
                  {SERVICES.cards[1].button}
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
