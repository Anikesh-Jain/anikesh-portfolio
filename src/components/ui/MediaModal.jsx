import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, FileText } from 'lucide-react'
import { trackAssetOpen, trackResumeDownload } from '../../utils/analytics'

export default function MediaModal({ isOpen, onClose, media }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !media) return null

  const isPdf = media.isPdf || (media.src && media.src.toLowerCase().includes('.pdf'))

  const handleAssetClick = (url, isDirectPdfButton = false) => {
    const title = media.title || 'Document'
    if (title.toLowerCase().includes('resume')) {
      trackResumeDownload({
        location: isDirectPdfButton ? 'media_modal_pdf_button' : 'media_modal_header_link',
        title
      })
    } else {
      trackAssetOpen({
        title,
        type: media.isVideo ? 'video' : (isPdf ? 'pdf' : 'image'),
        url
      })
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-4xl bg-[#0d1120] border border-[#1e243b] rounded-xl shadow-2xl overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-[#1e243b] bg-[#090d16]">
            <div className="flex items-center gap-3">
              {media.category && (
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium uppercase tracking-wider bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  {media.category}
                </span>
              )}
              <h3 className="text-sm sm:text-base font-semibold text-foreground truncate max-w-md">
                {media.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={media.src || media.image}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleAssetClick(media.src || media.image, false)}
                aria-label="Open original media"
                className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-[#13182c] transition-colors"
                title="Open original asset in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 rounded-lg text-foreground-muted hover:text-foreground hover:bg-[#13182c] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Media Body */}
          <div className="p-3 sm:p-6 bg-[#070912]/80 flex flex-col items-center justify-center min-h-[250px] max-h-[75vh] overflow-auto">
            {media.isVideo ? (
              <video
                src={media.src}
                controls
                autoPlay
                className="max-h-[60vh] max-w-full rounded-lg object-contain shadow-lg"
              />
            ) : isPdf ? (
              <div className="w-full flex flex-col items-center gap-4 py-2">
                <div className="w-full h-[55vh] rounded-lg overflow-hidden border border-[#292d42] bg-[#0c0e18]">
                  <iframe
                    src={`${media.src}#toolbar=1&navpanes=0`}
                    title={media.title || 'PDF Preview'}
                    className="w-full h-full border-0"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={media.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleAssetClick(media.src, true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#a564f0] to-[#6639cf] hover:opacity-90 shadow-lg shadow-purple-900/30 transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    Open Full PDF Document In New Tab ↗
                  </a>
                </div>
              </div>
            ) : (
              <img
                src={media.src || media.image}
                alt={media.title || 'Media preview'}
                className="max-h-[60vh] max-w-full rounded-lg object-contain shadow-lg"
                loading="lazy"
              />
            )}
          </div>


          {/* Footer Information */}
          {media.description && (
            <div className="px-4 sm:px-6 py-3 border-t border-[#1e243b] bg-[#090d16] text-xs text-foreground-muted">
              {media.description}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
