"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PortfolioNav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 lg:px-24 py-6 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-display font-semibold text-foreground hover:text-primary transition-colors"
        >
          Martyna Bulska
        </Link>
        <div className="flex items-center gap-8">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-sans tracking-wide transition-colors ${
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
