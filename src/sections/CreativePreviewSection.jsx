import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Maximize2 } from 'lucide-react'
import { creativeItems } from '../data/creativeData'
import MediaModal from '../components/ui/MediaModal'
import { trackCreativeView } from '../utils/analytics'

export default function CreativePreviewSection() {
  const [selectedMedia, setSelectedMedia] = useState(null)

  // Pick a curated set of 6 distinct creative pieces (backdrops, standees, posters, invitations)
  const previewItems = creativeItems.slice(0, 6)

  return (
    <section id="creative" className="section shell">
      <div className="space-y-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <p className="eyebrow">
              <span className="dot" />
              CREATIVE PORTFOLIO PREVIEW
            </p>
            <h2 className="text-[34px] sm:text-[43px] tracking-[-2px] font-extrabold text-foreground mt-2">
              Design work with <span className="gradient">real variety.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#9998aa] max-w-xl">
              Curated snapshot of event backdrops, marketing standees, and festival branding.
            </p>
          </div>

          <Link
            to="/creative"
            className="text-xs sm:text-sm font-semibold text-[#c590ff] hover:text-white transition-colors self-start sm:self-auto inline-flex items-center gap-1.5"
          >
            <span>Explore Full Archive ({creativeItems.length} Works)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 6 Curated Items Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
          {previewItems.map(item => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
              onClick={() => {
                setSelectedMedia({
                  title: item.title,
                  src: item.src,
                  category: item.category,
                  isVideo: item.isVideo
                })
                trackCreativeView({
                  title: item.title,
                  category: item.category,
                  type: item.isVideo ? 'video' : 'image'
                })
              }}
              className="group cursor-pointer rounded-2xl bg-[#0c0e18] border border-[#292d42] hover:border-[#b16cff] overflow-hidden flex flex-col justify-between transition-all hover:shadow-2xl hover:shadow-purple-950/20"
            >
              <div className="relative aspect-[4/3] bg-[#070912] overflow-hidden">
                {item.isVideo ? (
                  <video
                    src={item.src}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3.5">
                  <span className="text-xs font-semibold text-white line-clamp-1">{item.title}</span>
                  <span className="text-[10px] font-mono text-[#c590ff] uppercase">{item.category}</span>
                </div>
                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-black/60 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/25 via-[#10121f] to-[#0c0e18] border border-purple-500/25 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground">
              Looking for more graphic design collateral?
            </h3>
            <p className="text-xs sm:text-sm text-[#9998aa] mt-1">
              Browse {creativeItems.length} items categorized by backdrops, standees, posters, badges, invitations, and magazines.
            </p>
          </div>
          <Link
            to="/creative"
            className="btn primary shrink-0 whitespace-nowrap"
          >
            View Complete Archive →
          </Link>
        </div>

        {/* Modal */}
        <MediaModal
          isOpen={!!selectedMedia}
          onClose={() => setSelectedMedia(null)}
          media={selectedMedia}
        />
      </div>
    </section>
  )
}
