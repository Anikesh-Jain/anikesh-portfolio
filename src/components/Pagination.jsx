import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) {
  if (totalPages <= 1) return null

  // Generate page numbers with smart ellipsis for larger archives
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages]
    }

    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }

  const pages = getPageNumbers()

  return (
    <nav
      aria-label="Pagination Navigation"
      className={`flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap select-none pt-6 sm:pt-8 ${className}`}
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
        className={`h-10 sm:h-11 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1 sm:gap-1.5 border ${
          currentPage === 1
            ? 'opacity-35 cursor-not-allowed text-[#666578] border-[#1d2030] bg-[#0a0c16]'
            : 'bg-[#10121f] text-[#e0deea] border-[#292d42] hover:text-white hover:border-[#b16cff]/50 hover:bg-[#15182c]'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden min-[400px]:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {pages.map((page, idx) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-8 h-10 sm:h-11 flex items-center justify-center text-[#706e82] text-xs font-mono"
              >
                ...
              </span>
            )
          }

          const isActive = page === currentPage

          return (
            <button
              key={`page-${page}`}
              type="button"
              onClick={() => onPageChange(page)}
              aria-current={isActive ? 'page' : undefined}
              className={`min-w-[38px] sm:min-w-[42px] h-10 sm:h-11 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all flex items-center justify-center border ${
                isActive
                  ? 'bg-[#b16cff] text-white font-bold border-[#b16cff] shadow-lg shadow-purple-950/40'
                  : 'bg-[#10121f] text-[#9998aa] border-[#292d42] hover:text-white hover:border-[#b16cff]/40 hover:bg-[#15182c]'
              }`}
            >
              {page}
            </button>
          )
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-disabled={currentPage === totalPages}
        className={`h-10 sm:h-11 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1 sm:gap-1.5 border ${
          currentPage === totalPages
            ? 'opacity-35 cursor-not-allowed text-[#666578] border-[#1d2030] bg-[#0a0c16]'
            : 'bg-[#10121f] text-[#e0deea] border-[#292d42] hover:text-white hover:border-[#b16cff]/50 hover:bg-[#15182c]'
        }`}
      >
        <span className="hidden min-[400px]:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  )
}
