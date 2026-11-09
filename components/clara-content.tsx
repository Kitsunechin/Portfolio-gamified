"use client";

import AnimatedSection from "@/components/animated-section";
import SectionHeader from "@/components/section-header";
import StatCard from "@/components/stat-card";
import ImageShowcase from "@/components/image-showcase";
import LearningCard from "@/components/learning-card";
import MetricBar from "@/components/metric-bar";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Bot, Users, TrendingUp, Target, Search, Lightbulb, Palette, Code, TestTube, Rocket } from "lucide-react";
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
        { label: "Duration", value: "Feb 2024 - June 2024" },
        { label: "Platform", value: "iOS & Android" },
        { label: "Team", value: "Product Manager, 6 Mobile Engineers, 3 Backend Engineers" },
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

export default function ClaraContent() {
  return (
    <div className="flex flex-col w-full">
      {/* Overview */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <OverviewBanner />

        <div className="mt-16 md:mt-20 flex flex-col md:flex-row gap-12 md:gap-20">
          <AnimatedSection className="flex-1">
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-sans">
              Job&Talent needed to unify its job application experience across existing markets and introduce an AI-led recruitment process for new and existing markets.
            </p>
          </AnimatedSection>
          <AnimatedSection className="flex-1" delay={0.15}>
            <p className="text-base text-muted-foreground leading-relaxed font-sans">
              I led the design of Clara, an AI-powered recruitment assistant that autonomously engages jobseekers via phone interviews, assessing suitability while ensuring a seamless transition to active worker status.
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
              title="From concept to delivery"
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
                  content: "User research, market analysis, and understanding existing recruitment pain points across different markets and regions.",
                  category: "Research",
                  icon: Search,
                  relatedIds: [2],
                  status: "completed",
                  energy: 100,
                },
                {
                  id: 2,
                  title: "Ideation",
                  date: "Phase 02",
                  content: "Brainstorming AI-powered solutions, defining Clara's personality and conversation flows, and mapping user journey touchpoints.",
                  category: "Strategy",
                  icon: Lightbulb,
                  relatedIds: [1, 3],
                  status: "completed",
                  energy: 95,
                },
                {
                  id: 3,
                  title: "Design",
                  date: "Phase 03",
                  content: "Creating wireframes, prototypes, and visual designs for both candidate and recruiter experiences, including conversation UI patterns.",
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
                  content: "Implementing AI conversation logic, integrating with HappyRobot platform, and building recruiter dashboard functionality.",
                  category: "Engineering",
                  icon: Code,
                  relatedIds: [3, 5],
                  status: "completed",
                  energy: 85,
                },
                {
                  id: 5,
                  title: "Testing",
                  date: "Phase 05",
                  content: "User testing with real candidates and recruiters, refining conversation flows, and optimizing AI assessment accuracy.",
                  category: "Validation",
                  icon: TestTube,
                  relatedIds: [4, 6],
                  status: "completed",
                  energy: 80,
                },
                {
                  id: 6,
                  title: "Launch",
                  date: "Phase 06",
                  content: "Rolling out Clara across markets, training recruitment teams, and monitoring performance metrics and user feedback.",
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
          title="Unifying recruitment across markets with high operational costs"
          description="The recruitment workflow was heavily human-dependent, inconsistent across regions, and disconnected from the worker app."
        />

        <AnimatedSection className="mt-12 md:mt-16" delay={0.1}>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <p className="text-base text-muted-foreground leading-relaxed">
              The recruitment workflow was heavily human-dependent, inconsistent across regions, and disconnected from the worker app that jobseekers ultimately used to manage shifts and clock in/out. Early engagement with the app was low, delaying activation and impacting retention. Operational costs and time-to-hire were also high due to manual suitability checks.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* My Role */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="03 / My Role"
          title="Leading the AI-powered recruitment experience design"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">
                AI Integration Design
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Designed AI-led interviews that felt personal and trustworthy, ensuring seamless integration with existing recruitment workflows and maintaining user confidence throughout the process.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">
                Cross-functional Collaboration
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Collaborated closely with product, engineering, and operations to balance efficiency, compliance, and user trust while ensuring scalability across multiple markets.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />

      {/* Solution */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="04 / Solution"
          title="Clara: AI-powered recruitment assistant"
          description="An AI-driven virtual recruitment assistant built with HappyRobot that autonomously engages jobseekers via phone interviews."
        />

        <ImageShowcase
          src="/images/clara2.png"
          alt="Clara AI recruitment interface showing the conversation flow and assessment criteria"
          caption="Clara's interview interface - AI-powered conversations with real-time assessment and recruiter oversight"
        />

        <AnimatedSection className="mt-12">
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-primary/20 mb-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Approach
                </span>
                <p className="text-base text-foreground leading-relaxed">
                  Clara autonomously engages jobseekers via phone interviews, assessing suitability for roles based on predefined criteria. The outcome of each call is surfaced in the recruiter admin tool, where human recruiters make final hiring decisions.
                </p>
              </div>
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Key Features
                </span>
                <ul className="text-base text-foreground leading-relaxed space-y-2">
                  <li>• Unified job application flow across markets</li>
                  <li>• AI-led interviews with personal touch</li>
                  <li>• Early app engagement integration</li>
                  <li>• Contact detail verification control</li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="flex justify-center">
          <ImageShowcase
            src="/images/clara3.png"
            alt="Recruiter admin interface showing candidate assessments and hiring decisions"
            caption="Clara final design"
            delay={0.1}
          />
        </div>
      </section>

      <SectionDivider />

      {/* Impact */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="05 / Impact"
          title="Significant operational efficiency and cost reduction"
          description="The AI-powered recruitment solution delivered measurable improvements in efficiency and user experience."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <StatCard
            value="60%"
            label="ES Fulfillment Rate"
            description="Improved fulfillment rate through more efficient candidate screening and matching processes."
            delay={0}
          />
          <StatCard
            value="68%"
            label="YoY New Starters Growth"
            description="THG client achieved significant year-over-year growth in new starter numbers through improved recruitment flow."
            delay={0.1}
          />
        </div>

        <AnimatedSection className="mt-12 md:mt-16" delay={0.1}>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">
              Key Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-base font-medium text-foreground mb-2">Operational Efficiency</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Reduced recruiter workload by automating suitability checks and lowered cost-to-serve through AI calls priced at $0.20 per minute plus $2,000 monthly fee.
                </p>
              </div>
              <div>
                <h4 className="text-base font-medium text-foreground mb-2">User Experience</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Encouraged earlier app adoption, improved activation speed, and established a scalable recruitment model across markets.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-12 md:mt-16" delay={0.2}>
          <div className="flex flex-col gap-8 p-6 md:p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-lg font-display font-semibold text-foreground">
              Platform Performance Metrics
            </h3>
            <MetricBar
              label="Recruitment efficiency improvement"
              before={45}
              after={68}
              delay={0}
            />
            <MetricBar
              label="Cost reduction per placement"
              before={0}
              after={35}
              delay={0.2}
            />
            <MetricBar
              label="Time to hire improvement"
              before={0}
              after={25}
              delay={0.4}
            />
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* Learnings */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="06 / Learnings"
          title="Key insights from designing AI-powered recruitment"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LearningCard
            title="Trust is critical"
            description="Users are more likely to engage with AI when the experience is transparent, respectful, and provides clear next steps."
            delay={0}
          />
          <LearningCard
            title="Balance automation and human oversight"
            description="Fully replacing human recruiters wasn't feasible — the hybrid model increased confidence and mitigated risk."
            delay={0.1}
          />
          <LearningCard
            title="Design for both operational and user goals"
            description="Reducing costs means little if user adoption suffers; aligning both was key to success."
            delay={0.2}
          />
          <LearningCard
            title="Scalability from the start"
            description="Designing for multiple markets required anticipating future localization, regulatory, and user behavior differences early in the process."
            delay={0.3}
          />
        </div>
      </section>

      <SectionDivider />

      {/* Prototype */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="07 / Prototype"
          title="Explore the design prototype"
        />

        <AnimatedSection className="mt-12">
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <p className="text-base text-foreground leading-relaxed mb-6">
              Interact with the live prototype to see the design in action:
            </p>
            <a
              href="https://v0.app/chat/ai-recruiter-prototype-jnlJpE94VgB?b=b_Lg77avBqjo0&path=%2F&ref=Z5MYBR&f=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              View live prototype
              <ArrowDown className="w-4 h-4 rotate-[-45deg]" />
            </a>
          </div>
        </AnimatedSection>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-12 md:py-16 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground font-sans">
              Clara AI Recruiter Case Study
            </span>
            <span className="text-xs text-muted-foreground/60 font-sans">
              UX Design / Product Design / AI Integration / Design Systems
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