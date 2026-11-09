"use client";

import dynamic from "next/dynamic";
import ScrollToTop from "@/components/scroll-to-top";

const SmokeyCursorEffect = dynamic(
  () => import("@/components/ui/smokey-cursor-effect"),
  {
    ssr: false,
  }
);

export default function ClientOnlyComponents() {
  return (
    <>
      <ScrollToTop />
      <SmokeyCursorEffect asOverlay />
    </>
  );
}