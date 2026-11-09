"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Renders fixed-position UI straight into <body>, so no ancestor can ever
// accidentally create a new containing block (e.g. via transform/filter)
// and break "fixed" into scrolling-with-the-page behavior.
export default function FixedToViewport({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(children, document.body);
}
