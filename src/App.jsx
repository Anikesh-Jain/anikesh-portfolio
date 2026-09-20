import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'
import HomePage from './pages/HomePage'

const AchievementsPage = lazy(() => import('./pages/AchievementsPage'))
const CertificatesPage = lazy(() => import('./pages/CertificatesPage'))
const CreativePage = lazy(() => import('./pages/CreativePage'))
const InvolvementPage = lazy(() => import('./pages/InvolvementPage'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function RouteFallback() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-[#b16cff] border-t-transparent animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Analytics />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="achievements" element={<AchievementsPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
            <Route path="creative" element={<CreativePage />} />
            <Route path="involvement" element={<InvolvementPage />} />
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="projects/:slug" element={<ProjectDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

