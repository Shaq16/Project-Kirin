import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Waitlist() {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col overflow-hidden selection:bg-emerald-500/30">
      
      {/* Background ambient light effects */}
      <div className="absolute top-1/4 -left-[20%] w-[50%] h-[50%] bg-blue-500/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-cyan-500/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-16 w-full max-w-4xl mx-auto text-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[13px] font-medium text-white/80 mb-10 transition-colors hover:bg-white/10">
          <span>kaizen</span>
          <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
          <span>soon 2026</span>
        </div>

        {/* Hero Text */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-medium tracking-tight leading-[1.05] mb-6">
          Coming soon. Built<br />
          for the curious.
        </h1>

        <p className="text-[17px] sm:text-lg text-white/50 max-w-[400px] mx-auto leading-relaxed mb-10">
          Stay close to the launch and be among the first to see what's coming.
        </p>

        {/* Email Capture Form */}
        <form 
          onSubmit={(e) => e.preventDefault()} 
          className="relative flex items-center w-full max-w-md mx-auto p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md focus-within:border-white/30 transition-colors shadow-2xl"
        >
          <input 
            type="email" 
            placeholder="Your Email Address" 
            required
            className="flex-1 bg-transparent border-none text-white px-5 py-3 text-[15px] placeholder:text-white/30 focus:outline-none focus:ring-0"
          />
          <button 
            type="submit"
            className="bg-white text-black px-7 py-3 rounded-full text-[15px] font-medium hover:bg-white/90 transition-transform active:scale-95"
          >
            Get Notified
          </button>
        </form>

        {/* Social Links */}
        <div className="mt-14 flex items-center justify-center gap-4 text-sm text-white/40">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <span className="text-white/20">•</span>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <span className="text-white/20">•</span>
          <a href="#" className="hover:text-white transition-colors">X</a>
        </div>
        
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center pb-8 pt-4">
        <p className="text-[11px] text-white/30 tracking-wide uppercase">
          Created by Kaizen • Built for Professionals
        </p>
      </footer>
    
    </div>
  );
}
