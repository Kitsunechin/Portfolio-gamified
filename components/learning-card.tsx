"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface LearningCardProps {
  number: string;
  title: string;
  description: string;
  delay?: number;
}

export default function LearningCard({
  number,
  title,
  description,
  delay = 0,
}: LearningCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="group flex flex-col gap-4 p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors duration-500"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-xs font-sans uppercase tracking-[0.2em] text-primary">
        {number}
      </span>
      <h3 className="text-lg font-display font-semibold text-foreground leading-snug">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
