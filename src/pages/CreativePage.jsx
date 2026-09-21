import React, { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Play, Maximize2, FileText } from 'lucide-react'
import { creativeItems, creativeCategories } from '../data/creativeData'
import MediaModal from '../components/ui/MediaModal'
import Pagination from '../components/Pagination'
import { trackCreativeView } from '../utils/analytics'

const ITEMS_PER_PAGE = 6

export default function CreativePage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMedia, setSelectedMedia] = useState(null)
  const gridRef = useRef(null)

  const filteredItems = useMemo(() => {
    return creativeItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE)
  const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE
  const visibleItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId)
    setCurrentPage(1)
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleResetFilter = () => {
    setSelectedCategory('all')
    setSearchQuery('')
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
    <div className="shell space-y-10 py-4 sm:py-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
          <span>CURATED CREATIVE ARCHIVE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          Design work with <span className="gradient-text-purple">real variety.</span>
        </h1>
        <p className="text-sm sm:text-base text-[#9493a8] max-w-2xl">
          Complete archive of 110+ creative pieces designed for technical events, annual functions, student societies, and marketing campaigns.
        </p>
      </div>

      {/* Filter & Search Bar Controls */}
      <div ref={gridRef} className="space-y-4 scroll-mt-28">
        {/* Search Input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#9493a8] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search designs by title or category..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0d1120] border border-[#1e243b] focus:border-purple-500/50 text-sm text-foreground outline-none transition-colors"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {creativeCategories.map(cat => {
            const count = cat.id === 'all' 
              ? creativeItems.length 
              : creativeItems.filter(i => i.category === cat.id).length

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-[#0d1120] text-[#9493a8] border border-[#1e243b] hover:text-foreground hover:border-[#2e375c]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                  selectedCategory === cat.id ? 'bg-purple-700 text-purple-100' : 'bg-[#070912] text-[#6e6c80]'
                }`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between text-xs font-mono text-[#9493a8] border-t border-[#1e243b] pt-4">
        <span>
          Showing {filteredItems.length > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + ITEMS_PER_PAGE, filteredItems.length)} of {filteredItems.length} works
        </span>
        {(selectedCategory !== 'all' || searchQuery) && (
          <button
            type="button"
            onClick={handleResetFilter}
            className="text-purple-400 hover:text-purple-300"
          >
            Reset filter
          </button>
        )}
      </div>

      {/* Media Grid: 3 columns × 2 rows = 6 items on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {visibleItems.map(item => {
            const isPdf = item.isPdf || (item.src && item.src.toLowerCase().includes('.pdf'))
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  setSelectedMedia({
                    title: item.title,
                    src: item.src,
                    category: item.category,
                    isVideo: item.isVideo,
                    isPdf
                  })
                  trackCreativeView({
                    title: item.title,
                    category: item.category,
                    type: item.isVideo ? 'video' : (isPdf ? 'pdf' : 'image')
                  })
                }}
                className="group cursor-pointer rounded-xl bg-[#0d1120] border border-[#1e243b] hover:border-purple-500/40 overflow-hidden flex flex-col justify-between transition-all"
              >
                {/* Media Preview Thumbnail */}
                <div className="relative aspect-square bg-[#070912] overflow-hidden">
                  {item.isVideo ? (
                    <div className="relative w-full h-full">
                      <video
                        src={item.src}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-purple-600/80 text-white flex items-center justify-center">
                          <Play className="w-4 h-4 ml-0.5" />
                        </div>
                      </div>
                    </div>
                  ) : isPdf ? (
                    <div className="pdf-preview">
                      <span className="pdf-badge">
                        <FileText className="w-3 h-3 text-[#d4b2ff]" />
                        PDF
                      </span>
                      <strong>{item.title}</strong>
                      <small>
                        <span>Open document</span>
                        <span>↗</span>
                      </small>
                    </div>
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 pointer-events-none">
                    <span className="text-xs font-medium text-white line-clamp-1">{item.title}</span>
                    <span className="text-[10px] font-mono text-purple-300 uppercase">{item.category}</span>
                  </div>

                  <div className="absolute top-2 right-2 p-1.5 rounded bg-black/60 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Title & Tag Footer */}
                <div className="p-3 bg-[#090d16] border-t border-[#1e243b]/60 flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-foreground truncate group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </span>
                  <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#070912] text-[#807e94] shrink-0">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="py-16 text-center text-[#9493a8] space-y-2">
          <p className="text-base font-semibold text-foreground">No creative assets found</p>
          <p className="text-xs">Try adjusting your search query or selecting a different category filter.</p>
        </div>
      )}

      {/* Pagination Controls */}
      <Pagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {/* Interactive Modal */}
      <MediaModal
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
        media={selectedMedia}
      />
    </div>
  )
}
