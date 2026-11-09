"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Firefly {
  left: number;
  top: number;
  duration: number;
  delay: number;
}

export default function GameAtmosphere({ count }: { count: number }) {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  // Created after mount so server and browser markup match.
  useEffect(() => {
    setFireflies(
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 3,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {fireflies.map((firefly, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
          style={{ left: `${firefly.left}%`, top: `${firefly.top}%`, filter: "blur(1px)" }}
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: firefly.duration, repeat: Infinity, delay: firefly.delay }}
        />
      ))}
    </div>
  );
}
