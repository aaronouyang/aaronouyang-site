"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { countPixels, formatPercentage } from "./pixels.mjs";

type Result = {
  url: string;
  name: string;
  width: number;
  height: number;
  black: number;
  transparent: number;
  total: number;
};

const number = (value: number) => value.toLocaleString();

export default function OledChecker() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const request = useRef(0);
  const previewUrl = useRef<string | null>(null);

  useEffect(() => () => {
    request.current++;
    if (previewUrl.current) URL.revokeObjectURL(previewUrl.current);
  }, []);

  const analyze = useCallback(async (file: File) => {
    const id = ++request.current;
    setError("");
    setBusy(true);
    setResult(null);
    if (previewUrl.current) {
      URL.revokeObjectURL(previewUrl.current);
      previewUrl.current = null;
    }
    let url: string | null = null;
    let bitmap: ImageBitmap | null = null;
    try {
      if (file.type && !file.type.startsWith("image/")) {
        throw new Error("Choose an image file, such as a PNG, JPEG, or WebP.");
      }
      if (file.size > 40 * 1024 * 1024) {
        throw new Error("This image is too large. Choose a file under 40 MB.");
      }
      try {
        bitmap = await createImageBitmap(file);
      } catch {
        throw new Error("This image couldn’t be opened. Try exporting it as a PNG or JPEG.");
      }
      if (id !== request.current) return;
      const { width, height } = bitmap;
      if (!width || !height || width * height > 40_000_000) {
        throw new Error("Choose an image smaller than 40 megapixels so it can be checked on your device.");
      }
      // Analyze unscaled tiles to bound canvas memory and allow UI updates.
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { willReadFrequently: true, colorSpace: "srgb" });
      if (!context) throw new Error("Your browser couldn’t read the image. Try another browser.");
      let black = 0;
      let transparent = 0;
      let lastYield = performance.now();
      for (let y = 0; y < height; y += 512) {
        for (let x = 0; x < width; x += 1024) {
          if (id !== request.current) return;
          canvas.width = Math.min(1024, width - x);
          canvas.height = Math.min(512, height - y);
          context.drawImage(bitmap, x, y, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
          const counts = countPixels(context.getImageData(0, 0, canvas.width, canvas.height).data);
          black += counts.black;
          transparent += counts.transparent;
          // Bound each work slice independently of the image's aspect ratio.
          if (performance.now() - lastYield >= 8) {
            await new Promise((resolve) => setTimeout(resolve, 0));
            lastYield = performance.now();
          }
        }
      }
      if (id !== request.current) return;
      // Preview the same decoded frame, including for animated source images.
      const scale = Math.min(1, 1200 / Math.max(width, height));
      canvas.width = Math.max(1, Math.round(width * scale));
      canvas.height = Math.max(1, Math.round(height * scale));
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      const preview = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (id !== request.current) return;
      if (!preview) throw new Error("The image preview couldn’t be created. Try another image.");
      url = URL.createObjectURL(preview);
      previewUrl.current = url;
      setResult({ url, name: file.name || "Pasted image", width, height, black, transparent, total: width * height });
    } catch (cause) {
      if (url) URL.revokeObjectURL(url);
      if (id === request.current) setError(cause instanceof Error ? cause.message : "The image couldn’t be checked. Try a smaller PNG or JPEG.");
    } finally {
      bitmap?.close();
      if (id === request.current) setBusy(false);
    }
  }, []);

  useEffect(() => {
    const paste = (event: ClipboardEvent) => {
      const file = Array.from(event.clipboardData?.files ?? []).find((item) => item.type.startsWith("image/"));
      if (file) {
        event.preventDefault();
        void analyze(file);
      }
    };
    window.addEventListener("paste", paste);
    return () => window.removeEventListener("paste", paste);
  }, [analyze]);

  async function pasteFromClipboard() {
    try {
      if (!navigator.clipboard?.read) throw new Error("unavailable");
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const type = item.types.find((type) => type.startsWith("image/"));
        if (type) {
          void analyze(new File([await item.getType(type)], "Pasted image", { type }));
          return;
        }
      }
      setError("No image found in your clipboard. Copy the image itself, then paste again.");
    } catch {
      setError("Clipboard access isn’t available. Try Ctrl/⌘ + V, or choose an image from your device.");
    }
  }

  return (
    <div
      onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
      onDragLeave={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false); }}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) void analyze(file);
        else setError("Drop an image file from your device, or copy and paste the image itself.");
      }}
      className={`checker ${dragging ? "is-dragging" : ""}`}
    >
      <input
        ref={input}
        type="file"
        accept="image/*"
        aria-label="Choose an image"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void analyze(file);
          event.target.value = "";
        }}
      />
      <div className="checker-dropzone">
        <svg className="checker-icon" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m3 17 5-5 4 4 4-6 5 7" />
        </svg>
        <p className="checker-prompt">{dragging ? "Drop your image here" : "Choose a wallpaper to check."}</p>
        <div className="checker-actions">
          <button type="button" className="checker-button checker-button-primary" onClick={() => input.current?.click()}>
            Choose image
          </button>
          <button type="button" className="checker-button" onClick={pasteFromClipboard} disabled={busy}>Paste image</button>
        </div>
        <p className="checker-hint">Or drop an image here / paste with Ctrl or ⌘ + V</p>
        <p className="checker-privacy">Stays on your device. No image uploads to a server.</p>
      </div>
      <div role="status" aria-live="polite" aria-atomic="true">
        {busy && <p className="checker-loading">Checking every pixel…</p>}
        {result && (
          <section className="checker-result" aria-label="Image analysis">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="checker-percentage">{formatPercentage(result.black, result.total)}</p>
              <h2 className="text-base text-muted">true black</h2>
            </div>
            <div className="checker-meter" aria-hidden="true">
              <div className="checker-meter-fill" style={{ width: `${result.black / result.total * 100}%` }} />
            </div>
            <p className="text-sm leading-6 text-muted">{number(result.black)} of {number(result.total)} pixels are fully opaque #000000.</p>
            {result.transparent > 0 && <p className="mt-2 text-sm leading-6 text-muted">{number(result.transparent)} {result.transparent === 1 ? "pixel has" : "pixels have"} transparency. Transparent pixels stay in the total, but don’t count as true black.</p>}
            <figure className="mt-6">
              {/* A local blob preview never needs Next's remote image optimizer. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={result.url} alt="Your analyzed image" width={result.width} height={result.height} className="mx-auto max-h-[480px] w-auto max-w-full rounded-md border border-border object-contain" style={{ background: "repeating-conic-gradient(#262626 0% 25%, #141414 0% 50%) 0 0 / 16px 16px" }} />
              <figcaption className="mt-3 break-words text-center text-xs leading-5 text-muted">{result.name} · {number(result.width)} × {number(result.height)}</figcaption>
            </figure>
          </section>
        )}
      </div>
      {error && <p role="alert" className="checker-error">{error}</p>}
    </div>
  );
}
