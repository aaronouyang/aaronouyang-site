"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, type PointerEvent } from "react";

const links = [
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/videos", label: "videos" },
  { href: "/3d", label: "3D" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<HTMLAnchorElement[]>([]);
  const motionQuery = useRef<MediaQueryList | null>(null);
  const frame = useRef<number | null>(null);
  const pointerY = useRef(0);

  const resetProximity = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);
    frame.current = null;
    itemRefs.current.forEach((link) => {
      link.style.removeProperty("--proximity");
    });
  }, []);

  useEffect(() => {
    itemRefs.current = Array.from(navRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
    const query = window.matchMedia(
      "(min-width: 701px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    motionQuery.current = query;
    query.addEventListener("change", resetProximity);
    return () => {
      query.removeEventListener("change", resetProximity);
      resetProximity();
    };
  }, [resetProximity]);

  function updateProximity(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch" || !motionQuery.current?.matches) return;
    pointerY.current = event.clientY;
    if (frame.current !== null) return;

    frame.current = requestAnimationFrame(() => {
      frame.current = null;
      const items = itemRefs.current;
      // Batch reads before writes, using only the latest pointer position.
      const proximity = items.map((link) => {
        const rect = link.getBoundingClientRect();
        const distance = Math.abs(pointerY.current - (rect.top + rect.height / 2));
        const amount = Math.max(0, 1 - distance / 110);
        return (amount * amount * (3 - 2 * amount)).toFixed(3);
      });
      items.forEach((link, index) => {
        if (link.style.getPropertyValue("--proximity") !== proximity[index]) {
          link.style.setProperty("--proximity", proximity[index]);
        }
      });
    });
  }

  return (
    <nav ref={navRef} className="site-nav" aria-label="Main navigation"
      onPointerMove={updateProximity} onPointerLeave={resetProximity}
      onPointerCancel={resetProximity} onClick={resetProximity}>
      {links.map(({ href, label }) => (
        <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
          <span className="site-nav-marker" aria-hidden="true" />
          <span className="site-nav-label">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
