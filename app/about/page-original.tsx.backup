"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animated-section";
import PortfolioNav from "@/components/portfolio-nav";
import { ArrowRight, MapPin, Mail, Phone, Linkedin } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

// CV Data from the PDF
const PROFESSIONAL_SUMMARY = {
  title: "Product Designer",
  experience: "4+ years",
  scale: "350,000+ users",
  background: "My background in psycholinguistics shapes how I approach design: hypothesis first, outcomes second.",
  approach: "I push back when problems are framed wrong, shape direction alongside PMs and engineers, and hold a high bar for craft from first principles to final pixel.",
  contact: {
    email: "martyna.bulska@gmail.com",
    phone: "+48 604510172",
    linkedin: "linkedin.com/in/martynabulska",
    location: "Poznan, Poland"
  }
};

const IMPACT_METRICS = [
  { value: "+35%", label: "Clock-ins", description: "Behavioral research + gamification" },
  { value: "+12%", label: "Job Applications", description: "Better filters & IA redesign" },
  { value: "+10%", label: "Shift Acceptance", description: "Guided feature tour" },
  { value: "46%", label: "Survey Completion", description: "Progressive disclosure design" },
];

const SKILLS_MATRIX = {
  "Product Design": [
    "End-to-end mobile and web design",
    "Systems thinking",
    "Multi-feature journey design",
    "Problem framing",
    "Hypothesis-driven iteration"
  ],
  "Visual Craft": [
    "High-fidelity UI",
    "Intentional visual design",
    "Figma (components, auto-layout, prototyping)",
    "Design systems",
    "Sketch, Framer"
  ],
  "Research & Strategy": [
    "Behavioral science",
    "User research",
    "Usability testing",
    "App analytics & A/B testing",
    "Value Proposition Canvas",
    "Journey Mapping"
  ],
  "Modern Tools": [
    "WCAG standards & inclusive design",
    "Mobile accessibility (HIG, Material Design)",
    "AI tools (Claude.ai, Lovable, V0, Cursor)",
    "Cross-functional delivery",
    "Stakeholder alignment"
  ]
};

const CAREER_TIMELINE = [
  {
    company: "Job&Talent",
    location: "Madrid, Spain",
    roles: [
      {
        title: "Product Designer",
        period: "June 2022 - Present",
        current: true
      }
    ],
    description: "Two-sided workforce marketplace — B2B operator platform and worker-facing consumer app, serving 350,000+ users for enterprise clients including DHL, UPS, and Cabify across 10 countries.",
    highlights: [
      "Led mobile-first redesign of multi-tenant architecture — opening up a 10x larger market ($500B → $5T TAM)",
      "Designed workplace productivity dashboards for client ROI visibility",
      "Proposed Fill Rate as clearer KPI, got stakeholder buy-in, redesigned UI",
      "Built guided feature tour — shift acceptance up 10%",
      "Contributed to design system for consistent web/mobile delivery"
    ]
  },
  {
    company: "Prograils",
    location: "Poznan, Poland",
    roles: [
      {
        title: "UX/UI Designer",
        period: "November 2021 - July 2022",
        current: false
      }
    ],
    description: "Tech consultancy delivering mobile apps, SaaS platforms, and web products across industries.",
    highlights: [
      "Redesigned home search and property data management from research to final mockups",
      "Led design of internal employee management tool from scratch",
      "Ran stakeholder interviews and competitive analysis"
    ]
  }
];

