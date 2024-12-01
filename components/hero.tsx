// components/Hero.tsx
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// Constants for animations
const WAVE_RINGS = [1, 2, 3].map(i => ({
  id: i,
  size: `${i * 24}px`,
  delay: `${(i - 1) * 0.5}s`
}));

const PARTICLES = [
  { id: 1, left: '20%', top: '30%' },
  { id: 2, left: '60%', top: '40%' },
  { id: 3, left: '40%', top: '60%' },
  { id: 4, left: '80%', top: '20%' },
  { id: 5, left: '30%', top: '70%' },
  { id: 6, left: '70%', top: '25%' }
];

// Satellite Component
const Satellite = () => (
  <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2">
    <div className="relative w-24 h-16 animate-orbit">
      {/* Satellite Body */}
      <div className="absolute w-16 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg transform -skew-x-12 
                    shadow-[0_0_20px_rgba(124,58,237,0.5)]">
        {/* Solar Panels */}
        <div className="absolute -left-6 top-2 w-8 h-4 bg-gradient-to-r from-blue-300 to-blue-400 rounded-sm animate-pulse">
          <div className="h-full border-r border-blue-500/30" />
        </div>
        <div className="absolute -right-6 top-2 w-8 h-4 bg-gradient-to-r from-blue-400 to-blue-300 rounded-sm animate-pulse">
          <div className="h-full border-r border-blue-500/30" />
        </div>
        {/* Antenna */}
        <div className="absolute -top-2 right-4 w-1.5 h-6 bg-gradient-to-t from-gray-300 to-white transform -rotate-45">
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
        </div>
        {/* Details */}
        <div className="absolute top-2 left-2 w-2 h-2 bg-blue-200 rounded-full animate-pulse" />
      </div>
      
      {/* Signal Waves */}
      {WAVE_RINGS.map(ring => (
        <div
          key={ring.id}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 border-2 border-blue-400/40 rounded-full animate-ping-slow"
          style={{
            width: ring.size,
            height: ring.size,
            animationDelay: ring.delay
          }}
        />
      ))}
    </div>
  </div>
);

// Search Animation Component
const SearchAnimation = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="relative w-32 h-32">
      {/* Magnifying Glass Handle */}
      <div className="absolute bottom-1 right-1 w-10 h-32 bg-gradient-to-b from-purple-400 to-blue-400 
                    rounded-full transform rotate-45 origin-top-left animate-pulse" />
      
      {/* Magnifying Glass Circle */}
      <div className="absolute top-0 left-0 w-28 h-28 rounded-full border-4 border-transparent 
                    bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 animate-pulse">
        <div className="absolute inset-1 rounded-full bg-purple-900/10 backdrop-blur-sm">
          {/* Glare Effect */}
          <div className="absolute top-4 left-4 w-4 h-4 bg-white rounded-full opacity-50" />
          {/* Lens Detail */}
          <div className="absolute inset-4 rounded-full border border-white/20" />
        </div>
      </div>
      
      {/* Scanning Animation */}
      <div className="absolute top-0 left-0 w-28 h-28 rounded-full overflow-hidden">
        <div className="w-full h-2 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-scan" />
      </div>
      
      {/* Particles */}
      {PARTICLES.map((particle, index) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full animate-float-particle"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: `${index * 0.3}s`,
            background: 'linear-gradient(to right, rgb(129, 140, 248), rgb(96, 165, 250))',
            boxShadow: '0 0 10px rgba(124, 58, 237, 0.5)'
          }}
        />
      ))}
    </div>
  </div>
);

// Main Hero Component
export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/30 rounded-full filter blur-[80px] animate-float-slow" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full filter blur-[60px] animate-float-slow-reverse" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-7xl font-bold leading-tight mb-8">
              <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text pb-2">
                GNSS Catalog
              </span>
              <span className="block text-5xl bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300 text-transparent bg-clip-text mt-4">
                Search Application
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Advanced geospatial data search platform with precise coordinate mapping 
              and regional analysis capabilities.
            </p>
            <div className="flex gap-6">
              <Link
                href="/point-search"
                className="group relative px-8 py-4 text-white text-lg rounded-xl overflow-hidden
                         shadow-[0_0_20px_rgba(124,58,237,0.5)] transition-all duration-300
                         hover:shadow-[0_0_30px_rgba(124,58,237,0.8)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600
                              group-hover:from-purple-500 group-hover:via-indigo-500 group-hover:to-blue-500
                              transition-all duration-300" />
                <span className="relative">Start Searching</span>
              </Link>
              <Link
                href="/about"
                className="group relative px-8 py-4 text-lg rounded-xl overflow-hidden
                         border border-purple-400/30 hover:border-purple-400/50
                         transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-indigo-900/50
                              group-hover:from-purple-800/50 group-hover:to-indigo-800/50
                              transition-all duration-300" />
                <span className="relative text-purple-300 group-hover:text-purple-200">Learn More</span>
              </Link>
            </div>
          </div>

          {/* Map Illustration */}
          <div className={`relative transition-all duration-1000 delay-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative w-full aspect-square max-h-[600px] rounded-3xl overflow-hidden
                          border border-purple-400/20 backdrop-blur-sm bg-purple-900/10">
              {/* Map Background */}
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
              
              {/* Add Components */}
              {isVisible && (
                <>
                  <Satellite />
                  <SearchAnimation />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-24 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />
      </div>
    </div>
  );
}