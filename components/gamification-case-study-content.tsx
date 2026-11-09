"use client";

import AnimatedSection from "@/components/animated-section";
import SectionHeader from "@/components/section-header";
import StatCard from "@/components/stat-card";
import ImageShowcase from "@/components/image-showcase";
import LearningCard from "@/components/learning-card";
import MetricBar from "@/components/metric-bar";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, BookOpen, Users, TrendingUp, Target, Search, Lightbulb, Palette, Code, TestTube, Rocket } from "lucide-react";

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
        { label: "Role", value: "UX Design Lead" },
        { label: "Duration", value: "4 months" },
        { label: "Platform", value: "iOS & Android" },
        { label: "Team", value: "Product Design" },
      ].map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-1 p-5 md:p-6 bg-card"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans">
            {item.label}
          </span>
          <span className="text-sm md:text-base font-display font-semibold text-foreground">
            {item.value}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

export default function GamificationCaseStudyContent() {
  return (
    <div className="flex flex-col w-full">
      {/* Overview */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <OverviewBanner />

        <div className="mt-16 md:mt-20 flex flex-col md:flex-row gap-12 md:gap-20">
          <AnimatedSection className="flex-1">
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-sans">
              Two critical worker behaviors had plateaued simultaneously: inconsistent
              clock-ins and stagnant shift response rates. For enterprise clients like
              DHL and UPS, this created payroll compliance gaps and unreliable workforce planning.
            </p>
          </AnimatedSection>
          <AnimatedSection className="flex-1" delay={0.15}>
            <p className="text-base text-muted-foreground leading-relaxed font-sans">
              I designed a behavioral intervention using points systems and contextual
              notifications to turn infrequent, low-salience actions into reliable habits
              for a workforce with high daily variability.
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
        <div className="relative z-10">
          <div className="px-6 md:px-16 lg:px-24 pt-12 md:pt-16 pb-0">
            <SectionHeader
              label="01 / Project Process"
              title="From worker research to gamified engagement"
              description="Click on each phase to explore the development process and key milestones"
            />
          </div>

          <div className="h-screen">
            <RadialOrbitalTimeline
              timelineData={[
                {
                  id: 1,
                  title: "Worker Research",
                  date: "Phase 01",
                  content: "User interviews revealed that clocking and shift response issues stemmed from both forgetfulness and deprioritization. Workers had no visible feedback loop connecting their behavior to outcomes they cared about.",
                  category: "Research",
                  icon: Search,
                  relatedIds: [2],
                  status: "completed",
                  energy: 100,
                },
                {
                  id: 2,
                  title: "Behavioral Analysis",
                  date: "Phase 02",
                  content: "Applied Yu-Kai Chou's Octalysis Framework and BJ Fogg's Behavior Model to identify motivation and prompt gaps. The issue wasn't ability—it was motivation and timing.",
                  category: "Strategy",
                  icon: Lightbulb,
                  relatedIds: [1, 3],
                  status: "completed",
                  energy: 95,
                },
                {
                  id: 3,
                  title: "Points & Progress Design",
                  date: "Phase 03",
                  content: "Designed a unified points system for on-time clock-ins and timely shift responses, with visible progress tracking to make invisible behaviors tangible and rewarding.",
                  category: "Design",
                  icon: Palette,
                  relatedIds: [2, 4],
                  status: "completed",
                  energy: 90,
                },
                {
                  id: 4,
                  title: "Notification Redesign",
                  date: "Phase 04",
                  content: "Redesigned behavioral push notifications to deliver time-sensitive, contextually relevant prompts with personal relevance and genuine urgency rather than generic alerts.",
                  category: "Validation",
                  icon: TestTube,
                  relatedIds: [3, 5],
                  status: "completed",
                  energy: 85,
                },
                {
                  id: 5,
                  title: "Implementation",
                  date: "Phase 05",
                  content: "Integrated points tracking and contextual notifications into existing flows, ensuring prompts arrived at the exact moment behaviors were possible with motivation attached.",
                  category: "Engineering",
                  icon: Code,
                  relatedIds: [4, 6],
                  status: "completed",
                  energy: 80,
                },
                {
                  id: 6,
                  title: "Behavioral Impact",
                  date: "Phase 06",
                  content: "Achieved 35% increase in clocking rate and 30% increase in shift response rate—both metrics had been stagnant despite previous product iterations.",
                  category: "Deployment",
                  icon: Rocket,
                  relatedIds: [5],
                  status: "completed",
                  energy: 100,
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
          title="Two critical behaviors stagnated: clocking and shift response"
          description="The product had the mechanics but no motivation layer to drive consistent, timely action from workers."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            value="Inconsistent"
            label="Clock-in behavior"
            description="Workers were clocking in late or inconsistently, creating payroll and compliance gaps for enterprise clients like DHL and UPS."
            delay={0}
          />
          <StatCard
            value="Stagnant"
            label="Shift response rates"
            description="Slow shift response rates made workforce planning unreliable, affecting both company operations and worker opportunities."
            delay={0.1}
          />
        </div>

        <AnimatedSection className="mt-12 md:mt-16" delay={0.1}>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <p className="text-base text-muted-foreground leading-relaxed">
              The real problem was behavioral: how do you turn two infrequent,
              low-salience actions into reliable habits for a workforce with high
              daily variability and low digital engagement? Both behaviors affected
              worker standing and future shift allocation, yet workers had no visible
              connection between their actions and outcomes.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* Research - Discovery Phase */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="03 / Discovery"
          title="Worker research revealed both forgetfulness and deprioritization"
          description="User interviews uncovered that clocking and shift response issues stemmed from both forgetting and lack of motivation due to invisible feedback loops."
        />

        <ImageShowcase
          src="/images/Workers_Research.png"
          alt="Worker research findings showing behavioral patterns, interview insights, and the gap between worker understanding and action across different sites"
          caption="Worker research analysis - Interview findings revealing the disconnect between understanding expectations and taking action"
        />

        <div className="mt-12">
          <ImageShowcase
            src="/images/worker_journey.png"
            alt="Worker journey mapping showing the touchpoints, pain points, and behavioral decision moments across clock-in and shift response workflows"
            caption="Worker journey mapping - Identifying key moments where motivation and prompt gaps occur in the clock-in and shift response processes"
            delay={0.1}
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">
                Worker Interview Findings
              </h3>
              <ul className="text-sm text-muted-foreground leading-relaxed space-y-2">
                <li>• No visible feedback loop connecting behavior to outcomes</li>
                <li>• Shift acceptance and clocking were mentally disconnected</li>
                <li>• Existing notifications felt generic and easy to dismiss</li>
                <li>• No visibility into their own consistency patterns</li>
              </ul>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">
                Behavioral Science Framework
              </h3>
              <ul className="text-sm text-muted-foreground leading-relaxed space-y-2">
                <li>• Yu-Kai Chou's Octalysis: Development & Accomplishment</li>
                <li>• BJ Fogg's B=MAP: Motivation and Prompt gaps identified</li>
                <li>• Habit loop theory: Cue → Routine → Reward</li>
                <li>• Focus on scarcity and ownership psychological drivers</li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />

      {/* Solution */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="04 / Solution"
          title="Points system and behavioral notifications"
          description="A unified motivation layer connecting on-time clock-ins and timely shift responses to visible progress and contextual prompts."
        />

        <AnimatedSection>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-primary/20 mb-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Points & Progress Tracking
                </span>
                <p className="text-base text-foreground leading-relaxed">
                  Introduced a visible points system where on-time clock-ins and
                  timely shift responses accumulate points, making invisible
                  behaviors tangible and creating a unified motivation layer.
                </p>
              </div>
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Contextual Notifications
                </span>
                <p className="text-base text-foreground leading-relaxed">
                  Redesigned notifications to deliver time-sensitive, personally
                  relevant prompts at the exact moment behaviors are possible,
                  creating urgency and making inaction feel costly.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <ImageShowcase
          src="/images/gamification_profile-2.png"
          alt="Gamification profile interface showing points tracking, progress visualization, and consistency patterns in the worker app"
          caption="Profile gamification - Points system and progress tracking integrated into the worker profile to create visibility into behavior patterns"
          delay={0.1}
        />
      </section>

      <SectionDivider />

      {/* Final Designs */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="05 / Final Designs"
          title="Behavioral intervention integrated into existing workflows"
          description="Points tracking and contextual notifications seamlessly embedded within clock-in and shift response flows."
        />

        <ImageShowcase
          src="/images/gamification_2.png"
          alt="Final gamification designs showing points accumulation, progress tracking, and contextual notifications integrated across clock-in and shift response flows"
          caption="Final implementation - Points tracking, progress visualization, and contextual prompts integrated into core worker behaviors"
        />

        <div className="mt-12">
          <ImageShowcase
            src="/images/Clocking.png"
            alt="Gamified clocking experience showing points accumulation, streak tracking, and motivational feedback integrated into the clock-in flow"
            caption="Clocking gamification - Points system and progress feedback integrated directly into the clock-in experience to create immediate motivation"
            delay={0.1}
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedSection>
            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-card border border-border">
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans">
                Unified Points System
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Single points system for both on-time clock-ins and timely shift
                responses, creating a unified motivation layer that reinforces
                the connection between both behaviors.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-card border border-border">
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans">
                Streak Dynamics
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Progress tracker creates streak-like dynamics where workers can
                see their consistency patterns and feel motivated to maintain
                their accumulated progress.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-card border border-border">
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans">
                Contextual Prompts
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Time-sensitive notifications arrive precisely when behaviors are
                possible, with personal relevance and urgency that makes the
                right action feel immediately important.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />

      {/* Impact */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="06 / Impact"
          title="35% increase in clocking, 30% increase in shift response"
          description="Both metrics had been stagnant despite previous product iterations. The behavioral intervention delivered measurable results."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <StatCard
            value="+35%"
            label="Clock-in rate improvement"
            description="Significant increase in on-time and consistent clock-in behavior from the pre-intervention baseline across all sites."
            delay={0}
          />
          <StatCard
            value="+30%"
            label="Shift response rate improvement"
            description="Workers responded to offered shifts more quickly and reliably, improving workforce planning and scheduling efficiency."
            delay={0.1}
          />
        </div>

        <AnimatedSection className="mt-12 md:mt-16" delay={0.1}>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <p className="text-base text-muted-foreground leading-relaxed">
              This wasn't a UI problem solved with a UI solution. It was a behavioral
              problem diagnosed through worker research and solved through evidence-based
              motivational design. The solution addressed both forgetfulness through
              contextual prompts and deprioritization through visible progress and
              intrinsic motivation systems.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* Learnings */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="07 / Learnings"
          title="Key takeaways from the behavioral intervention"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LearningCard
            title="Behavioral diagnosis before design solution"
            description="Understanding why workers weren't performing target behaviors—both forgetfulness and deprioritization—was essential to designing an effective intervention rather than just improving the interface."
            delay={0}
          />
          <LearningCard
            title="Motivation and prompt gaps, not ability gaps"
            description="BJ Fogg's B=MAP model revealed that workers had the ability to clock in and respond to shifts. The intervention needed to address motivation visibility and contextual prompting."
            delay={0.1}
          />
          <LearningCard
            title="Unified motivation layer connects behaviors"
            description="Linking both clock-in and shift response behaviors to the same points system created mental connections that worker research showed was previously missing."
            delay={0.2}
          />
          <LearningCard
            title="Evidence-based design produces measurable outcomes"
            description="Grounding the intervention in established behavioral science frameworks—Octalysis, habit loops, scarcity psychology—delivered 35% and 30% improvements that previous iterations hadn't achieved."
            delay={0.3}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-12 md:py-16 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground font-sans">
              J&T Gamification Case Study
            </span>
            <span className="text-xs text-muted-foreground/60 font-sans">
              UX Design / Gamification / Behavioral Design
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