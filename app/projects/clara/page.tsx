"use client";

import HeroScrollAnimation from "@/components/ui/hero-scroll-animation";
import ClaraContent from "@/components/clara-content";
import GameNav from "@/components/game-nav";

export default function ClaraPage() {
  return (
    <>
      <GameNav />
      <HeroScrollAnimation
        videoSrc="/images/Clara.png"
        titleLine1="AI Recruiter Clara"
        titleLine2="Unified Recruitment Experience"
        isImage={true}
      >
        <ClaraContent />
      </HeroScrollAnimation>
    </>
  );
}