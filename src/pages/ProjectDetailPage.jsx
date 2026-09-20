import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Layers,
  Sparkles,
  Maximize2,
  PlayCircle,
  ShieldCheck,
  Cpu,
  Tag
} from 'lucide-react'
import { projectsData } from '../data/portfolioData'
import MediaModal from '../components/ui/MediaModal'
import {
  trackProjectDetailView,
  trackLiveDemoClick,
  trackGithubClick,
  trackSocialClick,
  trackAssetOpen
} from '../utils/analytics'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [videoError, setVideoError] = useState(false)

  // Find project by slug or backward-compatible aliases
  const projectIndex = projectsData.findIndex(
    p => p.slug === slug || p.aliases?.includes(slug)
  )
  const project = projectIndex !== -1 ? projectsData[projectIndex] : null

  // Track project detail view on mount
  useEffect(() => {
    if (project) {
      trackProjectDetailView({
        projectSlug: project.slug,
        projectName: project.title,
        category: project.subtitle
      })
    }
  }, [project])

  // Find next project for bottom navigation
  const nextProject = project
    ? projectsData[(projectIndex + 1) % projectsData.length]
    : null

  if (!project) {
    return (
      <div className="shell py-20 text-center space-y-4">
        <div className="inline-flex p-3 rounded-full bg-[#111827] border border-[#1e243b] text-amber-400">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Project Not Found</h1>
        <p className="text-sm text-[#9493a8]">
          No project matching slug "{slug}" was found in the project catalog.
        </p>
        <div className="pt-2">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0d1120] border border-[#1e243b] text-sm text-foreground hover:bg-[#13182c] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="shell py-4 sm:py-8 space-y-12">
      {/* Lightbox Modal */}
      <MediaModal
        isOpen={Boolean(selectedMedia)}
        onClose={() => setSelectedMedia(null)}
        media={selectedMedia}
      />

      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-[#9493a8] hover:text-purple-300 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-purple-400" />
          <span>Back to Projects</span>
        </Link>
        {nextProject && (
          <Link
            to={`/projects/${nextProject.slug}`}
            onClick={() => trackProjectDetailView({
              projectSlug: nextProject.slug,
              projectName: nextProject.title,
              location: 'project_detail_top_nav'
            })}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#9493a8] hover:text-purple-300 transition-colors group"
          >
            <span>Next: {nextProject.title}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-purple-400" />
          </Link>
        )}
      </div>

      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
          <span className="text-xs font-mono text-purple-300 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            {project.year}
          </span>
          <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            {project.subtitle}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active Deployment</span>
          </span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
            {project.title}
          </h1>
          <p className="text-base sm:text-xl text-purple-300 font-mono">
            {project.headline || project.subtitle}
          </p>
          <p className="text-[#9493a8] text-base sm:text-lg max-w-4xl leading-relaxed pt-1">
            {project.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackLiveDemoClick({
                projectSlug: project.slug,
                projectName: project.title,
                demoUrl: project.links.demo
              })}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-purple-600/20"
            >
              <span>Live Project Demo</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {project.links?.repo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGithubClick({
                location: 'project_detail_header',
                repoUrl: project.links.repo,
                projectSlug: project.slug,
                projectName: project.title
              })}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-[#0d1120] border border-[#1e243b] hover:border-purple-500/40 text-foreground font-medium text-xs sm:text-sm transition-all hover:bg-[#13182c]"
            >
              <svg className="w-4 h-4 text-purple-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub Repository</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#636177] shrink-0" />
            </a>
          )}

          {project.links?.linkedin && (
            <a
              href={project.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackSocialClick({
                platform: 'linkedin',
                location: 'project_detail_release_post',
                url: project.links.linkedin
              })}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-[#0d1120] border border-[#1e243b] hover:border-[#0077b5]/50 text-foreground font-medium text-xs sm:text-sm transition-all hover:bg-[#13182c]"
            >
              <svg className="w-4 h-4 text-[#0a66c2] shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span>LinkedIn Release Post</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#636177] shrink-0" />
            </a>
          )}
        </div>
      </motion.section>

      {/* Project Overview & Role Context */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#0d1120] border border-[#1e243b] space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-purple-400">
            <Layers className="w-4 h-4" />
            <span>Architecture & Purpose</span>
          </div>
          <p className="text-sm text-[#9493a8] leading-relaxed">
            {project.overview}
          </p>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#0d1120] border border-[#1e243b] space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-cyan-400">
            <Cpu className="w-4 h-4" />
            <span>Development Role & Engineering Context</span>
          </div>
          <p className="text-sm text-[#9493a8] leading-relaxed">
            {project.developmentRole}
          </p>
        </div>
      </section>

      {/* Project Demo Video Section */}
      {project.video?.available && (
        <section className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#0d1120] border border-[#1e243b] space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
                <PlayCircle className="w-4 h-4" />
                <span>VIDEO DEMONSTRATION</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                {project.video.title}
              </h2>
            </div>
            {project.video.duration && (
              <span className="self-start sm:self-auto px-3 py-1 rounded-md bg-[#070912] border border-[#1e243b] text-xs font-mono text-[#9493a8]">
                Runtime: {project.video.duration}
              </span>
            )}
          </div>

          <div className="relative rounded-xl overflow-hidden border border-[#1e243b] bg-[#070912] shadow-xl">
            {!videoError ? (
              <video
                controls
                playsInline
                preload="metadata"
                poster={project.video.thumbnailUrl}
                onError={() => setVideoError(true)}
                className="w-full max-h-[580px] object-contain mx-auto bg-black"
              >
                <source src={project.video.contentUrl} type="video/mp4" />
                Your browser does not support HTML5 video playback.
              </video>
            ) : (
              <div className="relative aspect-video flex flex-col items-center justify-center p-6 text-center space-y-4">
                <img
                  src={project.video.thumbnailUrl}
                  alt={project.video.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative z-10 space-y-3 max-w-md">
                  <div className="inline-flex p-3 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <PlayCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{project.video.title}</h3>
                  <p className="text-xs text-[#9493a8]">
                    Direct stream preview is protected by source policies. You can watch the full recorded video directly on LinkedIn.
                  </p>
                  <a
                    href={project.video.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs transition-colors"
                  >
                    <span>Watch Demo on LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#636177] pt-1">
            <span>Official project demonstration published by Anikesh Jain.</span>
            <a
              href={project.video.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 inline-flex items-center gap-1 font-mono"
            >
              <span>View Original Post & Discussion</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>
      )}

      {/* UI Screenshot Gallery */}
      <section className="space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Sparkles className="w-4 h-4" />
            <span>INTERFACE GALLERY ({project.screenshots?.length || 0} SCREENSHOTS)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Visual inspection & user flows.
          </h2>
          <p className="text-sm text-[#9493a8]">
            Click any screenshot to open the interactive high-resolution viewer for detailed inspection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {project.screenshots?.map((shot, idx) => (
            <motion.div
              key={shot.src}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              onClick={() => {
                setSelectedMedia(shot)
                trackAssetOpen({
                  title: shot.title || `${project.title} screenshot`,
                  type: 'project_screenshot',
                  url: shot.src
                })
              }}
              className="group cursor-pointer rounded-2xl bg-[#0d1120] border border-[#1e243b] hover:border-purple-500/50 overflow-hidden flex flex-col transition-all shadow-sm hover:shadow-purple-950/20"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#070912] border-b border-[#1e243b]/60">
                <img
                  src={shot.src}
                  alt={shot.title}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0d1120]/90 border border-purple-500/40 text-xs font-mono text-purple-300 shadow-xl">
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Click to Inspect High-Res</span>
                  </span>
                </div>
                {shot.category && (
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#070912]/90 backdrop-blur-md border border-[#1e243b] text-[11px] font-mono text-purple-300">
                      {shot.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="p-4 sm:p-5 space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-foreground group-hover:text-purple-300 transition-colors">
                    {shot.title}
                  </h3>
                  <p className="text-xs text-[#9493a8] leading-relaxed pt-1">
                    {shot.description}
                  </p>
                </div>
                <div className="pt-2 flex items-center justify-end text-[11px] font-mono text-[#636177] group-hover:text-purple-400 transition-colors">
                  <span>Enlarge visual ↗</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Key Features Breakdown */}
      {project.features && project.features.length > 0 && (
        <section className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#0d1120] border border-[#1e243b] space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
              <ShieldCheck className="w-4 h-4" />
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Documented Features & System Logic
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-[#070912] border border-[#1e243b] hover:border-purple-500/30 transition-colors space-y-2"
              >
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <h3 className="text-sm font-bold text-foreground">
                    {feat.title}
                  </h3>
                </div>
                <p className="text-xs text-[#9493a8] leading-relaxed pl-6.5">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Categorized Tech Stack */}
      {project.techStackCategorized && project.techStackCategorized.length > 0 && (
        <section className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#0d1120] border border-[#1e243b] space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Tag className="w-4 h-4" />
              <span>SYSTEM ARCHITECTURE & TECHNOLOGIES</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Technology Stack Breakdown
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {project.techStackCategorized.map((cat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#070912] border border-[#1e243b] space-y-3"
              >
                <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map(tech => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#0d1120] border border-[#1e243b] text-xs font-mono text-purple-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Architecture Highlights & Verification */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#0d1120] border border-[#1e243b] space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
            <Layers className="w-4 h-4" />
            <span>ENGINEERING SPECIFICATIONS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            Architecture Highlights & Verification
          </h2>
          <ul className="space-y-3 pt-2">
            {project.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-[#9493a8]">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Bottom Switch to Next Project */}
      {nextProject && (
        <section className="pt-6 border-t border-[#1e243b]">
          <Link
            to={`/projects/${nextProject.slug}`}
            onClick={() => trackProjectDetailView({
              projectSlug: nextProject.slug,
              projectName: nextProject.title,
              location: 'project_detail_bottom_nav'
            })}
            className="p-4 sm:p-6 lg:p-8 rounded-2xl bg-[#0d1120] border border-[#1e243b] hover:border-purple-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group transition-all"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono text-[#636177]">NEXT CASE STUDY</span>
              <h3 className="text-xl font-bold text-foreground group-hover:text-purple-300 transition-colors">
                {nextProject.title}
              </h3>
              <p className="text-xs text-[#9493a8]">
                {nextProject.subtitle}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#070912] border border-[#1e243b] group-hover:border-purple-500/40 text-xs font-mono text-purple-400">
              <span>Explore Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </section>
      )}
    </div>
  )
}
