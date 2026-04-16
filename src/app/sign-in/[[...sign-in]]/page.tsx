import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main
      className="min-h-[calc(100vh-73px)] flex items-center justify-center px-4 grain"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(163,230,53,0.07) 0%, transparent 60%), oklch(0.08 0 0)",
      }}
    >
      <SignIn />
    </main>
  );
}
