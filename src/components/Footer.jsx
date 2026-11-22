import { useState } from 'react'
import logo from '../assets/site/footer/logo.avif'
import { FOOTER_CONTENT, SOCIAL_LINKS, LINKS } from '../content'
import { useModal } from '../context/ModalContext'

export default function Footer() {
  const [copied, setCopied] = useState(false)
  const { openModal } = useModal()

  const handleCopyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard?.writeText(SOCIAL_LINKS.emailRaw)
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="site-footer" id="footer">
      <div id="hire-me" style={{ position: 'absolute', transform: 'translateY(-60px)' }} />

      {/* Top Banner: Centered Logo & Direct Call To Action */}
      <div className="footer-top-banner">
        <div className="footer-brand-wrap">
          <a href="#top" onClick={scrollToTop} className="footer-logo-link" aria-label="Grand Theft Developer - Back to top">
            <img
              src={logo}
              alt="Grand Theft Developer VI"
              className="footer-logo"
              loading="lazy"
              decoding="async"
            />
          </a>
          <div className="footer-status-pill">
            <span className="footer-pulse-dot" />
            <span className="footer-status-text">AVAILABLE FOR CONTRACT & FULL-STACK BUILDS</span>
          </div>
        </div>

        <div className="footer-actions">
          <div className="footer-email-group">
            <a
              href={SOCIAL_LINKS.email}
              className="footer-action-pill footer-email-pill"
              title="Send Email to Clinton Dickens"
            >
              <span className="footer-pill-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <span className="footer-pill-label">{SOCIAL_LINKS.emailRaw}</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className={`footer-copy-btn${copied ? ' is-copied' : ''}`}
              aria-label="Copy email address"
              title="Copy email to clipboard"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <a
            className="footer-build"
            href="#build"
            onClick={(e) => {
              e.preventDefault()
              openModal('build-your-own')
            }}
            role="button"
          >
            <strong>{FOOTER_CONTENT.buildTitle}</strong>
            <span>{FOOTER_CONTENT.buildText}</span>
          </a>
        </div>
      </div>

      {/* Rockstar Games Style Centered Contact Me Social Follow Bar */}
      <div className="footer-social-bar">
        <div className="footer-social-header">
          <div className="footer-social-line footer-social-line-left" />
          <span className="footer-social-title">CONTACT ME</span>
          <div className="footer-social-line footer-social-line-right" />
        </div>

        <div className="footer-social-icons">
          {/* GitHub */}
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            aria-label="GitHub Profile"
            data-label="GitHub"
          >
            <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="footer-social-tooltip">GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            aria-label="LinkedIn Profile"
            data-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span className="footer-social-tooltip">LinkedIn</span>
          </a>

          {/* X / Twitter */}
          <a
            href={SOCIAL_LINKS.x}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            aria-label="X (Twitter) Profile"
            data-label="X"
          >
            <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="footer-social-tooltip">X</span>
          </a>

          {/* Instagram */}
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            aria-label="Instagram Profile"
            data-label="Instagram"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
            <span className="footer-social-tooltip">Instagram</span>
          </a>

          {/* YouTube */}
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            aria-label="YouTube Channel"
            data-label="YouTube"
          >
            <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            <span className="footer-social-tooltip">YouTube</span>
          </a>

          {/* Email */}
          <a
            href={SOCIAL_LINKS.email}
            className="footer-social-btn"
            aria-label="Direct Email"
            data-label="Email"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span className="footer-social-tooltip">Email</span>
          </a>
        </div>
      </div>

      {/* Structured Multi-Column Directory */}
      <div className="footer-directory">
        {/* Column 1: Channels & Handles */}
        <div className="footer-col">
          <h4 className="footer-col-title">CHANNELS & SOCIAL</h4>
          <nav className="footer-col-nav" aria-label="Social handles">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">
              <span>GitHub</span>
              <span className="footer-handle">@DickensTech</span>
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer">
              <span>LinkedIn</span>
              <span className="footer-handle">in/clinton-dickens</span>
            </a>
            <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer">
              <span>X (Twitter)</span>
              <span className="footer-handle">@dickens49631</span>
            </a>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
              <span>Instagram</span>
              <span className="footer-handle">@clin6352</span>
            </a>
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer">
              <span>YouTube</span>
              <span className="footer-handle">@clintondickens-o1f</span>
            </a>
            <a href={SOCIAL_LINKS.email}>
              <span>Direct Email</span>
              <span className="footer-handle">clintondickens107</span>
            </a>
          </nav>
        </div>

        {/* Column 2: Navigation */}
        <div className="footer-col">
          <h4 className="footer-col-title">NAVIGATION</h4>
          <nav className="footer-col-nav" aria-label="Portfolio sections">
            <a href="#about">
              <span className="footer-nav-num">01</span>
              <span>About Developer</span>
            </a>
            <a href="#services">
              <span className="footer-nav-num">02</span>
              <span>Services & Code Rescue</span>
            </a>
            <a href="#contact">
              <span className="footer-nav-num">03</span>
              <span>Location (Nairobi)</span>
            </a>
            <a href="#clients">
              <span className="footer-nav-num">04</span>
              <span>Selected Clients</span>
            </a>
            <a href="#blog">
              <span className="footer-nav-num">05</span>
              <span>Engineering Blog</span>
            </a>
            <a href={LINKS.hireMe}>
              <span className="footer-nav-num">06</span>
              <span>Hire Me / Inquiry</span>
            </a>
          </nav>
        </div>

        {/* Column 3: Stack & Capabilities */}
        <div className="footer-col">
          <h4 className="footer-col-title">ENGINEERING STACK</h4>
          <nav className="footer-col-nav" aria-label="Technical skills and tools">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">React 19 & Next.js</a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">Node.js & Express API</a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">PostgreSQL & Prisma</a>
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">Python & Microservices</a>
            <a href={`mailto:${SOCIAL_LINKS.emailRaw}?subject=Requesting%20Clinton%20Dickens%20Resume`}>Request Résumé (CV)</a>
            <a href="#top" onClick={scrollToTop}>Return to Top ↑</a>
          </nav>
        </div>

        {/* Column 4: Rockstar ESRB Developer Rating Badge */}
        <div className="footer-col footer-col-badge">
          <h4 className="footer-col-title">CERTIFIED RATING</h4>
          <div className="footer-esrb-card">
            <div className="footer-esrb-badge">
              <span className="footer-esrb-letter">D</span>
              <span className="footer-esrb-tag">DEV</span>
            </div>
            <div className="footer-esrb-details">
              <strong className="footer-esrb-title">{FOOTER_CONTENT.badgeTitle}</strong>
              <p className="footer-esrb-desc">{FOOTER_CONTENT.badgeText}</p>
              <div className="footer-esrb-divider" />
              <span className="footer-esrb-board">DEVELOPER CONTENT RATING BOARD</span>
            </div>
          </div>

          <div className="footer-circular-badge">
            <strong>{FOOTER_CONTENT.badgeTitle}</strong>
            <span>{FOOTER_CONTENT.badgeText}</span>
          </div>
        </div>
      </div>

      {/* Rockstar Games Style Meta & Region Bar */}
      <div className="footer-utility-bar">
        <div className="footer-region">
          <span className="footer-region-icon" aria-hidden="true">🌐</span>
          <span className="footer-region-text">{FOOTER_CONTENT.language} · {FOOTER_CONTENT.region}</span>
        </div>
        <div className="footer-studio-mark">
          <span className="footer-monogram">GTD</span>
          <span className="footer-creator">CLINTON DICKENS STUDIO</span>
        </div>
        <button
          type="button"
          onClick={scrollToTop}
          className="footer-top-btn"
          aria-label="Scroll back to top"
        >
          <span>TOP</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      </div>

      {/* Legal & Rockstar Parody Disclaimer */}
      <div className="footer-legal-block">
        <p className="footer-copyright">{FOOTER_CONTENT.copyright}</p>
        <p className="footer-disclaimer-text">
          {FOOTER_CONTENT.rockstarDisclaimer}
          {' '}Grand Theft Auto, GTA VI, Rockstar Games, and the Rockstar Games R* logo are trademarks and/or registered trademarks of Take-Two Interactive Software, Inc. in the U.S. and/or other countries. All other trademarks, trade names, and copyrights are property of their respective owners.
        </p>
        <div className="footer-legal-links">
          <a href="#top" onClick={scrollToTop}>Privacy Policy</a>
          <span className="footer-dot">•</span>
          <a href="#top" onClick={scrollToTop}>Terms of Service</a>
          <span className="footer-dot">•</span>
          <a href="#top" onClick={scrollToTop}>Cookie Preferences</a>
          <span className="footer-dot">•</span>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer">Source Code</a>
        </div>
      </div>
    </footer>
  )
}
