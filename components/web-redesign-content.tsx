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
        { label: "Duration", value: "Oct 2023 - Dec 2023" },
        { label: "Platform", value: "Web" },
        { label: "Team", value: "Product Manager, 6 Mobile App engineers, 1 Web engineer" },
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

export default function WebRedesignContent() {
  return (
    <div className="flex flex-col w-full">
      {/* Overview */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <OverviewBanner />

        <div className="mt-16 md:mt-20 flex flex-col md:flex-row gap-12 md:gap-20">
          <AnimatedSection className="flex-1">
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-sans">
              The website's job listings didn't accurately reflect the available vacancies on the app, creating a disconnect between the two platforms. This mismatch was problematic, as 25% of product traffic comes from the web.
            </p>
          </AnimatedSection>
          <AnimatedSection className="flex-1" delay={0.15}>
            <p className="text-base text-muted-foreground leading-relaxed font-sans">
              I led the redesign of the website's UI, removing unnecessary registration walls and outdated application forms while introducing QR codes and deep linking for seamless cross-platform navigation.
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
              title="From analysis to cross-platform alignment"
              description="Click on each phase to explore the development process and key milestones"
            />
          </div>

          <div className="h-screen">
            <RadialOrbitalTimeline
              timelineData={[
                {
                  id: 1,
                  title: "Current State Analysis",
                  date: "Phase 01",
                  content: "Analyzed the existing website to understand the disconnect between web and app job listings, identifying key pain points in user experience.",
                  category: "Research",
                  icon: Search,
                  relatedIds: [2],
                  status: "completed",
                  energy: 100,
                },
                {
                  id: 2,
                  title: "Traffic & Usage Research",
                  date: "Phase 02",
                  content: "Discovered that 25% of product traffic comes from web and majority are mobile users, highlighting the need for mobile-first redesign.",
                  category: "Strategy",
                  icon: Lightbulb,
                  relatedIds: [1, 3],
                  status: "completed",
                  energy: 95,
                },
                {
                  id: 3,
                  title: "UI/UX Redesign",
                  date: "Phase 03",
                  content: "Redesigned the website UI to reflect the app's design language, removing registration walls and creating reusable components.",
                  category: "Design",
                  icon: Palette,
                  relatedIds: [2, 4],
                  status: "completed",
                  energy: 90,
                },
                {
                  id: 4,
                  title: "Cross-Platform Integration",
                  date: "Phase 04",
                  content: "Introduced QR codes and deep linking to enable seamless transition from web browsing to app-based job applications.",
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
                  content: "Collaborated closely with the front-end developer to ensure new components aligned with mobile app functionality.",
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
                  content: "Successfully launched the redesigned website, achieving 40% increase in cross-platform usage and improved job application rates.",
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
          title="Disconnected platforms creating subpar user experience"
          description="A significant portion of web traffic was not converting due to platform inconsistencies."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <StatCard
            value="25%"
            label="Web traffic share"
            description="A significant portion of product traffic comes from the web platform, making website optimization crucial."
            delay={0}
          />
          <StatCard
            value="Mobile-first"
            label="Traffic majority"
            description="Most web traffic came from mobile devices, requiring prioritized mobile accessibility and features."
            delay={0.1}
          />
        </div>

        <AnimatedSection className="mt-12 md:mt-16" delay={0.1}>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <p className="text-base text-muted-foreground leading-relaxed">
              The website's job listings didn't accurately reflect the available vacancies on the app, creating a disconnect between the two platforms. Additionally, unnecessary registration walls and outdated application forms duplicated steps users had to complete in the app, leading to a subpar experience for job seekers who represented a significant portion of our traffic.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* My Role */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="03 / My Role"
          title="Leading the UI redesign and cross-platform alignment"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-display font-bold text-sm">
                  U
                </span>
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">
                UI Redesign & Optimization
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Led the redesign of the website's UI, removing unnecessary registration walls and outdated application forms that duplicated steps users had to complete in the app.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-display font-bold text-sm">
                  M
                </span>
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">
                Mobile-First & Integration
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Prioritized a mobile-first approach and introduced QR codes and deep linking, allowing users to quickly navigate to the relevant job application within the app.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />

      {/* Design Process */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="04 / Design Process"
          title="From current state analysis to final implementation"
          description="Understanding the existing problems and crafting solutions through iterative design."
        />

        <ImageShowcase
          src="/images/redesign1.png"
          alt="Current design analysis showing existing website issues and user pain points"
          caption="Current design analysis - Identifying key issues with job listing accuracy and user experience flows"
        />
      </section>

      <SectionDivider />

      {/* Design Exploration */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="05 / Design Exploration"
          title="Exploring solutions and design alternatives"
          description="Iterating through different approaches to solve cross-platform consistency issues."
        />

        <ImageShowcase
          src="/images/redesign2.png"
          alt="Design explorations showing different UI approaches and layouts"
          caption="Design explorations - Testing various UI approaches for better mobile experience and app alignment"
        />
      </section>

      <SectionDivider />

      {/* Solution */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="06 / Solution"
          title="Synchronized platforms with seamless user experience"
          description="Aligning web and app experiences while introducing smart cross-platform navigation."
        />

        <AnimatedSection>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-primary/20 mb-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Platform Synchronization
                </span>
                <p className="text-base text-foreground leading-relaxed">
                  To enhance the website's effectiveness as a traffic driver for our app, I synchronized the job listings across both platforms and aligned the visual language for consistency.
                </p>
              </div>
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Seamless Transition
                </span>
                <p className="text-base text-foreground leading-relaxed">
                  I introduced QR codes to allow users to easily download the app, enabling a seamless transition from browsing job offers on the website to applying for them within the app.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <ImageShowcase
          src="/images/redesign3.png"
          alt="The final design showing the redesigned website with improved UI and cross-platform features"
          caption="The final design - Completed website redesign with synchronized job listings, QR codes, and mobile-first approach"
          delay={0.1}
        />

        <AnimatedSection delay={0.2}>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border mt-12">
            <h3 className="text-lg font-display font-semibold text-foreground mb-4">
              Key improvements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Synchronized job listings</h4>
                <p className="text-sm text-muted-foreground">Aligned job postings across web and app platforms for consistency.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Removed registration walls</h4>
                <p className="text-sm text-muted-foreground">Eliminated unnecessary barriers to improve user flow.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">QR codes & deep linking</h4>
                <p className="text-sm text-muted-foreground">Enabled seamless transition from web browsing to app application.</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Mobile-first design</h4>
                <p className="text-sm text-muted-foreground">Prioritized mobile experience with filtering and accessibility features.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* Impact */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="07 / Impact"
          title="Significant growth in cross-platform usage and applications"
          description="The redesign delivered measurable improvements in user engagement and conversion."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <StatCard
            value="40%"
            label="Cross-platform usage increase"
            description="Cross-platform usage increased significantly due to the synchronized experience and improved navigation between platforms."
            delay={0}
          />
          <StatCard
            value="14.6%"
            label="Job application growth"
            description="Job applications rose to 14.6% year-over-year, demonstrating positive impact during a traditionally low season."
            delay={0.1}
          />
        </div>

      </section>

      <SectionDivider />

      {/* Key Performance Indicators */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="08 / Key Performance Indicators"
          title="Measuring the success of the web redesign"
        />

        <div className="flex flex-col gap-8 p-6 md:p-8 rounded-2xl bg-card border border-border">
          <h3 className="text-lg font-display font-semibold text-foreground">
            Platform Performance Metrics
          </h3>
          <MetricBar
            label="Cross-platform usage increase"
            before={0}
            after={40}
            delay={0}
          />
          <MetricBar
            label="Job application rate improvement"
            before={12.3}
            after={14.6}
            delay={0.2}
          />
        </div>
      </section>

      <SectionDivider />

      {/* Learnings */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="09 / Learnings"
          title="Key takeaways from the web redesign project"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LearningCard
            title="Understanding website usage data is crucial"
            description="While the website had potential to drive more users to the app, most traffic came from mobile users, making it essential to prioritize accessibility for this group."
            delay={0}
          />
          <LearningCard
            title="Close collaboration with developers is essential"
            description="Collaboration was necessary to ensure that the new components and their functionality aligned with the mobile app, as the current version lacked a defined design system."
            delay={0.1}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-12 md:py-16 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground font-sans">
              J&T Web Redesign Case Study
            </span>
            <span className="text-xs text-muted-foreground/60 font-sans">
              Web Design / Cross-Platform Integration / Mobile-First Design
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