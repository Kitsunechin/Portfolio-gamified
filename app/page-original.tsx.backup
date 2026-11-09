"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/animated-section";
import PortfolioNav from "@/components/portfolio-nav";
import StackingCard from "@/components/ui/stacking-card";
import ThemeToggle from "@/components/theme-toggle";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

const WORDS = ["enhancing", "optimizing", "simplifying"];

// Featured projects data for stacking cards
const FEATURED_PROJECTS = [
  {
    title: "Introducing AI recruiter Clara",
    description: "Accelerating and scaling the recruitment process.",
    link: "/images/AI-2.png",
    color: "#5196fd",
    tags: ["UI/UX design", "mobile design", "stakeholders management", "wireframing", "user research", "AI"],
    platform: "mobile",
  },
  {
    title: "Guided tour",
    description: "Educating new jobbers and introducing the onboarding tour for users.",
    link: "/images/guided.png",
    color: "#13006c",
    tags: ["UI/UX design", "user research", "IA", "design thinking"],
    platform: "mobile",
  },
  {
    title: "Shift satisfaction",
    description: "Giving Workers a Voice: Turning Shifts Into a Better Experience.",
    link: "/images/satisfaction.png",
    color: "#ed649e",
    tags: ["UI/UX design", "user research", "B2C", "iterative design"],
    platform: "mobile",
  },
  {
    title: "Requesting time off",
    description: "Providing transparency for workers and supervisors in shift schedules.",
    link: "/images/timeoff.png",
    color: "#fd521a",
    tags: ["UI/UX design", "design thinking", "B2C", "mobile design"],
    platform: "mobile",
  },
];

// Testimonials data
const TESTIMONIALS = [
  {
    name: "Adrián Nieto Rodríguez",
    role: "Senior Android Engineer",
    company: "Job&Talent",
    image: "/images/Adrian.png",
    quote: "As a Mobile Developer, it was a pleasure working with Martyna. She is approachable and proactive, always open to feedback and genuinely willing to help. She has a strong focus on crafting high-quality user experiences, keeping consistency across our applications.",
    fullQuote: "She is not afraid to take on challenging projects, carefully evaluating alternatives and delivering thoughtful, well-reasoned solutions."
  },
  {
    name: "Sofía Fernández López",
    role: "Senior Product Designer",
    company: "Job&Talent",
    image: "/images/Sofia.png",
    quote: "She's a detail-oriented, data-driven designer who brings real rigor to her process. Her decisions are always well-informed and thoughtfully considered. Beyond her craft, she's a natural collaborator.",
    fullQuote: "What also stands out is her curiosity: she's the kind of person who's constantly learning and looking for ways to grow."
  },
  {
    name: "Wendy Klesta",
    role: "Sr Product Manager",
    company: "Luzia | Rugby Referee",
    image: "/images/Wendy.png",
    quote: "I had the pleasure of working with Martyna for about a year, and she is an excellent product designer. Her speed and efficiency in delivering high-quality work are impressive. She pays close attention to detail, making sure every part of her designs is well thought out.",
    fullQuote: "Martyna is good at using data to make smart decisions. She works independently and often finds ways to improve projects. Her documentation of ideas helps the team prioritize her suggestions and move forward."
  },
  {
    name: "Patryk Szaflarski",
    role: "Designer",
    company: "Manychat",
    image: "/images/Patryk.png",
    quote: "She's hands down one of the most talented and reliable product designers I've collaborated with. She brings that rare mix of deep UX thinking, attention to detail, and a no-nonsense approach to problem-solving.",
    fullQuote: "Martyna has an incredible ability to take complex, sometimes ambiguous, product challenges and turn them into intuitive, well-crafted experiences."
  }
];

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


function AnimatedTagline() {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 3000);
    return () => clearInterval(t);
  }, []);
  const longestWord = "simplifying";
  return (
    <span className="relative inline-block align-baseline">
      {WORDS.map((word, i) => (
        <motion.span
          key={word}
          className={`absolute left-0 top-0 whitespace-nowrap font-semibold ${
            i === index ? "text-primary" : "text-primary/50"
          }`}
          initial={false}
          animate={{
            opacity: i === index ? 1 : 0,
            y: i === index ? 0 : 4,
          }}
          transition={{ duration: 0.4 }}
        >
          {word}
        </motion.span>
      ))}
      <span className="invisible">{longestWord}</span>
    </span>
  );
}


