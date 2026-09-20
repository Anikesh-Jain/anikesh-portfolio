import React from 'react'
import { motion } from 'framer-motion'
import { siteConfig } from '../data/portfolioData'
import { trackGithubClick, trackSocialClick, trackContactClick } from '../utils/analytics'

export default function ContactSection() {
  return (
    <section id="contact" className="section shell">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="contact-panel"
      >
        {/* Left Column: Metadata & Copy */}
        <div>
          <p className="eyebrow">
            <span className="dot" />
            GET IN TOUCH
          </p>
          <h2 className="text-[32px] sm:text-[42px] leading-[1.2] tracking-[-2px] my-5 font-extrabold text-foreground">
            Let's build something<br />
            <span className="gradient">amazing together.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#9998aa] leading-[1.8] max-w-md">
            Interested in connecting, collaborating or discussing an opportunity? Reach out and let's talk.
          </p>

          <div className="contact-meta">
            <div>
              <b>EMAIL</b>
              <span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  onClick={() => trackContactClick({ method: 'email', location: 'contact_meta' })}
                >
                  {siteConfig.email}
                </a>
              </span>
            </div>
            <div>
              <b>LOCATION</b>
              <span>{siteConfig.location}</span>
            </div>
            <div>
              <b>GITHUB</b>
              <span>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGithubClick({ location: 'contact_meta', repoUrl: siteConfig.github })}
                >
                  github.com/Anikesh-Jain
                </a>
              </span>
            </div>
            <div>
              <b>LINKEDIN</b>
              <span>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSocialClick({ platform: 'linkedin', location: 'contact_meta', url: siteConfig.linkedin })}
                >
                  linkedin.com/in/anikeshjain
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Contact Actions */}
        <div className="flex flex-col justify-center gap-3">
          <a
            className="contact-direct primary-contact"
            href={`mailto:${siteConfig.email}`}
            onClick={() => trackContactClick({ method: 'email', location: 'contact_cta' })}
          >
            Send me an Email ↗
          </a>
          <a
            className="contact-direct"
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSocialClick({ platform: 'linkedin', location: 'contact_cta', url: siteConfig.linkedin })}
          >
            Connect on LinkedIn ↗
          </a>
          <a
            className="contact-direct"
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackGithubClick({ location: 'contact_cta', repoUrl: siteConfig.github })}
          >
            Visit GitHub ↗
          </a>
        </div>
      </motion.div>
    </section>
  )
}
