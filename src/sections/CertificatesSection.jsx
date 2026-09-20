import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Maximize2 } from 'lucide-react'
import { certificatesData, certificateCategories } from '../data/certificatesData'
import MediaModal from '../components/ui/MediaModal'
import { trackCertificateView } from '../utils/analytics'

export default function CertificatesSection() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [showAll, setShowAll] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState(null)

  const filtered = certificatesData.filter(cert => {
    if (activeCategory === 'all') return true
    return cert.category === activeCategory
  })

  // Display limit for initial view
  const INITIAL_LIMIT = 6
  const displayed = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT)

  return (
    <section id="certificates" className="section">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="eyebrow">
              <span className="dot" />
              CREDENTIALS
            </p>
            <h2 className="text-[34px] sm:text-[43px] tracking-[-2px] font-extrabold text-foreground mt-2">
              Certificates & <span className="gradient">credentials.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#9998aa] max-w-xl">
              A collection of achievements, certifications, training and learning milestones from my academic and technical journey.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#10121f] p-1.5 rounded-xl border border-[#292d42]">
            {certificateCategories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveCategory(cat.id)
                  setShowAll(false)
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#b16cff] text-white shadow-md shadow-[#b16cff]/20'
                    : 'text-[#9998aa] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map((cert, idx) => {
            const isFeatured = idx < 6
            return (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                onClick={() => {
                  setSelectedMedia({
                    title: cert.title,
                    src: cert.image,
                    category: cert.categoryLabel,
                    description: cert.description
                  })
                  trackCertificateView({
                    certificateId: cert.id,
                    title: cert.title,
                    issuer: cert.issuer,
                    category: cert.categoryLabel
                  })
                }}
                className={`group cursor-pointer rounded-2xl bg-[#0c0e18] border transition-all overflow-hidden flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-2xl hover:border-[#b16cff] ${
                  isFeatured
                    ? 'border-[rgba(160,105,235,0.48)] shadow-lg shadow-purple-950/20'
                    : 'border-[#292d42]'
                }`}
              >
                {/* Image Preview Container */}
                <div className="relative aspect-[4/3] bg-[#f4f2ee] p-2.5 overflow-hidden flex items-center justify-center">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 p-1.5 rounded-md bg-[#070912]/80 backdrop-blur-sm border border-[#292d42] text-[#9998aa] group-hover:text-purple-300 transition-colors">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-[#070912]/90 text-purple-300 border border-purple-500/30">
                      {cert.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Card Meta */}
                <div className="p-4 sm:p-5 space-y-1.5 bg-[#0c0e18]">
                  <h3 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-purple-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-[#9998aa] line-clamp-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Progressive Disclosure Toggle */}
        {filtered.length > INITIAL_LIMIT && (
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="btn"
            >
              <span>{showAll ? 'Show Fewer Certificates' : `View All ${filtered.length} Certificates`}</span>
              {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        )}

        {/* Interactive Media Lightbox Modal */}
        <MediaModal
          isOpen={!!selectedMedia}
          onClose={() => setSelectedMedia(null)}
          media={selectedMedia}
        />
      </div>
    </section>
  )
}
