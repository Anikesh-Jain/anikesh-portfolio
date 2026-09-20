import React from 'react'
import { motion } from 'framer-motion'
import { achievementsData } from '../data/achievementsData'

export default function AchievementsSection() {
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
    <section id="achievements" className="section">
      <div className="section-head mb-8">
        <div>
          <p className="eyebrow">
            <span className="dot" />
            ACHIEVEMENTS
          </p>
          <h2 className="text-[34px] sm:text-[43px] tracking-[-2px] font-extrabold text-foreground mt-2">
            Recognition through <span className="gradient">consistent work.</span>
          </h2>
        </div>
      </div>

      <div className="achievement-list">
        {achievementsData.map((ach, idx) => (
          <motion.article
            key={ach.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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

            {/* Verification Link */}
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
  )
}
