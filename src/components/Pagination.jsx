import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = ''
}) {
  if (totalPages <= 1) return null

  // Generate page numbers with smart ellipsis for compact mobile & desktop fit
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 2) {
      return [1, 2, 3, '...', totalPages]
    }

    if (currentPage >= totalPages - 1) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, '...', currentPage, '...', totalPages]
  }

  const pages = getPageNumbers()

  return (
    <nav
      aria-label="Pagination Navigation"
      className={`flex items-center justify-center gap-1 sm:gap-2 flex-wrap select-none pt-6 sm:pt-8 ${className}`}
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-disabled={currentPage === 1}
        className={`h-9 sm:h-11 px-2.5 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1 sm:gap-1.5 border shrink-0 ${
          currentPage === 1
            ? 'opacity-35 cursor-not-allowed text-[#666578] border-[#1d2030] bg-[#0a0c16]'
            : 'bg-[#10121f] text-[#e0deea] border-[#292d42] hover:text-white hover:border-[#b16cff]/50 hover:bg-[#15182c]'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden min-[480px]:inline">Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {pages.map((page, idx) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-6 sm:w-8 h-9 sm:h-11 flex items-center justify-center text-[#706e82] text-xs font-mono"
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
              className={`min-w-[34px] sm:min-w-[42px] h-9 sm:h-11 px-2 sm:px-3 rounded-xl text-xs sm:text-sm font-mono font-medium transition-all flex items-center justify-center border shrink-0 ${
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
        className={`h-9 sm:h-11 px-2.5 sm:px-4 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1 sm:gap-1.5 border shrink-0 ${
          currentPage === totalPages
            ? 'opacity-35 cursor-not-allowed text-[#666578] border-[#1d2030] bg-[#0a0c16]'
            : 'bg-[#10121f] text-[#e0deea] border-[#292d42] hover:text-white hover:border-[#b16cff]/50 hover:bg-[#15182c]'
        }`}
      >
        <span className="hidden min-[480px]:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  )

}
