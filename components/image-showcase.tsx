"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageShowcaseProps {
  src: string;
  alt: string;
  caption?: string;
  delay?: number;
}

export default function ImageShowcase({
  src,
  alt,
  caption,
  delay = 0,
}: ImageShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <motion.div
        ref={ref}
        className="group relative overflow-hidden rounded-2xl bg-card border border-border cursor-pointer"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setIsExpanded(true)}
      >
        <div className="relative overflow-hidden">
          <Image
            src={src || "/placeholder.svg"}
            alt={alt}
            width={1400}
            height={900}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        {caption && (
          <div className="p-4 md:p-6">
            <p className="text-sm text-muted-foreground">{caption}</p>
          </div>
        )}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsExpanded(false)}
          >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-6 right-6 z-50 p-2 rounded-full bg-card border border-border text-foreground hover:bg-secondary transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              className="relative w-full max-w-6xl max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={alt}
                width={2400}
                height={1600}
                className="w-full h-auto object-contain rounded-lg max-h-[85vh]"
              />
              {caption && (
                <p className="text-sm text-muted-foreground mt-4 text-center">
                  {caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
