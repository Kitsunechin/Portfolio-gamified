"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Zap, Target, Users, Brain, Palette } from "lucide-react";
import TwinklingStars from "@/components/twinkling-stars";
import OrnamentalDivider from "@/components/ornamental-divider";

interface StatProps {
  label: string;
  value: number;
  max: number;
  icon: React.ReactNode;
  color: string;
}

function StatBar({ label, value, max, icon, color }: StatProps) {
  const percentage = (value / max) * 100;

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-semibold text-foreground">{label}</span>
        </div>
        <span className="text-sm text-muted-foreground font-mono">{value}/{max}</span>
      </div>
      <div className="relative h-3 bg-background/50 rounded-full overflow-hidden border border-primary/20">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
        </motion.div>
      </div>
    </motion.div>
  );
}

interface AbilityProps {
  name: string;
  description: string;
  level: number;
  icon: React.ReactNode;
  unlocked: boolean;
}

function Ability({ name, description, level, icon, unlocked }: AbilityProps) {
  return (
    <motion.div
      className={`relative p-4 rounded-xl border-2 ${
        unlocked
          ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30"
          : "bg-background/30 border-gray-700/30"
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={unlocked ? { scale: 1.02, y: -2 } : {}}
    >
      {/* Ability icon */}
      <div className="flex items-start gap-3">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            unlocked
              ? "bg-primary"
              : "bg-gray-700/30"
          }`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4
              className={`font-display text-sm ${
                unlocked ? "text-foreground" : "text-gray-500"
              }`}
            >
              {name}
            </h4>
            {unlocked && (
              <div className="flex gap-0.5">
                {[...Array(level)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                  />
                ))}
              </div>
            )}
          </div>
          <p
            className={`text-xs leading-relaxed ${
              unlocked ? "text-muted-foreground" : "text-gray-600"
            }`}
          >
            {unlocked ? description : "Locked"}
          </p>
        </div>
      </div>

      {/* Glow effect for unlocked abilities */}
      {unlocked && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-primary/10 blur-xl -z-10"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

export default function CharacterProfile() {
  const stats = [
    { label: "UX Research", value: 95, max: 100, icon: <Brain className="w-4 h-4 text-indigo-300" />, color: "#a5b4e0" },
    { label: "Visual Craft", value: 92, max: 100, icon: <Palette className="w-4 h-4 text-rose-300" />, color: "#e3a7c4" },
    { label: "Problem Solving", value: 98, max: 100, icon: <Target className="w-4 h-4 text-primary" />, color: "#78b6e2" },
    { label: "Collaboration", value: 90, max: 100, icon: <Users className="w-4 h-4 text-emerald-300" />, color: "#86d3b8" },
    { label: "Innovation", value: 88, max: 100, icon: <Zap className="w-4 h-4 text-amber-300" />, color: "#e8c98a" },
  ];

  const abilities = [
    {
      name: "Hypothesis First",
      description: "Challenge problem framing using psycholinguistics background to form clear hypotheses",
      level: 5,
      icon: <Brain className="w-6 h-6 text-primary-foreground" />,
      unlocked: true,
    },
    {
      name: "Data Vision",
      description: "Ground designs in thorough research and analytics, turning numbers into insights",
      level: 5,
      icon: <Target className="w-6 h-6 text-primary-foreground" />,
      unlocked: true,
    },
    {
      name: "Craft Excellence",
      description: "Maintain high bar from first principles to final pixel with systems thinking",
      level: 5,
      icon: <Palette className="w-6 h-6 text-primary-foreground" />,
      unlocked: true,
    },
    {
      name: "Behavioral Design",
      description: "Apply gamification and behavioral science to drive measurable user engagement",
      level: 4,
      icon: <Sparkles className="w-6 h-6 text-primary-foreground" />,
      unlocked: true,
    },
    {
      name: "Cross-Functional",
      description: "Shape product direction alongside PMs and engineers with stakeholder alignment",
      level: 5,
      icon: <Users className="w-6 h-6 text-primary-foreground" />,
      unlocked: true,
    },
    {
      name: "Progressive Mastery",
      description: "Constantly test, iterate and refine based on user feedback and behavior",
      level: 5,
      icon: <Zap className="w-6 h-6 text-primary-foreground" />,
      unlocked: true,
    },
  ];

  const achievements = [
    { value: "+35%", label: "Clock-ins", description: "Behavioral research + gamification" },
    { value: "+12%", label: "Applications", description: "Better filters & IA redesign" },
    { value: "+10%", label: "Shift Acceptance", description: "Guided feature tour" },
    { value: "46%", label: "Survey Complete", description: "Progressive disclosure" },
  ];

  return (
    <div className="min-h-screen bg-background paper-grain pt-36 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Character Card Header */}
        <motion.div
          className="relative bg-gradient-to-br from-card to-background rounded-3xl border-2 border-primary/30 overflow-hidden p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <TwinklingStars />

          {/* Decorative particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
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
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
            {/* Character Portrait */}
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="relative w-48 h-48">
                {/* Glow */}
                <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl" />
                {/* Portrait frame */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/50 bg-primary/15">
                  <Image
                    src="/images/profile.pic.png"
                    alt="Character Portrait"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Level badge */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-primary rounded-full border-2 border-background shadow-lg bloom-soft"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-primary-foreground font-bold text-sm">Lvl 4+</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Character Info */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary/15 border border-primary/30 rounded-full mb-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-3 h-3 text-primary" />
                <span className="text-xs uppercase tracking-widest text-foreground/80 font-semibold">
                  Product Designer
                </span>
              </motion.div>
              <motion.h1
                className="font-display uppercase tracking-[0.1em] text-4xl md:text-5xl text-foreground mb-2 text-bloom-soft"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Martyna
              </motion.h1>
              <motion.p
                className="text-muted-foreground mb-4 leading-relaxed"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                A designer with psycholinguistics powers, wielding data and research to craft
                experiences for 350,000+ users. Challenges problem framing and holds a high
                bar for craft.
              </motion.p>

              {/* Quick stats */}
              <motion.div
                className="flex flex-wrap gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="px-4 py-2 bg-background/50 border border-primary/30 rounded-lg">
                  <div className="text-primary text-lg font-bold">4+ Years</div>
                  <div className="text-muted-foreground text-xs">Experience</div>
                </div>
                <div className="px-4 py-2 bg-background/50 border border-primary/30 rounded-lg">
                  <div className="text-primary text-lg font-bold">350K+</div>
                  <div className="text-muted-foreground text-xs">Users Impacted</div>
                </div>
                <div className="px-4 py-2 bg-background/50 border border-primary/30 rounded-lg">
                  <div className="text-primary text-lg font-bold">20+</div>
                  <div className="text-muted-foreground text-xs">Projects</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <OrnamentalDivider className="mb-8" />

        {/* Stats & Abilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Core Stats */}
          <motion.div
            className="bg-gradient-to-br from-card to-background rounded-2xl border-2 border-primary/30 p-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-primary" />
              <h2 className="font-display text-xl text-foreground">Core Stats</h2>
            </div>
            <div className="space-y-4">
              {stats.map((stat) => (
                <StatBar key={stat.label} {...stat} />
              ))}
            </div>
          </motion.div>

          {/* Special Abilities */}
          <motion.div
            className="bg-gradient-to-br from-card to-background rounded-2xl border-2 border-primary/30 p-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-primary" />
              <h2 className="font-display text-xl text-foreground">Special Abilities</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {abilities.map((ability) => (
                <Ability key={ability.name} {...ability} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          className="bg-gradient-to-br from-card to-background rounded-2xl border-2 border-primary/30 p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl text-foreground">Notable Achievements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {achievements.map((achievement, i) => {
              const jitter = ((i % 4) - 1.5) * 1.2;
              const asymmetricRadius =
                i % 2 === 0
                  ? "1rem 1.5rem 1rem 1.5rem"
                  : "1.5rem 1rem 1.5rem 1rem";

              return (
              <motion.div
                key={achievement.label}
                className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
                style={{ borderRadius: asymmetricRadius }}
                initial={{ opacity: 0, scale: 0.8, rotate: jitter }}
                whileInView={{ opacity: 1, scale: 1, rotate: jitter }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4, rotate: 0 }}
              >
                <motion.div
                  className="font-display text-3xl md:text-4xl text-primary mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: i * 0.1 + 0.2 }}
                >
                  {achievement.value}
                </motion.div>
                <div className="text-sm font-semibold text-foreground mb-1">
                  {achievement.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {achievement.description}
                </div>
              </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
