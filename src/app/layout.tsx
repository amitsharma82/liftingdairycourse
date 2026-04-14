import type { Metadata } from "next";
import { Bebas_Neue, DM_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { HeaderAuth } from "@/components/header-auth";
import { LogoMark } from "@/components/logo";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Lifting Diary",
  description: "Log workouts. Follow programs. Hit PRs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${dmMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <header className="flex items-center justify-between px-8 md:px-16 py-4 bg-zinc-900 relative z-10">
            {/* Logo: animated barbell mark + wordmark */}
            <a
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Lifting Diary home"
            >
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

            <HeaderAuth />

            {/* Rainbow gradient separator */}
            <div
              aria-hidden
              className="absolute bottom-0 left-0 right-0 h-[3px]"
              style={{
                background:
                  "linear-gradient(90deg, #a3e635 0%, #22d3ee 45%, #fb923c 100%)",
              }}
            />
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
