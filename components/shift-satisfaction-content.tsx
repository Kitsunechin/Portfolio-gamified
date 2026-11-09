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
        { label: "Role", value: "Product Designer" },
        { label: "Duration", value: "Apr 2023 - May 2023" },
        { label: "Platform", value: "iOS & Android" },
        { label: "Team", value: "Product Manager, 6 Mobile App engineers, 3 backend engineers" },
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

export default function ShiftSatisfactionContent() {
  return (
    <div className="flex flex-col w-full">
      {/* Overview */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <OverviewBanner />

        <div className="mt-16 md:mt-20 flex flex-col md:flex-row gap-12 md:gap-20">
          <AnimatedSection className="flex-1">
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-sans">
              Supervisors had no clear way to understand how workers felt about their shifts, making it difficult to measure worker sentiment and introduce any improvements. At the same time, workers lacked a way to share their experiences.
            </p>
          </AnimatedSection>
          <AnimatedSection className="flex-1" delay={0.15}>
            <p className="text-base text-muted-foreground leading-relaxed font-sans">
              I led the design and research efforts to create a structured yet effortless feedback system that would empower workers while providing supervisors with actionable insights to improve workplace conditions.
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
              title="From user research to implementation"
              description="Click on each phase to explore the development process and key milestones"
            />
          </div>

          <div className="h-screen">
            <RadialOrbitalTimeline
              timelineData={[
                {
                  id: 1,
                  title: "User Research",
                  date: "Phase 01",
                  content: "Conducted user research through surveys to understand worker preferences for giving feedback and explored best practices for in-app feedback mechanisms.",
                  category: "Research",
                  icon: Search,
                  relatedIds: [2],
                  status: "completed",
                  energy: 100,
                },
                {
                  id: 2,
                  title: "Problem Definition",
                  date: "Phase 02",
                  content: "Identified the imbalance between worker sentiment and supervisor insights. Workers felt unheard while supervisors missed valuable improvement opportunities.",
                  category: "Strategy",
                  icon: Lightbulb,
                  relatedIds: [1, 3],
                  status: "completed",
                  energy: 95,
                },
                {
                  id: 3,
                  title: "Design Solution",
                  date: "Phase 03",
                  content: "Designed a smiley-based rating system with optional comments, integrated naturally into the worker's journey after clocking out.",
                  category: "Design",
                  icon: Palette,
                  relatedIds: [2, 4],
                  status: "completed",
                  energy: 90,
                },
                {
                  id: 4,
                  title: "Cross-team Collaboration",
                  date: "Phase 04",
                  content: "Collaborated with the B2B sister app team to add worker rating features for supervisors, creating a two-way feedback system.",
                  category: "Collaboration",
                  icon: Users,
                  relatedIds: [3, 5],
                  status: "completed",
                  energy: 85,
                },
                {
                  id: 5,
                  title: "Implementation",
                  date: "Phase 05",
                  content: "Built the feedback system with immediate post-clock-out prompts and additional feedback options through shift details pages.",
                  category: "Engineering",
                  icon: Code,
                  relatedIds: [4, 6],
                  status: "completed",
                  energy: 80,
                },
                {
                  id: 6,
                  title: "Launch & Impact",
                  date: "Phase 06",
                  content: "Successfully launched the feedback system, achieving 40% immediate feedback adoption and 10% additional feedback through shift details.",
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
          title="Workers felt unheard while supervisors lacked actionable insights"
          description="An imbalance that prevented meaningful workplace improvements and worker satisfaction."
        />

        <AnimatedSection className="mt-12 md:mt-16" delay={0.1}>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <p className="text-base text-muted-foreground leading-relaxed">
              This created an imbalance—workers felt unheard, and supervisors missed valuable insights that could improve the overall work environment. While workers were already asked to provide a simple satisfaction score after their shifts, the lack of qualitative feedback meant there was no actionable data to drive improvements. A more structured feedback system was needed to foster transparency and trust while ensuring that both workers and supervisors had a meaningful way to contribute to workplace improvement.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* My Role */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="03 / My Role"
          title="Leading design and research for a structured feedback system"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-display font-bold text-sm">
                  R
                </span>
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">
                Research & User Understanding
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Conducted user research through surveys to understand worker preferences for giving feedback and explored best practices for in-app feedback mechanisms.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-display font-bold text-sm">
                  D
                </span>
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">
                Cross-functional Collaboration
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Collaborated with cross-functional teams, including developers and the B2B sister app designer, to maintain consistency across platforms and create a unified feedback experience.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />

      {/* Research */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="04 / Research"
          title="Understanding worker feedback preferences and behaviors"
          description="User interviews revealed insights about timing, simplicity, and the importance of feeling heard in the workplace."
        />

        <ImageShowcase
          src="/images/satisfaction1.png"
          alt="User interview output showing worker feedback preferences and behaviors"
          caption="User interview output - Understanding how workers prefer to give feedback and what motivates them to share their experiences"
        />
      </section>

      <SectionDivider />

      {/* Solution */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="05 / Solution"
          title="A smiley-based rating system for effortless feedback"
          description="Fast and frustration-free feedback collection integrated naturally into the worker journey."
        />

        <AnimatedSection>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-primary/20 mb-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Approach
                </span>
                <p className="text-base text-foreground leading-relaxed">
                  To keep things fast and frustration-free, I designed a smiley-based rating system that let workers share their shift experience in seconds. Right after clocking out, workers could quickly select a happy, neutral, or sad face to rate their shift.
                </p>
              </div>
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Flexibility
                </span>
                <p className="text-base text-foreground leading-relaxed">
                  If they chose neutral or sad, they could add a short comment explaining what went wrong. They could also leave feedback later through the shift details page if they needed more time to think about it.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ImageShowcase
            src="/images/satisfaction2.png"
            alt="Final design for user rating showing the smiley-based feedback system"
            caption="Final design for user rating - Simple smiley-based interface for quick shift feedback"
          />
          <ImageShowcase
            src="/images/satisfaction3.png"
            alt="Final design for shift ratings showing the supervisor view"
            caption="Final design for shift ratings - Supervisor dashboard showing aggregated worker feedback and insights"
            delay={0.1}
          />
        </div>

        <AnimatedSection delay={0.2}>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">
              Two-way feedback system
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              To make sure their voices led to real change, I worked with the B2B sister app team to add a worker rating feature for supervisors. This created a two-way feedback system—workers could rate their shifts, and supervisors could improve based on real insights.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* Impact */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="06 / Impact"
          title="Immediate adoption and improved worker satisfaction"
          description="The feedback system created measurable improvements in worker engagement and supervisor insights."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <StatCard
            value="40%"
            label="Immediate feedback adoption"
            description="Workers now leave shift feedback as soon as they clock out, showing the effectiveness of timing-based prompts."
            delay={0}
          />
          <StatCard
            value="10%"
            label="Additional feedback"
            description="More workers provide feedback later through shift details, giving them time to reflect on their experience."
            delay={0.1}
          />
        </div>

        <AnimatedSection className="mt-12" delay={0.2}>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">
              Real-time workplace improvements
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed">
              Supervisors now have real-time data on workplace issues, helping them fix problems faster and improve conditions for future shifts. Workers finally have a say, making them feel valued and heard in their workplace.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* Key Performance Indicators */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="07 / Key Performance Indicators"
          title="Measuring the success of the feedback system"
        />

        <div className="flex flex-col gap-8 p-6 md:p-8 rounded-2xl bg-card border border-border">
          <h3 className="text-lg font-display font-semibold text-foreground">
            Feature Adoption Metrics
          </h3>
          <MetricBar
            label="Feature adoption on clock out"
            before={0}
            after={40}
            delay={0}
          />
          <MetricBar
            label="Feature adoption after returning to app"
            before={0}
            after={10}
            delay={0.2}
          />
        </div>
      </section>

      <SectionDivider />

      {/* Learnings */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="08 / Learnings"
          title="Key takeaways from the shift satisfaction project"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LearningCard
            title="Timing is everything in feedback collection"
            description="Prompting users for feedback immediately after a shift led to significantly higher response rates, showing that relevance and timing are key to capturing authentic insights."
            delay={0}
          />
          <LearningCard
            title="Cross-team alignment enhances the end-to-end experience"
            description="Collaborating closely with B2B team designers ensured consistency and cohesion across worker and supervisor interfaces, creating a unified, seamless experience."
            delay={0.1}
          />
          <LearningCard
            title="Micro-interactions can guide and delight"
            description="Designing custom Lottie animations in Jitter made complex flows more engaging and intuitive—turning utility into a moment of clarity and delight."
            delay={0.2}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-12 md:py-16 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground font-sans">
              J&T Shift Satisfaction Case Study
            </span>
            <span className="text-xs text-muted-foreground/60 font-sans">
              Product Design / UX Research / Cross-platform Design
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