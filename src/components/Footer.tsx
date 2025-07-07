"use client";

import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">CodeNChip</h3>
            <p className="text-slate-400 mb-4">
              India's premier hackathon fostering innovation and technological excellence.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 bg-slate-700 rounded-md hover:bg-slate-600">
                <Twitter className="h-4 w-4 text-slate-300" />
              </a>
              <a href="#" className="p-2 bg-slate-700 rounded-md hover:bg-slate-600">
                <Github className="h-4 w-4 text-slate-300" />
              </a>
              <a href="#" className="p-2 bg-slate-700 rounded-md hover:bg-slate-600">
                <Linkedin className="h-4 w-4 text-slate-300" />
              </a>
              <a href="#" className="p-2 bg-slate-700 rounded-md hover:bg-slate-600">
                <Instagram className="h-4 w-4 text-slate-300" />
              </a>
              <a href="#" className="p-2 bg-slate-700 rounded-md hover:bg-slate-600">
                <Mail className="h-4 w-4 text-slate-300" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              <a href="#" className="text-slate-400 hover:text-white">About</a>
              <a href="#" className="text-slate-400 hover:text-white">Rules</a>
              <a href="#" className="text-slate-400 hover:text-white">Themes</a>
              <a href="#" className="text-slate-400 hover:text-white">Prizes</a>
              <a href="#" className="text-slate-400 hover:text-white">FAQ</a>
              <a href="#" className="text-slate-400 hover:text-white">Contact</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-3">Contact</h4>
            <div className="space-y-2 text-slate-400">
              <p>support@codenchip.in</p>
              <p>+91 9876543210</p>
              <p>New Delhi, India</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-6 pt-6 text-center text-slate-500">
          <p>© 2025 CodeNChip Hackathon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}