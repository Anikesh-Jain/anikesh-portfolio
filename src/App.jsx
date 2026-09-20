import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/layout/ScrollToTop'
import HomePage from './pages/HomePage'
import AchievementsPage from './pages/AchievementsPage'
import CertificatesPage from './pages/CertificatesPage'
import CreativePage from './pages/CreativePage'
import InvolvementPage from './pages/InvolvementPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Analytics />
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
    </BrowserRouter>
  )
}

