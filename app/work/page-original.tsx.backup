"use client";

import * as React from "react";
import PortfolioNav from "@/components/portfolio-nav";
import AnimatedSection from "@/components/animated-section";
import StackingCard from "@/components/ui/stacking-card";
import LottieAnimation from "@/components/lottie-animation";
import wireframeAnimation from "@/public/wireframe-animation.json";

type TabId = "all" | "jobtalent" | "prograils" | "mobile" | "website";

const PROGRAILS_PROJECTS = [
  {
    title: "Revamping internal management system",
    description: "Prioritizing user needs and uncovering the hidden potential of the internal web app.",
    link: "/images/humandroid.png",
    color: "#5196fd",
    tags: ["UI/UX design", "user research", "IA", "design thinking"],
    platform: "website",
  },
];

const JT_PROJECTS = [
  {
    title: "Introducing AI recruiter Clara",
    description: "Accelerating and scaling the recruitment process.",
    link: "/images/AI-2.png",
    color: "#5196fd",
    tags: ["UI/UX design", "mobile design", "stakeholders management", "wireframing", "user research", "AI"],
    platform: "mobile",
  },
  {
    title: "Productivity and fill rate",
    description: "Providing clients with clearer workforce performance insights.",
    link: "/images/productivity2.png",
    color: "#8f89ff",
    tags: ["UI/UX design", "user research", "data driven design", "problem solving", "wireframing"],
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
    title: "Gamification",
    description: "Behavioral intervention using points systems and contextual notifications to improve worker consistency.",
    link: "/images/gamification.png",
    color: "#ff6b35",
    tags: ["behavioral design", "UX research", "gamification", "user engagement", "mobile design"],
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
  {
    title: "Web redesign",
    description: "Enabling users to seamlessly transition from web to mobile while uplisting.",
    link: "/images/webred.png",
    color: "#2196f3",
    tags: ["web design", "responsive design", "cross-platform", "user flows"],
    platform: "website",
  },
];

const PROJECTS = {
  jobtalent: {
    label: "UX/UI DESIGN",
    title: "Job&Talent",
    description:
      "Job&Talent is a digital workforce marketplace that connects temporary workers with companies in need of qualified staff. Operating in 10 countries, it supports companies like DHL, UPS, and Carrefour, managing over 350,000 workers globally.",
    href: "/projects/guided-tour",
    showStackingCards: true,
  },
  prograils: {
    label: "UX/UI DESIGN",
    title: "Prograils",
    description:
      "Prograils is a great software company with an incredible culture—more like a group of friends constantly learning and growing together. I started as an intern and later transitioned into a junior designer role, shaping my skills in a truly supportive environment.",
    href: "#",
    showStackingCards: true,
  },
};

const TABS: { id: TabId; label: string }[] = [
  { id: "all", label: "All projects" },
  { id: "jobtalent", label: "Job&Talent" },
  { id: "prograils", label: "Prograils" },
  { id: "mobile", label: "Mobile" },
  { id: "website", label: "Website" },
];

export default function WorkPage() {
  const [activeTab, setActiveTab] = React.useState<TabId>("all");

  // Get projects for platform filtering
  const getPlatformProjects = (platform: "mobile" | "website") => {
    return [...JT_PROJECTS, ...PROGRAILS_PROJECTS].filter(project => project.platform === platform);
  };

  const visibleProjects: (keyof typeof PROJECTS)[] =
    activeTab === "all" ? ["jobtalent", "prograils"] :
    activeTab === "mobile" || activeTab === "website" ? [] : [activeTab];

  return (
    <>
      <PortfolioNav />
      <main className="min-h-screen pt-24 pb-20">
        {/* Hero section with full-width background pattern */}
        <section className="relative py-16 md:py-24 pb-16 overflow-hidden">
          {/* Background pattern - full width */}
          <div className="absolute inset-0 left-0 right-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,#000_40%,rgba(0,0,0,0.7)_55%,rgba(0,0,0,0.3)_70%,transparent_100%)]" />

          <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10">
            <div className="flex items-center justify-between gap-8 min-h-[400px] md:min-h-[450px]">
              <div className="flex-1 flex flex-col justify-center">
                <AnimatedSection>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
                    Work
                  </h1>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-12">
                    A collection of projects where I&apos;ve designed solutions to
                    improve user experience and business metrics.
                  </p>
                </AnimatedSection>

                {/* Tab buttons - moved under text */}
                <AnimatedSection delay={0.1}>
                  <div className="flex flex-wrap gap-3 mb-12">
                    {TABS.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-2.5 rounded-full text-sm font-sans font-medium transition-colors ${
                          activeTab === tab.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border border-border text-foreground hover:border-primary/30 hover:bg-card/80"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </AnimatedSection>
              </div>

              <div className="hidden md:block flex-shrink-0">
                <AnimatedSection delay={0.2}>
                  <div
                    className="relative"
                    style={{
                      width: 'clamp(180px, 25vw, 250px)',
                      aspectRatio: '375 / 812'
                    }}
                  >
                    <LottieAnimation
                      animationData={wireframeAnimation}
                      className="w-full h-full"
                      loop={true}
                      autoplay={true}
                    />
                  </div>
                </AnimatedSection>
              </div>
            </div>

            {/* Scroll to explore indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
              <p className="text-muted-foreground font-sans text-xs tracking-widest uppercase">
                Scroll to explore
              </p>
              <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
                <div className="w-1 h-1.5 rounded-full bg-primary" />
              </div>
            </div>
            </div>
        </section>

        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          {/* Project cards */}
          <div className="flex flex-col gap-8">
            {/* Platform filtering (Mobile/Website) - show projects without company description */}
            {(activeTab === "mobile" || activeTab === "website") && (
              <div className="w-full">
                <StackingCard projects={getPlatformProjects(activeTab)} />
              </div>
            )}

            {/* Company filtering (All/Job&Talent/Prograils) - show with company description */}
            {visibleProjects.map((projectKey, i) => {
              const project = PROJECTS[projectKey];

              // For projects with stacking cards
              if ((projectKey === "jobtalent" || projectKey === "prograils") && (activeTab === "all" || activeTab === projectKey)) {
                const projectsData = projectKey === "jobtalent" ? JT_PROJECTS : PROGRAILS_PROJECTS;
                return (
                  <AnimatedSection key={projectKey} delay={0.05 * i}>
                    <div>
                      <div className="pr-8 md:pr-12 py-8 md:py-12">
                        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans mb-4">
                          {project.label}
                        </p>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-6">
                          {project.title}
                        </h2>
                        <p className="text-base md:text-lg text-foreground/90 leading-relaxed max-w-3xl mb-1">
                          {project.description}
                        </p>
                      </div>

                      {/* Stacking Cards Section - Inside the main card */}
                      <div className="w-full">
                        <StackingCard projects={projectsData} />
                      </div>
                    </div>
                  </AnimatedSection>
                );
              }

              // For other projects, show regular card
              return (
                <AnimatedSection key={projectKey} delay={0.05 * i}>
                  <div className="p-8 md:p-12 rounded-2xl bg-card/60 border border-border backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-sans mb-4">
                      {project.label}
                    </p>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-6">
                      {project.title}
                    </h2>
                    <p className="text-base md:text-lg text-foreground/90 leading-relaxed max-w-3xl">
                      {project.description}
                    </p>
                    {project.href !== "#" && (
                      <a
                        href={project.href}
                        className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        View project
                        <span>→</span>
                      </a>
                    )}
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
