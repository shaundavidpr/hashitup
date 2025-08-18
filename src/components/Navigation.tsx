'use client'

import { LoginButton } from '@/components/LoginButton'
import { cn } from '@/lib/utils'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { LogOut, User, ChevronDown, LayoutDashboard, Settings, Shield } from 'lucide-react'

export function Navigation() {
  const { data: session } = useSession()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPERADMIN'
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    
    // Close user menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.user-menu-container')) {
        setUserMenuOpen(false)
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  
  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#events', label: 'Events' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' }
  ]

  return (
    <>
      {/* Custom animation styles */}
      <style jsx>{`
        .nav-link {
          position: relative;
          color: #f1f5f9;
          text-decoration: none;
          font-weight: 500;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -4px;
          left: 0;
          background: linear-gradient(90deg, #ec4899, #06b6d4);
          transition: width 0.3s ease;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <nav className={cn(
        "fixed top-0 z-50 w-full border-b border-white/10 transition-all duration-500",
        scrolled ? "bg-black/90 backdrop-blur-lg shadow-lg shadow-pink-500/5" : "bg-black/70 backdrop-blur-sm"
      )}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 flex items-center justify-between h-14 sm:h-16 md:h-auto">
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent tracking-tight animate-float">CodeNChip</span>
          </Link>

          <div className="flex items-center">
            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 mr-4 xl:mr-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link text-sm xl:text-base"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            {/* Auth Buttons with Consistent Design */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {session ? (
                <>
                  {/* Dashboard Button - Hidden on mobile, shown in mobile menu */}
                  <Link
                    href="/dashboard"
                    className="hidden sm:flex items-center px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-pink-500/80 to-cyan-500/80 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 hover:-translate-y-0.5 min-w-[44px] min-h-[44px]"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-1.5" />
                    <span>Dashboard</span>
                  </Link>
                  
                  {/* Admin Buttons */}
                  {isAdmin && (
                    <>
                      <Link
                        href="/admin"
                        className="hidden md:inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 text-xs sm:text-sm font-medium text-white bg-white/5 border border-white/10 rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 min-w-[44px] min-h-[44px]"
                      >
                        <Shield className="w-4 h-4 mr-1.5" />
                        <span>Admin</span>
                      </Link>
                      <Link
                        href="/admin/manage"
                        className="hidden lg:inline-flex items-center px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 text-xs sm:text-sm font-medium text-white bg-white/5 border border-white/10 rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 min-w-[44px] min-h-[44px]"
                      >
                        <Settings className="w-4 h-4 mr-1.5" />
                        <span>Manage</span>
                      </Link>
                    </>
                  )}
                  
                  {/* User Menu Dropdown */}
                  <div className="relative user-menu-container"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-1 sm:space-x-2 px-2 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-white bg-white/5 border border-white/10 rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 min-w-[44px] min-h-[44px]"
                    >
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || 'User'}
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                      <span className="hidden md:block">{session.user?.name?.split(' ')[0] || 'User'}</span>
                      <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''} ${session.user?.name ? '' : 'sm:block'}`} />
                    </button>
                    
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-black/95 backdrop-blur-xl rounded-lg sm:rounded-xl shadow-xl border border-white/10 py-1 z-[60]">
                        <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-white/10">
                          <p className="text-xs sm:text-sm font-medium text-white truncate">{session.user?.name}</p>
                          <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
                        </div>
                        
                        {/* Mobile Dashboard Link */}
                        <Link
                          href="/dashboard"
                          className="sm:hidden flex items-center px-3 py-2 text-xs text-white/80 hover:bg-white/5 transition-colors min-h-[44px]"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4 mr-3" />
                          Dashboard
                        </Link>
                        
                        {/* Mobile Admin Links */}
                        {isAdmin && (
                          <>
                            <Link
                              href="/admin"
                              className="md:hidden flex items-center px-3 py-2 text-xs text-white/80 hover:bg-white/5 transition-colors min-h-[44px]"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <Shield className="w-4 h-4 mr-3" />
                              Admin Panel
                            </Link>
                            <Link
                              href="/admin/manage"
                              className="lg:hidden flex items-center px-3 py-2 text-xs text-white/80 hover:bg-white/5 transition-colors min-h-[44px]"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <Settings className="w-4 h-4 mr-3" />
                              Manage
                            </Link>
                          </>
                        )}
                        
                        <Link
                          href="/dashboard"
                          className="hidden sm:flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-white/80 hover:bg-white/5 transition-colors min-h-[44px]"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
                          Profile
                        </Link>
                        
                        <button
                          onClick={() => {
                            setUserMenuOpen(false)
                            signOut()
                          }}
                          className="w-full flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-rose-400 hover:bg-white/5 transition-colors min-h-[44px]"
                        >
                          <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3" />
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="transform transition-transform hover:-translate-y-0.5">
                  <LoginButton />
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col gap-1 ml-1 sm:ml-2 p-2 min-w-[44px] min-h-[44px] justify-center items-center rounded-lg transition-colors hover:bg-white/5"
              aria-label="Toggle mobile menu"
            >
              <span className={`w-5 h-0.5 sm:w-6 sm:h-0.5 bg-white transition-all duration-300 rounded ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-5 h-0.5 sm:w-6 sm:h-0.5 bg-white transition-all duration-300 rounded ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 sm:w-6 sm:h-0.5 bg-white transition-all duration-300 rounded ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-lg border-t border-white/10 p-3 sm:p-4 max-h-[calc(100vh-70px)] overflow-y-auto z-[55]">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center py-3 px-2 text-sm sm:text-base text-gray-300 hover:text-white hover:translate-x-1 transform transition-all duration-300 min-h-[44px] rounded-lg hover:bg-white/5"
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </a>
            ))}
            
            {/* Add session links to mobile menu as well */}
            {session && (
              <>
                <div className="border-t border-white/10 mt-3 pt-3">
                  <div className="flex items-center space-x-3 mb-3 px-3 py-2 bg-white/5 rounded-lg">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      />
                    ) : (
                      <User className="w-6 h-6 text-white/60 flex-shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">{session.user?.name}</p>
                      <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
                    </div>
                  </div>
                </div>
                
                <Link
                  href="/dashboard"
                  className="flex items-center py-3 px-2 text-sm sm:text-base text-gray-300 hover:text-white hover:translate-x-1 transform transition-all duration-300 min-h-[44px] rounded-lg hover:bg-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="w-4 h-4 mr-3" />
                  Dashboard
                </Link>
                {isAdmin && (
                  <>
                    <Link
                      href="/admin"
                      className="flex items-center py-3 px-2 text-sm sm:text-base text-gray-300 hover:text-white hover:translate-x-1 transform transition-all duration-300 min-h-[44px] rounded-lg hover:bg-white/5"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Shield className="w-4 h-4 mr-3" />
                      Admin Panel
                    </Link>
                    <Link
                      href="/admin/manage"
                      className="flex items-center py-3 px-2 text-sm sm:text-base text-gray-300 hover:text-white hover:translate-x-1 transform transition-all duration-300 min-h-[44px] rounded-lg hover:bg-white/5"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Manage
                    </Link>
                  </>
                )}
                
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    signOut()
                  }}
                  className="flex items-center w-full py-3 px-2 text-sm sm:text-base text-rose-400 hover:text-rose-300 hover:translate-x-1 transform transition-all duration-300 min-h-[44px] rounded-lg hover:bg-white/5"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign out
                </button>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  )
} 