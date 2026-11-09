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
        { label: "Timeline", value: "Jun 2024 - Aug 2024" },
        { label: "Platform", value: "iOS & Android" },
        { label: "Team", value: "Product, 6 Mobile App engineers, 3 backend engineers" },
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

export default function TimeOffContent() {
  return (
    <div className="flex flex-col w-full">
      {/* Overview */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <OverviewBanner />

        <div className="mt-16 md:mt-20 flex flex-col md:flex-row gap-12 md:gap-20">
          <AnimatedSection className="flex-1">
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-sans">
              Workers had no structured way to report their availability, leading to scheduling conflicts and unfair penalties. The existing system was fragmented—workers who couldn't attend a shift were penalized, even if their absence was justified.
            </p>
          </AnimatedSection>
          <AnimatedSection className="flex-1" delay={0.15}>
            <p className="text-base text-muted-foreground leading-relaxed font-sans">
              I led the design of a seamless absence reporting system that balanced the needs of workers, operations teams, and supervisors while aligning legacy systems with a streamlined approach.
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
              title="From problem identification to system integration"
              description="Click on each phase to explore the development process and key milestones"
            />
          </div>

          <div className="h-screen">
            <RadialOrbitalTimeline
              timelineData={[
                {
                  id: 1,
                  title: "Problem Analysis",
                  date: "Phase 01",
                  content: "Analyzed the existing fragmented system where workers faced penalties for justified absences and scheduling conflicts were common.",
                  category: "Research",
                  icon: Search,
                  relatedIds: [2],
                  status: "completed",
                  energy: 100,
                },
                {
                  id: 2,
                  title: "System Gap Identification",
                  date: "Phase 02",
                  content: "Identified key gaps in tracking and communication, particularly in Spain where legacy leave requests were essential but disconnected from scheduling.",
                  category: "Strategy",
                  icon: Lightbulb,
                  relatedIds: [1, 3],
                  status: "completed",
                  energy: 95,
                },
                {
                  id: 3,
                  title: "Dual Flow Design",
                  date: "Phase 03",
                  content: "Introduced two distinct flows: Time off for blocking calendars and Time off documents for submitting leave paperwork to avoid confusion.",
                  category: "Design",
                  icon: Palette,
                  relatedIds: [2, 4],
                  status: "completed",
                  energy: 90,
                },
                {
                  id: 4,
                  title: "Cross-App Integration",
                  date: "Phase 04",
                  content: "Integrated the system into both Workers and Supervisors apps, creating a transparent, closed-loop system for managing availability.",
                  category: "Integration",
                  icon: Users,
                  relatedIds: [3, 5],
                  status: "completed",
                  energy: 85,
                },
                {
                  id: 5,
                  title: "Development & Testing",
                  date: "Phase 05",
                  content: "Built the absence reporting system with calendar integration and refined the 'cannot attend' flow for last-minute emergencies.",
                  category: "Engineering",
                  icon: Code,
                  relatedIds: [4, 6],
                  status: "completed",
                  energy: 80,
                },
                {
                  id: 6,
                  title: "Launch & Adoption",
                  date: "Phase 06",
                  content: "Successfully launched achieving 71% adoption in new markets and 61% in legacy markets, significantly reducing scheduling conflicts.",
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
          title="A fragmented system leading to unfair penalties and scheduling conflicts"
          description="Workers faced unjust consequences while supervisors lacked visibility into actual availability."
        />

        <AnimatedSection className="mt-12 md:mt-16" delay={0.1}>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Meanwhile, in some markets like Spain, a legacy leave request system required workers to submit documents to get paid, but this process wasn't reflected in shift scheduling in the supervisor app. The result was missed shifts, frustrated workers, and operational inefficiencies.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              To solve this, we needed a clear, fair, and connected absence reporting system that would allow workers to proactively report time off, ensure shifts weren't assigned when they weren't available, and create transparency for both workers and supervisors.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* My Role */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="03 / My Role"
          title="Designing a seamless absence reporting system"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-display font-bold text-sm">
                  A
                </span>
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">
                System Analysis & Design
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                After analyzing the existing process, I identified key gaps in tracking and communication, particularly in Spain, where legacy leave requests were essential but disconnected from scheduling systems.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-display font-bold text-sm">
                  I
                </span>
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">
                Integration & Coordination
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                By integrating the system into both the Workers and Supervisors apps, I created a transparent, closed-loop system where workers could manage availability and supervisors could make informed scheduling decisions.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />

      {/* Research & User Flows */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="04 / Research & User Flows"
          title="Mapping the user journey and system requirements"
          description="Understanding the complex workflows across different markets and user types."
        />

        <ImageShowcase
          src="/images/timeoff1.png"
          alt="Time off user flows showing the different pathways for workers to request time off"
          caption="Time off user flows - Mapping the journey from initial request to supervisor approval across different market requirements"
        />
      </section>

      <SectionDivider />

      {/* Solution */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="05 / Solution"
          title="A dual-flow system for proactive absence management"
          description="Balancing simplicity for new users with legacy system requirements for existing markets."
        />

        <AnimatedSection>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-primary/20 mb-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Dual Flow Approach
                </span>
                <p className="text-base text-foreground leading-relaxed">
                  To avoid confusion, I introduced two distinct flows: Time off for blocking calendars and Time off documents for submitting leave paperwork. This allowed legacy users to continue their process while ensuring new users had a simplified experience.
                </p>
              </div>
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Proactive Reporting
                </span>
                <p className="text-base text-foreground leading-relaxed">
                  The new absence reporting system allowed workers to proactively report time off and have it reflected in their calendars and shift assignments, ensuring fairness by linking to attendance metrics.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-8 mb-12">
          <ImageShowcase
            src="/images/timeoff3.png"
            alt="Time off final design showing the completed interface for requesting time off"
            caption="Time off final design - The streamlined interface allowing workers to submit time off requests with clear status tracking and supervisor visibility"
          />
        </div>

        <AnimatedSection delay={0.2}>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">
              Key improvements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Redesigned absence reporting flow</h4>
                <p className="text-sm text-muted-foreground">Allowing workers to submit time off in advance with clear approval processes.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Integration with worker calendars</h4>
                <p className="text-sm text-muted-foreground">Reported absences were visible and accounted for in shift scheduling.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Refined cannot attend flow</h4>
                <p className="text-sm text-muted-foreground">Ensuring it was used only for last-minute emergencies while proactive absences were managed separately.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Legacy system connection</h4>
                <p className="text-sm text-muted-foreground">Workers in markets like Spain could still submit necessary documentation without disrupting their workflow.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* Impact */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="06 / Impact"
          title="Strong adoption and improved operational efficiency"
          description="The feature achieved significant adoption rates and reduced scheduling conflicts across markets."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <StatCard
            value="71%"
            label="Adoption in new markets"
            description="Markets without legacy systems quickly adopted the new time-off reporting flow, showing the value of a streamlined approach."
            delay={0}
          />
          <StatCard
            value="61%"
            label="Adoption in legacy markets"
            description="Even with existing complex processes, legacy markets achieved strong adoption by maintaining familiar workflows."
            delay={0.1}
          />
        </div>

        <AnimatedSection className="mt-12" delay={0.2}>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">
              Operational improvements
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              This improvement significantly reduced scheduling conflicts and unfair penalties, making shift assignment more efficient for supervisors and more predictable for workers.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Supervisors now had full visibility into worker availability, ensuring they only assigned shifts to available workers. Meanwhile, workers no longer faced unjust penalties for taking justified time off, leading to a fairer and more transparent system.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* Key Performance Indicators */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="07 / Key Performance Indicators"
          title="Measuring the success of the time-off system"
        />

        <div className="flex flex-col gap-8 p-6 md:p-8 rounded-2xl bg-card border border-border">
          <h3 className="text-lg font-display font-semibold text-foreground">
            System Efficiency Metrics
          </h3>
          <MetricBar
            label="Time-off submission increase"
            before={0}
            after={50}
            delay={0}
          />
          <MetricBar
            label="Supervisor approval time decrease"
            before={100}
            after={60}
            delay={0.2}
          />
        </div>
      </section>

      <SectionDivider />

      {/* Learnings */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="08 / Learnings"
          title="Key takeaways from the time-off project"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LearningCard
            title="Balancing new features with existing flows"
            description="Carefully structuring the transition, we avoided disrupting users who depended on legacy processes while introducing a scalable, fair system for absence reporting."
            delay={0}
          />
          <LearningCard
            title="Clear terminology is crucial"
            description="Distinguishing between time off and documentation prevented confusion in markets with legacy systems, ensuring users understood exactly which flow to use."
            delay={0.1}
          />
          <LearningCard
            title="Aligning cross-functional teams is essential"
            description="Ensuring consistency across the Workers app, Supervisors app, and different country regulations required extensive coordination and clear communication."
            delay={0.2}
          />
          <LearningCard
            title="Fairness drives adoption"
            description="Workers were more willing to engage with the feature once they saw it helped prevent unfair shift assignments and penalties, creating a positive feedback loop."
            delay={0.3}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-12 md:py-16 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground font-sans">
              J&T Time Off Request Case Study
            </span>
            <span className="text-xs text-muted-foreground/60 font-sans">
              Product Design / System Integration / Cross-platform Design
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