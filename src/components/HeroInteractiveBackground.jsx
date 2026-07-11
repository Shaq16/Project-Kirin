import React from 'react';
import { Mail } from "lucide-react";

export default function NeuralNodeLayout() {
  return (
    <div className="relative w-full h-[120px] flex items-center justify-center my-6 z-0">
      
      {/* Massive Horizontal Web centered on the Node */}
      <svg 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[800px] min-w-[1200px] pointer-events-none -z-10" 
        viewBox="0 0 1200 800" 
        preserveAspectRatio="none"
      >
         <defs>
            <linearGradient id="lineGradLeftHoriz" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="lineGradRightHoriz" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="lineGradVert" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="1" />
              <stop offset="40%" stopColor="#C084FC" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="lineGradVertStatic" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#C084FC" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FB923C" stopOpacity="0.6" />
            </linearGradient>

            <style>
              {`
                .anim-line-horiz {
                  stroke-dasharray: 1000;
                  stroke-dashoffset: 1000;
                  animation: flow-horiz 5s ease-in-out infinite;
                }
                .anim-line-vert {
                  stroke-dasharray: 400;
                  stroke-dashoffset: 400;
                  animation: flow-vert 3s ease-in-out infinite;
                }
                .anim-line-delay-1 { animation-delay: 0.2s; }
                .anim-line-delay-2 { animation-delay: 1.1s; }
                .anim-line-delay-3 { animation-delay: 2.4s; }
                .anim-line-delay-4 { animation-delay: 3.1s; }
                .anim-line-delay-5 { animation-delay: 3.8s; }
                .anim-line-delay-6 { animation-delay: 0.9s; }
                .anim-line-delay-7 { animation-delay: 1.7s; }
                .anim-line-delay-8 { animation-delay: 4.5s; }
                
                @keyframes flow-horiz {
                  0% { stroke-dashoffset: 1000; opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { stroke-dashoffset: -1000; opacity: 0; }
                }
                @keyframes flow-vert {
                  0% { stroke-dashoffset: 400; opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { stroke-dashoffset: -400; opacity: 0; }
                }
              `}
            </style>
          </defs>

          {/* Faint static horizontal tracks covering the entire vertical block */}
          <g stroke="rgba(255,255,255,0.04)" strokeWidth="1" fill="none">
            {/* Left side */}
            <path d="M 0 50 C 300 50, 400 400, 600 400" />
            <path d="M 0 150 C 250 150, 400 400, 600 400" />
            <path d="M 0 250 C 300 250, 450 400, 600 400" />
            <path d="M 0 350 C 350 350, 450 400, 600 400" />
            <path d="M 0 450 C 350 450, 450 400, 600 400" />
            <path d="M 0 550 C 300 550, 450 400, 600 400" />
            <path d="M 0 650 C 250 650, 400 400, 600 400" />
            <path d="M 0 750 C 300 750, 400 400, 600 400" />

            {/* Right side */}
            <path d="M 1200 50 C 900 50, 800 400, 600 400" />
            <path d="M 1200 150 C 950 150, 800 400, 600 400" />
            <path d="M 1200 250 C 900 250, 750 400, 600 400" />
            <path d="M 1200 350 C 850 350, 750 400, 600 400" />
            <path d="M 1200 450 C 850 450, 750 400, 600 400" />
            <path d="M 1200 550 C 900 550, 750 400, 600 400" />
            <path d="M 1200 650 C 950 650, 800 400, 600 400" />
            <path d="M 1200 750 C 900 750, 800 400, 600 400" />
          </g>
          
          {/* Static multispectral vertical neural link */}
          <g stroke="url(#lineGradVertStatic)" strokeWidth="1.5" fill="none">
            <path d="M 600 400 L 600 800" />
          </g>

          {/* Animated glowing pulses left (inward to center) */}
          <g stroke="url(#lineGradLeftHoriz)" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M 0 50 C 300 50, 400 400, 600 400" className="anim-line-horiz anim-line-delay-1" />
            <path d="M 0 150 C 250 150, 400 400, 600 400" className="anim-line-horiz anim-line-delay-3" />
            <path d="M 0 250 C 300 250, 450 400, 600 400" className="anim-line-horiz anim-line-delay-5" />
            <path d="M 0 350 C 350 350, 450 400, 600 400" className="anim-line-horiz anim-line-delay-7" />
            <path d="M 0 450 C 350 450, 450 400, 600 400" className="anim-line-horiz anim-line-delay-2" />
            <path d="M 0 550 C 300 550, 450 400, 600 400" className="anim-line-horiz anim-line-delay-6" />
            <path d="M 0 650 C 250 650, 400 400, 600 400" className="anim-line-horiz anim-line-delay-4" />
            <path d="M 0 750 C 300 750, 400 400, 600 400" className="anim-line-horiz anim-line-delay-8" />
          </g>

          {/* Animated glowing pulses right (inward to center) */}
          <g stroke="url(#lineGradRightHoriz)" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M 1200 50 C 900 50, 800 400, 600 400" className="anim-line-horiz anim-line-delay-3" />
            <path d="M 1200 150 C 950 150, 800 400, 600 400" className="anim-line-horiz anim-line-delay-1" />
            <path d="M 1200 250 C 900 250, 750 400, 600 400" className="anim-line-horiz anim-line-delay-4" />
            <path d="M 1200 350 C 850 350, 750 400, 600 400" className="anim-line-horiz anim-line-delay-8" />
            <path d="M 1200 450 C 850 450, 750 400, 600 400" className="anim-line-horiz anim-line-delay-2" />
            <path d="M 1200 550 C 900 550, 750 400, 600 400" className="anim-line-horiz anim-line-delay-7" />
            <path d="M 1200 650 C 950 650, 800 400, 600 400" className="anim-line-horiz anim-line-delay-5" />
            <path d="M 1200 750 C 900 750, 800 400, 600 400" className="anim-line-horiz anim-line-delay-6" />
          </g>

          {/* Animated glowing pulse down (outward from center) */}
          <g stroke="url(#lineGradVert)" strokeWidth="3" fill="none" strokeLinecap="round">
            <path d="M 600 400 L 600 800" className="anim-line-vert" />
          </g>
      </svg>

      {/* The Central Node: Glowing Email Icon */}
      <div className="relative z-10 w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
         <Mail className="h-6 w-6 text-white animate-pulse" />
      </div>

    </div>
  );
}
