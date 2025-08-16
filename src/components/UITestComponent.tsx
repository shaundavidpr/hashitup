'use client'

import { CheckCircle } from 'lucide-react'

export function UITestComponent() {
  return (
    <div className="fixed top-4 right-4 z-50 p-6 bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-700/50 text-white shadow-lg overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute -top-8 -right-8 w-16 h-16 bg-pink-500/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-blue-500/20 rounded-full blur-xl"></div>
      
      <h3 className="font-bold text-lg mb-3 flex items-center bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
        🎨 UI Style Test
      </h3>
      
      <div className="space-y-3 relative">
        <div className="flex items-center gap-3 group">
          <div className="w-4 h-4 rounded-full animate-pulse" style={{
            background: 'linear-gradient(to right, #ec4899, #06b6d4, #3b82f6)'
          }}></div>
          <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
            Gradients
            <CheckCircle className="h-4 w-4 inline-block ml-1 text-emerald-400" />
          </span>
        </div>
        
        <div className="flex items-center gap-3 group">
          <div className="w-4 h-4 bg-cyan-400 rounded-full animate-bounce"></div>
          <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
            Animations
            <CheckCircle className="h-4 w-4 inline-block ml-1 text-emerald-400" />
          </span>
        </div>
        
        <div className="flex items-center gap-3 group">
          <div className="w-4 h-4 bg-slate-700/80 backdrop-blur-sm rounded-full border border-slate-500/50 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-blue-500/30 rounded-full opacity-50"></div>
          </div>
          <span className="text-slate-300 group-hover:text-white transition-colors duration-300">
            Glassmorphism
            <CheckCircle className="h-4 w-4 inline-block ml-1 text-emerald-400" />
          </span>
        </div>
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700 to-transparent my-3"></div>
        
        <div className="relative">
          <p className="text-sm text-slate-400 mt-2 pl-2 border-l-2 border-cyan-500">
            Design system successfully applied across all components! 🎉
          </p>
        </div>
      </div>
    </div>
  )
}

// Add this line to your page.tsx return statement:
// <UITestComponent />
