import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aaron Ouyang",
    template: "%s | Aaron Ouyang",
  },
  description:
    "Aaron Ouyang builds minimalist, technical products across AI, software, and 3D design.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plexSans.variable} ${plexMono.variable} ${display.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
