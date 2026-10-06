"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, type PointerEvent } from "react";

const links = [
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/videos", label: "videos" },
  { href: "/3d", label: "3D" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  function resetProximity() {
    navRef.current?.querySelectorAll<HTMLAnchorElement>("a").forEach((link) => {
      link.style.removeProperty("--proximity");
    });
  }

  function updateProximity(event: PointerEvent<HTMLElement>) {
    if (event.pointerType === "touch" || !window.matchMedia(
      "(min-width: 701px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches) return;

    const items = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>("a"));
    // Measure the stationary hit areas before updating any visual styles.
    const proximity = items.map((link) => {
      const rect = link.getBoundingClientRect();
      const distance = Math.abs(event.clientY - (rect.top + rect.height / 2));
      const amount = Math.max(0, 1 - distance / 110);
      return amount * amount * (3 - 2 * amount);
    });
    items.forEach((link, index) => {
      link.style.setProperty("--proximity", proximity[index].toFixed(3));
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
