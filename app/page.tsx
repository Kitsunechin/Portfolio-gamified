"use client";

import * as React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import { INTRO_SEEN_KEY, SHOW_INTRO_EVENT } from "@/lib/intro";
import { useRouter } from "next/navigation";
import GameNav from "@/components/game-nav";
import InteractiveMap from "@/components/interactive-map";
import IntroMountainscape from "@/components/intro-mountainscape";
import OrnamentalDivider from "@/components/ornamental-divider";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Featured projects positioned inside labyrinth chambers
const MAP_PROJECTS = [
  {
    title: "AI Recruiter Clara",
    description: "Accelerating and scaling the recruitment process with intelligent automation.",
    image: "/images/AI-2.png",
    tags: ["UI/UX design", "mobile design", "AI", "user research"],
    x: 150,
    y: 350,
    link: "/projects/clara",
  },
  {
    title: "Guided Tour",
    description: "Educating new jobbers with an intuitive onboarding experience.",
    image: "/images/guided.png",
    tags: ["UI/UX design", "user research", "IA", "design thinking"],
    x: 550,
    y: 250,
    link: "/projects/guided-tour",
  },
  {
    title: "Shift Satisfaction",
    description: "Giving workers a voice and turning shifts into better experiences.",
    image: "/images/satisfaction.png",
    tags: ["UI/UX design", "user research", "B2C", "iterative design"],
    x: 950,
    y: 250,
    link: "/projects/shift-satisfaction",
  },
  {
    title: "Time Off Requests",
    description: "Providing transparency for workers and supervisors in shift schedules.",
    image: "/images/timeoff.png",
    tags: ["UI/UX design", "design thinking", "B2C", "mobile design"],
    x: 850,
    y: 550,
    link: "/projects/time-off",
  },
];

function TouchProjectList() {
  return (
    <main className="touch-only min-h-screen bg-background paper-grain pt-32 pb-16 px-6">
      <div className="relative -mx-6 mb-10 overflow-hidden px-6 py-14">
        <IntroMountainscape />
        <div className="relative z-10 text-center">
          <OrnamentalDivider className="mb-4" />
          <h1 className="font-display uppercase tracking-[0.1em] text-3xl text-foreground leading-[1.15]">
            <span className="block">Martyna's</span>
            <span className="block">Journey</span>
          </h1>
          <OrnamentalDivider className="mt-4 mb-5" />
          <p className="font-display italic text-sm text-muted-foreground leading-relaxed max-w-sm mx-auto">
            A silver fox wanders through magical woods, seeking glowing memories of design adventures.
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto">
        <p className="text-sm text-muted-foreground/70 mb-8 text-center">
          Open this page on a computer to guide the fox through the labyrinth.
        </p>

        <ul className="space-y-6">
          {MAP_PROJECTS.map((project) => (
            <li key={project.title}>
              <Link
                href={project.link}
                className="block bg-gradient-to-br from-card to-background border-2 border-primary/30 rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-video">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 576px"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="font-display text-lg text-foreground mb-1">{project.title}</h2>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/work"
          className="mt-8 w-full px-6 py-4 bg-primary rounded-full text-primary-foreground font-semibold inline-flex items-center justify-center gap-2"
        >
          See All Adventures
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </main>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [showIntro, setShowIntro] = useState(true);
  const [introAlreadySeen, setIntroAlreadySeen] = useState(false);

  useLayoutEffect(() => {
    try {
      if (sessionStorage.getItem(INTRO_SEEN_KEY)) {
        setIntroAlreadySeen(true);
        setShowIntro(false);
      }
    } catch {
      // Without storage the intro simply plays again.
    }
  }, []);

  useEffect(() => {
    const showIntroAgain = () => {
      setIntroAlreadySeen(false);
      setShowIntro(true);
    };
    window.addEventListener(SHOW_INTRO_EVENT, showIntroAgain);
    return () => window.removeEventListener(SHOW_INTRO_EVENT, showIntroAgain);
  }, []);

  const beginJourney = () => {
    try {
      sessionStorage.setItem(INTRO_SEEN_KEY, "true");
    } catch {
      // Without storage the intro simply plays again.
    }
    setShowIntro(false);
  };

  const handleAllDiscovered = () => {
    router.push('/work');
  };

  return (
    <>
      <GameNav />

      {/* Intro splash: unmounted outright for returning visitors so its exit fade doesn't replay */}
      {!introAlreadySeen && <AnimatePresence>
        {showIntro && (
          <motion.div
            className="game-only fixed inset-0 z-50 flex items-center justify-center bg-background paper-grain overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <IntroMountainscape />

            <motion.div
              className="relative z-10 text-center max-w-2xl px-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <OrnamentalDivider className="mb-6" />

              {/* Title with mystical effect */}
              <motion.div
                className="mb-6"
                animate={{
                  textShadow: [
                    '0 0 20px hsl(var(--primary) / 0.25)',
                    '0 0 44px hsl(var(--primary) / 0.45)',
                    '0 0 20px hsl(var(--primary) / 0.25)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <h1 className="font-display uppercase tracking-[0.12em] text-5xl md:text-7xl text-foreground leading-[1.1]">
                  <span className="block">Martyna's</span>
                  <span className="block">Journey</span>
                </h1>
              </motion.div>

              <OrnamentalDivider className="mb-8" />

              <motion.p
                className="font-display italic text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                A silver fox wanders through magical woods, seeking glowing memories of design adventures.
                Each orb holds a tale of enhancing experiences for users.
              </motion.p>

              <motion.button
                onClick={beginJourney}
                className="group inline-flex items-center gap-3 font-display uppercase tracking-[0.3em] text-lg text-foreground"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-amber-400 transition-transform group-hover:-translate-x-1">‹</span>
                Begin
                <span className="text-amber-400 transition-transform group-hover:translate-x-1">›</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>}

      {/* Interactive map */}
      {!showIntro && (
        <div className="game-only">
          <InteractiveMap
            projects={MAP_PROJECTS}
            onAllDiscovered={handleAllDiscovered}
          />
        </div>
      )}

      <TouchProjectList />
    </>
  );
}