const DESIGN_PROCESS = [
  {
    phase: "Discovery",
    title: "Hypothesis First",
    description: "I start by challenging problem framing. Using my psycholinguistics background, I dig deep into user behavior patterns and business objectives to form clear hypotheses.",
    tools: ["Stakeholder interviews", "Behavioral research", "Value Proposition Canvas"],
    icon: "🔍",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    phase: "Research & Analysis",
    title: "Data-Driven Insights",
    description: "I ground my designs in thorough research and data analysis, ensuring solutions address real user needs. Every decision is backed by evidence, not assumptions.",
    tools: ["User research", "Analytics deep-dive", "A/B testing", "Journey mapping"],
    icon: "📊",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    phase: "Design & Systems",
    title: "Craft Excellence",
    description: "I maintain a high bar for craft from first principles to final pixel. Deep Figma proficiency and systems thinking ensure consistency across all touchpoints.",
    tools: ["Design systems", "High-fidelity UI", "Prototyping", "WCAG compliance"],
    icon: "🎨",
    color: "from-green-500/20 to-emerald-500/20"
  },
  {
    phase: "Test & Iterate",
    title: "Outcomes Second",
    description: "I constantly test, iterate, and refine based on user feedback and behavior. Progressive disclosure and usability testing guide every iteration toward measurable impact.",
    tools: ["Usability testing", "Progressive disclosure", "Behavioral analysis", "Iteration cycles"],
    icon: "🔄",
    color: "from-orange-500/20 to-red-500/20"
  },
  {
    phase: "Collaborate & Deliver",
    title: "Cross-Functional Impact",
    description: "I shape product direction alongside PMs and engineers, building stakeholder alignment and delivering solutions that drive enterprise adoption and user engagement.",
    tools: ["Cross-functional delivery", "Stakeholder alignment", "Design system scaling", "Enterprise adoption"],
    icon: "🚀",
    color: "from-teal-500/20 to-blue-500/20"
  }
];

const EDUCATION = [
  {
    institution: "Collegium Da Vinci",
    degree: "Post graduate studies in Design for Mobile Apps",
    year: "2017"
  },
  {
    institution: "Poznan University of Economics",
    degree: "MA – Spatial Development",
    year: "2015"
  },
  {
    institution: "Adam Mickiewicz University",
    degree: "MA - English Studies",
    year: "2012"
  }
];

