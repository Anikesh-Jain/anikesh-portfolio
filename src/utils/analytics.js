import { track } from '@vercel/analytics'

/**
 * Safe wrapper around Vercel Web Analytics track() API.
 * Ensures calls do not throw in development, test, or environments where analytics is blocked.
 */
export function safeTrack(eventName, properties = {}) {
  try {
    track(eventName, properties)
  } catch (err) {
    if (import.meta.env?.DEV) {
      console.debug(`[Analytics] event "${eventName}":`, properties, err)
    }
  }
}

/**
 * Track GitHub repository & profile clicks
 */
export function trackGithubClick({ location, repoUrl, projectSlug, projectName } = {}) {
  safeTrack('github_click', {
    location: location || 'unknown',
    project_slug: projectSlug || null,
    project_name: projectName || null,
    target: repoUrl || 'profile'
  })
}

/**
 * Track Live Project Demo clicks
 */
export function trackLiveDemoClick({ projectSlug, projectName, demoUrl } = {}) {
  safeTrack('live_demo_click', {
    project_slug: projectSlug,
    project_name: projectName,
    destination: demoUrl
  })
}

/**
 * Track Social / LinkedIn clicks
 */
export function trackSocialClick({ platform, location, url } = {}) {
  safeTrack('social_click', {
    platform: platform || 'linkedin',
    location: location || 'unknown',
    destination: url || null
  })
}

/**
 * Track Contact / Email clicks
 */
export function trackContactClick({ method, location } = {}) {
  safeTrack('contact_click', {
    method: method || 'email',
    location: location || 'unknown'
  })
}

/**
 * Track Resume downloads & document views
 */
export function trackResumeDownload({ location, title } = {}) {
  safeTrack('resume_download', {
    location: location || 'unknown',
    title: title || 'Resume'
  })
}

/**
 * Track Project Detail Page Views
 */
export function trackProjectDetailView({ projectSlug, projectName, category } = {}) {
  safeTrack('project_detail_view', {
    project_slug: projectSlug,
    project_name: projectName,
    category: category || null
  })
}

/**
 * Track Certificate Views
 */
export function trackCertificateView({ certificateId, title, issuer, category } = {}) {
  safeTrack('certificate_view', {
    certificate_id: certificateId || null,
    title: title || 'Certificate',
    issuer: issuer || null,
    category: category || null
  })
}

/**
 * Track Creative Work item views
 */
export function trackCreativeView({ title, category, type } = {}) {
  safeTrack('creative_item_view', {
    title: title || 'Creative Work',
    category: category || null,
    type: type || 'image'
  })
}

/**
 * Track opening original media asset / document
 */
export function trackAssetOpen({ title, type, url } = {}) {
  safeTrack('asset_open', {
    title: title || 'document',
    type: type || 'pdf',
    url: url || null
  })
}
