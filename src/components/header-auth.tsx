"use client";

import { useAuth, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export function HeaderAuth() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <div className="w-[148px] h-9" />;

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        {/* SIGN IN — white ring on dark zinc, unmistakable */}
        <SignInButton mode="modal">
          <button className="font-mono text-xs tracking-[0.2em] uppercase px-5 py-2.5 border-2 border-white/80 text-white hover:bg-white hover:text-zinc-900 transition-all duration-200 cursor-pointer">
            SIGN IN
          </button>
        </SignInButton>

        {/* START FREE — vivid lime, hard black text, subtle glow */}
        <SignUpButton mode="modal">
          <button
            className="font-mono text-xs tracking-[0.2em] uppercase px-5 py-2.5 bg-lime-400 text-zinc-900 font-medium hover:bg-lime-300 transition-colors cursor-pointer"
            style={{
              boxShadow: "0 0 18px rgba(163,230,53,0.55), 0 0 36px rgba(163,230,53,0.2)",
            }}
          >
            START FREE
          </button>
        </SignUpButton>
      </div>
    );
  }

  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-9 h-9",
        },
      }}
    />
  );
}
