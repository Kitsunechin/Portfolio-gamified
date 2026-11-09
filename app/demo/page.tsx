import SmokeyCursorEffect from "@/components/ui/smokey-cursor-effect";
import Link from "next/link";

export default function DemoPage() {
  return (
    <>
      <SmokeyCursorEffect asOverlay={false} hideCursor />
      <Link
        href="/"
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] text-sm text-muted-foreground hover:text-foreground transition-colors pointer-events-auto"
      >
        ← Back to portfolio
      </Link>
    </>
  );
}
