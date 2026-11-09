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
          className="absolute rounded-full"
          style={{
            left: `${firefly.left}%`,
            top: `${firefly.top}%`,
            width: 5,
            height: 5,
            background: "#f6c177",
            boxShadow: "0 0 14px 7px rgba(246,193,119,0.5)",
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.9, 0.2], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: firefly.duration, repeat: Infinity, delay: firefly.delay }}
        />
      ))}
    </div>
  );
}
