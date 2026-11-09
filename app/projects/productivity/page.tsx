"use client";

import HeroScrollAnimation from "@/components/ui/hero-scroll-animation";
import ProductivityContent from "@/components/productivity-content";
import GameNav from "@/components/game-nav";

export default function ProductivityPage() {
  return (
    <>
      <GameNav />
      <HeroScrollAnimation
        videoSrc="/video/productivity.mp4"
        titleLine1="Productivity & Fill Rate"
        titleLine2="Client Performance Analytics"
        subtitle="Scroll to explore the design process and impact of productivity analytics features"
        isImage={false}
      >
        <ProductivityContent />
      </HeroScrollAnimation>
    </>
  );
}