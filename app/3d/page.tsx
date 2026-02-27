import SiteShell from "../components/SiteShell";

export const metadata = {
  title: "3D",
};

export default function ThreeDPage() {
  return (
    <SiteShell>
      <div className="grid gap-10 text-sm text-muted">
        <section className="max-w-2xl text-base leading-7 text-foreground">
          <p>
            I spent several years delivering professional 3D design work. A
            curated selection will live here soon.
          </p>
        </section>

        <section className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-xs font-mono uppercase tracking-[0.28em] text-foreground">
            Coming soon
          </h2>
          <p className="mt-3 leading-7">
            I&apos;ll add featured pieces, case studies, and process notes. For now,
            view my professional 3D portfolio. Personal art lives on ArtStation.
          </p>
          <a
            href="https://www.figma.com/deck/ILevoHEMtB8pjgQzPGyReq/Portfolio?node-id=1-2595&t=XAZFTDxvnXUT1hOO-1"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center font-medium text-foreground underline underline-offset-4"
          >
            view the portfolio{"\u00A0"}→
          </a>
          <a
            href="https://aaronouyang.artstation.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex w-fit items-center text-sm font-medium text-foreground underline underline-offset-4"
          >
            visit ArtStation{"\u00A0"}→
          </a>
        </section>
      </div>
    </SiteShell>
  );
}
