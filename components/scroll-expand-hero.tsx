"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface ScrollExpandHeroProps {
  videoSrc: string;
  titleLine1: string;
  titleLine2: string;
  scrollLabel?: string;
  children?: ReactNode;
}

export default function ScrollExpandHero({
  videoSrc,
  titleLine1,
  titleLine2,
  scrollLabel = "Scroll to explore",
  children,
}: ScrollExpandHeroProps) {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, []);

  // Ensure video plays after mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.load();
      video.play().catch((err) => {
        console.log("[v0] Video autoplay failed, retrying:", err);
        // Retry on user interaction
        const playOnInteraction = () => {
          video.play().catch(() => {});
          document.removeEventListener("click", playOnInteraction);
          document.removeEventListener("touchstart", playOnInteraction);
        };
        document.addEventListener("click", playOnInteraction);
        document.addEventListener("touchstart", playOnInteraction);
      });
    }
  }, []);

  useEffect(() => {
    const handleWheel = (e: globalThis.WheelEvent) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.001;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: globalThis.TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: globalThis.TouchEvent) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    const handleScroll = () => {
      if (!mediaFullyExpanded) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  // Phone frame starts at a comfortable size then scales up slightly
  const phoneScale = 1 + scrollProgress * 0.15;
  // Scroll label fades
  const labelOpacity = Math.max(1 - scrollProgress * 3, 0);
  // Teal shader background intensity
  const bgOpacity = scrollProgress;

  return (
    <div
      ref={sectionRef}
      className="transition-colors duration-700 ease-in-out overflow-x-hidden"
    >
      <section className="relative flex flex-col items-center justify-start min-h-dvh">
        <div className="relative w-full flex flex-col items-center min-h-dvh">
          {/* Teal shader background - appears on scroll */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Base dark bg */}
            <div className="absolute inset-0 bg-background" />
            {/* Teal radial glow - center */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: bgOpacity * 0.5 }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-[radial-gradient(ellipse_at_center,hsl(168_45%_50%/0.12),transparent_60%)]" />
            </motion.div>
            {/* Teal glow - top-right accent */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: bgOpacity * 0.35 }}
            >
              <div className="absolute top-0 right-0 w-[80vw] h-[60vh] bg-[radial-gradient(ellipse_at_top_right,hsl(168_50%_45%/0.15),transparent_55%)]" />
            </motion.div>
            {/* Teal glow - bottom-left accent */}
            <motion.div
              className="absolute inset-0"
              style={{ opacity: bgOpacity * 0.25 }}
            >
              <div className="absolute bottom-0 left-0 w-[70vw] h-[50vh] bg-[radial-gradient(ellipse_at_bottom_left,hsl(170_40%_40%/0.1),transparent_50%)]" />
            </motion.div>
            {/* Subtle noise/grain overlay */}
            <motion.div
              className="absolute inset-0 mix-blend-soft-light"
              style={{ opacity: bgOpacity * 0.4 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "repeat",
                  backgroundSize: "256px 256px",
                }}
              />
            </motion.div>
          </div>

          <div className="flex flex-col items-center justify-center w-full h-dvh relative z-10">
            {/* Phone + Title wrapper - title is outside the phone so it can be large */}
            <div className="relative flex items-center justify-center">
              {/* Phone frame with video */}
              <motion.div
                className="relative z-0"
                style={{
                  transform: `scale(${phoneScale})`,
                  transition: "transform 0.1s ease-out",
                }}
              >
                {/* Phone outer shell */}
                <div
                  className="relative rounded-[2.5rem] md:rounded-[3rem] bg-[#1a1a1a] p-[3px] md:p-1 shadow-2xl"
                  style={{
                    width: "clamp(200px, 28vw, 280px)",
                    aspectRatio: "375 / 812",
                    boxShadow: `
                      0 0 0 1px rgba(255,255,255,0.08),
                      0 25px 60px -12px rgba(0,0,0,0.5),
                      0 0 ${40 + scrollProgress * 60}px ${scrollProgress * 20}px hsl(168 45% 50% / ${0.05 + scrollProgress * 0.12})
                    `,
                  }}
                >
                  {/* Phone inner bezel */}
                  <div className="relative w-full h-full rounded-[2.25rem] md:rounded-[2.75rem] overflow-hidden bg-[#111]">
                    {/* Video - starts dim, scrolls to full opacity */}
                    <video
                      ref={videoRef}
                      src={videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      style={{
                        opacity: 0.3 + scrollProgress * 0.7,
                      }}
                    />

                    {/* Subtle inner shadow for depth */}
                    <div className="absolute inset-0 rounded-[2.25rem] md:rounded-[2.75rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] pointer-events-none z-10" />
                  </div>

                  {/* Side button accents */}
                  <div className="absolute -right-[2px] top-[28%] w-[3px] h-[8%] bg-[#2a2a2a] rounded-l-sm" />
                  <div className="absolute -left-[2px] top-[22%] w-[3px] h-[5%] bg-[#2a2a2a] rounded-r-sm" />
                  <div className="absolute -left-[2px] top-[30%] w-[3px] h-[8%] bg-[#2a2a2a] rounded-r-sm" />
                  <div className="absolute -left-[2px] top-[40%] w-[3px] h-[8%] bg-[#2a2a2a] rounded-r-sm" />
                </div>
              </motion.div>

              {/* Title - large, overlaying across the phone frame, fades on scroll */}
              <div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
                style={{
                  opacity: Math.max(1 - scrollProgress * 2.5, 0),
                }}
              >
                <p className="text-xs md:text-sm uppercase tracking-[0.35em] text-primary font-sans font-medium mb-3 md:mb-4">
                  {titleLine1}
                </p>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-foreground font-display tracking-tight text-center text-balance leading-tight whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
                  {titleLine2}
                </h1>
              </div>
            </div>

            {/* Scroll label below phone */}
            <motion.div
              className="mt-8 md:mt-12 flex flex-col items-center gap-2"
              style={{ opacity: labelOpacity }}
            >
              <p className="text-muted-foreground font-sans text-xs md:text-sm tracking-widest uppercase">
                {scrollLabel}
              </p>
              {/* Animated scroll indicator */}
              <motion.div
                className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <motion.div
                  className="w-1 h-1.5 rounded-full bg-primary"
                  animate={{ y: [0, 8, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Content that appears after scroll expansion */}
          <motion.div
            className="flex flex-col w-full relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.7 }}
          >
            {children}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
