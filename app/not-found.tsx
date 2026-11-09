"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Home, Search, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import TypingEffect from "@/components/typing-effect";

export default function NotFound() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Floating background elements */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      {/* Mouse follower */}
      <motion.div
        className="fixed w-32 h-32 border border-primary/10 rounded-full pointer-events-none z-10"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />

      <div className="container mx-auto px-6 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 404 Number */}
          <motion.div
            className="relative mb-8"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h1 className="text-[16rem] md:text-[20rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/60 to-primary/20 leading-none select-none">
              404
            </h1>
            <motion.div
              className="absolute inset-0 text-[16rem] md:text-[20rem] font-display font-bold text-primary/5 leading-none select-none"
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              404
            </motion.div>
          </motion.div>

          {/* Main message */}
          <motion.div
            className="space-y-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              Oops! This page seems to be{" "}
              <motion.span
                className="inline-block text-primary"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                off-brief
              </motion.span>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed">
              As a product designer, I'd say this page needs a complete UX overhaul.
              Let's navigate you back to something that actually works.
            </p>
          </motion.div>

          {/* Design process humor */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 mb-12 max-w-4xl mx-auto">
            {[
              {
                icon: Search,
                text: "Research",
                subtitle: "Page not found (obviously)",
                typingText: "404",
                href: null,
                clickable: false,
                delay: 1000
              },
              {
                icon: ArrowLeft,
                text: "Ideate",
                subtitle: "Try a different URL",
                typingText: "back",
                onClick: () => window.history.back(),
                clickable: true,
                delay: 2000
              },
              {
                icon: Home,
                text: "Prototype",
                subtitle: "Go back to portfolio",
                typingText: "home",
                href: "/",
                clickable: true,
                delay: 3000
              }
            ].map((item, index) => {
              if (item.text === "Ideate") {
                return (
                  <div
                    key={item.text}
                    onClick={item.onClick}
                    className="p-6 rounded-2xl bg-card border border-border backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <motion.div
                        className="p-3 bg-primary/10 rounded-xl"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="w-6 h-6 text-primary group-hover:text-primary/80" />
                      </motion.div>
                      <TypingEffect
                        text={item.typingText}
                        delay={item.delay}
                        speed={150}
                        className="text-xs font-mono text-primary/70 bg-secondary/30 px-2 py-1 rounded"
                      />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary">
                      {item.text}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80">
                      {item.subtitle}
                    </p>
                  </div>
                );
              } else if (item.text === "Prototype") {
                return (
                  <Link
                    key={item.text}
                    href={item.href}
                    className="p-6 rounded-2xl bg-card border border-border backdrop-blur-sm hover:border-primary/30 hover:bg-card/80 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <motion.div
                        className="p-3 bg-primary/10 rounded-xl"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="w-6 h-6 text-primary group-hover:text-primary/80" />
                      </motion.div>
                      <TypingEffect
                        text={item.typingText}
                        delay={item.delay}
                        speed={150}
                        className="text-xs font-mono text-primary/70 bg-secondary/30 px-2 py-1 rounded"
                      />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2 group-hover:text-primary">
                      {item.text}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80">
                      {item.subtitle}
                    </p>
                  </Link>
                );
              } else {
                return (
                  <div
                    key={item.text}
                    className="p-6 rounded-2xl bg-card border border-border backdrop-blur-sm"
                  >
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <motion.div
                        className="p-3 bg-primary/10 rounded-xl"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="w-6 h-6 text-primary" />
                      </motion.div>
                      <TypingEffect
                        text={item.typingText}
                        delay={item.delay}
                        speed={150}
                        className="text-xs font-mono text-primary/70 bg-secondary/30 px-2 py-1 rounded"
                      />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {item.text}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </div>
                );
              }
            })}
          </div>


          {/* Fun footer message */}
          <motion.div
            className="mt-16 pt-8 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-sm text-muted-foreground">
              <motion.span
                className="inline-block"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                🎨
              </motion.span>
              {" "}Don't worry, even the best designs have edge cases. This is just a really...
              <em>creative</em> user flow.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}