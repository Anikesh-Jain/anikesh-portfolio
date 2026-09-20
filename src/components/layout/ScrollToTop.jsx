import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If navigating with a hash (e.g. #contact), smoothly scroll to that element
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    // Otherwise reset scroll to top on route change
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}
