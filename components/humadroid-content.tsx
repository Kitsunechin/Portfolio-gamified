"use client";

import AnimatedSection from "@/components/animated-section";
import SectionHeader from "@/components/section-header";
import ImageShowcase from "@/components/image-showcase";
import LearningCard from "@/components/learning-card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Settings, Users, TrendingUp, Target, Search, Lightbulb, Palette, Code, TestTube, Rocket } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

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

function OverviewBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {[
        { label: "Role", value: "Product Designer" },
        { label: "Duration", value: "Nov 2021 - Jan 2022" },
        { label: "Platform", value: "Web" },
        { label: "Team", value: "Senior Product Designer" },
      ].map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-1 p-5 md:p-6 bg-card"
        >
          <span className="text-xs text-muted-foreground font-sans uppercase tracking-wide">
            {item.label}
          </span>
          <span className="text-sm font-display font-medium text-foreground">
            {item.value}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

export default function HumadroidContent() {
  return (
    <div className="flex flex-col w-full">
      {/* Overview */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <OverviewBanner />

        <div className="mt-16 md:mt-20 flex flex-col md:flex-row gap-12 md:gap-20">
          <AnimatedSection className="flex-1">
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-sans">
              Redesigning Prograils' employee management system to create a cohesive, user-friendly interface that eliminates the need for supplementary spreadsheets and improves internal workflow efficiency.
            </p>
          </AnimatedSection>
          <AnimatedSection className="flex-1" delay={0.15}>
            <p className="text-base text-muted-foreground leading-relaxed font-sans">
              The existing system, crafted solely by developers, lacked visual consistency and crucial features, forcing stakeholders to rely on external spreadsheets for record-keeping and creating workflow inefficiencies.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection className="mt-12" delay={0.2}>
          <div className="flex items-center gap-2 text-primary">
            <ArrowDown className="w-4 h-4 animate-bounce" />
            <span className="text-sm font-sans tracking-wide">
              Scroll to dive deeper
            </span>
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* Project Process */}
      <section className="relative">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-background"></div>
        <div className="relative z-10 px-6 md:px-16 lg:px-24 py-12 md:py-16">
          <SectionHeader
            label="01 / Process"
            title="Understanding the redesign challenge"
          />
          <div className="h-screen">
            <RadialOrbitalTimeline
              timelineData={[
                {
                  id: 1,
                  title: "Research & Discovery",
                  date: "Phase 01",
                  content: "Analyzed current system challenges and conducted stakeholder interviews to identify pain points and missing features",
                  category: "Research",
                  icon: Search,
                  relatedIds: [2],
                  status: "completed",
                  energy: 100,
                },
                {
                  id: 2,
                  title: "Competitive Analysis",
                  date: "Phase 02",
                  content: "Benchmarked industry standards and best practices for management systems through comprehensive research",
                  category: "Strategy",
                  icon: Target,
                  relatedIds: [1, 3],
                  status: "completed",
                  energy: 95,
                },
                {
                  id: 3,
                  title: "Wireframing",
                  date: "Phase 03",
                  content: "Created low-fidelity wireframes addressing identified pain points and improving user workflow",
                  category: "Design",
                  icon: Code,
                  relatedIds: [2, 4],
                  status: "completed",
                  energy: 90,
                },
                {
                  id: 4,
                  title: "Design System",
                  date: "Phase 04",
                  content: "Developed simple design system ensuring visual consistency across all interface components",
                  category: "System",
                  icon: Palette,
                  relatedIds: [3, 5],
                  status: "completed",
                  energy: 85,
                },
                {
                  id: 5,
                  title: "High-Fidelity Design",
                  date: "Phase 05",
                  content: "Produced polished designs with improved UX/UI patterns and enhanced user experience",
                  category: "Implementation",
                  icon: TestTube,
                  relatedIds: [4, 6],
                  status: "completed",
                  energy: 80,
                },
                {
                  id: 6,
                  title: "Handoff & Collaboration",
                  date: "Phase 06",
                  content: "Collaborated with senior designer for final implementation guidance and development handoff",
                  category: "Delivery",
                  icon: Rocket,
                  relatedIds: [5],
                  status: "completed",
                  energy: 75,
                },
              ]}
            />
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* The Challenge */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="02 / The Challenge"
          title="Addressing fundamental usability issues"
          description="The existing system created by developers lacked design expertise, resulting in poor user experience and workflow inefficiencies."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mt-12">
          <AnimatedSection delay={0.1}>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-display font-semibold text-foreground">
                  Core Problems Identified
                </h3>
                <ul className="space-y-3 text-base text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <span>Lack of visual consistency creating disjointed user experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <span>Cumbersome navigation hindering efficient task completion</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <span>Missing crucial features forcing spreadsheet dependency</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></div>
                    <span>Developer-focused interface not optimized for end users</span>
                  </li>
                </ul>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <ImageShowcase
              src="/images/human1.png"
              alt="Current internal management system interface showing usability issues"
              caption="Revamping internal management system"
              className="rounded-2xl"
            />
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />

      {/* My Role */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="03 / My Role"
          title="Collaborative design approach"
          description="Working alongside a senior designer to transform the internal management system through research-driven design solutions."
        />

        <AnimatedSection className="mt-12" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Research & Analysis
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Conducted comprehensive user research with internal stakeholders to identify pain points and missing features. Benchmarked industry standards through analysis of similar web applications.
              </p>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  Design & Systems
                </h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Created wireframes addressing identified issues, developed a simple design system for consistency, and produced high-fidelity designs with improved UX/UI patterns.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* Solution */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="04 / Solution"
          title="Comprehensive system redesign"
          description="A complete overhaul focusing on visual coherence, simplified navigation, and enhanced functionality."
        />

        <div className="space-y-12 md:space-y-16 mt-12">
          <AnimatedSection delay={0.1}>
            <ImageShowcase
              src="/images/human2.png"
              alt="Design system specifications showing component library and style guide"
              caption="Design system specifications"
              className="rounded-2xl"
            />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-display font-bold text-foreground">
                  Key Improvements
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-card border border-border rounded-xl">
                    <h4 className="font-medium text-foreground mb-2">Enhanced Visual Coherence</h4>
                    <p className="text-sm text-muted-foreground">Implemented consistent design patterns and visual elements across all interface components.</p>
                  </div>
                  <div className="p-4 bg-card border border-border rounded-xl">
                    <h4 className="font-medium text-foreground mb-2">Streamlined Navigation</h4>
                    <p className="text-sm text-muted-foreground">Simplified user journey with intuitive information architecture and reduced friction points.</p>
                  </div>
                  <div className="p-4 bg-card border border-border rounded-xl">
                    <h4 className="font-medium text-foreground mb-2">Integrated Functionality</h4>
                    <p className="text-sm text-muted-foreground">Added missing features to eliminate dependency on external spreadsheet tools.</p>
                  </div>
                </div>
              </div>

              <ImageShowcase
                src="/images/human3.png"
                alt="Final design for the Humadroid web app showing improved interface"
                caption="Final design for the Humadroid web app"
                className="rounded-2xl"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />

      {/* Learnings */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="05 / Learnings"
          title="Key insights from system redesign"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <LearningCard
            title="Understanding the problem"
            description="Gained a deep understanding of the current design and its challenges through thorough analysis and stakeholder feedback."
            delay={0}
          />
          <LearningCard
            title="User research is the key"
            description="Conducted user interviews to identify key pain points and opportunities for task automation within the app."
            delay={0.1}
          />
          <LearningCard
            title="Visual coherence"
            description="Collaborated closely with a senior UI designer to ensure stylistic coherence and develop a basic design system for visual consistency."
            delay={0.2}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-12 md:py-16 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground font-sans">
              Humadroid Internal Management System Case Study
            </span>
            <span className="text-xs text-muted-foreground/60 font-sans">
              UX Design / Product Design / System Design / Internal Tools
            </span>
          </div>
          <AnimatedSection>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors cursor-pointer">
              <span className="font-sans">Back to top</span>
            </div>
          </AnimatedSection>
        </div>
      </footer>
    </div>
  );
}