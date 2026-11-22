import { useRef, useEffect } from 'react'
import { useModal } from '../context/ModalContext'
import { SOCIAL_LINKS } from '../content'

export default function ModalRoot() {
  const { activeModal, modalData, closeModal } = useModal()
  const videoRef = useRef(null)

  useEffect(() => {
    if (activeModal === 'video' && videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }, [activeModal])

  if (!activeModal) return null

  const handleHireMeScroll = () => {
    closeModal()
    setTimeout(() => {
      document.getElementById('hire-me')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="gta-modal-backdrop" onClick={closeModal} role="dialog" aria-modal="true">
      <div className="gta-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="gta-modal-close"
          onClick={closeModal}
          aria-label="Close modal"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* ── 1. Video Player Modal ── */}
        {activeModal === 'video' && (
          <div className="gta-modal-body gta-video-modal">
            <div className="gta-modal-badge">
              <span className="gta-modal-dot" />
              <span>OFFICIAL PREVIEW</span>
            </div>
            <h2 className="gta-modal-title">{modalData.title || 'MEET THE DEVELOPER'}</h2>
            <p className="gta-modal-subtitle">{modalData.subtitle || 'Cinematic reel & engineering showcase'}</p>

            <div className="gta-modal-video-wrap">
              <video
                ref={videoRef}
                src={modalData.src}
                controls
                autoPlay
                playsInline
                className="gta-modal-video"
              />
            </div>

            <div className="gta-modal-actions">
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="gta-modal-btn gta-modal-btn-primary"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <span>Watch More on YouTube</span>
              </a>
              <button type="button" onClick={closeModal} className="gta-modal-btn gta-modal-btn-secondary">
                Back to Site
              </button>
            </div>
          </div>
        )}

        {/* ── 2. See What's Included Modal (Code Rescue) ── */}
        {activeModal === 'services-included' && (
          <div className="gta-modal-body">
            <div className="gta-modal-badge">
              <span className="gta-modal-dot" />
              <span>SERVICES & AUDIT</span>
            </div>
            <h2 className="gta-modal-title">CODE RESCUE — WHAT&apos;S INCLUDED</h2>
            <p className="gta-modal-subtitle">For teams with slow pages, flaky deploys, or a codebase nobody wants to touch.</p>

            <div className="gta-modal-grid">
              <div className="gta-modal-box">
                <div className="gta-box-icon">⚡</div>
                <h4>48-Hour Full System Audit</h4>
                <p>Complete static and dynamic analysis of your frontend and API. Pinpoints slow database queries, memory leaks, high-cost bundle imports, and rendering bottlenecks.</p>
              </div>

              <div className="gta-modal-box">
                <div className="gta-box-icon">🛠️</div>
                <h4>CI/CD & Deployment Fix</h4>
                <p>Repair flaky test suites, optimize Docker build layers, and set up smooth zero-downtime automated pipelines with rollback safety.</p>
              </div>

              <div className="gta-modal-box">
                <div className="gta-box-icon">🚀</div>
                <h4>Core Web Vitals Optimization</h4>
                <p>Drive LCP, INP, and CLS scores into the green. Optimization of database indexes, Redis caching, and client-side hydration.</p>
              </div>

              <div className="gta-modal-box">
                <div className="gta-box-icon">📚</div>
                <h4>Architecture Documentation</h4>
                <p>Clear architectural decision records (ADRs), environment runbooks, and a handover session so your team moves faster permanently.</p>
              </div>
            </div>

            <div className="gta-modal-actions">
              <a
                href={`mailto:${SOCIAL_LINKS.emailRaw}?subject=Code%20Rescue%20Inquiry%20-%20Clinton%20Dickens`}
                className="gta-modal-btn gta-modal-btn-primary"
              >
                Request Code Rescue
              </a>
              <button type="button" onClick={handleHireMeScroll} className="gta-modal-btn gta-modal-btn-secondary">
                Contact Form
              </button>
            </div>
          </div>
        )}

        {/* ── 3. Start a Project Modal (Full-Stack / Builds) ── */}
        {activeModal === 'start-project' && (
          <div className="gta-modal-body">
            <div className="gta-modal-badge">
              <span className="gta-modal-dot" />
              <span>NEW BUILDS</span>
            </div>
            <h2 className="gta-modal-title">FULL-STACK / BUILDS</h2>
            <p className="gta-modal-subtitle">Product, API, and database, designed and shipped end-to-end in six to ten weeks.</p>

            <div className="gta-modal-timeline">
              <div className="gta-timeline-item">
                <span className="gta-timeline-step">WEEKS 01 - 02</span>
                <h4>Discovery & Architecture</h4>
                <p>Product scoping, database schema design (PostgreSQL), REST/GraphQL API specifications, and interactive wireframes.</p>
              </div>

              <div className="gta-timeline-item">
                <span className="gta-timeline-step">WEEKS 03 - 06</span>
                <h4>Full-Stack Implementation</h4>
                <p>React/Next.js frontend with sub-100ms interactions, rock-solid Node.js/Go backend, auth systems, and third-party integrations.</p>
              </div>

              <div className="gta-timeline-item">
                <span className="gta-timeline-step">WEEKS 07 - 10</span>
                <h4>Hardening, QA & Launch</h4>
                <p>Stress testing, security audit, automated CI/CD pipeline, production deployment, and post-launch telemetry.</p>
              </div>
            </div>

            <div className="gta-modal-actions">
              <a
                href={`mailto:${SOCIAL_LINKS.emailRaw}?subject=New%20Product%20Build%20Inquiry`}
                className="gta-modal-btn gta-modal-btn-primary"
              >
                Send Project Brief
              </a>
              <button type="button" onClick={handleHireMeScroll} className="gta-modal-btn gta-modal-btn-secondary">
                View Availability
              </button>
            </div>
          </div>
        )}

        {/* ── 4. Case Study Modal ── */}
        {activeModal === 'case-study' && (
          <div className="gta-modal-body">
            <div className="gta-modal-badge">
              <span className="gta-modal-dot" />
              <span>CASE STUDY</span>
            </div>
            <h2 className="gta-modal-title">THE HEIST: SHIPPED IN SIX WEEKS</h2>
            <p className="gta-modal-subtitle">How I rebuilt a booking platform&apos;s checkout and cut drop-offs by 31%.</p>

            <div className="gta-modal-stats">
              <div className="gta-stat-item">
                <span className="gta-stat-val">+31%</span>
                <span className="gta-stat-lbl">Checkout Conversions</span>
              </div>
              <div className="gta-stat-item">
                <span className="gta-stat-val">140ms</span>
                <span className="gta-stat-lbl">P95 API Response</span>
              </div>
              <div className="gta-stat-item">
                <span className="gta-stat-val">6 WEEKS</span>
                <span className="gta-stat-lbl">From Spec to Prod</span>
              </div>
            </div>

            <div className="gta-modal-text-block">
              <h4>The Challenge</h4>
              <p>The client was losing thousands of bookings per week due to a sluggish, monolithic multi-page checkout that took over 6 seconds to complete payment validation and seat locking.</p>

              <h4>The Solution</h4>
              <p>Re-architected the checkout flow into an optimistic, single-page React interface backed by a dedicated microservice with Redis row-level locking for instant seat reservation and resilient Stripe webhooks.</p>
            </div>

            <div className="gta-modal-actions">
              <a
                href={`mailto:${SOCIAL_LINKS.emailRaw}?subject=Inquiry%20from%20The%20Heist%20Case%20Study`}
                className="gta-modal-btn gta-modal-btn-primary"
              >
                Discuss a Similar Project
              </a>
              <button type="button" onClick={closeModal} className="gta-modal-btn gta-modal-btn-secondary">
                Close
              </button>
            </div>
          </div>
        )}

        {/* ── 5. Community Modal ── */}
        {activeModal === 'community' && (
          <div className="gta-modal-body">
            <div className="gta-modal-badge">
              <span className="gta-modal-dot" />
              <span>AFTER HOURS & TECH COMMUNITY</span>
            </div>
            <h2 className="gta-modal-title">COMMUNITY & TALKS IN NAIROBI</h2>
            <p className="gta-modal-subtitle">When the deploy is done, Dickens is collaborating with Kenya&apos;s dev ecosystem.</p>

            <div className="gta-modal-grid">
              <div className="gta-modal-box">
                <h4>Nairobi JS & React Meetups</h4>
                <p>Regular speaker and attendee discussing React 19 compiler internals, state management, and high-performance web applications.</p>
              </div>
              <div className="gta-modal-box">
                <h4>Hackathons & Code Sprints</h4>
                <p>Mentoring junior engineers, building rapid AI prototypes, and contributing to open-source developer tooling.</p>
              </div>
              <div className="gta-modal-box">
                <h4>Engineering Writing</h4>
                <p>Publishing deep dives on system design, distributed systems, and agentic workflows for modern software engineers.</p>
              </div>
            </div>

            <div className="gta-modal-actions">
              <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer" className="gta-modal-btn gta-modal-btn-primary">
                Follow on X (@dickens49631)
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="gta-modal-btn gta-modal-btn-secondary">
                LinkedIn Profile
              </a>
            </div>
          </div>
        )}

        {/* ── 6. Clients Modal ── */}
        {activeModal === 'clients' && (
          <div className="gta-modal-body">
            <div className="gta-modal-badge">
              <span className="gta-modal-dot" />
              <span>ROSTER & COLLABORATIONS</span>
            </div>
            <h2 className="gta-modal-title">SELECTED CLIENTS & AGENCIES</h2>
            <p className="gta-modal-subtitle">Startups, scale-ups, and product agencies who trust Dickens to ship critical systems.</p>

            <div className="gta-modal-grid">
              <div className="gta-modal-box">
                <h4>FinTech Booking Platform</h4>
                <p>Delivered complete payment orchestration, seat-locking concurrency engine, and real-time checkout analytics.</p>
              </div>
              <div className="gta-modal-box">
                <h4>HealthTech Portal</h4>
                <p>HIPAA-compliant patient portal, telemedicine video integrations, and high-throughput appointment scheduler.</p>
              </div>
              <div className="gta-modal-box">
                <h4>SaaS Analytics Engine</h4>
                <p>Aggregated millions of events into sub-second dashboards using PostgreSQL partitions and ClickHouse streams.</p>
              </div>
              <div className="gta-modal-box">
                <h4>Creative Agency Digital Hub</h4>
                <p>Custom 3D Three.js experiences, WebGL animations, and headless CMS integrations for tier-one brands.</p>
              </div>
            </div>

            <div className="gta-modal-actions">
              <button type="button" onClick={handleHireMeScroll} className="gta-modal-btn gta-modal-btn-primary">
                Work With Dickens
              </button>
              <button type="button" onClick={closeModal} className="gta-modal-btn gta-modal-btn-secondary">
                Close
              </button>
            </div>
          </div>
        )}

        {/* ── 7. Review Modal ── */}
        {activeModal === 'review' && (
          <div className="gta-modal-body">
            <div className="gta-modal-badge">
              <span className="gta-modal-dot" />
              <span>VERIFIED CLIENT TESTIMONIAL</span>
            </div>
            <h2 className="gta-modal-title">CLIENT REVIEW</h2>
            <div className="gta-review-quote">
              <p>&ldquo;Incredibly fast, detail-oriented, and easy to work with. Dickens stepped in when our internal sprint stalled, fixed our core checkout pipeline within two weeks, and shipped our full redesign ahead of schedule with zero production incidents.&rdquo;</p>
              <div className="gta-review-author">
                <strong>VP OF PRODUCT & ENGINEERING</strong>
                <span>Pan-African FinTech & Travel Scale-Up</span>
              </div>
            </div>

            <div className="gta-modal-actions">
              <button type="button" onClick={handleHireMeScroll} className="gta-modal-btn gta-modal-btn-primary">
                Hire Dickens
              </button>
              <button type="button" onClick={closeModal} className="gta-modal-btn gta-modal-btn-secondary">
                Back to Site
              </button>
            </div>
          </div>
        )}

        {/* ── 8. Blog Reader Modal ── */}
        {activeModal === 'blog' && (
          <div className="gta-modal-body">
            <div className="gta-modal-badge">
              <span className="gta-modal-dot" />
              <span>ENGINEERING ARTICLE · {modalData.date || 'LATEST'}</span>
            </div>
            <h2 className="gta-modal-title">{modalData.title || 'ENGINEERING ARTICLE'}</h2>

            <div className="gta-modal-text-block">
              {modalData.title?.includes('700 AI Agents') ? (
                <>
                  <p>In this post, we analyze what happens when autonomous agent swarms are deployed in recursive execution loops without deterministic safety gates. When multi-agent systems interact with external APIs, state divergences compound exponentially.</p>
                  <h4>Key Takeaways for Software Architects</h4>
                  <p>1. <strong>Bounded Capability Scopes:</strong> Subagents must run in read-only or strictly capability-audited sandboxes.</p>
                  <p>2. <strong>State Re-synchronization:</strong> Rely on immutable event logs rather than optimistic shared state.</p>
                  <p>3. <strong>Human-in-the-Loop Safeguards:</strong> High-impact mutations must require cryptographically verified approval.</p>
                </>
              ) : modalData.title?.includes('Agentic Engineering') ? (
                <>
                  <p>Agentic workflows represent the largest paradigm shift since cloud orchestration. The role of the engineer has evolved from writing boilerplate logic to designing feedback loops, evaluation harnesses, and self-healing systems.</p>
                  <h4>The 2026 Developer Toolkit</h4>
                  <p>Modern applications combine standard relational databases like PostgreSQL with specialized agentic orchestration layers, background workers, and real-time streaming interfaces.</p>
                </>
              ) : (
                <>
                  <p>High-scale systems don&apos;t fail because of complex algorithms; they fail at the boundaries between services, databases, and network connections. Designing for fault tolerance requires embracing failure as a regular runtime state.</p>
                  <h4>Core Tenets</h4>
                  <p>Always isolate read-heavy workloads from write paths, introduce backpressure to prevent cascade failures, and treat observability as a first-class feature rather than an afterthought.</p>
                </>
              )}
            </div>

            <div className="gta-modal-actions">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="gta-modal-btn gta-modal-btn-primary">
                View Code on GitHub
              </a>
              <button type="button" onClick={closeModal} className="gta-modal-btn gta-modal-btn-secondary">
                Close Article
              </button>
            </div>
          </div>
        )}

        {/* ── 9. Project Detail Modal ── */}
        {activeModal === 'project' && (
          <div className="gta-modal-body">
            <div className="gta-modal-badge">
              <span className="gta-modal-dot" />
              <span>FEATURED WORK · {modalData.category || 'SOFTWARE'}</span>
            </div>
            <h2 className="gta-modal-title">{modalData.title || 'PROJECT SHOWCASE'}</h2>

            <div className="gta-modal-text-block">
              <p>Built with modern production standards, clean architecture, and responsive performance.</p>
              <h4>Technologies Used</h4>
              <p>{modalData.category === 'AI' ? 'Python, OpenAI API, LangChain, React, FastAPI, Pinecone Vector DB.' : modalData.category === '3D Web' ? 'Three.js, React Three Fiber, GSAP, WebGL Shaders, Tailwind CSS.' : 'React Native, Expo, TypeScript, Node.js, SQLite, Supabase.'}</p>
            </div>

            <div className="gta-modal-actions">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="gta-modal-btn gta-modal-btn-primary">
                Explore on GitHub
              </a>
              <button type="button" onClick={closeModal} className="gta-modal-btn gta-modal-btn-secondary">
                Close
              </button>
            </div>
          </div>
        )}

        {/* ── 10. Build Your Own Modal ── */}
        {activeModal === 'build-your-own' && (
          <div className="gta-modal-body">
            <div className="gta-modal-badge">
              <span className="gta-modal-dot" />
              <span>OPEN SOURCE BLUEPRINT</span>
            </div>
            <h2 className="gta-modal-title">BUILD YOUR OWN GTA VI PORTFOLIO</h2>
            <p className="gta-modal-subtitle">Here is the technical stack and architecture behind this site.</p>

            <div className="gta-modal-grid">
              <div className="gta-modal-box">
                <h4>1. Scroll-Scrubbed Video</h4>
                <p>Synced with requestAnimationFrame and viewport math, rendering lightweight AVIF posters while dynamically scrubbing high-def video.</p>
              </div>
              <div className="gta-modal-box">
                <h4>2. GSAP Split Assembly</h4>
                <p>Shard animations that assemble seamlessly into the iconic GTA VI split-art poster layout on page load.</p>
              </div>
              <div className="gta-modal-box">
                <h4>3. Pure React 19 & Tailwind</h4>
                <p>Ultra-fast client bundle with zero runtime overhead, responsive flexbox/grid containers, and accessibility attributes.</p>
              </div>
              <div className="gta-modal-box">
                <h4>4. Custom Neon Visual Language</h4>
                <p>Miami Vice sunset palettes (#f4a8b6, #ff6bb5), Barlow Condensed typography, and authentic Rockstar ESRB rating badges.</p>
              </div>
            </div>

            <div className="gta-modal-actions">
              <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="gta-modal-btn gta-modal-btn-primary">
                View Source on GitHub
              </a>
              <button type="button" onClick={closeModal} className="gta-modal-btn gta-modal-btn-secondary">
                Back to Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
