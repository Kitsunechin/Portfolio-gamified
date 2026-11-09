"use client";

import * as React from "react";
import { useState } from "react";
import GameNav from "@/components/game-nav";
import TwinklingStars from "@/components/twinkling-stars";
import OrnamentalDivider from "@/components/ornamental-divider";
import { motion } from "framer-motion";
import { ArrowRight, Package, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type TabId = "all" | "jobtalent" | "prograils" | "mobile" | "website";

const JT_PROJECTS = [
  {
    title: "Introducing AI recruiter Clara",
    link: "/projects/clara",
    description: "Accelerating and scaling the recruitment process.",
    image: "/images/AI-2.png",
    tags: ["UI/UX design", "mobile design", "stakeholders management", "wireframing", "user research", "AI"],
    platform: "mobile",
  },
  {
    title: "Productivity and fill rate",
    link: "/projects/productivity",
    description: "Providing clients with clearer workforce performance insights.",
    image: "/images/productivity2.png",
    tags: ["UI/UX design", "user research", "data driven design", "problem solving", "wireframing"],
    platform: "mobile",
  },
  {
    title: "Guided tour",
    link: "/projects/guided-tour",
    description: "Educating new jobbers and introducing the onboarding tour for users.",
    image: "/images/guided.png",
    tags: ["UI/UX design", "user research", "IA", "design thinking"],
    platform: "mobile",
  },
  {
    title: "Shift satisfaction",
    link: "/projects/shift-satisfaction",
    description: "Giving Workers a Voice: Turning Shifts Into a Better Experience.",
    image: "/images/satisfaction.png",
    tags: ["UI/UX design", "user research", "B2C", "iterative design"],
    platform: "mobile",
  },
  {
    title: "Gamification",
    link: "/projects/gamification",
    description: "Behavioral intervention using points systems and contextual notifications to improve worker consistency.",
    image: "/images/gamification.png",
    tags: ["behavioral design", "UX research", "gamification", "user engagement", "mobile design"],
    platform: "mobile",
  },
  {
    title: "Requesting time off",
    link: "/projects/time-off",
    description: "Providing transparency for workers and supervisors in shift schedules.",
    image: "/images/timeoff.png",
    tags: ["UI/UX design", "design thinking", "B2C", "mobile design"],
    platform: "mobile",
  },
  {
    title: "Web redesign",
    link: "/projects/web-redesign",
    description: "Enabling users to seamlessly transition from web to mobile while uplisting.",
    image: "/images/webred.png",
    tags: ["web design", "responsive design", "cross-platform", "user flows"],
    platform: "website",
  },
];

const PROGRAILS_PROJECTS = [
  {
    title: "Revamping internal management system",
    link: "/projects/humadroid",
    description: "Prioritizing user needs and uncovering the hidden potential of the internal web app.",
    image: "/images/humandroid.png",
    tags: ["UI/UX design", "user research", "IA", "design thinking"],
    platform: "website",
  },
];

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "jobtalent", label: "Job&Talent" },
  { id: "prograils", label: "Prograils" },
  { id: "mobile", label: "Mobile" },
  { id: "website", label: "Website" },
];

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const getFilteredProjects = () => {
    const allProjects = [...JT_PROJECTS, ...PROGRAILS_PROJECTS];
    if (activeTab === "all") return allProjects;
    if (activeTab === "jobtalent") return JT_PROJECTS;
    if (activeTab === "prograils") return PROGRAILS_PROJECTS;
    return allProjects.filter(p => p.platform === activeTab);
  };

  const filteredProjects = getFilteredProjects();

  return (
    <>
      <GameNav />
      <main className="min-h-screen bg-background paper-grain pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero section */}
          <motion.div
            className="relative text-center mb-12 py-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <TwinklingStars />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/15 border border-primary/30 rounded-full mb-4">
                <Package className="w-4 h-4 text-primary" />
                <span className="text-xs uppercase tracking-widest text-foreground/80 font-semibold">
                  Adventure Archive
                </span>
              </div>
              <OrnamentalDivider className="mb-4" />
              <h1 className="font-display uppercase tracking-[0.1em] text-4xl md:text-5xl text-foreground mb-4 text-bloom-soft">
                All Adventures
              </h1>
              <OrnamentalDivider className="mb-8" />
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                A collection of quests where design enhanced user experience and delivered
                measurable impact.
              </p>

              {/* Filter tabs */}
              <div className="flex flex-wrap gap-2 justify-center">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground bloom-soft"
                        : "bg-primary/10 text-muted-foreground border border-primary/30 hover:bg-primary/20"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const jitter = ((index % 5) - 2) * 1.2;
              const asymmetricRadius =
                index % 2 === 0
                  ? "1.25rem 1.75rem 1.25rem 1.75rem"
                  : "1.75rem 1.25rem 1.75rem 1.25rem";

              return (
              <motion.div
                key={project.title}
                className="group relative bg-gradient-to-br from-card to-background border-2 border-primary/20 overflow-hidden cursor-pointer hover:border-primary/50 transition-all"
                style={{ borderRadius: asymmetricRadius }}
                initial={{ opacity: 0, y: 30, rotate: jitter }}
                animate={{ opacity: 1, y: 0, rotate: jitter }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.02, rotate: 0 }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Magical particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  {[...Array(5)].map((_, i) => (
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
                        y: [-10, -30, -10],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>

                {/* Image */}
                <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/5">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                  {/* Sparkle indicator */}
                  <motion.div
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0, rotate: -180 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                  >
                    <Sparkles className="w-5 h-5 text-primary" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary/10 border border-primary/30 rounded text-xs text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 text-xs text-muted-foreground">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-primary/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-primary/30 rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-primary/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No adventures found in this category</p>
            </div>
          )}
        </div>

        {/* Project detail modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full bg-gradient-to-br from-card to-background rounded-2xl border-2 border-primary/30 overflow-hidden shadow-2xl bloom-soft"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="max-h-[calc(100dvh-2rem)] overflow-y-auto">
              {/* Image */}
              <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/5">
                {selectedProject.image && (
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-xs uppercase tracking-widest text-primary/80 font-semibold">
                    Adventure Details
                  </span>
                </div>
                <h2 className="font-display uppercase tracking-[0.04em] text-3xl text-foreground mb-3">
                  {selectedProject.title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {selectedProject.description}
                </p>

                {/* All tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-primary/10 border border-primary/30 rounded-full text-xs text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={selectedProject.link}
                  className="mt-6 w-full px-6 py-3 bg-primary rounded-full text-primary-foreground font-semibold hover:bloom-soft transition-all inline-flex items-center justify-center gap-2"
                >
                  View Full Project
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/30 transition-colors"
              >
                <span className="text-foreground text-xl">×</span>
              </button>
            </motion.div>
          </div>
        )}
      </main>
    </>
  );
}
