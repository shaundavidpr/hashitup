'use client'

import { LoginButton } from '@/components/LoginButton'
import { cn } from '@/lib/utils'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { LogOut, User, ChevronDown } from 'lucide-react'

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
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent tracking-tight animate-float">CodeNChip</span>
          </Link>

          <div className="flex items-center">
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 mr-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            {/* Auth Buttons with Consistent Design */}
            <div className="flex items-center space-x-3">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-500/80 to-cyan-500/80 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 hover:-translate-y-0.5"
                  >
                    Dashboard
                  </Link>
                  {isAdmin && (
                    <>
                      <Link
                        href="/admin"
                        className="px-4 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
                      >
                        Admin
                      </Link>
                      <Link
                        href="/admin/manage"
                        className="px-4 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
                      >
                        Manage
                      </Link>
                    </>
                  )}
                  
                  {/* User Menu Dropdown */}
                  <div className="relative user-menu-container"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5"
                    >
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || 'User'}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                      <span className="hidden sm:block">{session.user?.name?.split(' ')[0] || 'User'}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {userMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-black/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/10 py-1 z-50">
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm font-medium text-white">{session.user?.name}</p>
                          <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
                        </div>
                        
                        <Link
                          href="/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-white/80 hover:bg-white/5 transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4 mr-3" />
                          Profile
                        </Link>
                        
                        <button
                          onClick={() => {
                            setUserMenuOpen(false)
                            signOut()
                          }}
                          className="w-full flex items-center px-4 py-2 text-sm text-rose-400 hover:bg-white/5 transition-colors"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
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
              className="md:hidden flex flex-col gap-1 ml-4"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 rounded ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 rounded ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-white transition-all duration-300 rounded ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-lg border-t border-white/10 p-6">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-3 text-gray-300 hover:text-white hover:translate-x-1 transform transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {item.label}
              </a>
            ))}
            
            {/* Add session links to mobile menu as well */}
            {session && (
              <>
                <div className="border-t border-white/10 mt-4 pt-4">
                  <div className="flex items-center space-x-3 mb-4 px-3 py-2 bg-white/5 rounded-lg">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-white/60" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-white">{session.user?.name}</p>
                      <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
                    </div>
                  </div>
                </div>
                
                <Link
                  href="/dashboard"
                  className="block py-3 text-gray-300 hover:text-white hover:translate-x-1 transform transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <>
                    <Link
                      href="/admin"
                      className="block py-3 text-gray-300 hover:text-white hover:translate-x-1 transform transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Admin Panel
                    </Link>
                    <Link
                      href="/admin/manage"
                      className="block py-3 text-gray-300 hover:text-white hover:translate-x-1 transform transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Manage
                    </Link>
                  </>
                )}
                
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    signOut()
                  }}
                  className="flex items-center w-full py-3 text-rose-400 hover:text-rose-300 hover:translate-x-1 transform transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
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