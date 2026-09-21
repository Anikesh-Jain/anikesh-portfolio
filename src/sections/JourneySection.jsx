import React, { useRef, useState, useEffect } from 'react'
import { BookOpen, Code, Palette, TrendingUp } from 'lucide-react'
import { journeyMilestones } from '../data/portfolioData'

const milestoneIcons = {
  book: <BookOpen size={30} strokeWidth={1.8} />,
  code: <Code size={30} strokeWidth={1.8} />,
  palette: <Palette size={30} strokeWidth={1.8} />,
  trending: <TrendingUp size={30} strokeWidth={1.8} />
}

const SESSION_KEY = 'portfolio_journey_completed'

// Check if returning to route within an active session vs fresh full-page load/reload
function checkIsCompleted() {
  try {
    if (typeof performance !== 'undefined') {
      const navEntries = performance.getEntriesByType('navigation')
      if (navEntries.length > 0 && navEntries[0].type === 'reload') {
        sessionStorage.removeItem(SESSION_KEY)
        return false
      }
    }
    return sessionStorage.getItem(SESSION_KEY) === 'true'
  } catch {
    return false
  }
}

export default function JourneySection() {
  const sectionRef = useRef(null)
  const animRef = useRef(null)

  // Session-level persistence: check if Journey animation has already played in this browser session
  const [isCompleted, setIsCompleted] = useState(checkIsCompleted)
  const [hasTriggered, setHasTriggered] = useState(isCompleted)

  useEffect(() => {
    // If already completed in this session, do not attach observer or replay
    if (isCompleted) return

    const el = sectionRef.current
    if (!el) return

    let timer = null
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Check for reduced-motion preference
          const prefersReducedMotion =
            typeof window !== 'undefined' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches

          if (prefersReducedMotion) {
            setHasTriggered(true)
            setIsCompleted(true)
            try {
              sessionStorage.setItem(SESSION_KEY, 'true')
            } catch {
              // ignore
            }
            observer.disconnect()
            return
          }

          setHasTriggered(true)

          // After the flight duration (5.5s), lock permanently into static completed state
          timer = setTimeout(() => {
            setIsCompleted(true)
            try {
              sessionStorage.setItem(SESSION_KEY, 'true')
            } catch {
              // ignore storage errors
            }
          }, 5500)
          observer.disconnect()
        }
      },
      {
        threshold: 0.15
      }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (timer) clearTimeout(timer)
    }
  }, [isCompleted])

  // Trigger the SVG SMIL animation from t=0 immediately when section enters viewport
  useEffect(() => {
    if (hasTriggered && !isCompleted && animRef.current) {
      try {
        if (typeof animRef.current.beginElement === 'function') {
          animRef.current.beginElement()
        }
      } catch {
        // ignore fallback
      }
    }
  }, [hasTriggered, isCompleted])

  return (
    <section id="journey" ref={sectionRef} className="section shell">
      <div className="journey-container">
        {/* Background artwork layer */}
        <div className="journey-bg" aria-hidden="true" />
        <div className="journey-bg-overlay" aria-hidden="true" />

        {/* Decorative stars */}
        <div className="journey-stars" aria-hidden="true">
          <span className="journey-star j-star-1" />
          <span className="journey-star j-star-2" />
          <span className="journey-star j-star-3" />
          <span className="journey-star j-star-4" />
          <span className="journey-star j-star-5" />
          <span className="journey-star j-star-6" />
          <span className="journey-star j-star-7" />
        </div>

        {/* Section heading inside the container */}
        <div className="journey-header">
          <p className="eyebrow">
            <span className="dot" />
            JOURNEY
          </p>
          <h2 className="journey-title">
            Growth <span className="journey-title-gradient">in Motion</span>
          </h2>
        </div>

        {/* Rocket Canvas — One continuous flight to upper-right destination, then stops permanently */}
        <svg
          className="journey-rocket-canvas"
          viewBox="0 0 1200 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="rocketBody" x1="30" y1="5" x2="30" y2="55" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e0d0ff" />
              <stop offset="50%" stopColor="#b87fff" />
              <stop offset="100%" stopColor="#8040df" />
            </linearGradient>
            <linearGradient id="rocketWindow" x1="30" y1="20" x2="30" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#a0e8ff" />
              <stop offset="100%" stopColor="#49c7ff" />
            </linearGradient>
            <linearGradient id="swooshOuterGrad" x1="30" y1="50" x2="14" y2="195" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
              <stop offset="12%" stopColor="#49c7ff" stopOpacity="0.92" />
              <stop offset="42%" stopColor="#a855f7" stopOpacity="0.75" />
              <stop offset="72%" stopColor="#7c3aed" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="swooshCoreGrad" x1="30" y1="50" x2="18" y2="175" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="28%" stopColor="#a5f3fc" stopOpacity="0.9" />
              <stop offset="68%" stopColor="#c084fc" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="rocketGlowGrad" cx="30" cy="30" r="35" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#b16cff" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#49c7ff" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#49c7ff" stopOpacity="0" />
            </radialGradient>
            <filter id="swooshGlowFilter" x="-50%" y="-30%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Continuous curved flight path stopping at upper-right destination (920, 58) */}
            <path
              id="rocketFlightTrajectory"
              d="M -90 270 C 260 210, 620 110, 920 58"
              fill="none"
            />
          </defs>

          {/* Moving Rocket Ship — One-shot flight, then freezes permanently at destination */}
          {(hasTriggered || isCompleted) && (
            <g
              className={`journey-rocket-mover ${hasTriggered && !isCompleted ? 'is-flying' : ''} ${isCompleted ? 'is-completed' : ''}`}
              {...(isCompleted ? { transform: 'translate(920, 58) rotate(-9.84)' } : {})}
            >
              {!isCompleted && (
                <animateMotion
                  ref={animRef}
                  id="rocketFlightMotion"
                  dur="5.5s"
                  repeatCount="1"
                  fill="freeze"
                  rotate="auto"
                  calcMode="spline"
                  keyTimes="0; 1"
                  keySplines="0.22 0.05 0.28 1"
                  begin="indefinite"
                >
                  <mpath href="#rocketFlightTrajectory" xlinkHref="#rocketFlightTrajectory" />
                </animateMotion>
              )}

              {/* Rocket & streaming exhaust oriented so nose aligns with path tangent */}
              <g transform="rotate(90) translate(-30, -30)">
                <g className="journey-rocket-scale-group">
                  {/* Permanent Ambient Rocket Glow */}
                  <circle cx="30" cy="30" r="42" fill="url(#rocketGlowGrad)" />

                  {/* Thin, gently curving continuous rocket exhaust contrail */}
                  <g className="journey-rocket-swoosh-group">
                    {/* Outer flowing plume — thin contrail, straight for most of length, then gentle upward curve */}
                    <path
                      d="M 27.5 50 C 28 80, 28.5 115, 28.8 140 C 28.9 155, 27 172, 21 185 C 19 189, 16.5 193, 14 195 C 17 192, 20.5 186, 23 181 C 29.5 168, 31.2 153, 31.2 140 C 31.5 115, 32 80, 32.5 50 Z"
                      fill="url(#swooshOuterGrad)"
                      filter="url(#swooshGlowFilter)"
                      className="flowing-flame-plume"
                    />
                    {/* Inner hot plasma core */}
                    <path
                      d="M 28.5 50 C 28.8 75, 29.2 105, 29.4 125 C 29.5 140, 28 155, 24 167 C 22 171, 20 174, 18 175 C 20 173, 22.5 169, 25 164 C 29 152, 30.5 138, 30.6 125 C 30.8 105, 31.2 75, 31.5 50 Z"
                      fill="url(#swooshCoreGrad)"
                      className="flowing-flame-core"
                    />
                    {/* Aerodynamic streamline whisker */}
                    <path
                      d="M 27 54 C 27.5 85, 27.8 120, 26 145 C 24.5 162, 19 178, 11 188"
                      fill="none"
                      stroke="url(#swooshCoreGrad)"
                      strokeWidth="0.75"
                      strokeOpacity="0.6"
                      strokeDasharray="16 6"
                      className="flowing-flame-streamline"
                    />

                    {/* Continuous backward streaming plasma particles from nozzle */}
                    <g className="swoosh-stream-sparks">
                      <circle cx="30" cy="55" r="1.6" fill="#ffffff">
                        <animate attributeName="cy" values="55; 95; 140; 185" dur="0.45s" repeatCount="indefinite" />
                        <animate attributeName="cx" values="30; 29.5; 26; 16" dur="0.45s" repeatCount="indefinite" />
                        <animate attributeName="r" values="1.8; 1.3; 0.8; 0.2" dur="0.45s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1; 0.8; 0.4; 0" dur="0.45s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="29" cy="55" r="1.3" fill="#49c7ff">
                        <animate attributeName="cy" values="55; 90; 130; 175" dur="0.38s" begin="0.12s" repeatCount="indefinite" />
                        <animate attributeName="cx" values="29; 29; 27; 18" dur="0.38s" begin="0.12s" repeatCount="indefinite" />
                        <animate attributeName="r" values="1.5; 1.1; 0.6; 0.2" dur="0.38s" begin="0.12s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1; 0.75; 0.35; 0" dur="0.38s" begin="0.12s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="31" cy="55" r="1.2" fill="#c084fc">
                        <animate attributeName="cy" values="55; 100; 145; 190" dur="0.52s" begin="0.22s" repeatCount="indefinite" />
                        <animate attributeName="cx" values="31; 30; 25; 15" dur="0.52s" begin="0.22s" repeatCount="indefinite" />
                        <animate attributeName="r" values="1.4; 1.0; 0.5; 0.1" dur="0.52s" begin="0.22s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1; 0.7; 0.3; 0" dur="0.52s" begin="0.22s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  </g>

                  {/* Exact Rocket SVG paths preserved without any changes */}
                  <g className="journey-rocket-craft">
                    {/* Body */}
                    <path
                      d="M30 5 C30 5, 42 18, 42 35 C42 42, 38 48, 30 50 C22 48, 18 42, 18 35 C18 18, 30 5, 30 5Z"
                      fill="url(#rocketBody)"
                    />
                    {/* Window */}
                    <circle cx="30" cy="24" r="5.5" fill="url(#rocketWindow)" />
                    <circle cx="30" cy="24" r="4" fill="#0d1025" opacity="0.5" />
                    {/* Fins */}
                    <path d="M18 36 C18 36, 10 42, 12 48 L18 44Z" fill="#9060d0" />
                    <path d="M42 36 C42 36, 50 42, 48 48 L42 44Z" fill="#9060d0" />
                    {/* Flame */}
                    <path d="M26 49 C26 49, 30 58, 30 58 C30 58, 34 49, 34 49" fill="#ff8844" opacity="0.9" />
                    <path d="M28 49 C28 49, 30 55, 30 55 C30 52, 32 49, 32 49" fill="#ffcc44" opacity="0.9" />
                  </g>
                </g>
              </g>
            </g>
          )}
        </svg>

        {/* Progressive Timeline — One-shot progression from left to right endpoint */}
        <div className={`timeline ${hasTriggered ? 'timeline-active' : ''} ${isCompleted ? 'timeline-completed' : ''}`}>
          {/* Base dim track */}
          <div className="timeline-line timeline-line-base" aria-hidden="true" />

          {/* Animated glowing progress line */}
          <div className="timeline-line timeline-line-progress" aria-hidden="true">
            <div className="timeline-progress-head" />
          </div>

          {/* Milestone dots on the line */}
          <div className="timeline-dots" aria-hidden="true">
            <span className="timeline-dot dot-start" />
            <span className="timeline-dot dot-1" />
            <span className="timeline-dot dot-2" />
            <span className="timeline-dot dot-3" />
            <span className="timeline-dot dot-4" />
            <span className="timeline-dot dot-end" />
          </div>

          {/* Milestone nodes */}
          {journeyMilestones.map((item, idx) => {
            const isFinal = idx === journeyMilestones.length - 1

            return (
              <div
                key={item.step}
                className={`milestone milestone-step-${idx + 1} ${isFinal ? 'milestone-final' : ''}`}
              >
                <div className="node">
                  <span className="node-icon" aria-hidden="true">
                    {milestoneIcons[item.iconKey]}
                  </span>
                  <span className="node-pulse-ring" aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
