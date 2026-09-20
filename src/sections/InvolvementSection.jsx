import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { involvementData } from '../data/involvementData'
import MediaModal from '../components/ui/MediaModal'

export default function InvolvementSection() {
  const [selectedMedia, setSelectedMedia] = useState(null)

  const getOrgClass = (id) => {
    switch (id) {
      case 'csi':
        return 'experience-csi'
      case 'spectra':
        return 'experience-spectra'
      case 'yavnika':
        return 'experience-yavnika'
      default:
        return ''
    }
  }

  const getEyebrow = (id) => {
    switch (id) {
      case 'csi':
        return 'COMPUTER SOCIETY OF INDIA'
      case 'spectra':
        return 'SPECTRA CLUB'
      case 'yavnika':
        return 'YAVNIKA HOBBY CLUB'
      default:
        return 'ORGANIZATION'
    }
  }

  const getHeading = (id) => {
    switch (id) {
      case 'csi':
        return 'CSI — Creative Team'
      case 'spectra':
        return 'Spectra Club'
      case 'yavnika':
        return 'Yavnika'
      default:
        return ''
    }
  }

  return (
    <section id="involvement" className="section">
      <div className="section-head mb-8">
        <div>
          <p className="eyebrow">
            <span className="dot" />
            CREATIVE EXPERIENCE
          </p>
          <h2 className="text-[34px] sm:text-[43px] tracking-[-2px] font-extrabold text-foreground mt-2">
            Design work with <span className="gradient">real teams & real events.</span>
          </h2>
          <p className="text-sm sm:text-base text-[#9998aa] max-w-2xl mt-2">
            A focused record of creative roles, official recognition and hands-on contributions beyond the classroom.
          </p>
        </div>
      </div>

      {/* Stacked Editorial Blocks */}
      <div className="space-y-7">
        {involvementData.map((org, idx) => {
          const isFour = org.media.length >= 4
          return (
            <motion.article
              key={org.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`experience-block ${getOrgClass(org.id)}`}
            >
              <div className="experience-heading">
                <div>
                  <p className="eyebrow">
                    <span className="dot" />
                    {getEyebrow(org.id)}
                  </p>
                  <h2>{getHeading(org.id)}</h2>
                  <h3>{org.role}</h3>
                </div>
                <div className="experience-badge">
                  CREATIVE AND<br />EVENT WORK
                </div>
              </div>

              <p className="experience-summary">
                {org.summary}
              </p>

              <div
                className={`experience-gallery ${
                  isFour ? 'experience-gallery-four' : 'experience-gallery-two'
                }`}
              >
                {org.media.map((item, mIdx) => (
                  <figure
                    key={mIdx}
                    className={`experience-media cursor-pointer ${
                      item.type === 'document' ? 'document' : ''
                    }`}
                    onClick={() => setSelectedMedia({
                      title: item.title,
                      src: item.src,
                      category: org.organization,
                      description: item.description
                    })}
                  >
                    <a
                      href={item.src}
                      onClick={(e) => {
                        e.preventDefault()
                        setSelectedMedia({
                          title: item.title,
                          src: item.src,
                          category: org.organization,
                          description: item.description
                        })
                      }}
                      aria-label={`View ${item.title}`}
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        loading="lazy"
                      />
                    </a>
                    <figcaption>{item.title}</figcaption>
                  </figure>
                ))}
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* Interactive Lightbox Modal */}
      <MediaModal
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
        media={selectedMedia}
      />
    </section>
  )
}