function ProfileAvatar() {
  const [imgError, setImgError] = React.useState(false);
  return (
    <div className="relative w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-transparent blur-xl" />

      {/* Main avatar container */}
      <div className="relative w-full h-full rounded-full overflow-hidden bg-card border-2 border-border ring-4 ring-primary/10 shadow-2xl">
        {!imgError && (
          <Image
            src="/images/profile.pic.png"
            alt="Martyna - Product Designer"
            width={288}
            height={288}
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
          <span className="text-5xl font-display font-bold text-primary/60">M</span>
        </div>

        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5" />
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 animate-pulse" style={{ clipPath: 'circle(50% at 50% 50%)' }} />
    </div>
  );
}

const ABOUT_CARDS = [
  {
    title: "UX/UI Designer",
    description:
      "As a UX/UI designer, my passion lies in crafting intuitive and streamlined user experiences. I believe in the power of simplicity to enhance usability and delight users.",
  },
  {
    title: "Beyond the Screen",
    description:
      "Beyond design, I'm passionate about trail running, hiking, and traveling. Just as well-marked trails make journeys smoother, I create clear, engaging interfaces that guide users effortlessly through digital experiences.",
  },
];

const APPROACH_CARDS = [
  {
    title: "Research-driven",
    description:
      "I ground my designs in thorough research and data analysis, ensuring solutions that address real user needs and business goals.",
  },
  {
    title: "User-centered",
    description:
      "Users are at the heart of my design process. I constantly test, iterate, and refine based on user feedback and behavior.",
  },
  {
    title: "Numbers-driven",
    description:
      "Navigating business objectives through design, I focus on creating experiences that not only delight users but also drive measurable results and meaningful impact.",
  },
];

export default function HomePage() {
  return (
    <>
      <PortfolioNav />
      <main className="min-h-screen pt-24 pb-20">
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          {/* Hero */}
          <section id="home" className="relative py-16 md:py-32 scroll-mt-24 overflow-hidden">
            {/* Background pattern - same as guided tour */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

            {/* Theme Toggle */}
            <div className="absolute top-4 right-4 z-20">
              <ThemeToggle />
            </div>

            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center lg:items-start">
                {/* Left side - Text content */}
                <div className="flex-1 text-center lg:text-left">
                  <motion.p
                    className="text-sm md:text-base italic text-muted-foreground font-sans mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    Product Designer
                  </motion.p>
                  <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground tracking-tight leading-[1.1] mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    Martyna
                  </motion.h1>
                  <motion.div
                    className="space-y-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <p className="text-lg md:text-xl text-foreground leading-relaxed max-w-2xl">
                      A product designer with a passion for <AnimatedTagline /> user experience,
                      <br className="hidden lg:block" />
                      one pixel at a time.
                    </p>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                      I craft intuitive and streamlined experiences by blending user research,
                      business strategy, and beautiful design. My approach focuses on simplicity
                      that enhances usability and delights users.
                    </p>
                  </motion.div>
                  <motion.div
                    className="flex flex-wrap gap-3 justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      UX Research
                    </span>
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      Product Strategy
                    </span>
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      Design Systems
                    </span>
                    <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      Prototyping
                    </span>
                  </motion.div>
                </div>

                {/* Right side - Avatar */}
                <motion.div
                  className="shrink-0 relative"
                  initial={{ opacity: 0, scale: 0.8, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {/* Decorative elements */}
                  <div className="absolute -inset-8 bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-full blur-2xl" />

                  <div className="relative">
                    <ProfileAvatar />
                  </div>

                </motion.div>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* Featured Work */}
          <section id="featured-work" className="py-12 md:py-16 scroll-mt-24">
            <AnimatedSection>
              <div className="mb-12">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Featured Work
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                  Selected Projects
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  Recent UX/UI design work focused on data-driven solutions that improve user experience and deliver measurable business impact.
                </p>
              </div>
            </AnimatedSection>

            {/* Stacking Cards */}
            <div className="w-full">
              <StackingCard projects={FEATURED_PROJECTS} />
            </div>

            <AnimatedSection delay={0.3}>
              <div className="text-center mt-12">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors"
                >
                  View All Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimatedSection>
          </section>

          <SectionDivider />

          {/* About Me */}
          <section className="py-12 md:py-16">
            <AnimatedSection>
              <div className="mb-12">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  About Me
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  Who I am as a designer
                </h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ABOUT_CARDS.map((card, i) => (
                <AnimatedSection key={card.title} delay={i * 0.1}>
                  <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
                    <h3 className="text-lg font-display font-semibold text-foreground">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {card.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>

          <SectionDivider />

          {/* My approach to design */}
          <section className="py-12 md:py-16">
            <AnimatedSection>
              <div className="mb-12">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  My Approach
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  How I approach design challenges
                </h2>
              </div>
            </AnimatedSection>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {APPROACH_CARDS.map((card, i) => (
                <AnimatedSection key={card.title} delay={i * 0.1}>
                  <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-display font-bold text-sm">
                        {card.title.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-lg font-display font-semibold text-foreground">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {card.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </section>

          <SectionDivider />

          {/* Testimonials */}
          <section id="testimonials" className="py-12 md:py-16 scroll-mt-24">
            <AnimatedSection>
              <div className="mb-12">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Testimonials
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
                  What colleagues say
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
                  Feedback from developers, product managers, and fellow designers I've collaborated with.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {TESTIMONIALS.map((testimonial, i) => (
                <AnimatedSection key={testimonial.name} delay={i * 0.1}>
                  <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
                    <div className="flex-1">
                      <blockquote className="text-base text-foreground leading-relaxed mb-4">
                        "{testimonial.quote}"
                      </blockquote>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {testimonial.fullQuote}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                        {testimonial.image ? (
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-primary font-display font-bold text-lg">
                            {testimonial.name.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role} • {testimonial.company}
                        </p>
                      </div>
                    </div>
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
