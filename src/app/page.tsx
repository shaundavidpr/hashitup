"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, ChevronDown, Star, Zap, Code, Clock, ArrowRight, ExternalLink, DollarSign, Users, Timer, Rocket, Target, HandHeart, Trophy, Lightbulb, CheckCircle, GitBranch, Settings, Twitter, Linkedin, MessageCircle, Instagram, Mail } from 'lucide-react';
import { useSession, signIn } from 'next-auth/react';
import Link from 'next/link';

// Enhanced animations and styles
const styleTag = `
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  @keyframes pulse {
    0% { opacity: 0.5; }
    50% { opacity: 0.8; }
    100% { opacity: 0.5; }
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

  @keyframes slideInUp {
    0% { 
      opacity: 0; 
      transform: translateY(40px); 
    }
    100% { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }

  @keyframes fadeInScale {
    0% { 
      opacity: 0; 
      transform: scale(0.9); 
    }
    100% { 
      opacity: 1; 
      transform: scale(1); 
    }
  }

  @keyframes rotateGlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .nav-link {
    position: relative;
    color: #f1f5f9;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
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
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-shimmer {
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  .animate-slide-up {
    animation: slideInUp 0.8s ease-out forwards;
  }

  .animate-fade-scale {
    animation: fadeInScale 0.6s ease-out forwards;
  }

  .animate-rotate-glow {
    animation: rotateGlow 20s linear infinite;
  }
  
  .gradient-border {
    position: relative;
    border-radius: 1rem;
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

  .glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .hero-glow {
    filter: drop-shadow(0 0 20px rgba(236, 72, 153, 0.3));
  }

  .interactive-card {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    transform-style: preserve-3d;
  }

  .interactive-card:hover {
    transform: translateY(-8px) rotateX(5deg);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }

  .scroll-indicator {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #ec4899, #06b6d4);
    transform-origin: left;
    z-index: 9999;
  }
`;

