import SiteShell from "../components/SiteShell";
import Link from "next/link";

export const metadata = {
  title: "Projects",
};

const projects = [
  {
    title: "Noctia",
    description:
      "After-hours AI receptionist that captures, summarizes, and prioritizes patient calls when offices are closed, helping staff review and follow up more efficiently. Increased after-hours call triage time efficiency by 300%.",
    href: "https://www.noctia.ca/",
  },
  {
    title: "DPAD",
    description:
      "Beli for video games.",
    href: "https://dpad.quest/",
  },
  {
    title: "YouTube Subscription Folders",
    description:
      "Got sick of the inability to organize Youtube subscriptions.",
    href: "https://chromewebstore.google.com/detail/youtube-subscription-fold/lfhpffnakgkibgfggclnnijmphgclcmk",
  },
  {
    title: "OLED Wallpaper Checker",
    description:
      "I use wallpapers that are mostly true black to save battery on my phone; I wanted to see exactly how black my wallpaper was.",
    href: "/oled",
  },
  {
    title: "3D Work",
    description:
      "Selected 3D work spanning commercial and personal projects. Full archive coming soon.",
    href: "/3d",
  },
];

export default function ProjectsPage() {
  return (
    <SiteShell title="Projects">
      <div className="project-list">
        {projects.map((project) => (
          <article
            key={project.title}
            className="project-entry"
          >
            <h2 className="project-title">
              <Link
                href={project.href}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel={project.href.startsWith("http") ? "noreferrer" : undefined}
                className="project-title-link"
              >
                <span>
                  {project.title}{"\u00a0"}
                  <svg className="project-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M5 19 19 5M5 5h14v14" />
                  </svg>
                </span>
              </Link>
            </h2>
            <p className="project-description">{project.description}</p>
          </article>
        ))}
      </div>
    </SiteShell>
  );
}
