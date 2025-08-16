'use client'

import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Bell, LogOut, Menu } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface DashboardHeaderProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    role: string
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
          0% { background-position: -468px 0; }
          100% { background-position: 468px 0; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientFlow 3s linear infinite;
        }
        
        .animate-shimmer {
          background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        
        .gradient-border {
          position: relative;
          transition: all 0.3s ease;
        }
        
        .gradient-border::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 1.1rem;
          background: linear-gradient(45deg, #ec4899, #06b6d4, #ec4899);
          background-size: 200% 200%;
          animation: gradientFlow 3s linear infinite;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .gradient-border:hover::before {
          opacity: 1;
        }
      `}</style>

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-black/90 backdrop-blur-lg shadow-lg shadow-pink-500/5" 
          : "bg-black/70 backdrop-blur-sm"
      } border-b border-white/10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-float">
                  Code<span className="font-extrabold">N</span>Chip
                </h1>
              </Link>
              
              <Badge 
                variant="outline" 
                className="border-white/10 text-white/80 bg-white/5 backdrop-blur-sm animate-pulse-slow px-3 py-0.5"
              >
                Dashboard
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Role Badge with Animation */}
              <Badge className={`px-3 py-1 border-0 animate-gradient ${
                user.role === 'LEADER' 
                  ? 'bg-gradient-to-r from-blue-600/20 to-blue-400/20 text-blue-300 border border-blue-500/30' 
                  : user.role === 'ADMIN' || user.role === 'SUPERADMIN'
                    ? 'bg-gradient-to-r from-pink-600/20 to-pink-400/20 text-pink-300 border border-pink-500/30'
                    : 'bg-gradient-to-r from-green-600/20 to-green-400/20 text-green-300 border border-green-500/30'
              }`}>
                {user.role === 'LEADER' 
                  ? 'Team Leader' 
                  : user.role === 'ADMIN' 
                    ? 'Admin' 
                    : user.role === 'SUPERADMIN' 
                      ? 'Super Admin' 
                      : 'Team Member'}
              </Badge>
              
              {/* Notifications with Animation */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-full p-2 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full ring-2 ring-black"></span>
                </Button>
                
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-black/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 py-2 z-50">
                    <div className="px-4 py-3 border-b border-white/10">
                      <h3 className="text-sm font-semibold text-white">Notifications</h3>
                    </div>
                    <div className="px-4 py-2 hover:bg-white/5 transition-colors">
                      <p className="text-sm text-white/80">Project submission deadline in 3 days</p>
                      <p className="text-xs text-white/50 mt-1">2 hours ago</p>
                    </div>
                    <div className="px-4 py-2 hover:bg-white/5 transition-colors">
                      <p className="text-sm text-white/80">New team member request</p>
                      <p className="text-xs text-white/50 mt-1">Yesterday</p>
                    </div>
                    <div className="px-4 py-2 border-t border-white/10">
                      <button className="w-full text-xs text-center text-cyan-400 hover:text-cyan-300 transition-colors">
                        View all notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* User Menu with Animation */}
              <div className="relative">
                <div 
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                >
                  {user.image ? (
                    <div className="p-0.5 rounded-full bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 animate-gradient hover:scale-105 transition-transform duration-300">
                      <img
                        src={user.image}
                        alt={user.name || 'User'}
                        className="h-8 w-8 rounded-full object-cover border-2 border-black"
                      />
                    </div>
                  ) : (
                    <div className="p-0.5 rounded-full bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 animate-gradient">
                      <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center border-2 border-black">
                        <span className="text-white font-medium">
                          {user.name?.charAt(0) || user.email?.charAt(0) || '?'}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="hidden sm:block text-sm">
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-slate-400 truncate max-w-[120px]">{user.email}</p>
                  </div>
                </div>
                
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 py-1 z-50">
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-white/80 hover:bg-white/5 transition-colors">
                      Profile
                    </Link>
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-white/80 hover:bg-white/5 transition-colors">
                      Settings
                    </Link>
                    <div className="border-t border-white/10 my-1"></div>
                    <button 
                      onClick={() => signOut()} 
                      className="w-full text-left px-4 py-2 text-sm text-rose-400 hover:bg-white/5 transition-colors flex items-center"
                    >
                      <LogOut className="h-3.5 w-3.5 mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16"></div>
    </>
  )
}