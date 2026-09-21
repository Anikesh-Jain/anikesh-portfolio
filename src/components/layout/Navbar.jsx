import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const SECTIONS = ['home', 'about', 'skills', 'projects', 'journey', 'contact']

const HOME_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Journey', href: '#journey', id: 'journey' },
  { label: 'Achievements', to: '/achievements' },
  { label: 'Creative', to: '/creative' },
  { label: 'Connect', href: '#contact', id: 'contact' },
]

const SUB_PAGE_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Achievements', to: '/achievements' },
  { label: 'Certificates', to: '/certificates' },
  { label: 'Creative', to: '/creative' },
  { label: 'Involvement', to: '/involvement' },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()
  const isHome = location.pathname === '/'

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  // Handle hash scrolling and initial active section
  useEffect(() => {
    if (!isHome) return

    const handleHash = () => {
      const hash = window.location.hash.slice(1)
      if (hash && SECTIONS.includes(hash)) {
        setActiveSection(hash)
        const el = document.getElementById(hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      } else if (!hash) {
        if (window.scrollY < 80) {
          setActiveSection('home')
        }
      }
    }

    // Check on initial load
    if (window.location.hash) {
      const timer = setTimeout(handleHash, 80)
      return () => clearTimeout(timer)
    }

    // Listen to browser Back/Forward navigation
    window.addEventListener('hashchange', handleHash)
    window.addEventListener('popstate', handleHash)
    return () => {
      window.removeEventListener('hashchange', handleHash)
      window.removeEventListener('popstate', handleHash)
    }
  }, [isHome])

  // Track active section on scroll for homepage
  useEffect(() => {
    if (!isHome) return

    const handleScroll = () => {
      // Top of page is always Home
      if (window.scrollY < 80) {
        setActiveSection('home')
        return
      }

      // Bottom of page is always Connect
      const scrollBottom = window.innerHeight + window.scrollY
      const pageHeight = document.documentElement.scrollHeight
      if (scrollBottom >= pageHeight - 60) {
        setActiveSection('contact')
        return
      }

      // Dynamic viewport reading threshold (around 30% down the screen)
      const threshold = Math.max(140, Math.min(260, window.innerHeight * 0.35))

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= threshold) {
            setActiveSection(SECTIONS[i])
            return
          }
        }
      }
      setActiveSection('home')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault()
    closeMobileMenu()
    setActiveSection(targetId)

    // Small delay lets the mobile menu drawer close before scrolling
    const scrollToTarget = () => {
      if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        const el = document.getElementById(targetId)
        if (el) {
          // Offset for fixed navbar (78px) + 16px breathing room
          const offset = 94
          const top = el.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
        }
      }
      window.history.replaceState(null, '', `#${targetId}`)
    }

    // If mobile menu was open, wait for its exit animation
    if (mobileMenuOpen) {
      setTimeout(scrollToTarget, 250)
    } else {
      scrollToTarget()
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[78px] border-b border-[#292d42] bg-[#070912]/90 backdrop-blur-[18px] transition-all">
      <div className="shell h-full flex items-center justify-between px-4 sm:px-6">
        {/* Brand / Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2 text-white no-underline font-extrabold tracking-[0.7px] text-xs sm:text-sm shrink-0 group"
        >
          <span className="code-logo text-[11px] sm:text-xs py-1 px-2 sm:px-2.5">&lt;A/J&gt;</span>
          <span className="text-[#f4f3f8] whitespace-nowrap">
            ANIKESH <b className="text-[#b16cff]">JAIN</b>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 h-full">
          {isHome ? (
            HOME_LINKS.map(link => {
              // Dedicated page links (Achievements, Creative) use route navigation
              if (link.to) {
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-[13px] font-bold tracking-[0.1px] transition-colors relative h-full flex items-center whitespace-nowrap text-[#bcbac9] hover:text-white"
                  >
                    {link.label}
                  </Link>
                )
              }
              // Homepage section links use anchor scrolling
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.id)}
                  className={`text-[13px] font-bold tracking-[0.1px] transition-colors relative h-full flex items-center whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-[#bcbac9] hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#b16cff] rounded-[2px]"
                      style={{ boxShadow: '0 0 12px #b16cff' }}
                    />
                  )}
                </a>
              )
            })
          ) : (
            SUB_PAGE_LINKS.map(link => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`text-[13px] font-bold tracking-[0.1px] transition-colors relative h-full flex items-center whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-[#bcbac9] hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="sub-nav-underline"
                      className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#b16cff] rounded-[2px]"
                      style={{ boxShadow: '0 0 12px #b16cff' }}
                    />
                  )}
                </Link>
              )
            })
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden shrink-0">
          <button
            type="button"
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-[#bcbac9] hover:text-white border border-[#292d42] bg-[#10121f] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-[#292d42] bg-[#070912]/98 backdrop-blur-2xl px-4 py-3 shadow-2xl max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-1 py-1">
              {isHome ? (
                HOME_LINKS.map(link => {
                  // Dedicated page links (Achievements, Creative) use route navigation
                  if (link.to) {
                    return (
                      <Link
                        key={link.label}
                        to={link.to}
                        onClick={closeMobileMenu}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors text-[#bcbac9] hover:text-white hover:bg-[#10121f]"
                      >
                        <span>{link.label}</span>
                      </Link>
                    )
                  }
                  // Homepage section links use anchor scrolling
                  const isActive = activeSection === link.id
                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.id)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                        isActive
                          ? 'text-white bg-[#b16cff]/20 border border-[#b16cff]/40'
                          : 'text-[#bcbac9] hover:text-white hover:bg-[#10121f]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#b16cff] shadow-[0_0_8px_#b16cff]" />}
                    </a>
                  )
                })
              ) : (
                SUB_PAGE_LINKS.map(link => {
                  const isActive = location.pathname === link.to
                  return (
                    <Link
                      key={link.label}
                      to={link.to}
                      onClick={closeMobileMenu}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                        isActive
                          ? 'text-white bg-[#b16cff]/20 border border-[#b16cff]/40'
                          : 'text-[#bcbac9] hover:text-white hover:bg-[#10121f]'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#b16cff] shadow-[0_0_8px_#b16cff]" />}
                    </Link>
                  )
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

