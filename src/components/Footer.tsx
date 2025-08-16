"use client";

import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-md border-t border-slate-800/50 py-12 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <h3 className="text-2xl font-bold mb-5 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">CodeNChip</h3>
            <p className="text-slate-400 mb-6 max-w-sm">
              India's premier hackathon fostering innovation and technological excellence among the brightest minds in the country.
            </p> 
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 group">
                <Twitter className="h-5 w-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-200" />
              </a>
              <a href="#" className="p-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 group">
                <Github className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors duration-200" />
              </a>
              <a href="#" className="p-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 group">
                <Linkedin className="h-5 w-5 text-slate-400 group-hover:text-blue-400 transition-colors duration-200" />
              </a>
              <a href="#" className="p-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 group">
                <Instagram className="h-5 w-5 text-slate-400 group-hover:text-pink-400 transition-colors duration-200" />
              </a>
              <a href="#" className="p-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-200 group">
                <Mail className="h-5 w-5 text-slate-400 group-hover:text-green-400 transition-colors duration-200" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-5 text-white flex items-center">
              <span className="w-1.5 h-6 bg-gradient-to-b from-pink-500 to-blue-500 rounded-full mr-2 inline-block"></span>
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100"></span>
                About
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100"></span>
                Rules
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100"></span>
                Themes
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100"></span>
                Prizes
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100"></span>
                FAQ
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center">
                <span className="w-1 h-1 bg-cyan-500 rounded-full mr-2 opacity-0 group-hover:opacity-100"></span>
                Contact
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-5 text-white flex items-center">
              <span className="w-1.5 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full mr-2 inline-block"></span>
              Contact
            </h4>
            <div className="space-y-4 text-slate-400">
              <p className="flex items-start">
                <Mail className="h-5 w-5 text-cyan-500 mr-3 flex-shrink-0" />
                <span>support@codenchip.in</span>
              </p>
              <p className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+91 9876543210</span>
              </p>
              <p className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>New Delhi, India</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800/50 text-center text-slate-500 flex flex-col md:flex-row justify-between items-center">
          <p>© 2025 CodeNChip Hackathon. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm">
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors duration-200">Terms of Service</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors duration-200">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}