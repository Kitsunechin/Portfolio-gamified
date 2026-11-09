"use client";

import * as React from "react";
import { motion } from "framer-motion";
import TwinklingStars from "@/components/twinkling-stars";

type Point = [number, number];

function jaggedPath(points: Point[], width: number, height: number) {
  const scaled = points.map(([x, y]) => [x * width, height - y * height]);
  let d = `M0,${height} L${scaled[0][0]},${scaled[0][1]}`;
  for (let i = 1; i < scaled.length; i++) {
    d += ` L${scaled[i][0]},${scaled[i][1]}`;
  }
  d += ` L${width},${height} Z`;
  return d;
}

function smoothPath(points: Point[], width: number, height: number) {
  const scaled = points.map(([x, y]) => [x * width, height - y * height]);
  let d = `M0,${scaled[0][1]}`;
  for (let i = 0; i < scaled.length - 1; i++) {
    const [x1, y1] = scaled[i];
    const [x2, y2] = scaled[i + 1];
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    d += ` Q${x1},${y1} ${mx},${my}`;
  }
  const last = scaled[scaled.length - 1];
  d += ` L${last[0]},${last[1]} L${width},${height} L0,${height} Z`;
  return d;
}

const WIDTH = 1440;
const HEIGHT = 520;

const BACK_PEAKS: Point[] = [
  [0, 0.42], [0.08, 0.58], [0.16, 0.34], [0.24, 0.6], [0.33, 0.3],
  [0.42, 0.56], [0.5, 0.32], [0.58, 0.58], [0.67, 0.34], [0.75, 0.6],
  [0.84, 0.3], [0.92, 0.56], [1, 0.4],
];

const MID_PEAKS: Point[] = [
  [0, 0.28], [0.1, 0.46], [0.2, 0.22], [0.3, 0.48], [0.4, 0.2],
  [0.5, 0.44], [0.6, 0.24], [0.7, 0.48], [0.8, 0.22], [0.9, 0.42], [1, 0.26],
];

const FRONT_PEAKS: Point[] = [
  [0, 0.18], [0.12, 0.32], [0.22, 0.12], [0.34, 0.3], [0.46, 0.1],
  [0.58, 0.28], [0.7, 0.14], [0.82, 0.3], [0.94, 0.12], [1, 0.2],
];

const HILL_POINTS: Point[] = [
  [0, 0.3], [0.15, 0.7], [0.3, 0.3], [0.45, 0.85], [0.6, 0.2],
  [0.75, 0.6], [0.9, 0.1], [1, 0.4],
];

const ORBS = [
  { x: 10, y: 62, size: 5, glow: 16, delay: 0 },
  { x: 16, y: 80, size: 3, glow: 10, delay: 0.4 },
  { x: 28, y: 48, size: 4, glow: 14, delay: 0.9 },
  { x: 38, y: 70, size: 3, glow: 10, delay: 1.3 },
  { x: 52, y: 58, size: 4, glow: 12, delay: 0.2 },
  { x: 63, y: 76, size: 5, glow: 16, delay: 1.6 },
  { x: 72, y: 50, size: 3, glow: 10, delay: 0.6 },
  { x: 81, y: 68, size: 4, glow: 14, delay: 1.1 },
  { x: 90, y: 56, size: 3, glow: 10, delay: 1.8 },
  { x: 95, y: 82, size: 5, glow: 16, delay: 0.5 },
];

export default function IntroMountainscape() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Moonbeam */}
      <div
        className="absolute inset-x-0 top-0 h-[70%]"
        style={{
          background:
            "radial-gradient(ellipse 45% 100% at 50% 0%, hsl(var(--foreground) / 0.1), transparent 70%)",
        }}
      />

      {/* Star field */}
      <TwinklingStars />

      {/* Mountain layers */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[55%]"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
      >
        <path d={jaggedPath(BACK_PEAKS, WIDTH, HEIGHT)} fill="hsl(222 32% 20% / 0.9)" />
        <path d={jaggedPath(MID_PEAKS, WIDTH, HEIGHT)} fill="hsl(222 34% 15% / 0.95)" />
        <path d={jaggedPath(FRONT_PEAKS, WIDTH, HEIGHT)} fill="hsl(224 38% 11%)" />
      </svg>

      {/* Glowing orbs scattered over the mountains */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            background: "#f6c177",
            boxShadow: `0 0 ${orb.glow}px ${orb.glow / 2}px rgba(246,193,119,0.55)`,
          }}
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 2.5 + (i % 3), repeat: Infinity, delay: orb.delay }}
        />
      ))}

      {/* Foreground hill with a resting fox silhouette */}
      <svg
        className="absolute bottom-0 left-0 w-full h-[16%]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path d={smoothPath(HILL_POINTS, 1440, 120)} fill="hsl(226 42% 7%)" />
      </svg>
      <svg
        className="absolute bottom-[1%] left-[4%] w-16 h-10 md:w-20 md:h-12"
        viewBox="0 0 100 60"
        fill="hsl(226 42% 7%)"
      >
        <path d="M8,56 C6,42 16,30 29,32 C26,20 36,9 46,13 C51,4 61,2 65,11 C73,8 82,13 79,22 C91,23 96,37 87,47 C97,49 98,56 90,58 C62,61 24,60 8,56 Z" />
      </svg>
    </div>
  );
}
