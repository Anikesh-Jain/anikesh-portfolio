import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { projectsData } from '../data/portfolioData'

import { trackGithubClick, trackProjectDetailView } from '../utils/analytics'

function ProjectScreenshotSlideshow({ screenshots, title, slug, to }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [loadedIndices, setLoadedIndices] = useState(() => new Set([0]))

  const items = screenshots && screenshots.length > 0 ? screenshots : []

  useEffect(() => {
    if (isPaused || items.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        const next = (prev + 1) % items.length
        setLoadedIndices(loaded => {
          const updated = new Set(loaded)
          updated.add(next)
          updated.add((next + 1) % items.length)
          return updated
        })
        return next
      })
    }, 3800)

    return () => clearInterval(timer)
  }, [isPaused, items.length])

  return (
    <Link
      to={to}
      className="block relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-[#1e243b] group-hover:border-purple-500/40 bg-[#070912] transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500/50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => trackProjectDetailView({ projectSlug: slug, projectName: title, location: 'projects_catalog_slideshow' })}
      aria-label={`View ${title} case study`}
    >
      {items.map((shot, idx) => {
        const isActive = idx === currentIndex
        const isLoaded = loadedIndices.has(idx)
        if (!isLoaded && !isActive) return null

        const src = typeof shot === 'string' ? shot : shot.src
        const shotTitle = typeof shot === 'string' ? `${title} Screenshot ${idx + 1}` : shot.title

        return (
          <img
            key={src}
            src={src}
            alt={shotTitle}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
        )
      })}

      {/* Subtle bottom gradient to ground the visual */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1120]/80 via-transparent to-transparent opacity-60 pointer-events-none z-20" />
    </Link>
  )
}

export default function ProjectsPage() {
  return (
    <div className="shell space-y-8 py-4 sm:py-8">
      {/* Page Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
          <span>PROJECTS CATALOG</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
          Production <span className="gradient-text-purple">applications.</span>
        </h1>
        <p className="text-[#9493a8] text-sm sm:text-base max-w-2xl">
          Detailed technical architectures and case studies for full-stack production applications with secure authentication, multi-currency ledgers, interactive dashboards, and cloud integrations.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pt-4">
        {projectsData.map((project, index) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-5 sm:p-7 rounded-2xl bg-[#0d1120] border border-[#1e243b] hover:border-purple-500/40 flex flex-col justify-between h-full group transition-all shadow-sm"
          >
            <div className="space-y-5">
              {/* Screenshot Slideshow */}
              <ProjectScreenshotSlideshow
                screenshots={project.screenshots}
                title={project.title}
                slug={project.slug}
                to={`/projects/${project.slug}`}
              />

              {/* Title & Product Description */}
              <div className="space-y-2.5">
                <Link
                  to={`/projects/${project.slug}`}
                  onClick={() => trackProjectDetailView({ projectSlug: project.slug, projectName: project.title, location: 'projects_catalog_title' })}
                  className="inline-block group-hover:text-purple-300 transition-colors"
                >
                  <h2 className="text-2xl font-bold text-foreground tracking-tight">
                    {project.title}
                  </h2>
                </Link>
                <p className="text-sm text-[#9493a8] leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-6 border-t border-[#1e243b]/60 flex flex-wrap items-center gap-3">
              <Link
                to={`/projects/${project.slug}`}
                onClick={() => trackProjectDetailView({ projectSlug: project.slug, projectName: project.title, location: 'projects_catalog_button' })}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/30 text-purple-300 hover:text-white text-xs font-mono font-medium transition-all"
              >
                <span>Architecture Spec</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              {project.links?.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGithubClick({
                    location: 'projects_catalog_card',
                    repoUrl: project.links.repo,
                    projectSlug: project.slug,
                    projectName: project.title
                  })}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#070912] hover:bg-[#13182c] border border-[#1e243b] hover:border-purple-500/30 text-[#9493a8] hover:text-foreground text-xs font-mono transition-all"
                >
                  <span>GitHub Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
