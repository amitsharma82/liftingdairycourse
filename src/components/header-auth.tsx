"use client";

import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";

export function HeaderAuth() {
  const { isSignedIn, isLoaded } = useAuth();

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

  return (
    <UserButton
      appearance={{
        elements: { avatarBox: "w-9 h-9" },
      }}
    />
  );
}
