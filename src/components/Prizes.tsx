"use client";

import { Award, Medal, Star, Trophy } from 'lucide-react';

export function Prizes() {
  const prizes = [
    {
      position: '1st Place',
      amount: '₹2,00,000',
      icon: Trophy,
      benefits: [
        'Cash Prize',
        'Internship Opportunities',
        'Mentorship Program', 
        'Certificate'
      ]
    },
    {
      position: '2nd Place',
      amount: '₹1,50,000',
      icon: Medal,
      benefits: [
        'Cash Prize',
        'Internship Opportunities',
        'Certificate',
        'Networking'
      ]
    },
    {
      position: '3rd Place',
      amount: '₹1,00,000',
      icon: Award,
      benefits: [
        'Cash Prize',
        'Certificate',
        'Networking',
        'Recognition'
      ]
    },
    {
      position: 'Special Mentions',
      amount: '₹50,000',
      icon: Star,
      benefits: [
        'Cash Prize',
        'Certificate',
        'Portfolio Enhancement',
        'Recognition'
      ]
    }
  ];

  return (
    <section className="py-16 px-4 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Prizes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {prizes.map((prize, index) => (
            <div key={index} className="bg-slate-800 p-4 rounded-md border border-slate-700">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                  <prize.icon className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-medium">{prize.position}</h3>
              </div>
              
              <p className="text-xl font-bold text-blue-400 mb-3">{prize.amount}</p>
              
              <ul className="text-sm">
                {prize.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-1 text-slate-300">
                    <span>✓</span> {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}