import Link from "next/link";
import type { ReactNode } from "react";

const navLinks = [
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/3d", label: "3D" },
];

const footerLinks = [
  {
    href: "https://github.com/aaronouyang",
    label: "GitHub",
    icon: "github",
    openInNewTab: true,
  },
  {
    href: "https://www.linkedin.com/in/aaronletianouyang",
    label: "LinkedIn",
    icon: "linkedin",
    openInNewTab: true,
  },
  {
    href: "/AaronOuyang_Resume.pdf",
    label: "Resume",
    icon: "resume",
    openInNewTab: true,
  },
  { href: "mailto:aaron.ouyang05@gmail.com", label: "Email", icon: "email" },
];

function FooterIcon({ icon }: { icon: string }) {
  const size = 18;
  switch (icon) {
    case "github":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "email":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case "resume":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="13" y2="17" />
        </svg>
      );
    default:
      return null;
  }
}

type SiteShellProps = {
  title?: string;
  eyebrow?: string;
  children: ReactNode;
};

export default function SiteShell({ title, eyebrow, children }: SiteShellProps) {
  return (
    <div className="relative min-h-screen">
      <div className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col px-6 py-10 sm:px-10 sm:py-16">
        <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="text-base font-medium text-foreground underline underline-offset-4"
          >
            Aaron Ouyang
          </Link>
          <nav className="flex flex-wrap items-center gap-6 text-sm text-muted">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="flex-1 py-10 sm:py-12">
          {(eyebrow || title) && (
            <div className="mb-8 grid gap-2">
              {eyebrow ? (
                <p className="text-xs font-mono uppercase tracking-[0.28em] text-muted">
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {title}
                </h1>
              ) : null}
            </div>
          )}
          {children}
        </main>

        <footer className="border-t border-border pt-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-5 text-muted">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.openInNewTab ? "_blank" : undefined}
                  rel={link.openInNewTab ? "noreferrer" : undefined}
                  className="hover:text-foreground transition-colors"
                  aria-label={link.label}
                >
                  <FooterIcon icon={link.icon} />
                </a>
              ))}
            </div>
            <p className="text-xs text-muted">
              {new Date().getFullYear()} © Aaron Ouyang
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
