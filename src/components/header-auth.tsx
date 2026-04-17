"use client";

import Link            from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";

export function HeaderAuth() {
  const { isSignedIn, isLoaded } = useAuth();
  const pathname = usePathname();

  // Placeholder keeps header height stable while Clerk loads
  if (!isLoaded) return <div className="w-[148px] h-9" />;

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/sign-in"
          className="font-mono text-xs tracking-[0.2em] uppercase px-5 py-2.5 border-2 border-white/80 text-white hover:bg-white hover:text-zinc-900 transition-all duration-200"
        >
          SIGN IN
        </Link>
        <Link
          href="/sign-up"
          className="font-mono text-xs tracking-[0.2em] uppercase px-5 py-2.5 bg-lime-400 text-zinc-900 font-medium hover:bg-lime-300 transition-colors"
          style={{ boxShadow: "0 0 18px rgba(163,230,53,0.55), 0 0 36px rgba(163,230,53,0.2)" }}
        >
          START FREE
        </Link>
      </div>
    );
  }

  const onProfile = pathname.startsWith("/dashboard/profile");

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/dashboard/profile"
        className="font-mono text-xs tracking-[0.25em] uppercase pb-1 transition-colors duration-200 relative"
        style={{ color: onProfile ? "#a3e635" : "rgba(255,255,255,0.4)" }}
      >
        PROFILE
        <span
          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-300"
          style={{
            background:  "#a3e635",
            opacity:     onProfile ? 1 : 0,
            boxShadow:   onProfile ? "0 0 6px rgba(163,230,53,0.9)" : "none",
          }}
        />
      </Link>
      <UserButton
        appearance={{
          elements: { avatarBox: "w-9 h-9" },
        }}
      />
    </div>
  );
}
