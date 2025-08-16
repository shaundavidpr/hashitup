'use client';

import { Award, Calendar, Clock, Users } from 'lucide-react';

export function Timeline() {
  const events = [
    {
      date: 'Nov 15 - Dec 10',
      title: 'Registration Period',
      description: 'Team registration and project idea submission',
      icon: Users, 
      gradient: 'from-pink-500 to-rose-600',
      highlightColor: 'bg-pink-500/20',
      borderColor: 'border-pink-500/30'
    },
    {
      date: 'Dec 12',
      title: 'Team Verification',
      description: 'Final team verification and hackathon guidelines',
      icon: Clock,
      gradient: 'from-cyan-500 to-blue-600',
      highlightColor: 'bg-cyan-500/20',
      borderColor: 'border-cyan-500/30'
    },
    {
      date: 'Dec 15 - 17',
      title: 'Hackathon Event',
      description: '48 hours of coding, innovation, and collaboration',
      icon: Calendar,
      gradient: 'from-blue-500 to-indigo-600',
      highlightColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30'
    },
    {
      date: 'Dec 18',
      title: 'Results & Awards',
      description: 'Winner announcement and prize distribution',
      icon: Award,
      gradient: 'from-indigo-500 to-purple-600',
      highlightColor: 'bg-indigo-500/20',
      borderColor: 'border-indigo-500/30'
    },
  ];

  return (
    <section className="py-20 px-4 bg-slate-800 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto relative">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Event Timeline</h2>
        
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-[42px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500/50 via-cyan-400/50 to-blue-500/50 transform md:-translate-x-px"></div>
          
          <div className="space-y-8">
            {events.map((event, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-4 group relative`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[38px] md:left-1/2 top-9 w-8 h-8 bg-slate-900 rounded-full border-2 border-slate-700 transform md:-translate-x-1/2 flex items-center justify-center z-10 group-hover:border-cyan-400 transition-colors duration-300">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${event.gradient}`}></div>
                </div>
                
                {/* Date box */}
                <div className={`self-start md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} pl-16 md:pl-0 md:self-center`}>
                  <div className={`inline-flex items-center gap-2 backdrop-blur-sm ${event.highlightColor} text-white px-4 py-2 rounded-lg shadow-sm border ${event.borderColor}`}>
                    <event.icon className="h-4 w-4" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                </div>
                
                {/* Content box */}
                <div className="md:w-[calc(50%-2rem)] backdrop-blur-sm bg-slate-800/40 p-5 rounded-xl border border-slate-700/50 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:border-slate-600 pl-16 md:pl-5">
                  <h3 className="font-bold mb-2 text-white text-lg">{event.title}</h3>
                  <p className="text-slate-300">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block backdrop-blur-sm bg-slate-700/30 rounded-full px-6 py-2 border border-slate-600/50">
            <span className="text-slate-300">Stay tuned for updates</span>
          </div>
        </div>
      </div>
    </section>
  );
}