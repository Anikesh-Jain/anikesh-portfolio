import React from 'react'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import SkillsSection from '../sections/SkillsSection'
import FeaturedProjectsSection from '../sections/FeaturedProjectsSection'
import JourneySection from '../sections/JourneySection'
import ExploreSection from '../sections/ExploreSection'
import ContactSection from '../sections/ContactSection'

export default function HomePage() {
  return (
    <div className="space-y-4">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <FeaturedProjectsSection />
      <JourneySection />
      <ExploreSection />
      <ContactSection />
    </div>
  )
}
