import Image from "next/image";
import SiteShell from "../components/SiteShell";

export const metadata = {
  title: "Videos",
};

const videoLinks: string[] = [
  // Add public YouTube links here. Titles and thumbnails are derived automatically.
  "https://youtu.be/yHYkUJGckoU",
  "https://youtu.be/JInT2dtn44Y",
  "https://youtu.be/hmxdJPh4U80",
];

function getYouTubeVideoId(href: string) {
  try {
    const url = new URL(href);

    if (url.hostname === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0];
    }

    if (url.pathname.startsWith("/shorts/") || url.pathname.startsWith("/embed/")) {
      return url.pathname.split("/").filter(Boolean)[1];
    }

    return url.searchParams.get("v");
  } catch {
    return null;
  }
}

function getYouTubeThumbnail(href: string) {
  const videoId = getYouTubeVideoId(href);

  if (!videoId) {
    return null;
  }

  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

async function getYouTubeTitle(href: string) {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(
        href,
      )}&format=json`,
      { next: { revalidate: 86400 } },
    );

    if (!response.ok) {
      return "YouTube video";
    }

    const data = (await response.json()) as { title?: string };
    return data.title || "YouTube video";
  } catch {
    return "YouTube video";
  }
}

export default async function VideosPage() {
  const videos = (
    await Promise.all(
      videoLinks.map(async (href) => ({
        href,
        thumbnail: getYouTubeThumbnail(href),
        title: await getYouTubeTitle(href),
      })),
    )
  ).filter(
    (video): video is { href: string; thumbnail: string; title: string } =>
      Boolean(video.thumbnail),
  );

  return (
    <SiteShell>
      <div className="grid gap-10 text-sm text-muted">
        <section className="max-w-2xl text-base leading-7 text-foreground">
          <p>
            Sometimes I make videos about art or philosophy or . . . other
            things. Honestly I have a hard time pinning down what{" "}
            <em>exactly</em> these videos are about.
          </p>
        </section>

        {videos.length > 0 ? (
          <div className="mx-auto grid w-full max-w-xl gap-5">
            {videos.map((video) => {
              return (
                <a
                  key={video.href}
                  href={video.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-muted/40 hover:no-underline"
                >
                  <div className="relative aspect-video overflow-hidden bg-border">
                    <Image
                      src={video.thumbnail}
                      alt=""
                      fill
                      sizes="(min-width: 640px) 576px, calc(100vw - 48px)"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-sm font-medium leading-7 text-foreground">
                      {video.title}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    </SiteShell>
  );
}
