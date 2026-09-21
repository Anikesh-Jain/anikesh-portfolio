import React from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '../data/portfolioData'
import HeroOrbitalArt from '../components/HeroOrbitalArt'
import { trackGithubClick, trackSocialClick, trackContactClick } from '../utils/analytics'

export default function HeroSection() {
  return (
    <section id="home" className="home-hero shell md:pt-8 md:pb-16 lg:pb-24">
      {/* Left Column - Copy */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="home-hero-copy"
      >
        <p className="eyebrow">
          <span className="dot" />
          {siteConfig.eyebrow}
        </p>

        <h1 className="font-extrabold text-foreground md:text-[clamp(64px,7vw,100px)] md:leading-[0.88] md:tracking-[-5px] md:my-[22px]">
          Hi, I'm<br />
          <span className="gradient">{siteConfig.name}</span>
        </h1>

        <p className="home-subtitle">
          {siteConfig.tagline}
        </p>

        {/* Buttons */}
        <div className="actions">
          <a className="btn primary" href="#projects">
            View My Work <span>→</span>
          </a>
          <a className="btn" href="#contact">
            Let's Connect
          </a>
        </div>

        {/* Social Row */}
        <div className="social-row">
          <small>LET'S CONNECT</small>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackGithubClick({ location: 'hero', repoUrl: siteConfig.github })}
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSocialClick({ platform: 'linkedin', location: 'hero', url: siteConfig.linkedin })}
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            onClick={() => trackContactClick({ method: 'email', location: 'hero' })}
          >
            Email
          </a>
        </div>
      </motion.div>

      {/* Right Column - Hero Art & Animated Orbit System */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="hero-art"
      >
        <HeroOrbitalArt />
      </motion.div>
    </section>
  )
}
