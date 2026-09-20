import React from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="shell py-20 text-center space-y-6">
      <div className="text-6xl font-bold font-mono text-[#38bdf8]">404</div>
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Page Not Found</h1>
        <p className="text-[#94a3b8] text-sm max-w-md mx-auto">
          The route you navigated to does not exist or has been moved.
        </p>
      </div>
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0e1628] border border-[#1e293b] text-sm text-foreground hover:bg-[#131d36] transition-colors"
        >
          <Home className="w-4 h-4 text-[#38bdf8]" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  )
}
