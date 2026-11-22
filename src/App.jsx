import { useState, useRef, useCallback, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import LoadingScreen from './components/LoadingScreen'
import IntroAnimation from './components/IntroAnimation'
import MeetDeveloper from './components/MeetDeveloper'
import Services from './components/Services'
import CityBio from './components/CityBio'
import Highlights from './components/Highlights'
import Clients from './components/Clients'
import Blog from './components/Blog'
import Footer from './components/Footer'
import MouseGlow from './components/MouseGlow'
import ModalRoot from './components/ModalRoot'
import { ModalProvider } from './context/ModalContext'

function App() {
  const [phase, setPhase] = useState('loading') // loading → intro → done
  const introRef = useRef(null)
  const hasStarted = useRef(false)
  const scrollFrame = useRef(0)

  /* Do not block the intro on offscreen images or remote video requests. */
  useEffect(() => {
    const startTimer = window.setTimeout(() => {
      if (hasStarted.current) return
      hasStarted.current = true
      setPhase('intro')
      introRef.current?.play()
    }, 450)
    const introFallback = window.setTimeout(() => setPhase('done'), 4000)

    return () => {
      window.clearTimeout(startTimer)
      window.clearTimeout(introFallback)
    }
  }, [])

  useEffect(() => {
    const updateScroll = () => {
      scrollFrame.current = 0
      const stage = document.querySelector('.hero-scroll-stage')
      const hero = stage?.querySelector('.hero')
      if (!stage || !hero) return

      const header = document.querySelector('.site-shell')
      const headerHeight = Number.parseFloat(
        header ? getComputedStyle(header).getPropertyValue('--hero-header-height') : '',
      ) || 64
      const travel = Math.max(1, stage.offsetHeight - hero.offsetHeight)
      const progress = Math.max(
        0,
        Math.min(1, (headerHeight - stage.getBoundingClientRect().top) / travel),
      )
      const fade = progress * progress * (3 - 2 * progress)
      const navProgress = Math.max(0, Math.min(1, (progress - 0.65) / 0.35))

      document.documentElement.style.setProperty('--hero-scroll', progress.toFixed(3))
      document.documentElement.style.setProperty('--hero-fade', fade.toFixed(3))
      document.documentElement.style.setProperty('--meet-reveal', fade.toFixed(3))

      // When hero fades out, disable pointer events so underlying cards are interactive
      hero.style.pointerEvents = fade >= 0.95 ? 'none' : 'auto'

      const navbarHire = document.querySelector('.navbar-hire')
      if (navbarHire) {
        navbarHire.style.opacity = navProgress.toFixed(3)
        navbarHire.style.transform = `translateY(${((1 - navProgress) * 18).toFixed(1)}px) scale(${(.82 + navProgress * .18).toFixed(3)})`
        navbarHire.style.pointerEvents = navProgress > 0.05 ? 'auto' : 'none'
      }
    }

    const onScroll = () => {
      if (scrollFrame.current) window.cancelAnimationFrame(scrollFrame.current)
      scrollFrame.current = window.requestAnimationFrame(updateScroll)
    }

    updateScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (scrollFrame.current) window.cancelAnimationFrame(scrollFrame.current)
    }
  }, [])

  /* Intro timeline finished → show static hero, remove intro overlay */
  const handleIntroComplete = useCallback(() => {
    setPhase('done')
  }, [])

  const showLoading = phase === 'loading'
  const showIntro = phase === 'loading' || phase === 'intro'

  return (
    <ModalProvider>
      <div className={`site-shell${showIntro ? ' is-intro' : ''}`}>
        {/* GTA VI Mouse Glow (desktop only, GPU accelerated) */}
        <MouseGlow />

        {/* Loading overlay – sits above everything */}
        {showLoading && <LoadingScreen />}

        {/* Intro animation stays aligned with the hero poster while assembling */}
        {showIntro && (
          <IntroAnimation ref={introRef} onComplete={handleIntroComplete} />
        )}

        <Navbar />
        <main className="site-main">
          <div className="hero-scroll-stage">
            <Hero />
          </div>
          <MeetDeveloper />
          <Services />
          <CityBio />
          <Highlights />
          <Clients />
          <Blog />
          <Footer />
        </main>
        <ModalRoot />
      </div>
    </ModalProvider>
  )
}

export default App
