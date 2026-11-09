"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Zap, Target, Users, Brain, Palette } from "lucide-react";

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
          <span className="text-sm font-semibold text-cyan-100">{label}</span>
        </div>
        <span className="text-sm text-cyan-300 font-mono">{value}/{max}</span>
      </div>
      <div className="relative h-3 bg-[#0a0a12]/50 rounded-full overflow-hidden border border-cyan-500/20">
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
          ? "bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30"
          : "bg-[#0a0a12]/30 border-gray-700/30"
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
              ? "bg-gradient-to-br from-cyan-500 to-blue-600"
              : "bg-gray-700/30"
          }`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4
              className={`font-semibold text-sm ${
                unlocked ? "text-cyan-100" : "text-gray-500"
              }`}
            >
              {name}
            </h4>
            {unlocked && (
              <div className="flex gap-0.5">
                {[...Array(level)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                  />
                ))}
              </div>
            )}
          </div>
          <p
            className={`text-xs leading-relaxed ${
              unlocked ? "text-cyan-300/70" : "text-gray-600"
            }`}
          >
            {unlocked ? description : "Locked"}
          </p>
        </div>
      </div>

      {/* Glow effect for unlocked abilities */}
      {unlocked && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-cyan-500/10 blur-xl -z-10"
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
    { label: "UX Research", value: 95, max: 100, icon: <Brain className="w-4 h-4 text-purple-400" />, color: "#a78bfa" },
    { label: "Visual Craft", value: 92, max: 100, icon: <Palette className="w-4 h-4 text-pink-400" />, color: "#f472b6" },
    { label: "Problem Solving", value: 98, max: 100, icon: <Target className="w-4 h-4 text-cyan-400" />, color: "#22d3ee" },
    { label: "Collaboration", value: 90, max: 100, icon: <Users className="w-4 h-4 text-green-400" />, color: "#4ade80" },
    { label: "Innovation", value: 88, max: 100, icon: <Zap className="w-4 h-4 text-yellow-400" />, color: "#fbbf24" },
  ];

  const abilities = [
    {
      name: "Hypothesis First",
      description: "Challenge problem framing using psycholinguistics background to form clear hypotheses",
      level: 5,
      icon: <Brain className="w-6 h-6 text-white" />,
      unlocked: true,
    },
    {
      name: "Data Vision",
      description: "Ground designs in thorough research and analytics, turning numbers into insights",
      level: 5,
      icon: <Target className="w-6 h-6 text-white" />,
      unlocked: true,
    },
    {
      name: "Craft Excellence",
      description: "Maintain high bar from first principles to final pixel with systems thinking",
      level: 5,
      icon: <Palette className="w-6 h-6 text-white" />,
      unlocked: true,
    },
    {
      name: "Behavioral Design",
      description: "Apply gamification and behavioral science to drive measurable user engagement",
      level: 4,
      icon: <Sparkles className="w-6 h-6 text-white" />,
      unlocked: true,
    },
    {
      name: "Cross-Functional",
      description: "Shape product direction alongside PMs and engineers with stakeholder alignment",
      level: 5,
      icon: <Users className="w-6 h-6 text-white" />,
      unlocked: true,
    },
    {
      name: "Progressive Mastery",
      description: "Constantly test, iterate and refine based on user feedback and behavior",
      level: 5,
      icon: <Zap className="w-6 h-6 text-white" />,
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
    <div className="min-h-screen bg-[#0a0a12] pt-36 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Character Card Header */}
        <motion.div
          className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] rounded-3xl border-2 border-cyan-500/30 overflow-hidden p-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Decorative particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
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
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/40 to-blue-500/40 blur-2xl" />
                {/* Portrait frame */}
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-cyan-500/50 bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                  <Image
                    src="/images/profile.pic.png"
                    alt="Character Portrait"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Level badge */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full border-2 border-[#0a0a12] shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-white font-bold text-sm">Lvl 4+</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Character Info */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full mb-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span className="text-xs uppercase tracking-widest text-cyan-300 font-semibold">
                  Product Designer
                </span>
              </motion.div>
              <motion.h1
                className="text-4xl md:text-5xl font-bold text-cyan-100 mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Martyna
              </motion.h1>
              <motion.p
                className="text-cyan-300/70 mb-4 leading-relaxed"
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
                <div className="px-4 py-2 bg-[#0a0a12]/50 border border-cyan-500/30 rounded-lg">
                  <div className="text-cyan-400 text-lg font-bold">4+ Years</div>
                  <div className="text-cyan-500/60 text-xs">Experience</div>
                </div>
                <div className="px-4 py-2 bg-[#0a0a12]/50 border border-cyan-500/30 rounded-lg">
                  <div className="text-cyan-400 text-lg font-bold">350K+</div>
                  <div className="text-cyan-500/60 text-xs">Users Impacted</div>
                </div>
                <div className="px-4 py-2 bg-[#0a0a12]/50 border border-cyan-500/30 rounded-lg">
                  <div className="text-cyan-400 text-lg font-bold">20+</div>
                  <div className="text-cyan-500/60 text-xs">Projects</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Stats & Abilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Core Stats */}
          <motion.div
            className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] rounded-2xl border-2 border-cyan-500/30 p-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-cyan-100">Core Stats</h2>
            </div>
            <div className="space-y-4">
              {stats.map((stat) => (
                <StatBar key={stat.label} {...stat} />
              ))}
            </div>
          </motion.div>

          {/* Special Abilities */}
          <motion.div
            className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] rounded-2xl border-2 border-cyan-500/30 p-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-cyan-100">Special Abilities</h2>
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
          className="bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a] rounded-2xl border-2 border-cyan-500/30 p-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-cyan-100">Notable Achievements</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {achievements.map((achievement, i) => (
              <motion.div
                key={achievement.label}
                className="text-center p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-cyan-400 mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: i * 0.1 + 0.2 }}
                >
                  {achievement.value}
                </motion.div>
                <div className="text-sm font-semibold text-cyan-100 mb-1">
                  {achievement.label}
                </div>
                <div className="text-xs text-cyan-300/60">
                  {achievement.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
