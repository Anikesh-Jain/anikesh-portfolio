import React, { useState, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import { Maximize2 } from 'lucide-react'
import { certificatesData, certificateCategories } from '../data/certificatesData'
import MediaModal from '../components/ui/MediaModal'
import Pagination from '../components/Pagination'
import { trackCertificateView } from '../utils/analytics'

const ITEMS_PER_PAGE = 6

export default function CertificatesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMedia, setSelectedMedia] = useState(null)
  const gridRef = useRef(null)

  const filtered = useMemo(() => {
    return certificatesData.filter(cert => {
      if (activeCategory === 'all') return true
      return cert.category === activeCategory
    })
  }, [activeCategory])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE
  const visibleCertificates = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId)
    setCurrentPage(1)
  }

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return
    setCurrentPage(newPage)
    if (gridRef.current) {
      const targetTop = gridRef.current.getBoundingClientRect().top + window.scrollY - 100
      window.scrollTo({ top: Math.max(0, targetTop), behavior: 'smooth' })
    }
  }

  return (
    <div className="shell py-4 space-y-10">
      {/* Original Page Hero */}
      <section className="page-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">
            <span className="dot" />
            CREDENTIALS
          </p>
          <h1>
            Certificates &<br />
            <span className="gradient">credentials.</span>
          </h1>
          <p>
            A collection of achievements, certifications, training and learning milestones from my academic and technical journey.
          </p>
        </motion.div>
      </section>

      {/* Category Filter Pills */}
      <div ref={gridRef} className="flex flex-wrap items-center gap-2 scroll-mt-28">
        {certificateCategories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCategory === cat.id
                ? 'bg-[#b16cff] text-white shadow-lg shadow-purple-900/30'
                : 'bg-[#10121f] text-[#9998aa] border border-[#292d42] hover:text-white hover:border-[#b16cff]/40'
            }`}
          >
            {cat.label} ({cat.id === 'all' ? certificatesData.length : certificatesData.filter(c => c.category === cat.id).length})
          </button>
        ))}
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {visibleCertificates.map((cert, idx) => {
          const isFeatured = (startIndex + idx) < 6 && activeCategory === 'all'
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

      {/* Pagination Controls */}
      <Pagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Interactive Lightbox Modal */}
      <MediaModal
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
        media={selectedMedia}
      />
    </div>
  )
}
