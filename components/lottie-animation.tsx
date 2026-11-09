"use client";

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface LottieAnimationProps {
  animationData: any;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
}

export default function LottieAnimation({
  animationData,
  className,
  loop = true,
  autoplay = true,
  style
}: LottieAnimationProps) {
  const [isClient, setIsClient] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div
        className={className}
        style={style}
      />
    );
  }

  return (
    <div
      className={`${className} relative rounded-[2.5rem] md:rounded-[3rem] shadow-2xl transition-all duration-500 bg-[#1a1a1a] p-[3px] md:p-1`}
      style={{
        ...style,
        boxShadow: isDarkMode ? `
          0 0 0 1px rgba(255,255,255,0.08),
          0 25px 60px -12px rgba(0,0,0,0.5),
          0 0 60px 10px hsl(168 45% 50% / 0.15)
        ` : `
          0 0 0 1px rgba(255,255,255,0.08),
          0 25px 60px -12px rgba(0,0,0,0.5),
          0 0 60px 10px hsl(45 100% 60% / 0.15)
        `
      }}
    >
      {/* Theme toggle button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="absolute -top-3 -right-3 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
      </button>

      {/* Phone screen */}
      <div className={`relative w-full h-full rounded-[2.25rem] md:rounded-[2.75rem] overflow-hidden transition-colors duration-500 ${
        isDarkMode ? 'bg-[#111]' : 'bg-white'
      }`}>

      {/* Wireframe animation mockup */}
      <svg
        viewBox="0 0 270 585"
        className="w-full h-full relative z-10"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <style>
            {`
              .wireframe-element {
                stroke: ${isDarkMode ? '#ffffff' : '#000000'};
                stroke-width: 2;
                fill: none;
                opacity: ${isDarkMode ? '0.6' : '0.8'};
                transition: all 0.5s ease;
              }
              .wireframe-fill {
                fill: ${isDarkMode ? '#ffffff' : '#000000'};
                opacity: ${isDarkMode ? '0.1' : '0.15'};
                transition: all 0.5s ease;
              }
              .animate-draw {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: draw 3s ease-in-out infinite;
              }
              @keyframes draw {
                0% { stroke-dashoffset: 1000; opacity: ${isDarkMode ? '0.2' : '0.3'}; }
                50% { stroke-dashoffset: 0; opacity: ${isDarkMode ? '0.8' : '1'}; }
                100% { stroke-dashoffset: -1000; opacity: ${isDarkMode ? '0.2' : '0.3'}; }
              }
              .fade-in-out {
                animation: fadeInOut 2s ease-in-out infinite alternate;
              }
              @keyframes fadeInOut {
                0% { opacity: ${isDarkMode ? '0.2' : '0.3'}; }
                100% { opacity: ${isDarkMode ? '0.7' : '0.9'}; }
              }
            `}
          </style>
        </defs>

        {/* Screen content area */}
        <rect
          x="5"
          y="5"
          width="260"
          height="575"
          rx="15"
          className="wireframe-fill"
          style={{ opacity: 0.05 }}
        />

        {/* Header */}
        <rect
          x="20"
          y="30"
          width="230"
          height="50"
          rx="8"
          className="wireframe-element fade-in-out"
          style={{ animationDelay: '0.5s' }}
        />

        {/* Navigation bars */}
        <rect
          x="20"
          y="100"
          width="60"
          height="6"
          className="wireframe-element fade-in-out"
          style={{ animationDelay: '1s' }}
        />
        <rect
          x="105"
          y="100"
          width="60"
          height="6"
          className="wireframe-element fade-in-out"
          style={{ animationDelay: '1.2s' }}
        />
        <rect
          x="190"
          y="100"
          width="60"
          height="6"
          className="wireframe-element fade-in-out"
          style={{ animationDelay: '1.4s' }}
        />

        {/* Content cards */}
        <rect
          x="20"
          y="130"
          width="230"
          height="100"
          rx="12"
          className="wireframe-element animate-draw"
          style={{ animationDelay: '2s' }}
        />
        <rect
          x="20"
          y="250"
          width="230"
          height="100"
          rx="12"
          className="wireframe-element animate-draw"
          style={{ animationDelay: '2.5s' }}
        />
        <rect
          x="20"
          y="370"
          width="230"
          height="100"
          rx="12"
          className="wireframe-element animate-draw"
          style={{ animationDelay: '3s' }}
        />
        <rect
          x="20"
          y="490"
          width="230"
          height="80"
          rx="12"
          className="wireframe-element animate-draw"
          style={{ animationDelay: '3.5s' }}
        />

        {/* Floating dots */}
        <circle
          cx="35"
          cy="150"
          r="4"
          className="wireframe-fill fade-in-out"
          style={{ animationDelay: '1.5s' }}
        />
        <circle
          cx="235"
          cy="270"
          r="4"
          className="wireframe-fill fade-in-out"
          style={{ animationDelay: '2.2s' }}
        />
        <circle
          cx="135"
          cy="390"
          r="4"
          className="wireframe-fill fade-in-out"
          style={{ animationDelay: '3.2s' }}
        />
        <circle
          cx="185"
          cy="510"
          r="4"
          className="wireframe-fill fade-in-out"
          style={{ animationDelay: '3.7s' }}
        />

        {/* Lines representing text */}
        <rect
          x="50"
          y="170"
          width="120"
          height="3"
          className="wireframe-fill fade-in-out"
          style={{ animationDelay: '2.8s' }}
        />
        <rect
          x="50"
          y="185"
          width="90"
          height="3"
          className="wireframe-fill fade-in-out"
          style={{ animationDelay: '2.9s' }}
        />
        <rect
          x="50"
          y="200"
          width="140"
          height="3"
          className="wireframe-fill fade-in-out"
          style={{ animationDelay: '3.0s' }}
        />

        <rect
          x="50"
          y="290"
          width="110"
          height="3"
          className="wireframe-fill fade-in-out"
          style={{ animationDelay: '3.5s' }}
        />
        <rect
          x="50"
          y="305"
          width="85"
          height="3"
          className="wireframe-fill fade-in-out"
          style={{ animationDelay: '3.6s' }}
        />
        <rect
          x="50"
          y="320"
          width="130"
          height="3"
          className="wireframe-fill fade-in-out"
          style={{ animationDelay: '3.7s' }}
        />

        <rect
          x="50"
          y="410"
          width="125"
          height="3"
          className="wireframe-fill fade-in-out"
          style={{ animationDelay: '4s' }}
        />
        <rect
          x="50"
          y="425"
          width="95"
          height="3"
          className="wireframe-fill fade-in-out"
          style={{ animationDelay: '4.1s' }}
        />
        <rect
          x="50"
          y="440"
          width="115"
          height="3"
          className="wireframe-fill fade-in-out"
          style={{ animationDelay: '4.2s' }}
        />

        <rect
          x="50"
          y="530"
          width="100"
          height="3"
          className="wireframe-fill fade-in-out"
          style={{ animationDelay: '4.5s' }}
        />
        <rect
          x="50"
          y="545"
          width="80"
          height="3"
          className="wireframe-fill fade-in-out"
          style={{ animationDelay: '4.6s' }}
        />
      </svg>

      {/* Inner phone screen shadow */}
      <div className="absolute inset-0 rounded-[2.25rem] md:rounded-[2.75rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] pointer-events-none z-10" />
      </div>
    </div>
  );
}