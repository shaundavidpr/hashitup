"use client";

import { Code, Globe, Shield, Trophy, Users, Zap } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Form teams of 2-4 members and collaborate on innovative projects.',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: Code,
      title: 'Multiple Tracks',
      description: 'Choose from different themes including AI/ML, Web Dev, Blockchain, and more.',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: Trophy,
      title: 'Exciting Prizes',
      description: 'Win cash prizes, internship opportunities, mentorship, and industry recognition.',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Globe,
      title: 'National Platform',
      description: 'Join India\'s prestigious hackathon with top talent nationwide.',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data and submissions are protected with security and privacy measures.',
      gradient: 'from-purple-500 to-fuchsia-600'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Get notifications about submission status and important event updates.',
      gradient: 'from-fuchsia-500 to-pink-600'
    },
  ];

  return (
    <section className="py-20 px-4 bg-slate-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="backdrop-blur-sm bg-slate-800/30 p-6 rounded-xl border border-slate-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px] group"
            >
              <div className="mb-5 flex items-center">
                {/* Gradient icon container with subtle animation */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center mr-3 group-hover:opacity-0 transition-opacity duration-300">
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className={`w-12 h-12 rounded-xl absolute inset-0 bg-gradient-to-br ${feature.gradient} flex items-center justify-center mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              </div>
              
              <p className="text-slate-300 pl-3 border-l-2 border-slate-700 group-hover:border-cyan-500 transition-colors duration-300"> 
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Ready to showcase your skills?</h3>
              <p className="text-slate-300">Join the hackathon and transform your ideas into reality!</p>
            </div>
            <button className="bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 hover:from-pink-600 hover:via-cyan-500 hover:to-blue-600 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-cyan-500/25">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}