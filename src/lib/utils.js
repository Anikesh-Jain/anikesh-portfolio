import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines class names cleanly with Tailwind merge support.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
