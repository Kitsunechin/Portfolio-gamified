"use client";

import * as React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import { INTRO_SEEN_KEY, SHOW_INTRO_EVENT } from "@/lib/intro";
import { useRouter } from "next/navigation";
import GameNav from "@/components/game-nav";
import InteractiveMap from "@/components/interactive-map";
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
    <main className="touch-only min-h-screen bg-[#0a0a12] pt-32 pb-16 px-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-100 mb-3">Martyna's Journey</h1>
        <p className="text-cyan-300/80 leading-relaxed mb-2">
          A silver fox wanders through magical woods, seeking glowing memories of design adventures.
        </p>
        <p className="text-sm text-cyan-400/60 mb-8">
          Open this page on a computer to guide the fox through the labyrinth.
        </p>

        <ul className="space-y-6">
          {MAP_PROJECTS.map((project) => (
            <li key={project.title}>
              <Link
                href={project.link}
                className="block bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] border-2 border-cyan-500/30 rounded-2xl overflow-hidden"
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
                  <h2 className="text-lg font-bold text-cyan-100 mb-1">{project.title}</h2>
                  <p className="text-sm text-cyan-300/70">{project.description}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/work"
          className="mt-8 w-full px-6 py-4 bg-blue-600 rounded-full text-white font-semibold inline-flex items-center justify-center gap-2"
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
            className="game-only fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a12]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-center max-w-2xl px-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              {/* Title with mystical effect */}
              <motion.div
                className="mb-8"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(34,211,238,0.3)',
                    '0 0 40px rgba(34,211,238,0.6)',
                    '0 0 20px rgba(34,211,238,0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <h1 className="text-5xl md:text-7xl font-bold text-cyan-100 mb-4">
                  Martyna's Journey
                </h1>
                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
              </motion.div>

              <motion.p
                className="text-lg md:text-xl text-cyan-300/80 mb-8 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                A silver fox wanders through magical woods, seeking glowing memories of design adventures.
                Each orb holds a tale of enhancing experiences for users.
              </motion.p>

              <motion.button
                onClick={beginJourney}
                className="px-8 py-4 bg-blue-600 rounded-full text-white font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Begin Journey
              </motion.button>

              {/* Ambient particles */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                  }}
                />
              ))}
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
