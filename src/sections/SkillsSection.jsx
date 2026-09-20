import React from 'react'
import { motion } from 'framer-motion'
import { skillCategories } from '../data/portfolioData'

export default function SkillsSection() {
  return (
    <section id="skills" className="home-skills-section">
      <div className="shell">
        {/* Two-Column Intro */}
        <div className="skills-intro">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <p className="eyebrow">
              <span className="dot" />
              TECHNOLOGY STACK
            </p>
            <h2 className="text-[clamp(42px,5vw,66px)] font-extrabold leading-[1.05] tracking-[-3px] my-4 text-foreground">
              Tools I use to <span className="gradient">build.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-[13px] leading-[1.9] text-[#9998aa] max-w-[620px]"
          >
            My skills are grouped by the role they play in development. Each technology gets its own visual identity instead of being compressed into tiny text tags.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="home-tech-grid">
          {skillCategories.map((group, idx) => (
            <motion.article
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="home-tech-group"
            >
              <h3 className="text-[22px] font-bold tracking-tight text-foreground m-0 mb-1">
                {group.category}
              </h3>
              <p className="text-[11px] text-[#9998aa] m-0 mb-5">
                {group.description}
              </p>

              <div className="home-tech-items">
                {group.skills.map(skill => (
                  <motion.div
                    key={skill.name}
                    drag
                    dragSnapToOrigin
                    dragElastic={0.25}
                    dragTransition={{
                      bounceStiffness: 250,
                      bounceDamping: 18,
                      power: 0.2
                    }}
                    whileDrag={{
                      scale: 1.08,
                      zIndex: 50,
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), 0 0 25px rgba(174, 105, 255, 0.45)',
                      cursor: 'grabbing'
                    }}
                    whileHover={{
                      scale: 1.02
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 250,
                      damping: 18,
                      mass: 0.7
                    }}
                    className="home-tech-item"
                  >
                    {skill.customIcon ? (
                      <img
                        className="tech-logo tech-logo-ejs pointer-events-none"
                        src={skill.customIcon}
                        alt={`${skill.name} logo`}
                        draggable="false"
                      />
                    ) : (
                      <i className={`${skill.icon} pointer-events-none`} />
                    )}
                    <div className="pointer-events-none select-none">
                      <b>{skill.name}</b>
                      <small>{skill.badge}</small>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

