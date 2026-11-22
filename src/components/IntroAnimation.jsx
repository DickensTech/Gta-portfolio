import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import gsap from 'gsap'

/* ── Desktop shard imports ───────────────────────────────── */
import shard01 from '../assets/site/hero/desktop/shard-01.avif'
import shard02 from '../assets/site/hero/desktop/shard-02.avif'
import shard03 from '../assets/site/hero/desktop/shard-03.avif'
import shard04 from '../assets/site/hero/desktop/shard-04.avif'
import shard05 from '../assets/site/hero/desktop/shard-05.avif'
import shard06 from '../assets/site/hero/desktop/shard-06.avif'
import shard07 from '../assets/site/hero/desktop/shard-07.avif'
import shard08 from '../assets/site/hero/desktop/shard-08.avif'
import shard09 from '../assets/site/hero/desktop/shard-09.avif'
import shard10 from '../assets/site/hero/desktop/shard-10.avif'
import logoVI from '../assets/site/hero/desktop/logo-vi.avif'
import logoGTA from '../assets/site/hero/desktop/logo-gta.avif'
import mobileShard01 from '../assets/site/hero/mobile/shard-01.avif'
import mobileShard02 from '../assets/site/hero/mobile/shard-02.avif'
import mobileShard03 from '../assets/site/hero/mobile/shard-03.avif'
import mobileShard04 from '../assets/site/hero/mobile/shard-04.avif'
import mobileShard05 from '../assets/site/hero/mobile/shard-05.avif'
import mobileShard06 from '../assets/site/hero/mobile/shard-06.avif'
import mobileShard07 from '../assets/site/hero/mobile/shard-07.avif'
import mobileShard08 from '../assets/site/hero/mobile/shard-08.avif'
import mobileShard09 from '../assets/site/hero/mobile/shard-09.avif'
import mobileShard10 from '../assets/site/hero/mobile/shard-10.avif'
import mobileLogoVI from '../assets/site/hero/mobile/logo-vi.avif'
import mobileLogoGTA from '../assets/site/hero/mobile/logo-gta.avif'

const SHARDS = [
  shard01, shard02, shard03, shard04, shard05,
  shard06, shard07, shard08, shard09, shard10,
]
const MOBILE_SHARDS = [
  mobileShard01, mobileShard02, mobileShard03, mobileShard04, mobileShard05,
  mobileShard06, mobileShard07, mobileShard08, mobileShard09, mobileShard10,
]

/*
 * Per-shard start offsets for the visible assembly matching GTA VI teaser style
 */
const SHARD_FROM = [
  { x: -260, y: -220, rotation: -7,  scale: 0.86 },
  { x:  260, y: -180, rotation:  5,  scale: 0.88 },
  { x: -320, y:   20, rotation: -4,  scale: 0.90 },
  { x:  300, y:   60, rotation:  6,  scale: 0.86 },
  { x: -180, y:  260, rotation: -5,  scale: 0.88 },
  { x:  180, y:  240, rotation:  4,  scale: 0.90 },
  { x: -220, y: -120, rotation: -6,  scale: 0.84 },
  { x:  220, y: -200, rotation:  7,  scale: 0.86 },
  { x:    0, y:  300, rotation: -3,  scale: 0.88 },
  { x:    0, y: -280, rotation:  3,  scale: 0.90 },
]

/**
 * IntroAnimation
 *
 * Renders the 10 shard collage pieces + logo layers inside a container
 * that matches the hero-poster dimensions. Exposes a `play()` method
 * via forwarded ref.
 */
const IntroAnimation = forwardRef(function IntroAnimation({ onComplete }, ref) {
  const containerRef = useRef(null)
  const frameRef = useRef(null)
  const shardRefs = useRef([])
  const logoVIRef = useRef(null)
  const logoGTARef = useRef(null)
  const tlRef = useRef(null)
  const prefersReducedMotionRef = useRef(false)
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 700px)').matches
  const shardSources = isMobile ? MOBILE_SHARDS : SHARDS
  const logoVISource = isMobile ? mobileLogoVI : logoVI
  const logoGTASource = isMobile ? mobileLogoGTA : logoGTA

  /* Align intro-frame precisely to hero-poster on both desktop and mobile */
  useEffect(() => {
    const updateFramePosition = () => {
      const poster = document.querySelector('.hero-poster')
      const frame = frameRef.current
      if (poster && frame) {
        const rect = poster.getBoundingClientRect()
        frame.style.top = `${rect.top}px`
        frame.style.left = `${rect.left}px`
        frame.style.width = `${rect.width}px`
        frame.style.height = `${rect.height}px`
        frame.style.transform = 'none'
      }
    }
    updateFramePosition()
    window.addEventListener('resize', updateFramePosition)
    return () => window.removeEventListener('resize', updateFramePosition)
  }, [])

  /* Build the timeline once, paused */
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    prefersReducedMotionRef.current = prefersReducedMotion
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        onComplete: () => onComplete?.(),
      })

      if (prefersReducedMotion) {
        gsap.set([...shardRefs.current, logoVIRef.current, logoGTARef.current], {
          opacity: 1,
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          filter: 'none',
        })
        tlRef.current = tl
        return
      }

      /* ── Set initial states ─────────────────────────────── */
      shardRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, {
          opacity: 0,
          x: SHARD_FROM[i].x,
          y: SHARD_FROM[i].y,
          rotation: SHARD_FROM[i].rotation,
          scale: SHARD_FROM[i].scale,
        })
      })

      gsap.set(logoVIRef.current, {
        opacity: 0,
        scale: 0.82,
        filter: 'brightness(0.4) blur(12px)',
      })
      gsap.set(logoGTARef.current, {
        opacity: 0,
        y: 14,
        filter: 'blur(6px)',
      })

      /* ── Shards fly in ──────────────────────────────────── */
      shardRefs.current.forEach((el, i) => {
        if (!el) return
        tl.to(
          el,
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1.55,
            ease: 'expo.out',
          },
          i * 0.072,
        )
      })

      /* ── Logo VI scales in ──────────────────────────────── */
      tl.to(
        logoVIRef.current,
        {
          opacity: 1,
          scale: 1,
          filter: 'brightness(1) blur(0px)',
          duration: 0.8,
          ease: 'expo.out',
        },
        0.85,
      )

      /* ── Logo wordmark fades in ─────────────────────────── */
      tl.to(
        logoGTARef.current,
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.62,
          ease: 'power3.out',
        },
        1.05,
      )

      tlRef.current = tl
    }, containerRef)

    return () => ctx.revert()
  }, [onComplete])

  /* Expose play() to parent */
  useImperativeHandle(ref, () => ({
    play: () => {
      if (prefersReducedMotionRef.current) {
        onComplete?.()
        return
      }
      tlRef.current?.play()
    },
    getContainer: () => containerRef.current,
  }), [onComplete])

  return (
    <div ref={containerRef} className="intro-canvas" aria-hidden="true">
      <div ref={frameRef} className="intro-frame">
        {shardSources.map((src, i) => (
          <img
            key={i}
            ref={(el) => (shardRefs.current[i] = el)}
            src={src}
            alt=""
            className="intro-shard"
            draggable={false}
          />
        ))}

        <img
          ref={logoVIRef}
          src={logoVISource}
          alt=""
          className="intro-logo-vi"
          draggable={false}
        />
        <img
          ref={logoGTARef}
          src={logoGTASource}
          alt=""
          className="intro-logo-gta"
          draggable={false}
        />
      </div>
    </div>
  )
})

export default IntroAnimation
