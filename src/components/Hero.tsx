'use client';
 
import { LoginButton } from '@/components/LoginButton';
import { Button } from '@/components/ui/Button';
import { Code, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-30"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl animate-pulse"></div>
      
      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full backdrop-blur-md bg-slate-800/50 border border-slate-700/50 mb-6 text-sm text-slate-300">
            <span className="animate-pulse w-2 h-2 bg-cyan-500 rounded-full mr-2"></span>
            Registrations Open for 2025
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Hash 2K25 Hackathon
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Join India's premier hackathon and transform your innovative ideas into reality. 
            Collaborate, code, and create the next breakthrough solution.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <LoginButton />
            <a href="#features">
              <Button 
                variant="outline" 
                className="border-slate-600 text-white hover:border-cyan-500/50 hover:bg-slate-800/50 group"
              >
                Explore Features
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </div>
        
        <div className="backdrop-blur-md bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-blue-500 p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <Code className="h-5 w-5 text-cyan-400" />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-lg text-white">48-Hour Coding Challenge</h3>
                <p className="text-slate-300 text-sm">December 15-17, 2025</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 text-center">
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">₹5L+</div>
                <div className="text-sm text-slate-400">in prizes</div>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">100+</div>
                <div className="text-sm text-slate-400">teams</div>
              </div>
              <div>
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">20+</div>
                <div className="text-sm text-slate-400">mentors</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}