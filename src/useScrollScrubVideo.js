import { useEffect } from 'react'

/**
 * useScrollScrubVideo
 *
 * Provides buttery-smooth scroll-driven video scrubbing matching the
 * rockstargames.com/VI experience.
 *
 * Key techniques:
 * 1. Immediate preloading & video decoder warm-up so frames are instantly available.
 * 2. Continuous requestAnimationFrame loop with linear interpolation (lerp)
 *    to smooth out discrete mouse wheel ticks and touch flings.
 * 3. Non-blocking seek queue: keeps the latest target time so slow browser video
 *    decoders never cause frames to drop or stutter.
 * 4. Hardware fastSeek where available with precise settling.
 * 5. IntersectionObserver to completely halt work when offscreen.
 */
export default function useScrollScrubVideo(sectionRef, videoRef, source) {
  useEffect(() => {
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video || !source) return

    // Preload video source immediately
    if (video.src !== source) {
      video.src = source
    }
    video.preload = 'auto'
    video.muted = true
    video.playsInline = true
    if ('webkitPlaysInline' in video) {
      video.webkitPlaysInline = true
    }
    video.load()

    let isVisible = false
    let isSeeking = false
    let pendingTime = null
    let targetProgress = 0
    let currentProgress = 0
    let rafId = null
    let isRunning = false

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const calculateProgress = () => {
      const rect = section.getBoundingClientRect()
      const distance = rect.height - window.innerHeight
      if (distance <= 0) return 0
      return Math.max(0, Math.min(1, -rect.top / distance))
    }

    const seekTo = (time) => {
      if (!Number.isFinite(time) || video.readyState < 2) {
        pendingTime = time
        return
      }

      const clampedTime = Math.max(0, Math.min(video.duration || 1, time))
      if (Math.abs(video.currentTime - clampedTime) < 0.015) {
        return
      }

      if (isSeeking) {
        pendingTime = clampedTime
        return
      }

      isSeeking = true
      pendingTime = null

      try {
        if (typeof video.fastSeek === 'function') {
          video.fastSeek(clampedTime)
        } else {
          video.currentTime = clampedTime
        }
      } catch {
        video.currentTime = clampedTime
      }
    }

    const onSeeked = () => {
      isSeeking = false
      if (pendingTime !== null) {
        const nextTime = pendingTime
        pendingTime = null
        seekTo(nextTime)
      }
    }

    const renderLoop = () => {
      if (!isVisible) {
        isRunning = false
        return
      }

      // Linear interpolation (lerp) towards target scroll progress
      const diff = targetProgress - currentProgress
      if (Math.abs(diff) > 0.0005) {
        currentProgress += diff * 0.16
      } else {
        currentProgress = targetProgress
      }

      if (Number.isFinite(video.duration) && video.duration > 0) {
        const targetTime = currentProgress * video.duration
        seekTo(targetTime)
      }

      // Continue running if visible or progress is still settling
      if (isVisible || Math.abs(diff) > 0.0005) {
        rafId = window.requestAnimationFrame(renderLoop)
      } else {
        isRunning = false
      }
    }

    const startLoop = () => {
      if (!isRunning && isVisible && !prefersReducedMotion) {
        isRunning = true
        rafId = window.requestAnimationFrame(renderLoop)
      }
    }

    const onScrollOrResize = () => {
      targetProgress = calculateProgress()
      if (prefersReducedMotion) return
      startLoop()
    }

    // Warm up the video decoder as soon as metadata is ready
    const onLoadedMetadata = () => {
      targetProgress = calculateProgress()
      currentProgress = targetProgress
      if (Number.isFinite(video.duration) && video.duration > 0) {
        seekTo(targetProgress * video.duration)
      }
      startLoop()
    }

    video.addEventListener('seeked', onSeeked)
    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('loadeddata', onLoadedMetadata)
    video.addEventListener('canplay', onLoadedMetadata)

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)

    // IntersectionObserver so we only tick RAF when the section is in or near viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible) {
          targetProgress = calculateProgress()
          startLoop()
        }
      },
      {
        rootMargin: '600px 0px 600px 0px',
        threshold: 0,
      },
    )

    observer.observe(section)
    onScrollOrResize()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('loadeddata', onLoadedMetadata)
      video.removeEventListener('canplay', onLoadedMetadata)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [sectionRef, videoRef, source])
}
