'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Create a completely client-side component for the animated elements
const ClientSideAnimations = () => {
  // Generate random dots
  const dots = Array.from({ length: 20 }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.5 + 0.3,
    animationDuration: `${Math.random() * 5 + 5}s`,
    animationDelay: `${Math.random() * 2}s`,
  }));
  
  // Generate random code blocks
  const codeBlocks = Array.from({ length: 5 }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.3 + 0.1,
    width: `${Math.random() * 100 + 100}px`,
    animationDuration: `${Math.random() * 10 + 20}s`,
    animationDelay: `${Math.random() * 5}s`,
  }));

  return (
    <>
      {/* Animated dots */}
      <div className="fixed inset-0 -z-10">
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              top: dot.top,
              left: dot.left,
              opacity: dot.opacity,
              animation: `dashboardPulse ${dot.animationDuration} infinite alternate ${dot.animationDelay}`
            }}
          />
        ))}
      </div>
      
      {/* Create a few animated code-like elements in the background */}
      <div className="fixed inset-0 -z-10">
        {codeBlocks.map((block, i) => (
          <div
            key={i}
            className="absolute h-12 rounded-md bg-white/5 border border-white/10 backdrop-blur-3xl"
            style={{
              width: block.width,
              top: block.top,
              left: block.left,
              opacity: block.opacity,
              animation: `dashboardFloat ${block.animationDuration} infinite alternate ${block.animationDelay}`
            }}
          />
        ))}
      </div>
      
      <style jsx global>{`
        @keyframes dashboardPulse {
          0% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.2);
            opacity: 0.6;
          }
        }
        
        @keyframes dashboardFloat {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
      `}</style>
    </>
  );
};

// Import the client-side-only component with SSR disabled
const NoSSRAnimations = dynamic(() => Promise.resolve(ClientSideAnimations), {
  ssr: false,
});

export function DashboardBackground() {
  return (
    <>
      {/* Static elements that can be rendered on the server */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      {/* Gradient blurred circles - static, safe for SSR */}
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed top-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed -bottom-40 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      
      {/* Dashboard specific extra gradient - static, safe for SSR */}
      <div className="fixed top-1/2 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>
      
      {/* Subtle gradient overlay - static, safe for SSR */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-black to-black opacity-70 -z-10"></div>
      
      {/* Dynamic animations - rendered ONLY on the client */}
      <NoSSRAnimations />
    </>
  ) 
}
