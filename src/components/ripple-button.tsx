"use client";

/**
 * RippleButton — a button that emits a position-aware ripple from the exact
 * click point, then fades out. Works as a drop-in child for Clerk's
 * <SignUpButton> / <SignInButton> wrappers (which clone the child and attach
 * their own onClick).
 *
 * Usage:
 *   <SignUpButton mode="modal">
 *     <RippleButton variant="primary" className="...">START FREE</RippleButton>
 *   </SignUpButton>
 */

import React, { forwardRef, useRef, useState } from "react";

interface RippleItem {
  id:   number;
  x:    number;
  y:    number;
  size: number;
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** "primary" = lime background; "ghost" = transparent with white border */
  variant?: "primary" | "ghost";
  /** Override the ripple colour */
  rippleColor?: string;
}

const RippleButton = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      onClick,
      variant = "primary",
      rippleColor,
      className = "",
      style,
      // Strip Clerk-injected props that must not land on a native <button>
      // @ts-expect-error Clerk passes these at runtime
      afterSignUpUrl: _afterSignUpUrl,
      // @ts-expect-error Clerk passes these at runtime
      afterSignInUrl: _afterSignInUrl,
      // @ts-expect-error Clerk passes these at runtime
      redirectUrl: _redirectUrl,
      ...rest
    },
    forwardedRef,
  ) => {
    const localRef = useRef<HTMLButtonElement>(null);
    const [ripples, setRipples] = useState<RippleItem[]>([]);
    const idCounter = useRef(0);

    /* Merge forwarded ref + local ref */
    const setRef = (el: HTMLButtonElement | null) => {
      (localRef as React.MutableRefObject<HTMLButtonElement | null>).current = el;
      if (typeof forwardedRef === "function") forwardedRef(el);
      else if (forwardedRef)
        (forwardedRef as React.MutableRefObject<HTMLButtonElement | null>).current = el;
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = localRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const x    = e.clientX - rect.left;
        const y    = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 2.6;
        const id   = ++idCounter.current;

        setRipples(prev => [...prev, { id, x, y, size }]);
        setTimeout(
          () => setRipples(prev => prev.filter(r => r.id !== id)),
          750,
        );
      }
      onClick?.(e);
    };

    const defaultRippleColor =
      variant === "primary"
        ? "rgba(255,255,255,0.28)"
        : "rgba(255,255,255,0.18)";

    return (
      <button
        ref={setRef}
        onClick={handleClick}
        className={`relative overflow-hidden btn-shine ${className}`}
        style={{ userSelect: "none", ...style }}
        {...rest}
      >
        {children}

        {ripples.map(r => (
          <span
            key={r.id}
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{
              left:       r.x - r.size / 2,
              top:        r.y - r.size / 2,
              width:      r.size,
              height:     r.size,
              background: rippleColor ?? defaultRippleColor,
              animation:  "ripple-expand 0.75s ease-out both",
            }}
          />
        ))}
      </button>
    );
  },
);

RippleButton.displayName = "RippleButton";

export { RippleButton };
