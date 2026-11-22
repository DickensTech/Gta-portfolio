import { useEffect, useRef } from 'react'

/**
 * MouseGlow
 *
 * Recreates the GTA VI signature atmospheric neon sunset glow that follows
 * the mouse cursor across desktop viewports.
 *
 * Uses GPU-accelerated translate3d with smooth trailing lerp inertia
 * and rests automatically when stationary to preserve 60/120fps performance.
 * Disabled on touch/mobile screens.
 */
export default function MouseGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || prefersReducedMotion) return

    const glow = glowRef.current
    if (!glow) return

    let targetX = -1000
    let targetY = -1000
    let currentX = -1000
    let currentY = -1000
    let isVisible = false
    let isRunning = false
    let rafId = null

    const render = () => {
      // Smooth linear interpolation (lerp) for smooth cinematic glide
      const dx = targetX - currentX
      const dy = targetY - currentY
      currentX += dx * 0.12
      currentY += dy * 0.12

      glow.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`

      // Continue animating while moving towards target or when visibility changes
      if (Math.abs(dx) > 0.15 || Math.abs(dy) > 0.15 || !isVisible) {
        rafId = window.requestAnimationFrame(render)
      } else {
        isRunning = false
      }
    }

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true
        rafId = window.requestAnimationFrame(render)
      }
    }

    const onPointerMove = (e) => {
      if (e.pointerType === 'touch') return
      targetX = e.clientX
      targetY = e.clientY

      if (!isVisible) {
        isVisible = true
        currentX = targetX
        currentY = targetY
        glow.style.opacity = '1'
      }

      startAnimation()
    }

    const onPointerLeave = () => {
      isVisible = false
      glow.style.opacity = '0'
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('mouseleave', onPointerLeave)
    window.addEventListener('blur', onPointerLeave)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('mouseleave', onPointerLeave)
      window.removeEventListener('blur', onPointerLeave)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      className="mouse-glow"
      aria-hidden="true"
    />
  )
}
