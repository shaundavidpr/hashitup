'use client';

import { Award, Calendar, Clock, Users } from 'lucide-react';

export function Timeline() {
  const events = [
    {
      date: 'Nov 15 - Dec 10',
      title: 'Registration Period',
      description: 'Team registration and project idea submission',
      icon: Users,
    },
    {
      date: 'Dec 12',
      title: 'Team Verification',
      description: 'Final team verification and hackathon guidelines',
      icon: Clock,
    },
    {
      date: 'Dec 15 - 17',
      title: 'Hackathon Event',
      description: '48 hours of coding, innovation, and collaboration',
      icon: Calendar,
    },
    {
      date: 'Dec 18',
      title: 'Results & Awards',
      description: 'Winner announcement and prize distribution',
      icon: Award,
    },
  ];

  return (
    <section className="py-12 px-4 bg-slate-800">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Event Timeline</h2>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-3">
              <div className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-md w-40">
                <event.icon className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex-1 bg-slate-700 p-3 rounded-md">
                <h3 className="font-medium mb-1">{event.title}</h3>
                <p className="text-sm text-slate-400">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}