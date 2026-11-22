import { useRef } from 'react'
import hostedMedia from '../assets/hosted-media.json'
import { CITY_CONTENT } from '../content'
import cityPoster from '../assets/site/meet-the-developer/featured-desktop.avif'
import useScrollScrubVideo from '../useScrollScrubVideo'

export default function CityBio() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)

  useScrollScrubVideo(sectionRef, videoRef, hostedMedia.city.video)

  return (
    <section className="city-section" id="contact" ref={sectionRef}>
      <div className="city-sticky">
        <video
          ref={videoRef}
          src={hostedMedia.city.video}
          className="city-video"
          poster={cityPoster}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="city-shade" />
        <div className="city-copy">
          <p>{CITY_CONTENT.title}</p>
          <h2>{CITY_CONTENT.bio}</h2>
        </div>
      </div>
    </section>
  )
}
