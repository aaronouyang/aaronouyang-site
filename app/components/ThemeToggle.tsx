"use client";

import { useEffect, useRef } from "react";

let transitionOwner: symbol | null = null;

export default function ThemeToggle() {
  const active = useRef<ViewTransition | null>(null);
  const animation = useRef<Animation | null>(null);
  const owner = useRef<symbol | null>(null);
  const busy = useRef(false);

  useEffect(() => () => {
    animation.current?.cancel();
    active.current?.skipTransition();
    if (owner.current !== null && transitionOwner === owner.current) {
      transitionOwner = null;
      document.documentElement.classList.remove("theme-transitioning");
    }
    owner.current = null;
  }, []);

  async function toggle(event: React.MouseEvent<HTMLButtonElement>) {
    if (busy.current || transitionOwner !== null) return;
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    const apply = () => {
      root.dataset.theme = next;
      try { localStorage.setItem("site-theme", next); } catch { /* Storage may be blocked. */ }
    };
    if (!document.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    busy.current = true;
    const id = Symbol("theme-transition");
    owner.current = id;
    transitionOwner = id;
    root.classList.add("theme-transitioning");
    try {
      const transition = document.startViewTransition(() => {
        if (transitionOwner === id) apply();
      });
      active.current = transition;
      await transition.ready;
      if (transitionOwner !== id) return;
      animation.current = root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 500, easing: "cubic-bezier(.16, 1, .3, 1)", pseudoElement: "::view-transition-new(root)" },
      );
      await animation.current.finished;
      await transition.finished;
    } catch {
      active.current?.skipTransition();
      if (transitionOwner === id) apply();
    } finally {
      active.current = null;
      animation.current = null;
      busy.current = false;
      if (transitionOwner === id) {
        transitionOwner = null;
        root.classList.remove("theme-transitioning");
      }
    }
  }

  return (
    <button type="button" className="theme-toggle" onClick={toggle}>
      <span className="theme-when-dark">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
        </svg>
        <span className="sr-only">Switch to light mode</span>
      </span>
      <span className="theme-when-light">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" />
        </svg>
        <span className="sr-only">Switch to dark mode</span>
      </span>
    </button>
  );
}
