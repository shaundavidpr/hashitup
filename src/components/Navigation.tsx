'use client'

import { LoginButton } from '@/components/LoginButton'
import { cn } from '@/lib/utils'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { LogOut, User, ChevronDown, LayoutDashboard, Settings, Shield } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function Navigation() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const isAdmin = session?.user?.role === 'ADMIN' || session?.user?.role === 'SUPERADMIN'
  const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin')
  
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
          padding: 0.5rem 0.75rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(90deg, #ec4899, #06b6d4);
          transition: width 0.3s ease;
          border-radius: 1px;
        }
        
        .nav-link:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }
        
        .nav-link:hover::after {
          width: 60%;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .shimmer-text {
          background: linear-gradient(
            90deg,
            #ec4899 0%,
            #06b6d4 25%,
            #ffffff 50%,
            #06b6d4 75%,
            #ec4899 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .glass-button {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .glass-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        
        .gradient-border {
          position: relative;
          background: linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(6, 182, 212, 0.1));
          border: 1px solid transparent;
          background-clip: padding-box;
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: linear-gradient(45deg, #ec4899, #06b6d4);
          border-radius: inherit;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .gradient-border:hover::before {
          opacity: 1;
        }
      `}</style>

      <nav className={cn(
        "fixed top-0 z-50 w-full border-b transition-all duration-500",
        scrolled 
          ? "bg-black/95 backdrop-blur-xl shadow-2xl shadow-pink-500/10 border-white/20" 
          : "bg-black/80 backdrop-blur-lg border-white/10"
      )}>
        <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3 md:py-4 lg:py-5 flex items-center justify-between h-14 sm:h-16 lg:h-20">
          <Link href="/" className="flex items-center space-x-3 flex-shrink-0 group">
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-pink-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-pink-500/25 transition-all duration-300">
              <span className="text-white font-bold text-sm lg:text-base">H</span>
            </div>
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold shimmer-text tracking-tight animate-float">
              HASHITUP
            </span>
          </Link>

          <div className="flex items-center">
            {/* Desktop Navigation Links - Hidden on dashboard/admin pages */}
            {!isDashboard && (
              <nav className="hidden lg:flex items-center gap-4 xl:gap-6 mr-6 xl:mr-8">
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
            )}
            
            {/* Auth Buttons with Consistent Design */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              {session ? (
                <>
                  {/* Dashboard Button - Enhanced for desktop */}
                  <Link
                    href="/dashboard"
                    className="hidden sm:flex items-center px-3 py-2 lg:px-4 lg:py-2.5 xl:px-5 xl:py-3 text-xs sm:text-sm lg:text-base font-medium text-white bg-gradient-to-r from-pink-500/80 to-cyan-500/80 rounded-xl lg:rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 hover:-translate-y-0.5 glass-button min-w-[44px] min-h-[44px]"
                  >
                    <LayoutDashboard className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                    <span>Dashboard</span>
                  </Link>
                  
                  {/* Admin Buttons - Enhanced for desktop */}
                  {isAdmin && (
                    <>
                      <Link
                        href="/admin"
                        className="hidden md:inline-flex items-center px-3 py-2 lg:px-4 lg:py-2.5 xl:px-5 xl:py-3 text-xs sm:text-sm lg:text-base font-medium text-white glass-button rounded-xl lg:rounded-2xl transition-all duration-300 hover:-translate-y-0.5 min-w-[44px] min-h-[44px] gradient-border"
                      >
                        <Shield className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                        <span>Admin</span>
                      </Link>
                      <Link
                        href="/admin/manage"
                        className="hidden lg:inline-flex items-center px-3 py-2 lg:px-4 lg:py-2.5 xl:px-5 xl:py-3 text-xs sm:text-sm lg:text-base font-medium text-white glass-button rounded-xl lg:rounded-2xl transition-all duration-300 hover:-translate-y-0.5 min-w-[44px] min-h-[44px] gradient-border"
                      >
                        <Settings className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                        <span>Manage</span>
                      </Link>
                    </>
                  )}
                  
                  {/* User Menu Dropdown - Enhanced for desktop */}
                  <div className="relative user-menu-container"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 lg:space-x-3 px-3 py-2 lg:px-4 lg:py-2.5 xl:px-5 xl:py-3 text-xs sm:text-sm lg:text-base font-medium text-white glass-button rounded-xl lg:rounded-2xl transition-all duration-300 hover:-translate-y-0.5 min-w-[44px] min-h-[44px] gradient-border"
                    >
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || 'User'}
                          className="w-6 h-6 lg:w-8 lg:h-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-5 h-5 lg:w-6 lg:h-6" />
                      )}
                      <span className="hidden md:block lg:text-base">{session.user?.name?.split(' ')[0] || 'User'}</span>
                      <ChevronDown className={`w-4 h-4 lg:w-5 lg:h-5 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-3 w-52 lg:w-56 xl:w-64 bg-black/95 backdrop-blur-xl rounded-xl lg:rounded-2xl shadow-2xl border border-white/20 py-2 z-[60] glass-button">
                        <div className="px-4 lg:px-5 py-3 lg:py-4 border-b border-white/10">
                          <p className="text-sm lg:text-base font-medium text-white truncate">{session.user?.name}</p>
                          <p className="text-xs lg:text-sm text-slate-400 truncate">{session.user?.email}</p>
                        </div>
                        
                        {/* Mobile Dashboard Link */}
                        <Link
                          href="/dashboard"
                          className="sm:hidden flex items-center px-4 py-3 text-sm text-white/80 hover:bg-white/5 transition-colors min-h-[44px] rounded-lg mx-2"
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
                              className="md:hidden flex items-center px-4 py-3 text-sm text-white/80 hover:bg-white/5 transition-colors min-h-[44px] rounded-lg mx-2"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <Shield className="w-4 h-4 mr-3" />
                              Admin Panel
                            </Link>
                            <Link
                              href="/admin/manage"
                              className="lg:hidden flex items-center px-4 py-3 text-sm text-white/80 hover:bg-white/5 transition-colors min-h-[44px] rounded-lg mx-2"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <Settings className="w-4 h-4 mr-3" />
                              Manage
                            </Link>
                          </>
                        )}
                        
                        <Link
                          href="/dashboard"
                          className="hidden sm:flex items-center px-4 lg:px-5 py-3 lg:py-3.5 text-sm lg:text-base text-white/80 hover:bg-white/5 transition-colors min-h-[44px] rounded-lg lg:rounded-xl mx-2"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4 lg:w-5 lg:h-5 mr-3" />
                          Profile
                        </Link>
                        
                        <button
                          onClick={() => {
                            setUserMenuOpen(false)
                            signOut()
                          }}
                          className="w-full flex items-center px-4 lg:px-5 py-3 lg:py-3.5 text-sm lg:text-base text-rose-400 hover:bg-white/5 transition-colors min-h-[44px] rounded-lg lg:rounded-xl mx-2"
                        >
                          <LogOut className="w-4 h-4 lg:w-5 lg:h-5 mr-3" />
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="transform transition-transform hover:-translate-y-1 hover:scale-105">
                  <LoginButton />
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle - Enhanced */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col gap-1 ml-2 sm:ml-3 p-2.5 min-w-[44px] min-h-[44px] justify-center items-center rounded-xl transition-all duration-300 hover:bg-white/10 glass-button"
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
            {/* Navigation items - Hidden on dashboard/admin pages */}
            {!isDashboard && navItems.map((item, index) => (
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
                <div className={`border-white/10 pt-3 ${!isDashboard ? 'border-t mt-3' : ''}`}>
                  <div className="flex items-center space-x-3 mb-3 px-3 py-2 bg-white/5 rounded-lg">
                   
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white truncate">{session.user?.name}</p>
                     
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