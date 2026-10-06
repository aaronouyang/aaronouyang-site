import Link from "next/link";
import type { ReactNode } from "react";
import SiteNav from "./SiteNav";
import ThemeToggle from "./ThemeToggle";

const footerLinks = [
  { href: "https://github.com/aaronouyang", label: "GitHub" },
  { href: "https://www.linkedin.com/in/aaronletianouyang", label: "LinkedIn" },
  { href: "https://www.youtube.com/@aaron_ouyang", label: "YouTube" },
  { href: "/AaronOuyang_Resume.pdf", label: "Resume" },
  { href: "mailto:aaron.ouyang05@gmail.com", label: "Email" },
];

type SiteShellProps = {
  title?: string;
  className?: string;
  children: ReactNode;
};

export default function SiteShell({ title, className = "", children }: SiteShellProps) {
  return (
    <div className={`site-frame ${className}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <Link href="/" className="site-name">Aaron Ouyang</Link>
        <ThemeToggle />
        <SiteNav />
      </header>
      <main id="main-content" className="site-main" tabIndex={-1}>
        {title && <h1 className="page-title">{title}</h1>}
        {children}
      </main>
      <footer className="site-footer">
        <p>{new Date().getFullYear()} © Aaron Ouyang</p>
        <nav aria-label="Social and contact links" className="footer-links">
          {footerLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith("mailto:") ? undefined : "_blank"}
              rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
            >
              {label}
            </a>
          ))}
        </nav>
      </footer>
    </div>
  );
}
