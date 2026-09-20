import React from 'react'
import { motion } from 'framer-motion'
import { Palette, Code2, Cloud, BookOpen, Wrench, Lightbulb } from 'lucide-react'
import { aboutData } from '../data/portfolioData'

export default function AboutSection() {
  return (
    <section id="about" className="home-about-section shell my-8">
      <div className="home-about-layout">
        {/* Left Column: Copy & Horizontal Statement Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="home-about-copy"
        >
          <p className="eyebrow">
            <span className="dot" />
            ABOUT ME
          </p>

          <h2 className="text-[clamp(42px,5vw,68px)] font-extrabold leading-[1.08] tracking-[-3px] my-5 sm:my-7 text-foreground">
            {aboutData.headline}
            <span className="gradient-multi">{aboutData.headlineAccent}</span>
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#9998aa] leading-[2] max-w-[760px]">
            {aboutData.paragraphs.map((para, idx) => (
              <p key={idx} className="m-0">
                {para}
              </p>
            ))}
          </div>

          {/* Three Horizontal Statement Cards with Left-to-Right Scroll Reveal */}
          <div className="about-statements">
            {aboutData.statements.map((stmt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -35 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.2,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={`about-statement statement-card-${idx + 1}`}
              >
                <div className="statement-icon-box">
                  {idx === 0 && <BookOpen size={20} className="stmt-icon stmt-icon-1" />}
                  {idx === 1 && <Wrench size={20} className="stmt-icon stmt-icon-2" />}
                  {idx === 2 && <Lightbulb size={20} className="stmt-icon stmt-icon-3" />}
                </div>
                <b>{stmt.title}</b>
                <span>{stmt.description}</span>
                <span className="card-bottom-edge" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Upgraded Futuristic MERN Orbit Card */}
        <motion.aside
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="about-identity-card"
        >
          {/* Card Ambient Particles */}
          <div className="about-card-ambient" aria-hidden="true">
            <span className="card-star cs1" />
            <span className="card-star cs2" />
            <span className="card-star cs3" />
            <span className="card-star cs4" />
          </div>

          {/* Top Row: Concept Badges (Ideas & Design) */}
          <div className="concept-row concept-row-top" aria-label="Ideation & Design">
            <div className="concept-badge badge-ideas">
              <Lightbulb className="badge-icon" size={14} />
              <span>Ideas</span>
            </div>
            <div className="concept-badge badge-design">
              <Palette className="badge-icon" size={14} />
              <span>Design</span>
            </div>
          </div>

          {/* Central MERN Technology Visualization System */}
          <div className="mern-system-wrapper">
            {/* Circular Glowing Orbit SVG Track */}
            <svg
              className="mern-orbit-svg"
              width="300"
              height="300"
              viewBox="0 0 300 300"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="mern-orbit-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#b16cff" floodOpacity="0.85" />
                  <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#7040df" floodOpacity="0.5" />
                </filter>
                <filter id="mern-glow-strong" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#49c7ff" floodOpacity="0.9" />
                  <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#b16cff" floodOpacity="0.7" />
                </filter>
                <linearGradient id="mern-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#49c7ff" />
                  <stop offset="50%" stopColor="#b16cff" />
                  <stop offset="100%" stopColor="#ff5fa2" />
                </linearGradient>
                <linearGradient id="top-arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(73, 199, 255, 0)" />
                  <stop offset="50%" stopColor="#b16cff" />
                  <stop offset="100%" stopColor="rgba(255, 95, 162, 0)" />
                </linearGradient>
                <linearGradient id="bot-arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255, 95, 162, 0)" />
                  <stop offset="50%" stopColor="#49c7ff" />
                  <stop offset="100%" stopColor="rgba(73, 199, 255, 0)" />
                </linearGradient>
              </defs>

              {/* Outer subtle dashed guide circle */}
              <circle
                cx="150"
                cy="150"
                r="140"
                stroke="rgba(177, 108, 255, 0.22)"
                strokeWidth="1"
                strokeDasharray="5 4"
              />

              {/* Main glowing CIRCULAR orbit (radius = 130px) */}
              <circle
                cx="150"
                cy="150"
                r="130"
                stroke="url(#mern-ring-grad)"
                strokeWidth="2.2"
                filter="url(#mern-orbit-glow)"
              />

              {/* Luminous energy crescents along core borders */}
              <path
                d="M 110 110 C 130 80, 170 80, 190 110"
                stroke="url(#top-arc-grad)"
                strokeWidth="2.8"
                filter="url(#mern-glow-strong)"
                opacity="0.95"
              />
              <path
                d="M 110 190 C 130 220, 170 220, 190 190"
                stroke="url(#bot-arc-grad)"
                strokeWidth="2.8"
                filter="url(#mern-glow-strong)"
                opacity="0.95"
              />

              {/* Inner subtle circular guide */}
              <circle
                cx="150"
                cy="150"
                r="120"
                stroke="rgba(73, 199, 255, 0.14)"
                strokeWidth="0.8"
              />
            </svg>

            {/* Central MERN Core Element (Stationary) */}
            <div className="identity-core mern-core">
              <span className="mern-kicker">FULL-STACK</span>
              <strong className="mern-highlight">MERN</strong>
              <span className="mern-subtitle">DEVELOPER</span>
            </div>

            {/* 4 Technology Nodes (Traversing the Circle Anticlockwise, Strictly Upright) */}
            {/* 1. MongoDB (Top) */}
            <div className="mern-orbit-node mern-node-mongo" title="MongoDB">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C11.5 4 8 8.5 8 13.5C8 17.5 10 20.5 12 22C14 20.5 16 17.5 16 13.5C16 8.5 12.5 4 12 2Z" fill="#4db33d" />
                <path d="M12 2V22C14 20.5 16 17.5 16 13.5C16 8.5 12.5 4 12 2Z" fill="#39912c" />
                <path d="M12 7V17" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
              </svg>
            </div>

            {/* 2. Express (Left) */}
            <div className="mern-orbit-node mern-node-express" title="Express.js">
              <span className="express-logo-text">ex</span>
            </div>

            {/* 3. Node.js (Bottom) */}
            <div className="mern-orbit-node mern-node-nodejs" title="Node.js">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2.5L20 7V17L12 21.5L4 17V7L12 2.5Z" stroke="#68a063" strokeWidth="1.6" fill="rgba(104, 160, 99, 0.15)" />
                <text x="12" y="15" textAnchor="middle" fill="#68a063" fontSize="8" fontWeight="800" fontFamily="'DM Mono', monospace">JS</text>
              </svg>
            </div>

            {/* 4. React (Right) */}
            <div className="mern-orbit-node mern-node-react" title="React.js">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#49c7ff" strokeWidth="1.2" transform="rotate(30 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#49c7ff" strokeWidth="1.2" transform="rotate(90 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#49c7ff" strokeWidth="1.2" transform="rotate(150 12 12)" />
                <circle cx="12" cy="12" r="2.2" fill="#49c7ff" />
              </svg>
            </div>
          </div>

          {/* Bottom Row: Concept Badges (Develop & Deploy) */}
          <div className="concept-row concept-row-bottom" aria-label="Development & Deployment">
            <div className="concept-badge badge-develop">
              <Code2 className="badge-icon" size={14} />
              <span>Develop</span>
            </div>
            <div className="concept-badge badge-deploy">
              <Cloud className="badge-icon" size={14} />
              <span>Deploy</span>
            </div>
          </div>

          {/* Caption */}
          <div className="identity-caption">
            Development × Creativity<br />
            Building • Learning • Creating
          </div>
        </motion.aside>
      </div>
    </section>
  )
}
