import React from 'react'
import { siteConfig } from '../data/portfolioData'

// 4-point sparkle star SVG component
function SparkleStar({ size = 22, className = '', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={`hero-sparkle ${className}`}
      style={style}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`sparkle-grad-${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#f3e8ff" />
          <stop offset="100%" stopColor="#b16cff" />
        </radialGradient>
      </defs>
      <path
        d="M12 0 C12 7 17 12 24 12 C17 12 12 17 12 24 C12 17 7 12 0 12 C7 12 12 7 12 0 Z"
        fill={`url(#sparkle-grad-${size})`}
      />
      <circle cx="12" cy="12" r="2.2" fill="#ffffff" />
    </svg>
  )
}

// Right-side ringed planet (Saturn-like with front/back 3D ring)
function RingedPlanet() {
  return (
    <div className="celestial-body planet-ringed" aria-hidden="true">
      <svg width="104" height="80" viewBox="0 0 104 80" fill="none" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id="ringed-sphere-grad" cx="36%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#9cc5ff" />
            <stop offset="35%" stopColor="#4c67d6" />
            <stop offset="75%" stopColor="#251b6a" />
            <stop offset="100%" stopColor="#0e0a30" />
          </radialGradient>
          <linearGradient id="ring-glow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(155, 205, 255, 0.95)" />
            <stop offset="50%" stopColor="rgba(185, 120, 255, 0.9)" />
            <stop offset="100%" stopColor="rgba(73, 199, 255, 0.5)" />
          </linearGradient>
          <clipPath id="front-ring-clip">
            <rect x="0" y="40" width="104" height="40" />
          </clipPath>
        </defs>

        {/* Back half of the ring (behind the sphere) */}
        <ellipse
          cx="52"
          cy="40"
          rx="46"
          ry="14"
          stroke="url(#ring-glow-grad)"
          strokeWidth="3.5"
          transform="rotate(-25 52 40)"
          opacity="0.75"
        />

        {/* Planet Sphere */}
        <circle
          cx="52"
          cy="40"
          r="24"
          fill="url(#ringed-sphere-grad)"
        />

        {/* Front half of the ring (in front of the sphere) */}
        <g clipPath="url(#front-ring-clip)">
          <ellipse
            cx="52"
            cy="40"
            rx="46"
            ry="14"
            stroke="url(#ring-glow-grad)"
            strokeWidth="3.8"
            transform="rotate(-25 52 40)"
          />
          <ellipse
            cx="52"
            cy="40"
            rx="41"
            ry="12"
            stroke="rgba(255, 255, 255, 0.7)"
            strokeWidth="1"
            transform="rotate(-25 52 40)"
          />
        </g>
      </svg>
    </div>
  )
}

// Upper-left magenta/violet planet with textured surface markings
function MagentaPlanet() {
  return (
    <div className="celestial-body planet-magenta" aria-hidden="true">
      <div className="magenta-sphere-core">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path
            d="M9 20 C 16 16, 28 17, 39 21"
            stroke="#fbe4ff"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity="0.4"
          />
          <path
            d="M11 28 C 19 33, 31 30, 37 27"
            stroke="#3a076a"
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.45"
          />
          <circle cx="18" cy="17" r="2.5" fill="#ffffff" opacity="0.45" />
        </svg>
      </div>
    </div>
  )
}

// Lower-left cyan sphere with glossy spherical gradient
function CyanPlanet() {
  return (
    <div className="celestial-body planet-cyan" aria-hidden="true">
      <div className="cyan-sphere-core">
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <ellipse
            cx="14"
            cy="13"
            rx="5"
            ry="2.8"
            fill="#ffffff"
            opacity="0.6"
            transform="rotate(-30 14 13)"
          />
        </svg>
      </div>
    </div>
  )
}

// The Orbiting Rocket Ship — Recreated with purple nose cone, white body, purple wings, cyan window & thruster trail
function OrbitingRocket() {
  return (
    <div className="rocket-flight-anchor" aria-hidden="true">
      <svg
        className="cosmic-rocket-svg"
        width="60"
        height="34"
        viewBox="-18 0 62 34"
        fill="none"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="cosmic-fuselage" x1="6" y1="17" x2="38" y2="17" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#d5c2ff" />
            <stop offset="25%" stopColor="#f3eeff" />
            <stop offset="60%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e8dcff" />
          </linearGradient>
          <linearGradient id="cosmic-nose" x1="34" y1="17" x2="46" y2="17" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7a2bc7" />
            <stop offset="60%" stopColor="#9d4edd" />
            <stop offset="100%" stopColor="#c77dff" />
          </linearGradient>
          <linearGradient id="cosmic-wing" x1="0" y1="0" x2="0" y2="34" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#b16cff" />
            <stop offset="50%" stopColor="#8c4be6" />
            <stop offset="100%" stopColor="#5e1ba8" />
          </linearGradient>
          <linearGradient id="cosmic-flame" x1="3" y1="17" x2="-18" y2="17" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#49c7ff" />
            <stop offset="65%" stopColor="#b16cff" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <radialGradient id="cockpit-glow" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#e0f7ff" />
            <stop offset="40%" stopColor="#49c7ff" />
            <stop offset="85%" stopColor="#0b63b8" />
            <stop offset="100%" stopColor="#042c58" />
          </radialGradient>
        </defs>

        {/* Layered Short Plasma Thruster Flame (15px cone) */}
        <g className="rocket-exhaust-flame">
          {/* Layer 1: Outer Purple Plasma Cone */}
          <path
            d="M2 13.5 C -1 14.5, -7 15.6, -13 17 C -7 18.4, -1 19.5, 2 20.5 Z"
            fill="#b16cff"
            opacity="0.95"
          />
          {/* Layer 2: Inner Cyan Plasma Cone */}
          <path
            d="M2 14.6 C -0.5 15.3, -4.5 16.1, -8 17 C -4.5 17.9, -0.5 18.7, 2 19.4 Z"
            fill="#49c7ff"
            opacity="0.95"
          />
          {/* Layer 3: Intense White Plasma Core */}
          <path
            d="M2 15.8 L -3.5 17 L 2 18.2 Z"
            fill="#ffffff"
          />
          {/* 3 Tiny Glowing Particles Behind Flame */}
          <circle cx="-18" cy="17" r="1.2" fill="#49c7ff" opacity="0.85" />
          <circle cx="-23" cy="16.5" r="0.9" fill="#b16cff" opacity="0.75" />
          <circle cx="-27" cy="17.2" r="0.6" fill="#ffffff" opacity="0.6" />
        </g>

        {/* Top Swept Wing */}
        <path
          d="M14 11 L 3 3 C 2 2, 0 3, 2 6 L 9 13 Z"
          fill="url(#cosmic-wing)"
          stroke="#d8b4fe"
          strokeWidth="0.8"
        />

        {/* Bottom Swept Wing */}
        <path
          d="M14 23 L 3 31 C 2 32, 0 31, 2 28 L 9 21 Z"
          fill="url(#cosmic-wing)"
          stroke="#d8b4fe"
          strokeWidth="0.8"
        />

        {/* Engine Exhaust Nozzle */}
        <path
          d="M2 13 L 5 13 L 5 21 L 2 21 Z"
          fill="#3b1c64"
          stroke="#b16cff"
          strokeWidth="0.75"
        />

        {/* Main Fuselage Body (Clean White Cylindrical Body) */}
        <path
          d="M4 17 C 8 11.5, 22 11.5, 36 12.8 L 36 21.2 C 22 22.5, 8 22.5, 4 17 Z"
          fill="url(#cosmic-fuselage)"
          stroke="#ffffff"
          strokeWidth="1.1"
        />

        {/* Purple Nose Cone Accent (Matching Reference Design) */}
        <path
          d="M36 12.8 C 40 13.5, 44 15.5, 46 17 C 44 18.5, 40 20.5, 36 21.2 Z"
          fill="url(#cosmic-nose)"
          stroke="#e2c4ff"
          strokeWidth="0.85"
        />

        {/* Circular Blue/Cyan Cockpit Window */}
        <circle cx="26" cy="17" r="3.4" fill="url(#cockpit-glow)" stroke="#ffffff" strokeWidth="0.9" />
        <circle cx="27.2" cy="15.8" r="1.1" fill="#ffffff" />

        {/* Center Fuselage Purple Stripe / Accent */}
        <path
          d="M12 17 L 35 17"
          stroke="rgba(177, 108, 255, 0.35)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default function HeroOrbitalArt() {
  return (
    <div className="hero-orbital-stage">
      {/* Deep Space Background Ambient Glow */}
      <div className="hero-cosmic-glow" aria-hidden="true" />

      {/* Atmospheric Star Field */}
      <div className="hero-ambient-stars" aria-hidden="true">
        {/* 4-point Diamond Sparkles */}
        <SparkleStar size={24} className="sparkle-top-right" />
        <SparkleStar size={22} className="sparkle-bottom-right" />
        <SparkleStar size={26} className="sparkle-far-left" />
        <SparkleStar size={18} className="sparkle-top-left" />

        {/* Scattered Ambient Twinkle Dots */}
        <span className="cosmic-dot dot-1" />
        <span className="cosmic-dot dot-2" />
        <span className="cosmic-dot dot-3" />
        <span className="cosmic-dot dot-4" />
        <span className="cosmic-dot dot-5" />
        <span className="cosmic-dot dot-6" />
        <span className="cosmic-dot dot-7" />
        <span className="cosmic-dot dot-8" />
        <span className="cosmic-dot dot-9" />
      </div>

      {/* Secondary Tilted Orbit Track */}
      <div className="orbit-secondary-ring" aria-hidden="true">
        <span className="secondary-orbit-node" />
      </div>

      {/* Main Glowing Elliptical Orbit Track */}
      <div className="orbit-main-track" aria-hidden="true">
        <div className="orbit-main-ellipse">
          {/* Main Orbit Nodes */}
          <span className="main-node node-left" />
          <span className="main-node node-bottom" />
          <span className="main-node node-right" />

          {/* Orbiting Rocket Riding the Track */}
          <OrbitingRocket />
        </div>
      </div>

      {/* Celestial Bodies (Planets & Spheres) */}
      <MagentaPlanet />
      <CyanPlanet />
      <RingedPlanet />

      {/* Upright Center Portrait Frame */}
      <div className="hero-portrait-frame">
        <img
          src={siteConfig.profilePhoto}
          alt={siteConfig.name}
          loading="eager"
          className="hero-portrait-img"
        />
        <div className="portrait-inner-glass" aria-hidden="true" />
      </div>

      {/* Top-Right "CURRENT FOCUS" Card */}
      <div className="hero-focus-card">
        <div className="focus-header">
          <span className="focus-dot" />
          <span className="focus-title">CURRENT FOCUS</span>
        </div>
        <div className="focus-tagline">BUILD - LEARN - CREATE</div>
      </div>

      {/* Bottom-Right "IDEAS INTO REALITY" Micro Typography */}
      <div className="hero-micro-text" aria-hidden="true">
        <span>IDEAS</span>
        <span>INTO</span>
        <span>REALITY</span>
        <span className="micro-dash" />
      </div>
    </div>
  )
}
