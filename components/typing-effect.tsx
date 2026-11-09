"use client";

import { useState, useEffect } from "react";

interface TypingEffectProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}

export default function TypingEffect({
  text,
  delay = 0,
  speed = 100,
  className = ""
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!hasStarted) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      // Hide cursor after typing is complete
      const cursorTimeout = setTimeout(() => {
        setShowCursor(false);
      }, 1000);

      return () => clearTimeout(cursorTimeout);
    }
  }, [currentIndex, text, speed, hasStarted]);

  useEffect(() => {
    if (!hasStarted || currentIndex >= text.length) return;

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [hasStarted, currentIndex, text.length]);

  return (
    <span className={className}>
      {displayText}
      {hasStarted && currentIndex < text.length && (
        <span className={`inline-block ${showCursor ? 'opacity-100' : 'opacity-0'}`}>
          |
        </span>
      )}
    </span>
  );
}