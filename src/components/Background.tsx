'use client'

export function Background() {
  return (
    <>
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[color:var(--color-slate-950)] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      {/* Gradient blurred circles */}
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed top-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="fixed -bottom-40 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      
      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 opacity-70 -z-10"></div>
      
      {/* Animated dots */}
      <div className="fixed inset-0 -z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.3,
              animation: `pulse ${(Math.random() * 5 + 5)}s infinite alternate ${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.2);
            opacity: 0.6;
          }
        }
      `}</style>
    </>
  ) 
}