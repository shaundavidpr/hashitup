"use client";

import React, { useState, useEffect } from 'react';
import { LoginButton } from '@/components/LoginButton';
import { Calendar, Trophy, Rocket, Zap, Star, Users, Award, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Add keyframe animations for enhanced visual effects
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
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-shimmer {
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  
  .animate-ping {
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
  
  @keyframes ping {
    75%, 100% {
      transform: scale(2);
      opacity: 0;
    }
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
`;

const HackathonLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    
    // Simulate session check - in a real app, you'd get this from your auth context/provider
    // This is just a placeholder to make the code work
    setSession(null); // Set to a user object if you want to test logged-in state
    setIsAdmin(false); // Set to true if you want to test admin state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#schedule', label: 'Schedule' },
    { href: '#prizes', label: 'Prizes' },
    { href: '#sponsors', label: 'Sponsors' },
    { href: '#contact', label: 'Contact' }
  ];

  const stats = [
    { number: '$50K', label: 'Prize Pool' },
    { number: '500+', label: 'Participants' },
    { number: '12', label: 'Hours' },
    { number: '25+', label: 'Mentors' }
  ];

  const features = [
    {
      icon: '🚀',
      title: 'Launch Your Ideas',
      description: 'Turn your wildest concepts into working prototypes. Get mentorship from industry leaders and access to cutting-edge tools.'
    },
    {
      icon: '🤝',
      title: 'Network & Collaborate',
      description: 'Connect with like-minded innovators, potential co-founders, and hiring managers from top tech companies.'
    },
    {
      icon: '🏆',
      title: 'Win Big Prizes',
      description: 'Compete for $50,000 in prizes including cash, startup resources, internships, and exclusive tech swag.'
    },
    {
      icon: '⚡',
      title: 'Learn & Grow',
      description: 'Attend workshops, masterclasses, and tech talks from industry pioneers. Level up your skills in just 12 hours.'
    },
    {
      icon: '🌟',
      title: 'Career Opportunities',
      description: 'Get noticed by recruiters from Google, Microsoft, Amazon, and 50+ other companies actively seeking talent.'
    },
    {
      icon: '🎉',
      title: 'Unforgettable Experience',
      description: 'Enjoy free food, drinks, entertainment, gaming zones, and memories that will last a lifetime.'
    }
  ];

  const timeline = [
    {
      time: '9:00 AM - 10:00 AM',
      title: 'Registration & Welcome',
      description: 'Check-in, breakfast, team formation, and opening ceremony'
    },
    {
      time: '10:00 AM',
      title: 'Hacking Begins!',
      description: 'Theme announcement and 12-hour coding marathon starts'
    },
    {
      time: '12:00 PM - 6:00 PM',
      title: 'Workshops & Mentoring',
      description: 'Tech workshops, mentor sessions, and skill-building activities'
    },
    {
      time: '8:00 PM - 9:30 PM',
      title: 'Submissions & Demos',
      description: 'Project submissions and 3-minute demo presentations'
    },
    {
      time: '9:30 PM - 10:00 PM',
      title: 'Awards & Closing',
      description: 'Winner announcements, prize distribution, and celebration'
    }
  ];

  const prizes = [
    { place: '1st Place', amount: '$20,000', description: 'Grand Prize + YC Interview + Startup Resources', icon: '👑' },
    { place: '2nd Place', amount: '$15,000', description: 'Cash Prize + Mentorship + Tech Package', icon: '🥈' },
    { place: '3rd Place', amount: '$10,000', description: 'Cash Prize + Internship Opportunities', icon: '🥉' }
  ];

  const tips = [
    {
      icon: '💡',
      title: 'Solve Real Problems',
      description: 'Focus on genuine user pain points. The best projects address real-world issues with practical, scalable solutions.'
    },
    {
      icon: '🎯',
      title: 'Keep It Simple',
      description: 'Better to have a polished MVP than an incomplete complex system. Focus on core features that demonstrate your concept clearly.'
    },
    {
      icon: '📊',
      title: 'Demo Like a Pro',
      description: 'Practice your pitch beforehand. Tell a compelling story, show the problem, your solution, and impact in under 3 minutes.'
    },
    {
      icon: '🔧',
      title: 'Use Familiar Tech',
      description: 'Stick to technologies you know well. Hackathons aren\'t the time to learn new frameworks—save that for after!'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Add the style tag for custom animations */}
      <style dangerouslySetInnerHTML={{ __html: styleTag }} />
      
      {/* Enhanced Animated Background with multiple layers */}
      <div className="fixed inset-0 -z-10">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse at center, rgba(255, 0, 204, 0.05) 0%, transparent 70%),
              radial-gradient(ellipse at 80% 20%, rgba(0, 255, 255, 0.07) 0%, transparent 60%),
              radial-gradient(ellipse at 20% 80%, rgba(255, 105, 180, 0.05) 0%, transparent 55%)
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
      </div>

      <div className='sm:h-52'></div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-32 text-center relative">
        {/* Decorative elements */}
        <div className="absolute -top-16 right-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-8 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <h1 className="text-5xl md:text-7xl font-black mb-5 leading-tight tracking-tight relative z-10 sm:text-3xl">
          Push the{' '}
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
            Branch.
          </span>
          <br />
          Commit the <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">Future</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Join 500+ innovators, developers, and creators for the most epic hackathon of 2025. 
          Transform ideas into reality, win amazing prizes, and shape tomorrow's technology.
        </p>

        {/* Enhanced Hero Stats with animation */}
        <div className="flex justify-center gap-10 my-16 flex-wrap">
          {stats.map((stat, index) => (
            <div key={index} className="text-center transform transition-all duration-500 hover:scale-110 animate-float" style={{animationDelay: `${index * 0.2}s`}}>
              <span className="block text-5xl font-bold bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
                {stat.number}
              </span>
              <span className="text-gray-400 text-sm font-medium uppercase tracking-widest mt-2 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Buttons with better hover effects */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <a
            href="#register"
            className="inline-block px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold text-sm uppercase tracking-wide rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/30 relative overflow-hidden group"
          >
            <span className="relative z-10">Register Now - Free!</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </a>
          <a
            href="#about"
            className="inline-block px-10 py-5 bg-white/5 border border-white/20 text-white font-semibold text-sm uppercase tracking-wide rounded-xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10 gradient-border"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Enhanced About Section with modern glass cards */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-24 relative">
        {/* Decorative background element */}
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 blur-3xl rounded-full"></div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 tracking-tight">
          Why <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Participate?</span>
        </h2>
        <p className="text-xl text-gray-300 text-center mb-20 max-w-2xl mx-auto">
          Experience the thrill of innovation, learn from industry experts, and build solutions that matter.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-xl hover:shadow-pink-500/5 relative overflow-hidden group"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transform: `translateY(${index % 3 * 10}px)`
              }}
            >
              {/* Glowing top border on hover */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-500 to-cyan-500 transform -translate-x-full transition-transform duration-700 group-hover:translate-x-full" />
              
              {/* Glass reflection effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/5 to-transparent transition-opacity duration-500 pointer-events-none"></div>
              
              {/* Enhanced emoji with floating animation */}
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 w-16 h-16 rounded-xl flex items-center justify-center">{feature.icon}</div>
              
              {/* Enhanced title with gradient on hover */}
              <h3 className="text-xl font-bold mb-4 text-white group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{feature.title}</h3>
              
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Schedule Section with animated timeline */}
      <section id="schedule" className="max-w-6xl mx-auto px-6 py-28 relative">
        {/* Decorative background */}
        <div className="absolute -z-10 top-1/2 -right-64 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -z-10 bottom-0 -left-32 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 tracking-tight">
          Event <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Schedule</span>
        </h2>
        
        <p className="text-xl text-gray-300 text-center mb-20">
          <span className="px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm inline-block">
            August 30, 2025 • Innovation Hub, Downtown
          </span>
        </p>

        <div className="relative">
          {/* Vertical timeline line with gradient */}
          <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-500 rounded-full shadow-lg shadow-pink-500/20" />
          
          {timeline.map((item, index) => (
            <div 
              key={index} 
              className={`flex items-center mb-24 group ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}
              style={{animationDelay: `${index * 0.2}s`}}
            >
              <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-xl hover:shadow-pink-500/5 relative overflow-hidden group-hover:bg-white/10">
                  {/* Timeline decoration */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <h3 className="text-2xl font-bold mb-3 group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{item.title}</h3>
                  
                  <p className="text-pink-400 font-medium mb-4 flex items-center gap-2 justify-end md:justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    {item.time}
                  </p>
                  
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{item.description}</p>
                </div>
              </div>
              
              {/* Enhanced timeline node with pulse effect */}
              <div className="w-6 h-6 bg-gradient-to-br from-pink-500 to-cyan-500 rounded-full relative z-10 shadow-lg shadow-pink-500/50 group-hover:scale-125 transition-transform duration-300">
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-500 to-cyan-500 animate-ping opacity-75 group-hover:opacity-100"></span>
              </div>
              
              <div className="flex-1" />
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Prizes Section with glass morphism and better card design */}
      <section id="prizes" className="max-w-6xl mx-auto px-6 py-28 relative">
        <div className="absolute -z-10 top-1/4 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 blur-3xl rounded-full"></div>
        
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-16 shadow-2xl relative overflow-hidden">
          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-xl"></div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 tracking-tight">
            Amazing <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Prizes</span>
          </h2>
          <p className="text-xl text-gray-300 text-center mb-20">$50,000+ total prize pool with rewards for everyone</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {prizes.map((prize, index) => (
              <div
                key={index}
                className={`text-center p-12 rounded-2xl border transition-all duration-500 hover:-translate-y-3 hover:shadow-xl relative overflow-hidden group ${
                  index === 0 
                    ? 'bg-gradient-to-b from-yellow-500/20 to-black/40 border-yellow-500/30 shadow-lg shadow-yellow-500/10' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                {/* Animated background */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-white/5 to-transparent"></div>
                
                {/* Crown for first place */}
                {index === 0 && (
                  <div className="absolute -top-3 -right-3 text-4xl animate-bounce">
                    👑
                  </div>
                )}
                
                {/* Prize amount with gradient */}
                <div className={`text-5xl font-bold mb-3 ${
                  index === 0 
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent'
                }`}>
                  {prize.amount}
                </div>
                
                {/* Prize place with better typography */}
                <div className={`text-lg font-semibold mb-5 tracking-wide ${
                  index === 0 ? 'text-yellow-300' : 'text-gray-300'
                }`}>
                  {prize.place}
                </div>
                
                {/* Prize description with hover effect */}
                <p className="text-gray-400 group-hover:text-gray-200 transition-colors duration-300">
                  {prize.description}
                </p>
                
                {/* Decorative line */}
                <div className="w-12 h-0.5 bg-gradient-to-r from-pink-500 to-cyan-500 mx-auto mt-6"></div>
              </div>
            ))}
          </div>

          <div className="text-center bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <p className="text-lg mb-5">
              <strong className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Special Categories:</strong> 
              <span className="text-gray-300 ml-2">Best AI/ML Project, Most Creative Solution, Social Impact Award, Best Student Team</span>
            </p>
            <p className="text-gray-400">
              Plus internship opportunities, startup credits, and exclusive merchandise for all participants!
            </p>
          </div>
        </div>
      </section>

      {/* Enhanced Tips Section with better cards and layout */}
      <section className="max-w-6xl mx-auto px-6 py-28 relative">
        <div className="absolute -z-10 bottom-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-500/10 to-transparent rounded-full blur-3xl"></div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 tracking-tight">
          Pro Tips to <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Win</span>
        </h2>
        <p className="text-xl text-gray-300 text-center mb-20">
          Insider strategies from previous winners and industry experts
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-10 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl relative overflow-hidden group"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Enhanced icon presentation */}
              <div className="flex items-center gap-6 mb-6">
                <span className="text-5xl p-4 bg-white/5 border border-white/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">{tip.icon}</span>
                <h3 className="text-2xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-cyan-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{tip.title}</h3>
              </div>
              
              {/* Enhanced description */}
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 pl-16">{tip.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enhanced Sponsors Section */}
      <section id="sponsors" className="max-w-6xl mx-auto px-6 py-28 relative">
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-64 bg-gradient-to-r from-cyan-500/10 to-pink-500/10 blur-3xl rounded-full"></div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 tracking-tight">
          Our <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Sponsors</span>
        </h2>
        <p className="text-xl text-gray-300 text-center mb-16">
          Supported by industry leaders who believe in innovation
        </p>
        
        {/* Placeholder for sponsor logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
            <div 
              key={index} 
              className="aspect-[3/2] bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="text-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 group-hover:scale-110">
                {index % 4 === 0 ? '🚀' : index % 4 === 1 ? '💻' : index % 4 === 2 ? '⚙️' : '🔍'}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center px-8 py-10 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 inline-block mx-auto">
          <p className="text-gray-300">
            Partnership opportunities available •{' '}
            <a href="mailto:sponsors@hackathon2025.com" className="text-cyan-400 hover:text-cyan-300 transition-colors relative group">
              Contact us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">
          Ready to <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">Build the Future?</span>
        </h2>
        <p className="text-xl text-gray-400 mb-12">
          Join 500+ innovators for the most exciting hackathon of 2025. Registration closes soon!
        </p>
        <a
          href="https://your-hackathon-signup-link.com"
          className="inline-block px-10 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-semibold text-sm uppercase tracking-wide rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/30 relative overflow-hidden group"
        >
          <span className="relative z-10">Register Now - It's Free! 🚀</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
        </a>
        <p className="text-gray-500 mt-5 text-sm">
          Limited spots available • First come, first served
        </p>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-white/10 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-8">Stay Connected</h3>
          
          <div className="flex justify-center gap-6 mb-8">
            {['🐦', '💼', '💬', '📸'].map((emoji, index) => (
              <a
                key={index}
                href="#"
                className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
              >
                {emoji}
              </a>
            ))}
          </div>
          
          <p className="text-gray-400 mb-8">
            Questions? Email us at{' '}
            <a href="mailto:hello@hackathon2025.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              hello@hackathon2025.com
            </a>
            <br />
            Follow{' '}
            <a href="#" className="text-pink-400 hover:text-pink-300 transition-colors">
              @hackathon2025
            </a>{' '}
            for updates and behind-the-scenes content
          </p>
          
          <p className="text-gray-600 text-sm">
            Powered by{' '}
            <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent font-semibold">
              Hash 2K25
            </span>{' '}
            — See you at the hackathon! 🎉
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HackathonLanding;