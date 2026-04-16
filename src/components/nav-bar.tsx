"use client";

import Link      from "next/link";
import { usePathname } from "next/navigation";
import { useAuth }     from "@clerk/nextjs";
import { LogoMark }    from "@/components/logo";
import { HeaderAuth }  from "@/components/header-auth";
import { cn }          from "@/lib/utils";

const LINKS = [
  { href: "/",          label: "HOME",  auth: false },
  { href: "/dashboard", label: "DIARY", auth: true  },
];

export function NavBar() {
  const pathname  = usePathname();
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 md:px-16 py-4 bg-zinc-900/85 backdrop-blur-xl relative">

      {/* ── Logo ────────────────────────────────────────────────────────── */}
      <a href="/" className="flex items-center gap-3 group" aria-label="Lifting Diary home">
        <LogoMark
          size={44}
          color="#a3e635"
          animated
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <span className="font-display text-2xl tracking-[0.18em] text-white group-hover:text-lime-400 transition-colors">
          LIFTING DIARY
        </span>
      </a>

      {/* ── Centre nav links ─────────────────────────────────────────────── */}
      <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
        {LINKS.map(link => {
          if (link.auth && (!isLoaded || !isSignedIn)) return null;
          const isActive = link.href === "/"
            ? pathname === "/"
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative font-mono text-xs tracking-[0.3em] uppercase pb-2 transition-colors duration-200",
                isActive ? "text-lime-400" : "text-white/40 hover:text-white/80",
              )}
            >
              {link.label}
              {/* Active dot indicator */}
              <span
                className={cn(
                  "absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300",
                  isActive
                    ? "opacity-100 bg-lime-400"
                    : "opacity-0 bg-lime-400",
                )}
                style={isActive ? { boxShadow: "0 0 6px rgba(163,230,53,0.9)" } : undefined}
              />
            </Link>
          );
        })}
      </nav>

      {/* ── Auth ────────────────────────────────────────────────────────── */}
      <HeaderAuth />

      {/* ── Rainbow gradient separator ──────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: "linear-gradient(90deg, #a3e635 0%, #22d3ee 45%, #fb923c 100%)" }}
      />
    </header>
  );
}
