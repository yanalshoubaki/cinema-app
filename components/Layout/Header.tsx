"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/movies", label: "Movies" },
  { href: "/series", label: "Series" },
];

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-background/90 to-transparent">
      <div className="container flex h-20 items-center justify-between">
        <Link
          href="/"
          className="font-display text-4xl font-black leading-none tracking-tight"
        >
          Flix<span className="text-primary">.</span>
        </Link>
        <nav className="flex items-center gap-8 text-sm font-medium">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "border-b-2 py-1 transition-colors",
                  active
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
