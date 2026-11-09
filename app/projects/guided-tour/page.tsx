"use client";

import HeroScrollAnimation from "@/components/ui/hero-scroll-animation";
import CaseStudyContent from "@/components/case-study-content";
import GameNav from "@/components/game-nav";

export default function GuidedTourPage() {
  return (
    <>
      <GameNav />
      <HeroScrollAnimation
        videoSrc="/video/demo.mp4"
        titleLine1="Onboarding System"
        titleLine2="Guided Tour Experience"
        subtitle="Scroll to explore the design process and impact of the guided onboarding system"
      >
        <CaseStudyContent />
      </HeroScrollAnimation>
    </>
  );
}
