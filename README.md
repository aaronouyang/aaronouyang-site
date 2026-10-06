# Personal Website — aaronouyang.xyz

This repository contains the source code for my personal portfolio site, built with Next.js and deployed on Vercel. The site serves as a central space for my projects, writing, and ongoing work in software engineering, AI tooling, and creative development.

## Overview

The goal of this site is to act as a living portfolio, highlighting both technical systems (such as AI-driven applications and web platforms) and experimental creative work.

## Tech Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Vercel hosting and deployment

## Features

- Fast static and server-rendered pages
- Responsive design
- About, projects, videos, and 3D portfolio pages
- Private, on-device OLED wallpaper analysis
- Lightweight interactions with reduced-motion support
- Remembered light/dark theme with a native circular reveal transition
- Continuous deployment via Vercel

## Local development and checks

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm test
npm run build
```

The portfolio routes are prerendered. Video titles are fetched concurrently and cached for one day. The OLED checker analyzes original-resolution pixels in tiles and periodically yields to keep the page responsive; images never leave the device.

The design system is documented in `DESIGN.md`. Generated mockups and local review artifacts are ignored under `.impeccable/`.
