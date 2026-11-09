"use client";

import AnimatedSection from "@/components/animated-section";
import SectionHeader from "@/components/section-header";
import StatCard from "@/components/stat-card";
import ImageShowcase from "@/components/image-showcase";
import LearningCard from "@/components/learning-card";
import MetricBar from "@/components/metric-bar";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, BarChart, Users, TrendingUp, Target, Search, Lightbulb, Palette, Code, TestTube, Rocket } from "lucide-react";
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
        { label: "Timeline", value: "Aug - Oct 2025" },
        { label: "Platform", value: "iOS & Android" },
        { label: "Team", value: "Product Manager, 6 Mobile App Engineers, 3 Backend Engineers" },
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

export default function ProductivityContent() {
  return (
    <div className="flex flex-col w-full">
      {/* Overview */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <OverviewBanner />

        <div className="mt-16 md:mt-20 flex flex-col md:flex-row gap-12 md:gap-20">
          <AnimatedSection className="flex-1">
            <p className="text-lg md:text-xl text-foreground leading-relaxed font-sans">
              Enterprise clients needed clearer, more accurate performance indicators to make operational and strategic decisions about their workforce effectiveness.
            </p>
          </AnimatedSection>
          <AnimatedSection className="flex-1" delay={0.15}>
            <p className="text-base text-muted-foreground leading-relaxed font-sans">
              I led the redesign of attendance KPIs into meaningful Fill Rate metrics and introduced productivity dashboards that provide immediate business value to different client personas.
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
              title="From metrics analysis to dashboard delivery"
              description="Click on each phase to explore the development process and key milestones"
            />
          </div>

          <div className="h-screen">
            <RadialOrbitalTimeline
              timelineData={[
                {
                  id: 1,
                  title: "Analysis",
                  date: "Phase 01",
                  content: "Analyzing existing attendance metrics, identifying client pain points, and understanding gaps in workforce performance visibility and ROI measurement.",
                  category: "Research",
                  icon: Search,
                  relatedIds: [2],
                  status: "completed",
                  energy: 100,
                },
                {
                  id: 2,
                  title: "Strategy",
                  date: "Phase 02",
                  content: "Defining Fill Rate as the new core KPI, mapping productivity dashboard requirements, and aligning stakeholder needs across different client personas.",
                  category: "Planning",
                  icon: Lightbulb,
                  relatedIds: [1, 3],
                  status: "completed",
                  energy: 95,
                },
                {
                  id: 3,
                  title: "Design",
                  date: "Phase 03",
                  content: "Creating intuitive dashboard interfaces, designing Fill Rate calculations and displays, and developing productivity visualization patterns for different user types.",
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
                  content: "Building data ingestion processes, implementing dashboard functionality, and integrating Fill Rate calculations with dynamic workplace requirements.",
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
                  content: "Validating metric accuracy with enterprise clients, testing dashboard usability across different personas, and refining data presentation for maximum clarity.",
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
                  content: "Rolling out Fill Rate metrics and productivity dashboards to enterprise clients, targeting 30% workplace adoption within 90 days and measuring ROI impact.",
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
          title="Outdated metrics and missing productivity visibility"
          description="Enterprise clients needed clearer performance indicators to demonstrate workforce ROI and make strategic decisions."
        />

        <AnimatedSection className="mt-12 md:mt-16" delay={0.1}>
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border">
            <p className="text-base text-muted-foreground leading-relaxed">
              Enterprise clients relied on Job&Talent not only for staffing but also to understand how effectively their workforce was performing. However, two critical gaps weakened our value proposition: outdated attendance metrics that didn't fully reflect client needs, and a lack of visibility into productivity data to demonstrate ROI. Clients needed clearer, more accurate performance indicators to make operational and strategic decisions.
            </p>
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* My Role */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="03 / My Role"
          title="Leading client-facing data experience design"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatedSection>
            <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BarChart className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">
                Data Experience Design
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                As the lead designer, I was responsible for defining and shaping the client-facing data experience, focusing on clarity, usability, and ensuring tools provided immediate business value.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-col gap-6 p-6 md:p-8 rounded-2xl bg-card border border-border h-full">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground">
                Cross-team Collaboration
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Collaborated with product, engineering, and operations teams to redesign attendance KPIs and introduce productivity dashboards tailored for different client personas.
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
          title="Fill Rate metrics and productivity dashboards"
          description="A comprehensive data solution combining accurate KPIs with actionable productivity insights for enterprise clients."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImageShowcase
            src="/images/productivityv3.png"
            alt="Productivity dashboard interface showing final design with metrics and data visualization"
            caption="Productivity final design"
            delay={0.1}
          />
          <ImageShowcase
            src="/images/fillrate2.png"
            alt="Fill rate dashboard showing final design with accurate KPI calculations"
            caption="Fill rate final design"
            delay={0.2}
          />
        </div>

        <AnimatedSection className="mt-12">
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-primary/20 mb-12">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12">
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Fill Rate Metric
                </span>
                <p className="text-base text-foreground leading-relaxed">
                  Shifted from traditional Attendance Rate (assigned vs. attended workers) to Fill Rate (required vs. attending workers), giving clients a single, clear KPI aligned with their staffing needs.
                </p>
              </div>
              <div className="flex-1">
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-sans mb-3 block">
                  Productivity Dashboards
                </span>
                <p className="text-base text-foreground leading-relaxed">
                  Introduced in-platform visibility with tailored views for operational managers, HR planners, and executives, providing holistic workforce performance insights.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <div className="flex justify-center">
          <ImageShowcase
            src="/images/fillrate1.png"
            alt="Design explorations showing various iterations and future enhancements for fill rate metrics"
            caption="Design explorations and future iterations"
            delay={0.1}
          />
        </div>
      </section>

      <SectionDivider />

      {/* Impact */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="05 / Impact"
          title="Improved accuracy and stronger client relationships"
          description="The redesigned metrics and dashboards delivered measurable improvements in client trust and platform value."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <StatCard
            value="30%"
            label="Workplace Adoption Target"
            description="Targeted 30% of workplaces uploading productivity data weekly within 90 days, laying groundwork for broader adoption."
            delay={0}
          />
          <StatCard
            value="100%"
            label="KPI Accuracy Improvement"
            description="Redesigned Fill Rate metric improved accuracy and client trust by reducing discrepancies between required and assigned workers."
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
                <h4 className="text-base font-medium text-foreground mb-2">Metric Reliability</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Improved accuracy and client trust by reducing discrepancies between required and assigned workers, simplifying user experience and increasing attendance product adoption.
                </p>
              </div>
              <div>
                <h4 className="text-base font-medium text-foreground mb-2">Business Value</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Closed major SaaS value proposition gap by allowing clients to measure ROI directly in platform, strengthening Job&Talent's positioning without external tools.
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
              label="Fill rate accuracy improvement"
              before={65}
              after={100}
              delay={0}
            />
            <MetricBar
              label="Productivity metric adoption"
              before={0}
              after={30}
              delay={0.2}
            />
          </div>
        </AnimatedSection>
      </section>

      <SectionDivider />

      {/* Learnings */}
      <section className="px-6 md:px-16 lg:px-24 py-12 md:py-16">
        <SectionHeader
          label="06 / Learnings"
          title="Key insights from designing enterprise analytics"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LearningCard
            title="Clarity builds trust"
            description="Replacing dual metrics with a single, meaningful KPI increased confidence and usage among enterprise clients."
            delay={0}
          />
          <LearningCard
            title="One size doesn't fit all"
            description="Different audiences — operations managers, HR, and executives — required tailored data views to extract value."
            delay={0.1}
          />
          <LearningCard
            title="Accuracy and flexibility go hand in hand"
            description="Reliable metrics needed to adapt dynamically to real-world changes like overbooking and shifting requirements."
            delay={0.2}
          />
          <LearningCard
            title="Value must be visible"
            description="Embedding productivity data directly in the platform strengthened Job&Talent's SaaS positioning and helped clients see ROI without external tools."
            delay={0.3}
          />
        </div>
      </section>

      <SectionDivider />

      {/* Footer */}
      <footer className="px-6 md:px-16 lg:px-24 py-12 md:py-16 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground font-sans">
              Productivity & Fill Rate Case Study
            </span>
            <span className="text-xs text-muted-foreground/60 font-sans">
              Product Design / Data Visualization / Enterprise UX / Dashboard Design
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