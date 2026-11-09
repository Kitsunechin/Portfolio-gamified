"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Sparkles } from "lucide-react";
import TwinklingStars from "@/components/twinkling-stars";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
}

interface ProjectDiscoveryProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectDiscovery({ project, onClose }: ProjectDiscoveryProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-2xl w-full bg-gradient-to-br from-card to-background rounded-2xl border-2 border-primary/30 overflow-hidden shadow-2xl bloom-soft"
          initial={{ scale: 0.8, y: 50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: 50, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <TwinklingStars />

          {/* Magical particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: 4,
                  height: 4,
                  background: "#f6c177",
                  boxShadow: "0 0 10px 5px rgba(246,193,119,0.45)",
                }}
                animate={{
                  y: [-20, -40, -20],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          {/* Header */}
          <div className="relative p-6 border-b border-primary/20">
            <motion.div
              className="flex items-center gap-2 mb-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-xs uppercase tracking-widest text-primary/80 font-semibold">
                Discovery
              </span>
            </motion.div>
            <motion.h2
              className="font-display uppercase tracking-[0.04em] text-2xl md:text-3xl text-foreground mb-1"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {project.title}
            </motion.h2>
            <motion.p
              className="text-muted-foreground text-sm"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {project.description}
            </motion.p>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 transition-colors"
            >
              <X className="w-4 h-4 text-foreground/80" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Project image */}
            <motion.div
              className="relative aspect-video rounded-xl overflow-hidden border border-primary/20 bg-background"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              )}
            </motion.div>

            {/* Tags */}
            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {project.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-xs text-foreground/80 font-medium"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Action button */}
            {project.link && (
              <motion.div
                className="pt-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary rounded-full text-sm font-semibold text-primary-foreground hover:bloom-soft transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Explore Project
                </a>
              </motion.div>
            )}
          </div>

          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-primary/30 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-primary/30 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-primary/30 rounded-br-2xl" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
