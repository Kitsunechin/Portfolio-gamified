"use client";

import * as React from "react";
import { motion } from "framer-motion";

const POSITIONS = [
  { x: 6, y: 8 }, { x: 14, y: 18 }, { x: 22, y: 6 }, { x: 33, y: 22 },
  { x: 45, y: 10 }, { x: 58, y: 16 }, { x: 68, y: 5 }, { x: 78, y: 20 },
  { x: 88, y: 9 }, { x: 95, y: 24 }, { x: 4, y: 28 }, { x: 60, y: 28 },
  { x: 25, y: 35 }, { x: 80, y: 38 }, { x: 40, y: 4 }, { x: 10, y: 15 },
];

// Scattered across the full height, for scenes without a distinct "sky band".
const POSITIONS_FULL = [
  ...POSITIONS,
  { x: 18, y: 48 }, { x: 52, y: 44 }, { x: 72, y: 52 }, { x: 92, y: 46 },
  { x: 8, y: 58 }, { x: 35, y: 62 }, { x: 65, y: 58 }, { x: 85, y: 68 },
  { x: 15, y: 72 }, { x: 48, y: 78 }, { x: 75, y: 82 }, { x: 95, y: 72 },
  { x: 5, y: 88 }, { x: 30, y: 92 }, { x: 55, y: 90 }, { x: 80, y: 95 },
];

export default function TwinklingStars({
  count,
  full = false,
  className = "",
}: {
  count?: number;
  full?: boolean;
  className?: string;
}) {
  const source = full ? POSITIONS_FULL : POSITIONS;
  const stars = source.slice(0, count ?? source.length);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {stars.map((star, i) => {
        const size = 2 + (i % 3);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: size,
              height: size,
              background: "#f6c177",
              boxShadow: "0 0 6px 2px rgba(246,193,119,0.65)",
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1.3, 0.7] }}
            transition={{
              duration: 2.5 + (i % 4),
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
