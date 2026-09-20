import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trophy, Award, Palette, Users } from 'lucide-react'
import { exploreCards } from '../data/portfolioData'

const cardIcons = [
  <Trophy key="trophy" size={28} className="explore-card-icon trophy-icon" />,
  <Award key="award" size={28} className="explore-card-icon award-icon" />,
  <Palette key="palette" size={28} className="explore-card-icon palette-icon" />,
  <Users key="users" size={28} className="explore-card-icon users-icon" />
]

export default function ExploreSection() {
  return (
    <section className="section shell" id="explore-section">
      <div className="explore-container">
        {/* Background artwork layer */}
        <div className="explore-bg" aria-hidden="true" />
        <div className="explore-bg-overlay" aria-hidden="true" />

        {/* Decorative stars */}
        <div className="explore-stars" aria-hidden="true">
          <span className="explore-star e-star-1" />
          <span className="explore-star e-star-2" />
          <span className="explore-star e-star-3" />
          <span className="explore-star e-star-4" />
          <span className="explore-star e-star-5" />
        </div>

        {/* Section header — left-aligned */}
        <div className="explore-header">
          <p className="eyebrow">
            <span className="dot" />
            EXPLORE
          </p>
          <h2 className="explore-title">
            More About <span className="explore-title-gradient">My Journey</span>
          </h2>
          <p className="explore-subtitle">
            Explore different facets of my work, achievements and interests.
          </p>
        </div>

        {/* Cards grid */}
        <div className="explore">
          {exploreCards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 25, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: idx * 0.13,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="explore-motion-wrap"
            >
              <Link
                to={card.path}
                className={`explore-card explore-card-${idx + 1}`}
              >
                {/* Top specular reflection line */}
                <div className="explore-top-specular" aria-hidden="true" />

                {/* Internal ambient radial glow */}
                <div className="explore-ambient-glow" aria-hidden="true" />

                {/* Decorative floating stars and particles */}
                <div className="explore-particles" aria-hidden="true">
                  <span className="explore-particle particle-1">✦</span>
                  <span className="explore-particle particle-2">◆</span>
                  <span className="explore-particle particle-3">✦</span>
                  <span className="explore-particle particle-4">•</span>
                  <span className="explore-particle particle-5">✦</span>
                </div>

                {/* Large category icon stage */}
                <div className="explore-icon-stage">
                  <div className="explore-icon-backdrop" aria-hidden="true" />
                  <div className="explore-icon-inner">
                    {cardIcons[idx]}
                  </div>
                </div>

                {/* Card body content */}
                <div className="explore-card-body">
                  <h3 className="explore-card-title">{card.label}</h3>
                  <p className="explore-card-desc">{card.description}</p>
                  <div className="explore-card-action">
                    <span className="explore-action-text">View All</span>
                    <span className="explore-arrow">→</span>
                  </div>
                </div>

                {/* Illuminated bottom edge energy beam */}
                <div className="explore-bottom-edge" aria-hidden="true" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
