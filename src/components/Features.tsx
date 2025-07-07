"use client";

import { Code, Globe, Shield, Trophy, Users, Zap } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Form teams of 2-4 members and collaborate on innovative projects.'
    },
    {
      icon: Code,
      title: 'Multiple Tracks',
      description: 'Choose from different themes including AI/ML, Web Dev, Blockchain, and more.'
    },
    {
      icon: Trophy,
      title: 'Exciting Prizes',
      description: 'Win cash prizes, internship opportunities, mentorship, and industry recognition.'
    },
    {
      icon: Globe,
      title: 'National Platform',
      description: 'Join India\'s prestigious hackathon with top talent nationwide.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data and submissions are protected with security and privacy measures.'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Get notifications about submission status and important event updates.'
    },
  ];

  return (
    <section className="py-16 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-slate-800 p-5 rounded-md border border-slate-700"
            >
              <div className="mb-4 flex items-center">
                <div className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center mr-3">
                  <feature.icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-medium">{feature.title}</h3>
              </div>
              
              <p className="text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}