'use client';

import { LoginButton } from '@/components/LoginButton';
import { Button } from '@/components/ui/Button';

export function Hero() {
  return (
    <section className="py-16 px-4 bg-slate-800">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">
          CodeNChip Hackathon Platform
        </h1>
        <p className="text-lg text-slate-300 mb-8">
          Join the community of innovators and problem solvers
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <LoginButton />
          <a href="#features">
            <Button variant="outline">Learn More</Button>
          </a>
        </div>
      </div>
    </section>
  );
}