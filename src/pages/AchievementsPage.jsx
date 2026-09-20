import React from 'react'
import { motion } from 'framer-motion'
import { achievementsData } from '../data/achievementsData'

export default function AchievementsPage() {
  const getHexSvg = (index) => {
    switch (index) {
      case 0: // Poster
        return (
          <svg viewBox="0 0 64 64">
            <rect x="17" y="17" width="30" height="30" rx="3" />
            <path d="M23 23h8v8h-8zM35 23h6v8h-6zM23 35h8v6h-8zM35 35h6v6h-6z" />
          </svg>
        )
      case 1: // Symposium / Presentation
        return (
          <svg viewBox="0 0 64 64">
            <rect x="16" y="18" width="32" height="25" rx="3" />
            <path d="M22 43v5h20v-5M23 35v-9M30 35v-5M37 35v-13M44 35v-7M20 22h24" />
          </svg>
        )
      case 2: // Junkyard / Tech
        return (
          <svg viewBox="0 0 64 64">
            <path d="M20 42l9-9 6 6 10-12" />
            <path d="M20 48h26M22 27l7 6M36 25l9-9M44 16h-7M45 16v7" />
          </svg>
        )
      case 3: // Magazine
        return (
          <svg viewBox="0 0 64 64">
            <path d="M20 44h24M24 39l4-17 7 8 5-12 4 21" />
            <path d="M18 46h28" />
          </svg>
        )
      case 4: // Sports / Team
      default:
        return (
          <svg viewBox="0 0 64 64">
            <circle cx="26" cy="29" r="7" />
            <circle cx="39" cy="29" r="7" />
            <path d="M15 45c1-7 6-10 11-10s10 3 11 10M29 45c1-6 5-9 10-9 5 0 9 3 10 9" />
          </svg>
        )
    }
  }

  const laurelSvg = (isRight = false) => (
    <svg
      className={`laurel-svg ${isRight ? 'laurel-right' : ''}`}
      viewBox="0 0 44 70"
      aria-hidden="true"
    >
      <path d="M32 64C14 55 10 37 18 12" />
      <path d="M17 51c-5-2-9-6-11-11 6 0 10 3 13 7M13 39c-5-2-8-6-9-10 5 0 9 2 12 6M14 27c-4-3-6-7-6-11 5 1 8 4 9 8M17 17c-3-4-3-8-2-11 4 2 6 5 6 9" />
    </svg>
  )

  return (
    <div className="achievements-page shell py-4">
      {/* Original Page Hero with Trophy Plaque Visual */}
      <section className="achievements-hero reveal">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="achievements-hero-copy"
        >
          <p className="eyebrow">
            <span className="dot" />
            ACHIEVEMENTS
          </p>
          <h1>
            Recognition through<br />
            <span className="gradient">consistent work.</span>
          </h1>
          <p>
            A focused record of competition results across creative, technical and co-curricular activities.
          </p>
        </motion.div>

        {/* CSS Trophy Plaque Visual (Refined Neon Glass Aesthetic) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="award-visual"
          aria-hidden="true"
        >
          <div className="award-ambient-glow" />
          <div className="award-sparkle sp1" />
          <div className="award-sparkle sp2" />
          <div className="award-sparkle sp3" />
          <div className="award-beam beam-one" />
          <div className="award-beam beam-two" />
          <div className="award-orbit orbit-one" />
          <div className="award-orbit orbit-two" />
          <div className="award-plaque">
            <div className="plaque-face">
              <svg className="plaque-emblem-svg" viewBox="0 0 100 140" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="plaque-pink-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff8ec2" />
                    <stop offset="50%" stopColor="#d975ff" />
                    <stop offset="100%" stopColor="#8c52ff" />
                  </linearGradient>
                  <linearGradient id="star-pink-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="40%" stopColor="#ffa6d2" />
                    <stop offset="100%" stopColor="#d975ff" />
                  </linearGradient>
                  <filter id="plaque-pink-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#ff6eb4" floodOpacity="0.8" />
                    <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#b16cff" floodOpacity="0.5" />
                  </filter>
                </defs>

                {/* Left Laurel Branch */}
                <g filter="url(#plaque-pink-glow)" stroke="url(#plaque-pink-grad)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 32 108 C 20 92 18 55 35 25" fill="none" />
                  <path d="M 23 94 C 16 91 14 85 19 81 C 24 84 25 90 23 94 Z" fill="rgba(255, 142, 194, 0.28)" />
                  <path d="M 18 78 C 12 75 11 68 17 64 C 22 68 22 74 18 78 Z" fill="rgba(255, 142, 194, 0.28)" />
                  <path d="M 17 60 C 12 56 12 49 18 46 C 23 50 22 56 17 60 Z" fill="rgba(255, 142, 194, 0.28)" />
                  <path d="M 20 42 C 16 38 17 31 24 30 C 28 34 26 40 20 42 Z" fill="rgba(255, 142, 194, 0.28)" />
                  <path d="M 27 26 C 24 22 27 16 34 16 C 36 21 33 26 27 26 Z" fill="rgba(255, 142, 194, 0.28)" />
                </g>

                {/* Right Laurel Branch (Mirrored) */}
                <g filter="url(#plaque-pink-glow)" stroke="url(#plaque-pink-grad)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" transform="translate(100, 0) scale(-1, 1)">
                  <path d="M 32 108 C 20 92 18 55 35 25" fill="none" />
                  <path d="M 23 94 C 16 91 14 85 19 81 C 24 84 25 90 23 94 Z" fill="rgba(255, 142, 194, 0.28)" />
                  <path d="M 18 78 C 12 75 11 68 17 64 C 22 68 22 74 18 78 Z" fill="rgba(255, 142, 194, 0.28)" />
                  <path d="M 17 60 C 12 56 12 49 18 46 C 23 50 22 56 17 60 Z" fill="rgba(255, 142, 194, 0.28)" />
                  <path d="M 20 42 C 16 38 17 31 24 30 C 28 34 26 40 20 42 Z" fill="rgba(255, 142, 194, 0.28)" />
                  <path d="M 27 26 C 24 22 27 16 34 16 C 36 21 33 26 27 26 Z" fill="rgba(255, 142, 194, 0.28)" />
                </g>

                {/* Central Star with layered 3D facets */}
                <g filter="url(#plaque-pink-glow)">
                  <polygon
                    points="50,42 54.5,56 69,56 57.5,65 62,79 50,70 38,79 42.5,65 31,56 45.5,56"
                    fill="url(#star-pink-grad)"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="50,47 52.8,56 62,56 54.5,62 57.5,71 50,65.5 42.5,71 45.5,62 38,56 47.2,56"
                    fill="rgba(255, 255, 255, 0.45)"
                  />
                </g>

                {/* Subtle base pedestal ribbon line */}
                <line x1="25" y1="118" x2="75" y2="118" stroke="url(#plaque-pink-grad)" strokeWidth="1.2" opacity="0.75" />
              </svg>
            </div>
            <div className="plaque-base" />
          </div>
          <div className="award-ground" />
        </motion.div>
      </section>

      {/* Achievement Cards List */}
      <section className="py-2">
        <div className="achievement-list">
          {achievementsData.map((ach, idx) => (
            <motion.article
              key={ach.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="achievement-card-v24"
            >
              {/* Hexagonal Clip-Path Icon */}
              <div className="achievement-icon hex-icon" aria-hidden="true">
                {getHexSvg(idx)}
              </div>

              {/* Achievement Content */}
              <div className="achievement-content">
                <h2>{ach.title}</h2>
                <p>{ach.description}</p>
              </div>

              {/* Laurel Award Badge */}
              <div className="achievement-award">
                {laurelSvg(false)}
                <span>{ach.placement}</span>
                {laurelSvg(true)}
              </div>

              {/* External Verification Link */}
              <a
                className="achievement-mark"
                href={ach.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View LinkedIn post for ${ach.title}`}
              >
                ↗
              </a>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}
