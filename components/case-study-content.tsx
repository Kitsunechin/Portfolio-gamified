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
        { label: "Duration", value: "3 months" },
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

export default function CaseStudyContent() {
  return (
    <div className="flex flex-col w-full">
      {/* Overview */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <OverviewBanner />

        <div className="mt-16 md:mt-20 flex flex-col md:flex-row gap-12 md:gap-20">
          <AnimatedSection className="flex-1">
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-sans">
              The J&T app helps workers organize their schedules and track work
              time. As the platform expanded, we discovered a critical gap in
              user onboarding that was directly impacting engagement metrics
              across new sites.
            </p>
          </AnimatedSection>
          <AnimatedSection className="flex-1" delay={0.15}>
            <p className="text-base text-muted-foreground leading-relaxed font-sans">
              I led the design of an in-app guided tour system using contextual
              tooltips, replacing the dependency on on-site representatives.
              The result was a scalable onboarding solution documented as a
              reusable design system component.
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
                  title: "Discovery",
                  date: "Phase 01",
                  content: "User research analysis, behavioral pattern identification, and understanding worker pain points with the current app experience and onboarding process.",
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
                  content: "Defining key challenges: complex interface barriers, lack of proper onboarding, and workers missing essential features like shift management.",
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
                  content: "Creating contextual guided tours with team-specific flows, progressive feature disclosure, and real-time workflow integration.",
                  category: "Design",
                  icon: Palette,
                  relatedIds: [2, 4],
                  status: "completed",
                  energy: 90,
                },
                {
                  id: 4,
                  title: "Development",
                  date: "Phase 04",
                  content: "Implementing tour system with context-aware triggers, team customization features, and seamless integration with existing app architecture.",
                  category: "Engineering",
                  icon: Code,
                  relatedIds: [3, 5],
                  status: "completed",
                  energy: 85,
                },
                {
                  id: 5,
                  title: "User Testing",
                  date: "Phase 05",
                  content: "Multiple rounds of testing with real workers across different sites, refining tour flows, timing, and contextual triggers based on feedback.",
                  category: "Validation",
                  icon: TestTube,
                  relatedIds: [4, 6],
                  status: "completed",
                  energy: 80,
                },
                {
                  id: 6,
                  title: "Launch & Impact",
                  date: "Phase 06",
                  content: "Rolling out guided tours across all worker teams, achieving 60-90% onboarding completion rates and 83% feature discovery improvement.",
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
          title="A 10% and 9% gap between supported and unsupported sites"
          description="As the app was introduced to more locations, engagement metrics revealed a significant disparity."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            value="83%"
            label="Shift response (with support)"
            description="Workers responding to shifts at sites with dedicated J&T representatives providing on-site onboarding."
            delay={0}
          />
          <StatCard
            value="73%"
            label="Shift response (without support)"
            description="Workers responding to shifts at sites without J&T support, relying solely on the app experience."
            delay={0.1}
          />
          <StatCard
            value="90%"
            label="Clocking rate (with support)"
            description="Workers clocking in on time at sites with dedicated J&T representatives providing guidance."
            delay={0.2}
          />
          <StatCard
            value="81%"
            label="Clocking rate (without support)"
            description="Workers clocking in on time at sites without J&T support, showing baseline performance."
            delay={0.3}
          />
        </div>

        <AnimatedSection className="mt-12 md:mt-16" delay={0.1}>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <p className="text-base text-muted-foreground leading-relaxed">
              The app heavily relied on off-app onboarding conducted by J&T
              representatives (on-site managers). However, as the app was
              introduced to more locations, we noticed a substantial drop in
              engagement metrics. This disparity highlighted the need for an
              effective in-app onboarding solution to ensure consistent user
              engagement and successful app adoption.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* My Role */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="03 / My Role"
          title="Leading the onboarding redesign from research to documentation"
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
                Research & Analysis
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Carried out analysis of other apps and possible solutions for
                implementing the guided tour. Audited existing unused
                onboarding elements that were inconsistently implemented across
                the app to explain some features.
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
                Design System Documentation
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Provided the logic behind the guided tour component and created
                its documentation for the design system, enabling other
                designers working on different parts of the app to easily
                implement it.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />

      {/* Research - Competitive Analysis */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="04 / Research"
          title="Analyzing onboarding patterns across leading apps"
          description="Studying guided tour implementations from Strava, Klarna, Revolut and other apps to inform our approach."
        />

        <ImageShowcase
          src="/images/guided1.png"
          alt="Competitive analysis of onboarding patterns from Strava, Klarna, Revolut and other apps showing various tooltip and guided tour implementations"
          caption="Competitive analysis board - Studying contextual tooltip patterns from Strava, Klarna, Revolut, and other leading mobile apps"
        />
      </section>

      <SectionDivider />

      {/* Solution */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="05 / Solution"
          title="Contextual tooltips triggered by user actions"
          description="Introducing guided tour tooltips that explain the app's value proposition, focusing on enhancing the worker's experience in managing shifts and clocking in on time."
        />

        <AnimatedSection>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-primary/20 mb-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Approach
                </span>
                <p className="text-base text-foreground leading-relaxed">
                  Contextual tooltips are triggered when users open specific
                  tabs. They explain the app's value proposition, focusing on
                  enhancing the worker's experience in managing their shifts and
                  clocking in on time.
                </p>
              </div>
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Goal
                </span>
                <p className="text-base text-foreground leading-relaxed">
                  Highlight the positive implications on the worker's metrics,
                  ensuring users understand the benefits and importance of key
                  features right from the start.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <ImageShowcase
          src="/images/guided3.png"
          alt="Design overview showing the guided tour implementation with component specifications, tour elements, new tour design, and animation assets"
          caption="Design overview - Tour elements, component design, new contextual tour implementation, and animation assets for the guided experience"
          delay={0.1}
        />
      </section>

      <SectionDivider />

      {/* Component Design */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="06 / Component Design"
          title="Popover component for the design system"
          description="A documented, reusable component tailored for guided tours that can be implemented across different parts of the app by any designer."
        />

        <ImageShowcase
          src="/images/guided2.png"
          alt="Popover component documentation showing anatomy, spacing specifications, example designs with mobile screenshots, and animation guidelines"
          caption="Component documentation - Anatomy, spacing, example designs, and animation guidelines for the Guided Tour Popover component"
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatedSection>
            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-card border border-border">
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans">
                Popover
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Main container for text and media with a max of 2-line header
                and 4-line body. Width fixed at 320px.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-card border border-border">
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans">
                Stepper
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Navigation buttons to move through guided tour steps. If only
                one feature per tab, pagination is hidden and a single button
                finishes the tour.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col gap-3 p-6 rounded-2xl bg-card border border-border">
              <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans">
                Animations
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lottie files for developers, exported from Jitter. Grey-scale
                and black/white colors used to illustrate actions within the
                tooltip.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />

      {/* Impact */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="07 / Impact"
          title="From 60% to 90% conversion rate"
          description="The guided tour delivered measurable improvements in both conversion and engagement across all sites."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard
            value="60% to 90%"
            label="Conversion rate"
            description="Remarkable improvement compared to the previous single-feature tour, demonstrating the effectiveness of contextual onboarding."
            delay={0}
          />
          <StatCard
            value="73% to 80%"
            label="Shift response rate"
            description="For sites lacking J&T support, the response rate to assigned shifts increased to a steady 80%."
            delay={0.1}
          />
          <StatCard
            value="81% to 93%"
            label="Clocking rate"
            description="Significant improvement in time tracking performance as workers became more proficient with the app's features."
            delay={0.2}
          />
        </div>

        <div className="flex flex-col gap-8 p-6 md:p-8 rounded-2xl bg-card border border-border">
          <h3 className="text-lg font-display font-semibold text-foreground">
            Before vs. After
          </h3>
          <MetricBar
            label="Tour conversion rate"
            before={60}
            after={90}
            delay={0}
          />
          <MetricBar
            label="Shift response rate"
            before={73}
            after={80}
            delay={0.2}
          />
          <MetricBar
            label="Clocking rate"
            before={81}
            after={93}
            delay={0.4}
          />
        </div>
      </section>

      <SectionDivider />

      {/* Learnings */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="08 / Learnings"
          title="Key takeaways from the guided tour project"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LearningCard
            title="User education drives behavior change"
            description="Tailored, team-specific guided tours helped workers better understand key features like shift management and clock-ins—boosting engagement by aligning onboarding with real-world workflows."
            delay={0}
          />
          <LearningCard
            title="Consistency strengthens cross-team collaboration"
            description="Clearly defined UI components and interaction patterns ensured alignment with the design system, reducing friction and promoting reuse across distributed product teams."
            delay={0.1}
          />
          <LearningCard
            title="Data should guide product decisions"
            description="Introducing new features based on user behavior—like the role of onsite managers in promoting app usage—led to more relevant, effective solutions."
            delay={0.2}
          />
          <LearningCard
            title="Ground-level impact can influence top-down priorities"
            description="Sites with strong onsite support consistently outperformed others, offering proof that user-facing improvements deserve space on a roadmap traditionally driven by business goals."
            delay={0.3}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-12 md:py-16 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground font-sans">
              J&T Guided Tour Case Study
            </span>
            <span className="text-xs text-muted-foreground/60 font-sans">
              UX Design / Product Design / Design Systems
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