const HackathonLanding = () => {
  const { data: session, status } = useSession();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signIn('google', { 
        callbackUrl: '/dashboard'
      });
    } catch (error) {
      console.error('Sign-in failed:', error);
      setIsSigningIn(false);
    }
  };

  const stats = [
    { number: '₹1.5L', label: 'Prize Pool', icon: DollarSign, color: 'from-yellow-400 to-orange-500' },
    { number: '100', label: 'Teams', icon: Users, color: 'from-blue-400 to-purple-500' },
    { number: '24', label: 'Hours', icon: Timer, color: 'from-green-400 to-teal-500' },
    { number: '370+', label: 'Participants', icon: Rocket, color: 'from-pink-400 to-rose-500' }
  ];

  const features = [
    {
      icon: Rocket,
      title: 'Launch Ideas',
      description: 'Turn concepts into working prototypes with complete creative freedom.',
      color: 'from-pink-500/20 to-rose-500/20',
      borderColor: 'border-pink-500/30'
    },
    {
      icon: HandHeart,
      title: 'Network & Collaborate',
      description: 'Connect with brilliant minds. Form teams of 2-4 members for maximum impact.',
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: Trophy,
      title: 'Win Amazing Prizes',
      description: 'Compete for ₹1.5 Lakhs total prize pool with special sponsor recognition.',
      color: 'from-yellow-500/20 to-amber-500/20',
      borderColor: 'border-yellow-500/30'
    },
    {
      icon: Zap,
      title: '24-Hour Innovation',
      description: 'Build something meaningful in 24 hours. From 3 PM Day 1 to 3 PM Day 2.',
      color: 'from-purple-500/20 to-indigo-500/20',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: Star,
      title: 'Professional Growth',
      description: 'Showcase projects to industry professionals and gain marketing opportunities.',
      color: 'from-emerald-500/20 to-green-500/20',
      borderColor: 'border-emerald-500/30'
    },
    {
      icon: CheckCircle,
      title: 'Complete Support',
      description: 'Full facilities: food, Wi-Fi, power backup, transport, and medical support.',
      color: 'from-orange-500/20 to-red-500/20',
      borderColor: 'border-orange-500/30'
    }
  ];

  const timeline = [
    {
      time: '3:00 PM - Day 1',
      title: 'Hackathon Inauguration',
      description: 'Check-in, welcome ceremony, and team formation begins!',
      icon: Target
    },
    {
      time: '3:00 PM Day 1 - 3:00 PM Day 2',
      title: '24-Hour Hacking Marathon',
      description: 'Code. Create. Collaborate. No specific theme — innovate freely!',
      icon: Zap
    },
    {
      time: '12:00 PM - Day 2',
      title: 'First Round Judging',
      description: 'Demo time! All teams present their projects to judges.',
      icon: Users
    },
    {
      time: 'After 1:00 PM - Day 2',
      title: 'Final Judging (Top 10)',
      description: 'The best teams compete for glory in the final round.',
      icon: Trophy
    },
    {
      time: 'Around 4:00 PM - Day 2',
      title: 'Results & Closing',
      description: 'Winner announcements and celebration ceremony!',
      icon: Star
    }
  ];

  const prizes = [
    { place: '1st Place', amount: '₹75,000', description: 'Grand Prize + Recognition + Sponsor Opportunities', glow: 'shadow-yellow-500/50' },
    { place: '2nd Place', amount: '₹50,000', description: 'Cash Prize + Mentorship + Tech Package', glow: 'shadow-gray-400/50' },
    { place: '3rd Place', amount: '₹25,000', description: 'Cash Prize + Recognition + Certificates', glow: 'shadow-amber-600/50' }
  ];

  const tips = [
    {
      icon: Lightbulb,
      title: 'Think Social Impact',
      description: 'Focus on socially relevant and sustainable solutions that solve real-world problems.'
    },
    {
      icon: Target,
      title: 'Open-Source Only',
      description: 'Use open-source tools and APIs. Properly cite external resources in documentation.'
    },
    {
      icon: GitBranch,
      title: 'GitHub Essential',
      description: 'Push code and docs to GitHub before submission. Include technical reports.'
    },
    {
      icon: Settings,
      title: 'Team Collaboration',
      description: 'Work within your 2-4 member team. Diversity in skills is encouraged!'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-indicator" 
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* Enhanced Style Tag */}
      <style dangerouslySetInnerHTML={{ __html: styleTag }} />
      
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at center, rgba(255, 0, 204, 0.08) 0%, transparent 70%),
              radial-gradient(ellipse at 80% 20%, rgba(0, 255, 255, 0.1) 0%, transparent 60%),
              radial-gradient(ellipse at 20% 80%, rgba(255, 105, 180, 0.08) 0%, transparent 55%)
            `,
            animation: 'pulse 8s ease-in-out infinite alternate'
          }}
        />
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="rgba(255,255,255,0.05)" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full blur-3xl animate-rotate-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-rotate-glow" style={{animationDelay: '10s'}}></div>
      </div>



      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-12 sm:pt-16 lg:pt-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-3 mb-6 sm:mb-8 lg:mb-10 rounded-full bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-white/20 backdrop-blur-sm animate-fade-scale">
            <Star className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-yellow-400" />
            <span className="text-sm sm:text-base font-medium">
              {session ? `Welcome back, ${session.user?.name?.split(' ')[0]}!` : 'National Level Hackathon 2025'}
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 sm:mb-4 lg:mb-6 leading-tight tracking-tight hero-glow animate-slide-up" style={{fontFamily: 'Clash Display, system-ui, -apple-system, sans-serif'}}>
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            HASHITUP
          </span>
        </h1>
        
          {/* Tagline */}
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium text-gray-300 mb-3 sm:mb-4 animate-slide-up px-4" style={{animationDelay: '0.2s'}}>
            "Push the Branch. Commit the Future."
          </p>
          
          {/* Description */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-400 mb-6 sm:mb-8 lg:mb-10 max-w-4xl mx-auto animate-slide-up px-4 leading-relaxed" style={{animationDelay: '0.4s'}}>
            A 24-Hour National Level Hackathon hosted by <br className="hidden sm:block" /> <span className="text-white font-semibold">Department of Computer Science and Engineering</span> of{' '} <br className="hidden sm:block" />
            <span className="text-white font-semibold">Mar Baselios Christian College of Engineering & Technology</span>, Kuttikkanam.
          </p>
          
          {/* Event Details */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12 animate-slide-up px-4" style={{animationDelay: '0.6s'}}>
            <div className="flex items-center gap-3 lg:gap-4 glass-card px-4 py-2 sm:px-6 sm:py-3 w-full sm:w-auto justify-center">
            <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-pink-400" />
              <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-300">Kuttikkanam, Kerala</span>
          </div>
            <div className="flex items-center gap-3 lg:gap-4 glass-card px-4 py-2 sm:px-6 sm:py-3 w-full sm:w-auto justify-center">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
              <span className="text-sm sm:text-base lg:text-lg font-medium text-gray-300">September 26-27, 2025</span>
            </div>
        </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12 animate-slide-up px-4" style={{animationDelay: '0.8s'}}>
          {stats.map((stat, index) => (
              <div key={index} className="glass-card p-3 sm:p-4 lg:p-6 interactive-card group">
                <div className={`text-lg sm:text-xl lg:text-2xl mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent font-bold`}>
                {stat.number}
                </div>
                <stat.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 mb-2 text-gray-400 group-hover:text-white transition-colors mx-auto" />
                <div className="text-gray-400 text-xs sm:text-sm font-medium uppercase tracking-wider">
                {stat.label}
                </div>
            </div>
          ))}
        </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:gap-6 justify-center animate-slide-up px-4 max-w-2xl mx-auto" style={{animationDelay: '1s'}}>
            {session ? (
              <Link
                href="/dashboard"
                className="group px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold text-base sm:text-lg lg:text-xl rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/30 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2 lg:space-x-3">
                  <span>Go to Dashboard</span>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </Link>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={isSigningIn || status === 'loading'}
                className="group px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold text-base sm:text-lg lg:text-xl rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/30 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2 lg:space-x-3">
                  {isSigningIn || status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Register Your Team Now</span>
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </button>
            )}
          <a
            href="#about"
              className="px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 glass-card text-white font-semibold text-base sm:text-lg lg:text-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 gradient-border flex items-center justify-center space-x-2 lg:space-x-3"
          >
              <span>Learn More</span>
              <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
          </a>
        </div>
      </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-12 sm:py-20 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
          Why <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Participate?</span>
        </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed">
              Experience the thrill of innovation, learn from industry experts, and build solutions that matter in just 24 hours.
        </p>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
                className={`glass-card p-4 sm:p-5 lg:p-6 interactive-card group relative overflow-hidden ${feature.color} border ${feature.borderColor}`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                }}
              >
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Icon */}
                <div className="mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-500">
                  <feature.icon className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                
                {/* Title */}
                <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {feature.title}
                </h3>
                
                {/* Description */}
                <p className="text-xs sm:text-sm lg:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Bottom Border */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Enhanced Schedule Section */}
      <section id="schedule" className="py-12 sm:py-20 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
          Event <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Schedule</span>
        </h2>
            <div className="inline-flex items-center px-4 py-2 sm:px-8 sm:py-4 rounded-full glass-card">
              <Calendar className="h-4 w-4 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-cyan-400" />
              <span className="text-sm sm:text-xl text-gray-300">September 26-27, 2025 • MBC Kuttikkanam, Kerala</span>
            </div>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line - Hidden on mobile for cleaner look */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-500 rounded-full"></div>
          
          {timeline.map((item, index) => (
            <div 
              key={index} 
                className={`flex flex-col md:flex-row items-center mb-8 sm:mb-16 group ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                <div className={`flex-1 w-full ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} mb-4 md:mb-0`}>
                  <div className="glass-card p-4 sm:p-8 interactive-card group-hover:shadow-2xl">
                    <div className="flex items-center gap-3 mb-3 sm:mb-4 justify-center md:justify-start">
                      <item.icon className="h-6 w-6 sm:h-8 sm:w-8 text-pink-400" />
                      <h3 className="text-lg sm:text-2xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {item.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3 sm:mb-4 text-pink-400 font-medium justify-center md:justify-start">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-sm sm:text-base">{item.time}</span>
                    </div>
                    
                    <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-center md:text-left">
                      {item.description}
                    </p>
                  </div>
              </div>
              
                {/* Timeline Node - Hidden on mobile */}
                <div className="hidden md:flex w-8 h-8 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-full relative z-10 shadow-lg shadow-pink-500/50 group-hover:scale-125 transition-transform duration-300 items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              
              <div className="hidden md:block flex-1" />
            </div>
          ))}
          </div>
        </div>
      </section>

      {/* Enhanced Prizes Section */}
      <section id="prizes" className="py-12 sm:py-20 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="glass-card p-6 sm:p-12 lg:p-16 relative overflow-hidden">
            <div className="text-center mb-8 sm:mb-12 lg:mb-16">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
            Amazing <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Prizes</span>
          </h2>
              <p className="text-lg sm:text-2xl text-gray-300">₹1,50,000 total prize pool with special recognitions from sponsors</p>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-16">
            {prizes.map((prize, index) => (
              <div
                key={index}
                  className={`text-center p-6 sm:p-12 glass-card interactive-card relative overflow-hidden ${
                    index === 0 ? 'ring-2 ring-yellow-500/50 bg-gradient-to-b from-yellow-500/10 to-transparent lg:col-span-1 sm:col-span-2' : ''
                  }`}
                >
                  {/* First Place Crown */}
                {index === 0 && (
                    <div className="absolute -top-2 sm:-top-4 left-1/2 transform -translate-x-1/2">
                    <Trophy className="h-6 w-6 sm:h-10 sm:w-10 text-yellow-400" />
                  </div>
                )}
                
                  {/* Prize Amount */}
                  <div className={`text-3xl sm:text-6xl font-bold mb-2 sm:mb-4 ${
                  index === 0 
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent'
                }`}>
                  {prize.amount}
                </div>
                
                  {/* Prize Place */}
                  <div className={`text-lg sm:text-2xl font-semibold mb-3 sm:mb-6 ${
                  index === 0 ? 'text-yellow-300' : 'text-gray-300'
                }`}>
                  {prize.place}
                </div>
                
                  {/* Prize Description */}
                  <p className="text-sm sm:text-lg text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                  {prize.description}
                </p>
              </div>
            ))}
          </div>

            {/* Judging Criteria */}
            <div className="text-center glass-card p-4 sm:p-8">
              <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
                Judging Criteria
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 text-xs sm:text-sm">
                {['Innovation & Creativity', 'Sustainability & Impact', 'Social Relevance', 'Technical Execution', 'Presentation'].map((criteria, index) => (
                  <div key={index} className="glass-card p-3 sm:p-4 hover:bg-white/10 transition-colors">
                    {criteria}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Tips Section */}
      <section className="py-12 sm:py-20 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
          Pro Tips to <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Win</span>
        </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
          Insider strategies from previous winners and industry experts
        </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
                className="glass-card p-4 sm:p-6 lg:p-8 interactive-card group relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 glass-card group-hover:scale-110 transition-transform duration-300">
                    <tip.icon className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold mb-2 sm:mb-3 text-white group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {tip.title}
                    </h3>
                    <p className="text-xs sm:text-sm lg:text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {tip.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            </div>
        </div>
      </section>

      {/* Enhanced Sponsors Section */}
      <section id="sponsors" className="py-12 sm:py-20 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 tracking-tight">
          Our <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Sponsors</span>
        </h2>
            <p className="text-lg sm:text-xl text-gray-300 px-4">
          Supported by industry leaders who believe in innovation
        </p>
          </div>
        
          {/* Sponsor Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-8 mb-8 sm:mb-16">
          {[Rocket, Code, Settings, Target, Zap, Trophy, Star, Lightbulb].map((IconComponent, index) => (
            <div 
              key={index} 
                className="aspect-[3/2] glass-card flex items-center justify-center group interactive-card"
            >
                <IconComponent className="h-8 w-8 sm:h-12 sm:w-12 text-gray-500 opacity-30 group-hover:opacity-70 group-hover:text-white transition-all duration-300 group-hover:scale-110" />
            </div>
          ))}
        </div>
        
          <div className="text-center glass-card p-8">
            <p className="text-lg text-gray-300">
            Partnership opportunities available •{' '}
            <a href="mailto:sponsors@hackathon2025.com" className="text-cyan-400 hover:text-cyan-300 transition-colors relative group">
              Contact us
                <ExternalLink className="inline h-4 w-4 ml-1" />
            </a>
          </p>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-12 sm:py-20 lg:py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-8 sm:p-12 lg:p-20 relative overflow-hidden">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
          Ready to <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Code the Grid?</span>
        </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-6 sm:mb-8 lg:mb-10 px-2 sm:px-4 max-w-3xl mx-auto leading-relaxed">
              Join 370+ innovators for HASHITUP. Registration fee: ₹400 per team (food separate).
            </p>
            
            {/* Registration Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
              {[
                { label: 'Registration Deadline', value: '10th September 2025', icon: Calendar },
                { label: 'Shortlist Results', value: '15th - 17th September 2025', icon: CheckCircle },
                { label: 'Max Teams', value: '100 teams only', icon: Users }
              ].map((item, index) => (
                <div key={index} className="glass-card p-4 sm:p-6 hover:scale-105 transition-transform duration-300">
                  <item.icon className="h-6 w-6 sm:h-8 sm:w-8 mb-2 sm:mb-3 text-pink-400 mx-auto" />
                  <div className="text-sm sm:text-base font-semibold text-white mb-1">{item.label}</div>
                  <div className="text-xs sm:text-sm text-gray-400">{item.value}</div>
                </div>
              ))}
        </div>
            
            {session ? (
              <Link
          href="/dashboard"
                className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bold text-base sm:text-lg lg:text-xl rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/30 relative overflow-hidden mb-4 sm:mb-6"
              >
                <span className="relative z-10 flex items-center space-x-2 lg:space-x-3">
                  <span>Go to Dashboard</span>
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 group-hover:rotate-12 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </Link>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={isSigningIn || status === 'loading'}
                className="group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bold text-base sm:text-lg lg:text-xl rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/30 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed mb-4 sm:mb-6"
              >
                <span className="relative z-10 flex items-center space-x-2 lg:space-x-3">
                  {isSigningIn || status === 'loading' ? (
                    <>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Register Your Team Now</span>
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              </button>
            )}
            
            <p className="text-gray-500 mt-3 sm:mt-4 text-xs sm:text-sm lg:text-base px-4 sm:px-6 max-w-2xl mx-auto leading-relaxed">
          ⚠️ Registration fee is non-refundable • College letterhead confirmation required
        </p>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer id="contact" className="border-t border-white/10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 lg:gap-16 mb-8 sm:mb-12 lg:mb-16">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 flex items-center justify-center">
                  <Code className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-white" />
                </div>
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  HASHITUP
                </span>
              </div>
              <p className="text-gray-400 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-lg mx-auto sm:mx-0 leading-relaxed">
                National Level 24-Hour Hackathon. Where innovation meets execution, and dreams become reality.
              </p>
              <div className="flex space-x-4 sm:space-x-6 justify-center sm:justify-start">
            {[Twitter, Linkedin, MessageCircle, Instagram].map((IconComponent, index) => (
              <a
                key={index}
                href="#"
                    className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 glass-card flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white/20"
              >
                <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-gray-400 hover:text-white transition-colors" />
              </a>
            ))}
              </div>
          </div>
          
            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 lg:mb-8 text-white">Quick Links</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { href: '#about', label: 'About' },
                  { href: '#schedule', label: 'Schedule' },
                  { href: '#prizes', label: 'Prizes' },
                  { href: '/rules', label: 'Rules' },
                  { href: '#sponsors', label: 'Sponsors' },
                  { href: '#contact', label: 'Contact' }
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block text-sm sm:text-base lg:text-lg text-gray-400 hover:text-white transition-colors duration-300 hover:pl-2"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6 lg:mb-8 text-white">Contact</h3>
              <div className="space-y-3 sm:space-y-4 text-gray-400">
                <div className="flex items-center justify-center sm:justify-start space-x-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-pink-400" />
                  <span className="text-sm sm:text-base lg:text-lg">Kuttikkanam, Kerala</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start space-x-3">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-pink-400" />
                  <span className="text-sm sm:text-base lg:text-lg">Sep 26-27, 2025</span>
                </div>
                <p className="text-xs sm:text-sm lg:text-base leading-relaxed">
                  Questions? Contact the organizing team
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t border-white/10 pt-6 sm:pt-8 lg:pt-12 flex flex-col items-center space-y-6 sm:space-y-8 lg:flex-row lg:justify-between lg:space-y-0">
            <p className="text-gray-500 text-sm sm:text-base lg:text-lg text-center order-2 lg:order-1">
              © 2025 HASHITUP Hackathon Platform. All rights reserved.
            </p>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 order-1 lg:order-2">
              <span className="text-sm sm:text-base lg:text-lg text-gray-600">Organized by</span>
              <span className="text-sm sm:text-base lg:text-lg bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent font-semibold text-center">
                Dept. of CSE, MBC Kuttikkanam
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HackathonLanding;