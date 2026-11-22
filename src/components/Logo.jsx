import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import posterLogo from '../assets/site/hero/desktop/poster-logo.avif'

export default function Logo() {
  const containerRef = useRef(null)
  const logoRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ambient glow pulse
      gsap.to(glowRef.current, {
        opacity: 0.8,
        scale: 1.08,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      // Dramatic entrance animation for the GTA VI logo
      gsap.fromTo(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.88,
          filter: 'brightness(0.5) blur(10px)',
        },
        {
          opacity: 1,
          scale: 1,
          filter: 'brightness(1) blur(0px)',
          duration: 1.6,
          ease: 'power3.out',
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center p-6 select-none"
    >
      {/* Background radial glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute h-[320px] w-[320px] rounded-full bg-gradient-to-tr from-fuchsia-600/20 via-pink-500/15 to-amber-500/10 blur-3xl sm:h-[450px] sm:w-[450px]"
        aria-hidden="true"
      />

      {/* GTA VI / Grand Theft Developer Hero Logo */}
      <div className="relative z-10 flex items-center justify-center">
        <img
          ref={logoRef}
          src={posterLogo}
          alt="GTA VI Logo"
          className="w-[min(82vw,560px)] drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] will-change-transform"
        />
      </div>
    </div>
  )
}
