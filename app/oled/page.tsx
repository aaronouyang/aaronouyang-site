import SiteShell from "../components/SiteShell";
import OledChecker from "./OledChecker";

export const metadata = {
  title: "OLED wallpaper checker",
  description: "Find out how much of your wallpaper is true black. Check an uploaded or pasted image privately, right on your device.",
};

export default function OledPage() {
  return (
    <SiteShell title="OLED wallpaper checker" className="tool-page">
      <p className="page-intro">
        See what percentage of your wallpaper is true black.
      </p>
      <OledChecker />
      <section className="tool-explainer">
        <h2 className="section-title">What counts as true black?</h2>
        <p>
          Only fully opaque pixels with a color of <code className="text-foreground">#000000</code>.
          Almost-black pixels still light up; transparent pixels depend on what’s behind them,
          so they aren’t counted as black.
        </p>
        <p>
          OLED screens can switch off their black pixels.
        </p>
        <p>Every pixel is checked at the image’s original resolution. For animated images, only a single still frame is checked.</p>
      </section>
    </SiteShell>
  );
}
