import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
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
      className="block relative w-full h-full overflow-hidden bg-[#070912]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onClick={() => trackProjectDetailView({ projectSlug: slug, projectName: title, location: 'featured_slideshow' })}
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
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d17] via-transparent to-transparent opacity-60 pointer-events-none z-20" />
    </Link>
  )
}

export default function FeaturedProjectsSection() {
  return (
    <section id="projects" className="section shell">
      <div className="section-head mb-8">
        <div>
          <p className="eyebrow">
            <span className="dot" />
            FEATURED PROJECTS
          </p>
          <h2 className="text-[34px] sm:text-[43px] tracking-[-2px] font-extrabold text-foreground mt-2">
            Production <span className="gradient">applications.</span>
          </h2>
        </div>
        <Link to="/projects" className="text-xs sm:text-sm font-semibold text-[#c590ff] hover:text-white transition-colors">
          View all projects →
        </Link>
      </div>

      <div className="projects">
        {projectsData.map((project, idx) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="project"
          >
            {/* Real Project Screenshot Slideshow */}
            <div className="preview relative overflow-hidden" style={{ height: '275px' }}>
              <ProjectScreenshotSlideshow
                screenshots={project.screenshots}
                title={project.title}
                slug={project.slug}
                to={`/projects/${project.slug}`}
              />
            </div>

            {/* Project Info */}
            <div className="project-info">
              <h3 className="text-xl sm:text-[25px] font-bold text-foreground m-0 mb-2.5">
                <Link
                  to={`/projects/${project.slug}`}
                  onClick={() => trackProjectDetailView({ projectSlug: project.slug, projectName: project.title, location: 'featured_title' })}
                  className="hover:text-purple-300 transition-colors"
                >
                  {project.title} ✦
                </Link>
              </h3>
              <p className="text-xs sm:text-[13px] leading-[1.75] text-[#9998aa] m-0">
                {project.description}
              </p>

              <div className="actions mt-5 flex flex-wrap items-center gap-3">
                <Link
                  to={`/projects/${project.slug}`}
                  onClick={() => trackProjectDetailView({ projectSlug: project.slug, projectName: project.title, location: 'featured_button' })}
                  className="btn"
                >
                  Architecture Spec →
                </Link>
                <a
                  className="btn"
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackGithubClick({
                    location: 'featured_project_card',
                    repoUrl: project.links.repo,
                    projectSlug: project.slug,
                    projectName: project.title
                  })}
                >
                  GitHub Profile ↗
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
