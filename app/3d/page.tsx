import SiteShell from "../components/SiteShell";

export const metadata = {
  title: "3D",
};

export default function ThreeDPage() {
  return (
    <SiteShell title="3D Work">
      <div className="art-page">
        <section className="page-intro">
          <p>
            I spent several years delivering professional 3D design work. A
            curated selection will live here soon.
          </p>
        </section>

        <section className="art-note">
          <h2 className="section-title">
            Coming soon
          </h2>
          <p className="art-description">
            I&apos;ll add featured pieces, case studies, and process notes. For now,
            view my professional 3D portfolio. Personal art lives on ArtStation.
          </p>
          <a
            href="https://www.figma.com/deck/ILevoHEMtB8pjgQzPGyReq/Portfolio?node-id=1-2595&t=XAZFTDxvnXUT1hOO-1"
            target="_blank"
            rel="noreferrer"
            className="art-link text-link"
          >
            view the portfolio
          </a>
          <a
            href="https://aaronouyang.artstation.com/"
            target="_blank"
            rel="noreferrer"
            className="art-link text-link"
          >
            visit ArtStation
          </a>
        </section>
      </div>
    </SiteShell>
  );
}
