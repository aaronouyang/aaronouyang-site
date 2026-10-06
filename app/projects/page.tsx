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
    title: "DPAD",
    description:
      "Beli for video games.",
    href: "https://dpad.quest/",
    label: "live site",
  },
  {
    title: "YouTube Subscription Folders",
    description:
      "Got sick of the inability to organize Youtube subscriptions.",
    href: "https://chromewebstore.google.com/detail/youtube-subscription-fold/lfhpffnakgkibgfggclnnijmphgclcmk",
    label: "Chrome Web Store",
  },
  {
    title: "OLED Wallpaper Checker",
    description:
      "I use wallpapers that are mostly true black to save battery on my phone; I wanted to see exactly how black my wallpaper was.",
    href: "/oled",
    label: "check a wallpaper",
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
    <SiteShell title="Projects">
      <div className="project-list">
        {projects.map((project) => (
          <article
            key={project.title}
            className="project-entry"
          >
            <div className="project-copy">
              <h2 className="project-title">
                {project.title}
              </h2>
              <p className="project-description">{project.description}</p>
            </div>
            <a
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel={project.href.startsWith("http") ? "noreferrer" : undefined}
              className="project-link text-link"
            >
              {project.label}
            </a>
          </article>
        ))}
      </div>
    </SiteShell>
  );
}
