import SiteShell from "../components/SiteShell";
import OledChecker from "./OledChecker";

export const metadata = {
  title: "OLED wallpaper checker",
  description: "Find out how much of your wallpaper is true black. Check an uploaded or pasted image privately, right on your device.",
};

export default function OledPage() {
  return (
    <SiteShell title="OLED wallpaper checker">
      <p className="-mt-4 mb-8 text-base leading-7 text-muted">
        See what percentage of your wallpaper is true black.
      </p>
      <OledChecker />
      <section className="mt-10 space-y-3 border-t border-border pt-6 text-sm leading-6 text-muted">
        <h2 className="font-medium text-foreground">What counts as true black?</h2>
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
