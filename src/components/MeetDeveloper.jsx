import scene from '../assets/site/meet-the-developer/scene.avif'
import { MEET_DEVELOPER } from '../content'
import featuredDesktop from '../assets/site/meet-the-developer/featured-desktop.avif'
import featuredMobile from '../assets/site/meet-the-developer/featured-mobile.avif'
import card1 from '../assets/site/meet-the-developer/card-1.avif'
import card2 from '../assets/site/meet-the-developer/card-2.avif'
import card3 from '../assets/site/meet-the-developer/card-3.avif'
import { useModal } from '../context/ModalContext'
import hostedMedia from '../assets/hosted-media.json'

function PlayButton({ label = 'Play', onClick }) {
  return (
    <button className="play-button" type="button" aria-label={label} onClick={onClick}>
      <span className="play-button-icon" aria-hidden="true" />
      {label}
    </button>
  )
}

export default function MeetDeveloper() {
  const { openModal } = useModal()

  const handlePlayMeet = () => {
    openModal('video', {
      title: 'MEET THE DEVELOPER · TRAILER 1',
      subtitle: 'Dickens · Full-stack engineer building fast, bulletproof web applications in Nairobi.',
      src: hostedMedia.services.video,
    })
  }

  const handlePlayRide = () => {
    openModal('video', {
      title: 'RIDE ALONG · NAIROBI STREETS',
      subtitle: 'High octane developer lifestyle: sportbikes, city routes, and late-night builds.',
      src: hostedMedia.city.video,
    })
  }

  const handleOpenProject = (category, title) => {
    openModal('project', { category, title })
  }

  return (
    <section className="meet-section" id="about">
      <div
        className="meet-feature"
        style={{ '--meet-feature-image': `url("${scene}")` }}
      >
        <div className="meet-feature-backdrop" aria-hidden="true" />
        <img src={scene} alt="" className="meet-feature-image" fetchPriority="high" decoding="async" />
        <div className="meet-feature-shade" />
        <div className="meet-feature-content">
          <p className="section-eyebrow">{MEET_DEVELOPER.scene.eyebrow}</p>
          <h2>{MEET_DEVELOPER.scene.title}</h2>
          <PlayButton onClick={handlePlayMeet} />
        </div>
      </div>

      <article className="ride-card">
        <picture>
          <source media="(max-width: 700px)" srcSet={featuredMobile} />
          <img src={featuredDesktop} alt="Developer riding a sportbike" loading="lazy" decoding="async" />
        </picture>
        <div className="ride-card-overlay">
          <p className="section-eyebrow">Watch</p>
          <h3>{MEET_DEVELOPER.featured.title}</h3>
          <PlayButton onClick={handlePlayRide} />
        </div>
      </article>

      <div className="project-grid">
        <article
          className="project-card"
          onClick={() => handleOpenProject('AI', 'AI Book Assistant')}
          role="button"
          tabIndex={0}
          style={{ cursor: 'pointer' }}
          onKeyDown={(e) => e.key === 'Enter' && handleOpenProject('AI', 'AI Book Assistant')}
        >
          <img src={card1} alt="AI Book Assistant" loading="lazy" decoding="async" />
          <div className="project-card-copy">
            <p>AI</p>
            <h3>AI Book Assistant</h3>
          </div>
        </article>

        <article
          className="project-card"
          onClick={() => handleOpenProject('3D Web', '3D Basketball Website')}
          role="button"
          tabIndex={0}
          style={{ cursor: 'pointer' }}
          onKeyDown={(e) => e.key === 'Enter' && handleOpenProject('3D Web', '3D Basketball Website')}
        >
          <img src={card2} alt="3D Basketball Website" loading="lazy" decoding="async" />
          <div className="project-card-copy">
            <p>3D Web</p>
            <h3>3D Basketball Website</h3>
          </div>
        </article>

        <article
          className="project-card"
          onClick={() => handleOpenProject('Mobile', 'React Native Language App')}
          role="button"
          tabIndex={0}
          style={{ cursor: 'pointer' }}
          onKeyDown={(e) => e.key === 'Enter' && handleOpenProject('Mobile', 'React Native Language App')}
        >
          <img src={card3} alt="React Native Language App" loading="lazy" decoding="async" />
          <div className="project-card-copy">
            <p>Mobile</p>
            <h3>React Native Language App</h3>
          </div>
        </article>
      </div>
    </section>
  )
}
