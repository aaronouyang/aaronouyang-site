import Link from "next/link";
import SiteShell from "../components/SiteShell";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <div className="grid gap-8 text-sm text-muted -mt-4">
        <section className="grid gap-2">
          <p className="italic text-foreground/90">currently</p>
          <ul className="list-arrow">
            <li>
              reduced after-hours triage time by 66% with{" "}
              <Link
                href="https://www.noctia.ca/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline underline-offset-4"
              >
                Noctia
              </Link>
              .
            </li>
            <li>
              built a{" "}
              <Link
                href="https://chromewebstore.google.com/detail/youtube-subscription-fold/lfhpffnakgkibgfggclnnijmphgclcmk"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline underline-offset-4"
              >
                Chrome extension
              </Link>{" "}
              for organizing YouTube subscriptions.
            </li>
            <li>
              delivered professional 3D design work across commercial and personal projects.
            </li>
          </ul>
        </section>

        <section className="grid gap-2">
          <p className="italic text-foreground/90">previously</p>
          <ul className="list-arrow">
            <li>
              software engineer @{" "}
              <Link
                href="https://miedu.ca/"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline underline-offset-4"
              >
                Mi Education
              </Link>
            </li>
            <li>
              3D designer @{" "}
              <Link
                href="https://iyk.app"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline underline-offset-4"
              >
                iyk
              </Link>
            </li>
          </ul>
        </section>

        <div className="pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-border/50"
          >
            check out my projects
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
