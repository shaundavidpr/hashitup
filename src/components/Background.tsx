'use client'

import { useMemo } from 'react'

// Deterministic PRNG (mulberry32)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function Background() {
  const dots = useMemo(() => {
    const rng = mulberry32(0xC0DE) // fixed seed for SSR/CSR parity
    const items = Array.from({ length: 20 }).map((_, i) => {
      // advance seed for each dot
      const r1 = rng()
      const r2 = rng()
      const r3 = rng()
      const r4 = rng()
      const r5 = rng()
      return {
        key: i,
        top: r1 * 100, // %
        left: r2 * 100, // %
        opacity: 0.3 + r3 * 0.5, // 0.3 - 0.8
        duration: 5 + r4 * 5, // 5s - 10s
        delay: r5 * 2 // 0s - 2s
      }
    })
    return items
  }, [])

  return (
    <>
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-[color:var(--color-slate-950)] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* Gradient blurred circles */}
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -z-10" />
      <div className="fixed top-1/4 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10" />
      <div className="fixed -bottom-40 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />

      {/* Subtle gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 opacity-70 -z-10" />

      {/* Animated dots (Tailwind-only animation, deterministic positions) */}
      <div className="fixed inset-0 -z-10">
        {dots.map((d) => (
          <div
            key={d.key}
            className="absolute w-1 h-1 rounded-full bg-white/30 animate-pulse [animation-direction:alternate] motion-reduce:animate-none"
            style={{
              top: `${d.top}%`,
              left: `${d.left}%`,
              opacity: d.opacity,
              animationDuration: `${d.duration}s`,
              animationDelay: `${d.delay}s`
            }}
          />
        ))}
      </div>
    </>
  )
}