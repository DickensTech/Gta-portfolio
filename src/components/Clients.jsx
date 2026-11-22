import { useRef } from 'react'
import clientsImage from '../assets/site/clients/clients.avif'
import testimonialImage from '../assets/site/clients/testimonial.avif'
import { CLIENTS_CONTENT } from '../content'
import { useModal } from '../context/ModalContext'

export default function Clients() {
  const carouselRef = useRef(null)
  const { openModal } = useModal()

  const cards = [
    { ...CLIENTS_CONTENT[0], image: clientsImage, action: 'clients' },
    { ...CLIENTS_CONTENT[1], image: testimonialImage, action: 'review' },
  ]

  const moveCarousel = (direction) => {
    const carousel = carouselRef.current
    const card = carousel?.querySelector('.client-card')
    if (!carousel || !card) return

    const gap = Number.parseFloat(getComputedStyle(carousel).columnGap) || 0
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto'
      : 'smooth'
    carousel.scrollBy({ left: direction * (card.offsetWidth + gap), behavior })
  }

  const handleAction = (e, action) => {
    e.preventDefault()
    if (action === 'clients') {
      openModal('clients')
    } else if (action === 'review') {
      openModal('review')
    }
  }

  return (
    <section className="clients-section" id="clients">
      <header className="section-header">
        <h2>Clients</h2>
        <div className="section-header-actions">
          <a href="#clients" onClick={(e) => handleAction(e, 'clients')} role="button">
            View All
          </a>
          <div className="carousel-controls" role="group" aria-label="Client carousel controls">
            <button type="button" className="carousel-control" aria-label="Previous client card" onClick={() => moveCarousel(-1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button type="button" className="carousel-control" aria-label="Next client card" onClick={() => moveCarousel(1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div
        className="clients-grid"
        ref={carouselRef}
        role="region"
        aria-label="Client cards"
        aria-roledescription="carousel"
        tabIndex={0}
      >
        {cards.map((card, index) => (
          <article
            className="client-card"
            key={card.title}
            role="group"
            aria-label={`${index + 1} of ${cards.length}`}
            aria-roledescription="slide"
          >
            <img src={card.image} alt={card.alt} loading="lazy" decoding="async" />
            <div className="client-copy">
              <p className="section-eyebrow">{card.eyebrow}</p>
              <h3>{card.title}</h3>
              <a href="#clients" onClick={(e) => handleAction(e, card.action)} role="button">
                {card.button}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
