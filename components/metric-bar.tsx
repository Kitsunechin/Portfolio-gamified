"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "./animated-counter";

interface MetricBarProps {
  label: string;
  before: number;
  after: number;
  suffix?: string;
  delay?: number;
}

export default function MetricBar({
  label,
  before,
  after,
  suffix = "%",
  delay = 0,
}: MetricBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="flex flex-col gap-3">
      <span className="text-sm text-muted-foreground font-sans">{label}</span>
      <div className="flex flex-col gap-2">
        {before > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground w-12 shrink-0">
              Before
            </span>
            <div className="flex-1 h-8 bg-secondary rounded-lg overflow-hidden relative">
              <motion.div
                className="h-full bg-muted-foreground/30 rounded-lg"
                initial={{ width: 0 }}
                animate={isInView ? { width: `${before}%` } : { width: 0 }}
                transition={{
                  duration: 1.2,
                  delay: delay + 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-display font-semibold text-muted-foreground">
                <AnimatedCounter
                  value={before}
                  suffix={suffix}
                  duration={1.2}
                  delay={delay + 0.2}
                />
              </span>
            </div>
          </div>
        )}
        <div className="flex items-center gap-3">
          <span className="text-xs text-primary w-12 shrink-0">After</span>
          <div className="flex-1 h-8 bg-secondary rounded-lg overflow-hidden relative">
            <motion.div
              className="h-full bg-primary rounded-lg"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${after}%` } : { width: 0 }}
              transition={{
                duration: 1.2,
                delay: delay + (before > 0 ? 0.4 : 0.2),
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-display font-semibold text-foreground">
              <AnimatedCounter
                value={after}
                suffix={suffix}
                duration={1.2}
                delay={delay + (before > 0 ? 0.4 : 0.2)}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