function ProfileAvatar() {
  const [imgError, setImgError] = React.useState(false);
  return (
    <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-xl" />
      <div className="relative w-full h-full rounded-full overflow-hidden bg-card border-2 border-border ring-4 ring-primary/10 shadow-2xl">
        {!imgError && (
          <Image
            src="/images/profile.pic.png"
            alt="Martyna - Product Designer"
            width={192}
            height={192}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
            priority
          />
        )}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ${
            imgError ? "flex" : "hidden"
          }`}
        >
          <span className="text-4xl font-display font-bold text-primary/60">M</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5" />
      </div>
      <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 animate-pulse" style={{ clipPath: 'circle(50% at 50% 50%)' }} />
    </div>
  );
}

function AnimatedCounter({ value, duration = 2000, delay = 0 }: { value: string; duration?: number; delay?: number }) {
  const [displayValue, setDisplayValue] = useState("0");
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;

    const startAnimation = () => {
      setIsAnimating(true);

      const numbers = value.match(/\d+/g);
      if (!numbers || numbers.length === 0) {
        setDisplayValue(value);
        setIsAnimating(false);
        return;
      }

      const targetNumber = parseInt(numbers[0]);
      const steps = 60;
      const stepDuration = duration / steps;
      const increment = targetNumber / steps;

      let currentValue = 0;
      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetNumber) {
          currentValue = targetNumber;
          clearInterval(timer);
          setDisplayValue(value);
          setIsAnimating(false);
        } else {
          setDisplayValue(value.replace(/\d+/, Math.round(currentValue).toString()));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    };

    const delayTimer = setTimeout(startAnimation, delay);
    return () => clearTimeout(delayTimer);
  }, [value, duration, delay, isInView]);

  return (
    <motion.span
      ref={ref}
      className="text-3xl md:text-4xl font-display font-bold text-primary block"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={isInView ? {
        scale: isAnimating ? [1, 1.1, 1] : 1,
        opacity: 1
      } : { scale: 0.8, opacity: 0 }}
      transition={{
        duration: 0.8,
        scale: isAnimating ? { duration: 0.3, repeat: 1, repeatType: "reverse" } : { duration: 0.8 }
      }}
    >
      {displayValue}
    </motion.span>
  );
}

function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center py-8 md:py-12"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-px h-12 bg-gradient-to-b from-transparent via-border to-transparent" />
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <>
      <PortfolioNav />
      <main className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          {/* Hero Section */}
          <section className="relative py-16 md:py-32 scroll-mt-24 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
                {/* Left side - Image and Contact */}
                <motion.div
                  className="shrink-0 relative text-center lg:text-left"
                  initial={{ opacity: 0, scale: 0.8, x: -50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="mb-8">
                    <ProfileAvatar />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground justify-center lg:justify-start">
                      <MapPin className="w-4 h-4" />
                      {PROFESSIONAL_SUMMARY.contact.location}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground justify-center lg:justify-start">
                      <Mail className="w-4 h-4" />
                      {PROFESSIONAL_SUMMARY.contact.email}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground justify-center lg:justify-start">
                      <Phone className="w-4 h-4" />
                      {PROFESSIONAL_SUMMARY.contact.phone}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground justify-center lg:justify-start">
                      <Linkedin className="w-4 h-4" />
                      <a
                        href={`https://${PROFESSIONAL_SUMMARY.contact.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {PROFESSIONAL_SUMMARY.contact.linkedin}
                      </a>
                    </div>
                  </div>

                </motion.div>

                {/* Right side - Professional Summary */}
                <div className="flex-1 text-center lg:text-left">
                  <motion.p
                    className="text-sm md:text-base italic text-primary font-sans mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {PROFESSIONAL_SUMMARY.experience} Experience
                  </motion.p>
                  <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground tracking-tight leading-[1.1] mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    About Me
                  </motion.h1>
                  <motion.div
                    className="space-y-6 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <p className="text-lg md:text-xl text-foreground leading-relaxed">
                      I've spent four years designing for a marketplace where <span className="text-primary font-semibold">{PROFESSIONAL_SUMMARY.scale}</span> people use the product to find work and get paid — consumer scale, enterprise complexity, real stakes.
                    </p>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {PROFESSIONAL_SUMMARY.background}
                    </p>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {PROFESSIONAL_SUMMARY.approach}
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* Impact Metrics */}
          <section className="py-12 md:py-16">
            <AnimatedSection>
              <div className="mb-12 text-center">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Measurable Impact
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                  Results That Matter
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  Hypothesis-driven design backed by quantifiable outcomes across enterprise-scale products.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {IMPACT_METRICS.map((metric, i) => (
                <AnimatedSection key={metric.label} delay={i * 0.1}>
                  <motion.div
                    className="text-center p-6 md:p-8 rounded-2xl bg-card border border-border group hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Animated border */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-primary/20 opacity-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0 }}
                      whileInView={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 2, delay: i * 0.2 }}
                    />

                    <div className="relative z-10">
                      <div className="mb-4">
                        <AnimatedCounter
                          value={metric.value}
                          delay={i * 200}
                          duration={1500 + (i * 200)}
                        />
                      </div>

                      <motion.h3
                        className="text-lg font-display font-semibold text-foreground mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: (i * 0.1) + 0.5 }}
                      >
                        {metric.label}
                      </motion.h3>

                      <motion.p
                        className="text-sm text-muted-foreground leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: (i * 0.1) + 0.7 }}
                      >
                        {metric.description}
                      </motion.p>
                    </div>

                    {/* Subtle particle effect */}
                    <motion.div
                      className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary/30"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </section>

          <SectionDivider />

          {/* Design Process */}
          <section className="py-12 md:py-16">
            <AnimatedSection>
              <div className="mb-12 text-center">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Design Process
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                  How I Approach Design Challenges
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                  My psycholinguistics background shapes a unique methodology: hypothesis first, outcomes second. Here's how I navigate from problem to solution.
                </p>
              </div>
            </AnimatedSection>

            <div className="relative">
              {/* Process flow visualization */}
              <div className="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full">
                <motion.div
                  className="w-full bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div>

              <div className="space-y-12">
                {DESIGN_PROCESS.map((step, i) => (
                  <motion.div
                    key={step.phase}
                    className="relative"
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <div className={`flex flex-col lg:flex-row gap-8 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>

                      {/* Process step content */}
                      <div className="flex-1 lg:max-w-md">
                        <motion.div
                          className={`p-8 rounded-2xl bg-gradient-to-br ${step.color} border border-border/50 backdrop-blur-sm relative overflow-hidden`}
                          whileHover={{ scale: 1.02, y: -4 }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Background pattern */}
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:20px_20px] opacity-50" />

                          <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-4">
                              <motion.div
                                className="text-2xl"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                              >
                                {step.icon}
                              </motion.div>
                              <div>
                                <span className="text-xs uppercase tracking-[0.2em] text-primary/80 font-sans block">
                                  {step.phase}
                                </span>
                                <h3 className="text-xl font-display font-bold text-foreground">
                                  {step.title}
                                </h3>
                              </div>
                            </div>

                            <p className="text-foreground/90 leading-relaxed mb-6">
                              {step.description}
                            </p>

                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-foreground/80 uppercase tracking-wide">
                                Key Methods
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {step.tools.map((tool, index) => (
                                  <motion.span
                                    key={tool}
                                    className="px-3 py-1.5 bg-background/50 border border-border rounded-full text-xs font-medium text-foreground/80"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary-rgb), 0.1)" }}
                                  >
                                    {tool}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Process step indicator */}
                      <div className="shrink-0 relative">
                        <motion.div
                          className="w-16 h-16 rounded-full border-4 border-primary/30 bg-background flex items-center justify-center relative z-10"
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.8, delay: i * 0.2 }}
                        >
                          <motion.div
                            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm"
                            animate={{ boxShadow: ["0 0 0 0 rgba(var(--primary-rgb), 0.4)", "0 0 0 10px rgba(var(--primary-rgb), 0)", "0 0 0 0 rgba(var(--primary-rgb), 0)"] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                          >
                            {i + 1}
                          </motion.div>
                        </motion.div>
                      </div>

                      {/* Spacer for alternating layout */}
                      <div className="flex-1 lg:max-w-md lg:block hidden" />
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          </section>

          <SectionDivider />

          {/* Skills Matrix */}
          <section className="py-12 md:py-16">
            <AnimatedSection>
              <div className="mb-12">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Skills & Expertise
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  What I Bring to Teams
                </h2>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.entries(SKILLS_MATRIX).map(([category, skills], i) => (
                <AnimatedSection key={category} delay={i * 0.1}>
                  <div className="p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
                    <h3 className="text-lg font-display font-semibold text-foreground mb-4">
                      {category}
                    </h3>
                    <ul className="space-y-3">
                      {skills.map((skill, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span className="text-sm text-muted-foreground leading-relaxed">
                            {skill}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>

          <SectionDivider />

          {/* Career Timeline */}
          <section className="py-12 md:py-16">
            <AnimatedSection>
              <div className="mb-12">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Professional Journey
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  Career Timeline
                </h2>
              </div>
            </AnimatedSection>

            <div className="space-y-12">
              {CAREER_TIMELINE.map((job, i) => (
                <AnimatedSection key={job.company} delay={i * 0.1}>
                  <div className="relative">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-1/3">
                        <h3 className="text-xl font-display font-bold text-foreground mb-2">
                          {job.company}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">{job.location}</p>
                        <div className="space-y-2">
                          {job.roles.map((role, index) => (
                            <div key={index} className="p-3 rounded-lg bg-card border border-border">
                              <p className="font-semibold text-sm text-foreground">
                                {role.title}
                                {role.current && (
                                  <span className="ml-2 px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                                    Current
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-muted-foreground">{role.period}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="lg:w-2/3">
                        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                          {job.description}
                        </p>
                        <div className="space-y-3">
                          <h4 className="font-semibold text-foreground text-sm">Key Achievements:</h4>
                          <ul className="space-y-2">
                            {job.highlights.map((highlight, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                <span className="text-sm text-muted-foreground leading-relaxed">
                                  {highlight}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>

          <SectionDivider />

          {/* Education */}
          <section className="py-12 md:py-16">
            <AnimatedSection>
              <div className="mb-12">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Education
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                  Academic Background
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  Diverse educational foundation combining design specialization with spatial development and linguistics — shaping a unique approach to user experience design.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {EDUCATION.map((edu, i) => (
                <AnimatedSection key={edu.institution} delay={i * 0.1}>
                  <div className="p-6 md:p-8 rounded-2xl bg-card border border-border text-center h-full">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-primary font-display font-bold text-lg">
                        {edu.year}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                      {edu.institution}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {edu.degree}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}