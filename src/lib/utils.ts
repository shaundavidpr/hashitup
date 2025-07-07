import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Bento grid card styles for consistent design
 */
export const bentoStyles = {
  card: "bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/50 hover:border-slate-700/50 transition-all duration-300 hover:shadow-lg",
  cardHover: "hover:shadow-lg hover:shadow-blue-500/5",
  iconContainer: "w-12 h-12 bg-gradient-to-br from-blue-600/20 to-violet-600/20 rounded-xl flex items-center justify-center mb-4",
  gradientText: "bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent",
  badge: "inline-flex items-center gap-2 bg-blue-950/50 backdrop-blur-sm border border-blue-900/50 rounded-full px-3 py-1.5 text-sm font-medium text-blue-300",
  badgeBlue: "bg-blue-950/50 border-blue-900/50 text-blue-300",
  badgeViolet: "bg-violet-950/50 border-violet-900/50 text-violet-300",
  badgeCyan: "bg-cyan-950/50 border-cyan-900/50 text-cyan-300",
  badgeAmber: "bg-amber-950/50 border-amber-900/50 text-amber-300",
} 