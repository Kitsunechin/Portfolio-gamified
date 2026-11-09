"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedCounter from "./animated-counter";

interface StatCardProps {
  value: string;
  label: string;
  description: string;
  delay?: number;
}

function parseValue(value: string) {
  // Handle ranges like "60% to 90%"
  const rangeMatch = value.match(/(\d+)%?\s+to\s+(\d+)%?/);
  if (rangeMatch) {
    return {
      type: "range" as const,
      start: parseInt(rangeMatch[1]),
      end: parseInt(rangeMatch[2]),
      suffix: value.includes("%") ? "%" : "",
    };
  }

  // Handle single numbers like "83%", "10%", "73%"
  const singleMatch = value.match(/(\d+)(%)?/);
  if (singleMatch) {
    return {
      type: "single" as const,
      value: parseInt(singleMatch[1]),
      suffix: singleMatch[2] || "",
    };
  }

  return { type: "text" as const, value };
}

export default function StatCard({
  value,
  label,
  description,
  delay = 0,
}: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const parsed = parseValue(value);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-3 p-6 md:p-8 rounded-2xl bg-card border border-border"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-4xl md:text-5xl font-display font-bold text-primary">
        {parsed.type === "single" && (
          <AnimatedCounter
            value={parsed.value}
            suffix={parsed.suffix}
            duration={2}
            delay={delay + 0.3}
          />
        )}
        {parsed.type === "range" && (
          <>
            <AnimatedCounter
              value={parsed.start}
              suffix={parsed.suffix}
              duration={2}
              delay={delay + 0.3}
            />
            {" to "}
            <AnimatedCounter
              value={parsed.end}
              suffix={parsed.suffix}
              duration={2}
              delay={delay + 0.3}
            />
          </>
        )}
        {parsed.type === "text" && value}
      </span>
      <span className="text-lg font-display font-semibold text-foreground">
        {label}
      </span>
      <span className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </span>
    </motion.div>
  );
}
