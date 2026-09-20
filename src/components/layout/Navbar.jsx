import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const location = useLocation()
  const isHome = location.pathname === '/'

  const toggleMobileMenu = () => setMobileMenuOpen(prev => !prev)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  // Track active section on scroll for homepage
  useEffect(() => {
    if (!isHome) return

    const sections = ['home', 'about', 'skills', 'projects', 'journey', 'contact']

    const handleScroll = () => {
      const scrollY = window.scrollY + 140
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const top = el.offsetTop
          if (scrollY >= top) {
            setActiveSection(sections[i])
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

  const homeLinks = [
    { label: 'Home', href: '#home', type: 'hash', id: 'home' },
    { label: 'About', href: '#about', type: 'hash', id: 'about' },
    { label: 'Skills', href: '#skills', type: 'hash', id: 'skills' },
    { label: 'Projects', href: '#projects', type: 'hash', id: 'projects' },
    { label: 'Journey', href: '#journey', type: 'hash', id: 'journey' },
    { label: 'Achievements', to: '/achievements', type: 'route' },
    { label: 'Creative', to: '/creative', type: 'route' },
    { label: 'Connect', href: '#contact', type: 'hash', id: 'contact' },
  ]

  const subPageLinks = [
    { label: 'Home', to: '/' },
    { label: 'Achievements', to: '/achievements' },
    { label: 'Certificates', to: '/certificates' },
    { label: 'Creative', to: '/creative' },
    { label: 'Involvement', to: '/involvement' },
  ]

  const handleAnchorClick = (e, targetId) => {
    e.preventDefault()
    closeMobileMenu()
    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      window.history.replaceState(null, '', `#${targetId}`)
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
            homeLinks.map(link => {
              if (link.type === 'route') {
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="text-[13px] font-bold tracking-[0.1px] text-[#bcbac9] hover:text-white transition-colors relative h-full flex items-center whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                )
              }
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
            subPageLinks.map(link => {
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
                homeLinks.map(link => {
                  if (link.type === 'route') {
                    return (
                      <Link
                        key={link.label}
                        to={link.to}
                        onClick={closeMobileMenu}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors text-[#bcbac9] hover:text-white hover:bg-[#10121f]"
                      >
                        <span>{link.label}</span>
                        <span className="text-xs text-[#b16cff]">↗</span>
                      </Link>
                    )
                  }
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
                subPageLinks.map(link => {
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

