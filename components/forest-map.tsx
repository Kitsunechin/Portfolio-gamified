"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  position: number; // 0-100 percentage along path
}

interface ForestMapProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export default function ForestMap({ projects, onProjectClick }: ForestMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [foxPosition, setFoxPosition] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll into fox position
  const foxX = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const unsubscribe = foxX.on("change", (latest) => {
      setFoxPosition(latest);
    });
    return () => unsubscribe();
  }, [foxX]);

  return (
    <div ref={containerRef} className="relative min-h-[400vh] bg-[#0a0a12]">
      {/* Dark forest background layers */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Sky gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] via-[#1a1a2e] to-[#0a0a12]" />

        {/* Stars */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-200/60 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Far trees silhouette */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[40%]"
          style={{ x: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        >
          <svg viewBox="0 0 1200 400" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,400 L0,200 Q100,180 150,160 Q180,140 200,160 Q250,140 280,180 Q320,160 350,200 Q400,180 450,160 Q500,140 550,180 Q600,160 650,200 Q700,180 750,160 Q800,140 850,180 Q900,160 950,200 Q1000,180 1050,160 Q1100,140 1150,180 L1200,200 L1200,400 Z"
              fill="url(#tree-gradient-far)"
              opacity="0.3"
            />
            <defs>
              <linearGradient id="tree-gradient-far" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a1a2e" />
                <stop offset="100%" stopColor="#0f0f1a" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Mid trees silhouette */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[60%]"
          style={{ x: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
        >
          <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,600 L0,300 Q80,260 120,240 Q140,200 160,240 Q200,220 240,280 Q280,240 320,300 Q360,260 400,240 Q440,200 480,280 Q520,240 560,300 Q600,260 640,240 Q680,200 720,280 Q760,240 800,300 Q840,260 880,240 Q920,200 960,280 Q1000,240 1040,300 Q1080,260 1120,240 L1200,300 L1200,600 Z"
              fill="url(#tree-gradient-mid)"
              opacity="0.5"
            />
            <defs>
              <linearGradient id="tree-gradient-mid" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2a2a3e" />
                <stop offset="100%" stopColor="#1a1a2e" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Foreground trees */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[80%]"
          style={{ x: useTransform(scrollYProgress, [0, 1], [0, -400]) }}
        >
          <svg viewBox="0 0 1200 800" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,800 L0,400 Q60,340 100,300 Q120,240 140,300 Q180,260 220,360 Q260,300 300,400 Q340,340 380,300 Q420,240 460,360 Q500,300 540,400 Q580,340 620,300 Q660,240 700,360 Q740,300 780,400 Q820,340 860,300 Q900,240 940,360 Q980,300 1020,400 Q1060,340 1100,300 L1200,400 L1200,800 Z"
              fill="url(#tree-gradient-front)"
            />
            <defs>
              <linearGradient id="tree-gradient-front" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1f1f2e" />
                <stop offset="100%" stopColor="#0f0f1a" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Ground path */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1528] to-transparent">
          <motion.div
            className="absolute bottom-8 h-2 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
            style={{
              left: "10%",
              right: "10%",
            }}
          />
        </div>

        {/* Fox character */}
        <motion.div
          className="absolute bottom-24 z-20"
          style={{
            left: useTransform(foxX, [0, 100], ["5%", "85%"]),
          }}
        >
          <FoxSprite />
        </motion.div>

        {/* Project markers along path */}
        {projects.map((project, index) => {
          const isNear = Math.abs(foxPosition - project.position) < 15;
          return (
            <motion.div
              key={project.title}
              className="absolute bottom-32 cursor-pointer"
              style={{
                left: `${project.position}%`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <motion.div
                className="relative"
                animate={{
                  scale: isNear ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 1, repeat: Infinity }}
                onClick={() => onProjectClick(project)}
              >
                {/* Glowing orb */}
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full bg-cyan-400/40 blur-xl animate-pulse" />
                  <div className="absolute inset-2 rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 animate-pulse" />
                  <div className="absolute inset-3 rounded-full bg-white/80" />
                </div>

                {/* Project hint on hover */}
                {isNear && (
                  <motion.div
                    className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-48 p-3 bg-[#1a1a2e]/95 border border-cyan-500/30 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="text-xs text-cyan-100 font-semibold mb-1">{project.title}</p>
                    <p className="text-xs text-cyan-300/70 line-clamp-2">{project.description}</p>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#1a1a2e] border-r border-b border-cyan-500/30 rotate-45" />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 1 }}
          animate={{ opacity: foxPosition > 10 ? 0 : 1 }}
        >
          <p className="text-cyan-300/60 text-xs tracking-widest uppercase font-medium">
            Scroll to explore
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg className="w-6 h-6 text-cyan-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function FoxSprite() {
  const [isWalking, setIsWalking] = useState(true);

  return (
    <motion.div
      className="relative w-24 h-24"
      animate={{
        y: isWalking ? [0, -2, 0] : 0,
      }}
      transition={{
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Fox silhouette - simplified cute anime style */}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
        {/* Body */}
        <ellipse cx="50" cy="70" rx="22" ry="18" fill="#ff8c42" />

        {/* Head */}
        <circle cx="50" cy="45" r="20" fill="#ff8c42" />

        {/* Ears */}
        <path d="M 35 35 L 30 15 L 40 30 Z" fill="#ff8c42" />
        <path d="M 65 35 L 70 15 L 60 30 Z" fill="#ff8c42" />
        <path d="M 35 25 L 33 18 L 38 28 Z" fill="#1a1a2e" />
        <path d="M 65 25 L 67 18 L 62 28 Z" fill="#1a1a2e" />

        {/* Face markings */}
        <ellipse cx="45" cy="50" rx="3" ry="2" fill="#fff" />
        <ellipse cx="55" cy="50" rx="3" ry="2" fill="#fff" />

        {/* Eyes */}
        <circle cx="45" cy="50" r="2" fill="#1a1a2e" />
        <circle cx="55" cy="50" r="2" fill="#1a1a2e" />
        <circle cx="46" cy="49" r="1" fill="#22d3ee" className="animate-pulse" />
        <circle cx="56" cy="49" r="1" fill="#22d3ee" className="animate-pulse" />

        {/* Nose */}
        <circle cx="50" cy="55" r="2" fill="#1a1a2e" />

        {/* Tail */}
        <motion.path
          d="M 72 75 Q 85 65 88 50 Q 87 55 82 58 Q 78 63 72 68 Z"
          fill="#ff8c42"
          animate={{
            d: [
              "M 72 75 Q 85 65 88 50 Q 87 55 82 58 Q 78 63 72 68 Z",
              "M 72 75 Q 88 68 92 55 Q 90 60 85 63 Q 80 68 72 72 Z",
              "M 72 75 Q 85 65 88 50 Q 87 55 82 58 Q 78 63 72 68 Z",
            ],
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 75 70 Q 83 63 85 52"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          opacity="0.6"
          animate={{
            d: [
              "M 75 70 Q 83 63 85 52",
              "M 75 72 Q 85 66 88 56",
              "M 75 70 Q 83 63 85 52",
            ],
          }}
          transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Legs */}
        <rect x="42" y="82" width="4" height="12" rx="2" fill="#ff8c42" />
        <rect x="54" y="82" width="4" height="12" rx="2" fill="#ff8c42" />

        {/* Paws */}
        <ellipse cx="44" cy="94" rx="3" ry="2" fill="#1a1a2e" />
        <ellipse cx="56" cy="94" rx="3" ry="2" fill="#1a1a2e" />
      </svg>

      {/* Glow effect */}
      <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl -z-10" />
    </motion.div>
  );
}
