import Link from "next/link";
import SiteShell from "../components/SiteShell";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <SiteShell className="about-page">
      <h1 className="name-title"><span>Aaron</span><span>Ouyang</span></h1>
      <div className="about-index">
        <section className="bio-section">
          <h2>currently</h2>
          <ul className="bio-list">
            <li>
              engineer @{" "}
              <Link
                href="https://www.ravl.io/"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                RAVL
              </Link>
            </li>
            <li>
              founder @{" "}
              <Link
                href="https://www.noctia.ca/"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Noctia
              </Link>
            </li>
            <li>
              making{" "}
              <Link
                href="https://dpad.quest/"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                DPAD
              </Link>
              , a new way to rank the games you play
            </li>
          </ul>
        </section>

        <section className="bio-section">
          <h2>previously</h2>
          <ul className="bio-list">
            <li>
              CS @{" "}
              <Link
                href="https://www.queensu.ca/"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Queen&apos;s
              </Link>
            </li>
            <li>
              built a{" "}
              <Link
                href="https://chromewebstore.google.com/detail/youtube-subscription-fold/lfhpffnakgkibgfggclnnijmphgclcmk"
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Chrome extension
              </Link>{" "}
              for organizing YouTube subscriptions
            </li>
            <li>
              software engineer @{" "}
              <Link
                href="https://miedu.ca/"
                target="_blank"
                rel="noreferrer"
                className="text-link"
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
                className="text-link"
              >
                IYK
              </Link>
            </li>
          </ul>
        </section>

      </div>
    </SiteShell>
  );
}
