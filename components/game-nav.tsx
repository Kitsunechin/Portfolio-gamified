"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Map, User } from "lucide-react";
import { requestIntro } from "@/lib/intro";

export default function GameNav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/work", label: "Adventures", icon: Map },
    { href: "/about", label: "Character", icon: User },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-card/95 to-background/95 backdrop-blur-md border-2 border-border rounded-2xl px-6 py-4 shadow-2xl bloom-soft">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group" onClick={requestIntro}>
              <div>
                <div className="font-sans text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  Martyna Bulska
                </div>
                <div className="text-xs text-primary/60">Product Designer</div>
              </div>
            </Link>

            {/* Navigation links */}
            <div className="flex items-center gap-2">
              {links.map((link) => {
                const isActive = link.href === "/" ? pathname === "/" : pathname?.startsWith(link.href);
                const Icon = link.icon;

                return (
                  <Link key={link.href} href={link.href} aria-label={link.label}>
                    <motion.div
                      className={`relative px-3 sm:px-4 py-2 rounded-xl flex items-center gap-2 transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground bloom-soft"
                          : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline text-sm font-semibold">{link.label}</span>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-primary/15 blur-lg -z-10"
                          layoutId="activeNav"
                          transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
