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
    <section className="py-20 px-4 bg-slate-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-pink-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">Prizes & Rewards</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {prizes.map((prize, index) => {
            // Different gradient for each card
            const gradients = [
              'from-pink-500/20 via-rose-500/10 to-pink-500/5', // 1st place
              'from-cyan-500/20 via-blue-500/10 to-cyan-500/5', // 2nd place
              'from-blue-500/20 via-indigo-500/10 to-blue-500/5', // 3rd place
              'from-purple-500/20 via-fuchsia-500/10 to-purple-500/5', // Special mentions
            ];
            
            const borderGradients = [
              'from-pink-500/40 via-rose-500/20 to-pink-500/10', // 1st place
              'from-cyan-500/40 via-blue-500/20 to-cyan-500/10', // 2nd place
              'from-blue-500/40 via-indigo-500/20 to-blue-500/10', // 3rd place
              'from-purple-500/40 via-fuchsia-500/20 to-purple-500/10', // Special mentions
            ];
            
            const iconGradients = [
              'from-pink-500 to-rose-600', // 1st place
              'from-cyan-500 to-blue-600', // 2nd place
              'from-blue-500 to-indigo-600', // 3rd place
              'from-purple-500 to-fuchsia-600', // Special mentions
            ];
            
            const amountColors = [
              'text-pink-400', // 1st place
              'text-cyan-400', // 2nd place
              'text-blue-400', // 3rd place
              'text-purple-400', // Special mentions
            ];
            
            return (
              <div 
                key={index} 
                className={`backdrop-blur-sm bg-gradient-to-br ${gradients[index]} p-6 rounded-xl border border-slate-700/50 shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-2px] group relative overflow-hidden`}
              >
                {/* Animated border on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${borderGradients[index]} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl`} style={{ margin: '-1px' }}></div>
                
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${iconGradients[index]} flex items-center justify-center mr-3 shadow-lg`}>
                      <prize.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{prize.position}</h3>
                  </div>
                  
                  <p className={`text-2xl font-extrabold ${amountColors[index]} mb-4 flex items-baseline`}>
                    {prize.amount} 
                    <span className="text-xs font-medium text-slate-400 ml-2">Cash Prize</span>
                  </p>
                  
                  <ul className="space-y-2">
                    {prize.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-300 transition-colors duration-200 group-hover:text-white">
                        <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${iconGradients[index]}`}></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-slate-400 max-w-2xl mx-auto">
            Additional rewards include networking opportunities, exclusive workshops, and recognition from industry leaders. All participants will receive certificates of participation.
          </p>
        </div>
      </div>
    </section>
  );
}