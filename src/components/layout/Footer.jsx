import React from 'react'
import { siteConfig } from '../../data/portfolioData'
import { trackSocialClick, trackContactClick } from '../../utils/analytics'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="portfolio-footer">
      <div className="shell footer-main px-4 sm:px-6">
        {/* Left Column - Identity */}
        <div className="footer-identity">
          <div className="footer-logo">&lt;A/J&gt;</div>
          <div>
            <div className="footer-name">{siteConfig.name}</div>
            <p>{siteConfig.role}</p>
          </div>
        </div>

        {/* Right Column - CTA */}
        <div className="footer-cta">
          <p className="footer-kicker">LET'S CONNECT</p>
          <h2>
            Let's build something<br />
            <span className="gradient">meaningful.</span>
          </h2>
          <div className="footer-links">
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSocialClick({ platform: 'linkedin', location: 'footer', url: siteConfig.linkedin })}
            >
              LinkedIn ↗
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              onClick={() => trackContactClick({ method: 'email', location: 'footer' })}
            >
              Email ↗
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="shell footer-bottom px-4 sm:px-6">
        <span>© {currentYear} {siteConfig.name}. All rights reserved.</span>
        <span>Built & designed by {siteConfig.name}</span>
      </div>
    </footer>
  )
}
