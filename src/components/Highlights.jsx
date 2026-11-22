import openToWork from '../assets/site/highlights/open-to-work.avif'
import afterHours from '../assets/site/highlights/after-hours.avif'
import theHeist from '../assets/site/highlights/the-heist.avif'
import { HIGHLIGHTS } from '../content'
import { useModal } from '../context/ModalContext'

const cards = [
  { ...HIGHLIGHTS[0], image: openToWork, action: 'hire' },
  { ...HIGHLIGHTS[1], image: afterHours, action: 'community' },
  { ...HIGHLIGHTS[2], image: theHeist, action: 'case-study' },
]

export default function Highlights() {
  const { openModal } = useModal()

  const handleCardAction = (e, action) => {
    e.preventDefault()
    if (action === 'hire') {
      document.getElementById('hire-me')?.scrollIntoView({ behavior: 'smooth' })
    } else if (action === 'community') {
      openModal('community')
    } else if (action === 'case-study') {
      openModal('case-study')
    }
  }

  return (
    <section className="highlights-section" aria-label="Developer highlights">
      {cards.map((card) => (
        <article
          className="highlight-card"
          key={card.title}
          style={{ '--highlight-image': `url("${card.image}")` }}
        >
          <img src={card.image} alt="" loading="lazy" decoding="async" />
          <div className="highlight-backdrop" aria-hidden="true" />
          <div className="highlight-shade" />
          <div className="highlight-copy">
            <p className="section-eyebrow">{card.eyebrow}</p>
            <h2>{card.title}</h2>
            <p>{card.text}</p>
            <a href="#top" onClick={(e) => handleCardAction(e, card.action)} role="button">
              {card.button}
            </a>
          </div>
        </article>
      ))}
    </section>
  )
}
