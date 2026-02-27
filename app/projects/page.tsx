import SiteShell from "../components/SiteShell";

export const metadata = {
  title: "Projects",
};

const projects = [
  {
    title: "Noctia",
    description:
      "After-hours AI receptionist that captures, summarizes, and prioritizes patient calls when offices are closed, helping staff review and follow up more efficiently. Increased after-hours call triage time by 300%.",
    href: "https://www.noctia.ca/",
    label: "live site",
  },
  {
    title: "YouTube Subscription Folders",
    description:
      "Chrome extension for organizing YouTube subscriptions into collapsible folders with drag & drop and light/dark mode compatibility.",
    href: "https://chromewebstore.google.com/detail/youtube-subscription-fold/lfhpffnakgkibgfggclnnijmphgclcmk",
    label: "Chrome Web Store",
  },
  {
    title: "3D Work",
    description:
      "Selected 3D work spanning commercial and personal projects. Full archive coming soon.",
    href: "/3d",
    label: "view 3D",
  },
];

export default function ProjectsPage() {
  return (
    <SiteShell>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.title}
            className="flex h-full flex-col justify-between gap-4 rounded-lg border border-border bg-card p-5 text-sm text-muted transition-colors hover:border-muted/30"
          >
            <div className="grid gap-3">
              <h2 className="text-base font-semibold text-foreground">
                {project.title}
              </h2>
              <p className="leading-7">{project.description}</p>
            </div>
            <a
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel={project.href.startsWith("http") ? "noreferrer" : undefined}
              className="inline-flex items-center font-medium text-foreground underline underline-offset-4"
            >
              {project.label}
              {"\u00A0"}
              <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>
    </SiteShell>
  );
}
