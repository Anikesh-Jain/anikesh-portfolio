import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { involvementData } from '../data/involvementData'
import MediaModal from '../components/ui/MediaModal'

export default function InvolvementPage() {
  const [activeMedia, setActiveMedia] = useState(null)

  return (
    <div className="shell pb-20">
      {/* Page Hero */}
      <section className="page-hero reveal creative-experience-hero">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="eyebrow"
        >
          <span className="dot" />CREATIVE EXPERIENCE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Design work with<br /><span className="gradient">real teams &amp; real events.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          A focused record of creative roles, official recognition and hands-on contributions beyond the classroom.
        </motion.p>
      </section>

      {/* Page Content: Experience Blocks */}
      <section className="page-content experience-showcase">
        {involvementData.map((item, idx) => {
          const isTwoCol = item.id === 'yavnika'
          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: idx * 0.1 }}
              className={`experience-block experience-${item.id} reveal`}
            >
              <div className="experience-heading">
                <div>
                  <p className="eyebrow">
                    <span className="dot" />{item.organization}
                  </p>
                  <h2>{item.chapter}</h2>
                  <h3>{item.role}</h3>
                </div>
                <div className="experience-badge" style={{ whiteSpace: 'pre-line' }}>
                  {item.badge}
                </div>
              </div>

              <p className="experience-summary">{item.summary}</p>

              <div className={`experience-gallery ${isTwoCol ? 'experience-gallery-two' : 'experience-gallery-four'}`}>
                {item.media.map((med, mIdx) => {
                  const isDoc = med.type === 'document'
                  return (
                    <figure
                      key={mIdx}
                      className={`experience-media ${isDoc ? 'document' : ''}`}
                      onClick={() => setActiveMedia({
                        ...med,
                        category: item.organization
                      })}
                    >
                      <button
                        type="button"
                        className="media-btn"
                        aria-label={`View ${med.title}`}
                      >
                        <img
                          src={med.src}
                          alt={med.title}
                          loading="lazy"
                        />
                      </button>
                      <figcaption>
                        <span>{med.title}</span>
                      </figcaption>
                    </figure>
                  )
                })}
              </div>
            </motion.article>
          )
        })}
      </section>

      {/* Lightbox Modal */}
      <MediaModal
        isOpen={!!activeMedia}
        onClose={() => setActiveMedia(null)}
        media={activeMedia}
      />
    </div>
  )
}
