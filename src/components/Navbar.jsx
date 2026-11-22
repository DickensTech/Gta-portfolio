import { useState, useEffect } from 'react'
import { LINKS } from '../content'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Prevent background scrolling while navigation drawer is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Close menu on Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isMenuOpen])

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const closeMenu = () => setIsMenuOpen(false)

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    closeMenu()
    if (targetId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <header className="site-header" id="top">
        <a
          href={LINKS.top}
          className="site-monogram"
          aria-label="Grand Theft Developer"
          onClick={(e) => handleNavClick(e, 'top')}
        >
          GTD
        </a>
        <a
          href={LINKS.hireMe}
          className="navbar-hire"
          onClick={(e) => handleNavClick(e, 'hire-me')}
        >
          Hire Me
        </a>
        <button
          type="button"
          className={`site-menu${isMenuOpen ? ' is-active' : ''}`}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation-drawer"
          onClick={toggleMenu}
        >
          <span className="site-menu-line site-menu-line-1" />
          <span className="site-menu-line site-menu-line-2" />
        </button>
      </header>

      {/* GTA VI Slide-out Navigation Drawer */}
      <div
        id="site-navigation-drawer"
        className={`nav-drawer${isMenuOpen ? ' is-open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="nav-drawer-backdrop" onClick={closeMenu} />
        <div className="nav-drawer-panel">
          <nav className="nav-drawer-links" aria-label="Main Navigation">
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')}>
              <span className="nav-link-num">01</span>
              <span className="nav-link-text">About</span>
            </a>
            <a href="#services" onClick={(e) => handleNavClick(e, 'services')}>
              <span className="nav-link-num">02</span>
              <span className="nav-link-text">Services</span>
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
              <span className="nav-link-num">03</span>
              <span className="nav-link-text">Location</span>
            </a>
            <a href="#clients" onClick={(e) => handleNavClick(e, 'clients')}>
              <span className="nav-link-num">04</span>
              <span className="nav-link-text">Clients</span>
            </a>
            <a href="#blog" onClick={(e) => handleNavClick(e, 'blog')}>
              <span className="nav-link-num">05</span>
              <span className="nav-link-text">Blog</span>
            </a>
          </nav>
          <div className="nav-drawer-cta">
            <a
              href={LINKS.hireMe}
              className="nav-drawer-hire"
              onClick={(e) => handleNavClick(e, 'hire-me')}
            >
              Hire Me
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
