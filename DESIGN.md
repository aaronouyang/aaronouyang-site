---
name: Aaron Ouyang
description: A dark personal portfolio with literary display type and open layouts.
colors:
  background: "#141513"
  foreground: "#f0eee8"
  muted: "#acada6"
  accent: "#c6c99f"
  card: "#1b1d19"
  border: "#36392f"
  control-border: "#727766"
  true-black: "#000000"
  error: "#f2afa2"
typography:
  display:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(120px, 12.5vw, 188px)"
    fontWeight: 400
    lineHeight: 0.87
    letterSpacing: "-.035em"
  headline:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(56px, 7vw, 104px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-.035em"
  title:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(26px, 2.3vw, 36px)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-.02em"
  body:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
  navigation:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "clamp(26px, 2.25vw, 34px)"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontSize: "14px"
    lineHeight: 1.7
  result:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "clamp(40px, 6vw, 68px)"
    lineHeight: 1.2
    letterSpacing: "-.035em"
rounded:
  thumbnail: "3px"
  control: "6px"
  dropzone: "12px"
spacing:
  page: "clamp(24px, 6vw, 100px)"
  compact: "12px"
  small: "16px"
  medium: "24px"
  large: "32px"
  section: "48px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.background}"
    rounded: "{rounded.control}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
    padding: "10px 20px"
  button-secondary-hover:
    backgroundColor: "{colors.card}"
  navigation:
    textColor: "{colors.muted}"
    typography: "{typography.navigation}"
  navigation-active:
    textColor: "{colors.accent}"
  action-link:
    textColor: "{colors.accent}"
  dropzone:
    backgroundColor: "{colors.true-black}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.dropzone}"
    padding: "36px 24px"
  project-row:
    textColor: "{colors.muted}"
    padding: "32px 0"
---

# Design System: Aaron Ouyang

## Overview

**Creative North Star: "Artist monograph"**

The artist monograph direction uses flat charcoal, ivory, stone, and pale olive. Aaron’s name, writing, and work carry the composition; a large upright serif gives the site its identity while supporting copy and controls remain direct.

Open space and restrained dividing lines organize the portfolio. The OLED checker shares the palette and typography, with more explicit boundaries for file selection and results.

**Key Characteristics:**

- Open layouts with a quiet navigation rail.
- Regular literary display type paired with practical sans-serif copy.
- Pale olive for active navigation and actions.

## Colors

The palette is warm and subdued, with one pale olive accent. The frontmatter records the exact source values.

### Primary

- **Pale olive / accent:** active navigation, action links, primary tool buttons, selection, and keyboard focus.

### Neutral

- **Charcoal / background:** the page canvas.
- **Ivory / foreground:** primary text and primary-button hover fill.
- **Stone / muted:** navigation at rest, supporting copy, captions, and footer text.
- **Raised charcoal / card:** thumbnail fallback and secondary-button hover fill.
- **Olive charcoal / border:** dividers and meter tracks.
- **Control border:** higher-contrast tool outlines.
- **True black:** the OLED dropzone, connecting the tool to the value it measures.

The error color is reserved for tool feedback, not a second brand accent.

## Typography

Bodoni Moda regular, with Georgia as fallback, supplies the name, page headings, and project titles. IBM Plex Sans supplies navigation, prose, and controls. IBM Plex Mono supplies the OLED percentage with tabular numerals. Exact role tokens are in the frontmatter; weights remain restrained.

**The Display Type Rule.** Use regular Bodoni Moda for display headings; preserve its mixed-case letterforms.

The name is a two-line display. Page headings are smaller; project titles use the title role. Introductory copy scales from 18px to 23px with a 1.65 line height and a 58ch measure. Project descriptions use 17px with a 1.75 line height. Biography copy scales from 18px to 23px with a 1.45 line height. Supporting text stays in sentence case.

## Layout

The centered site frame is capped at 1680px and fills at least the viewport height. Its desktop grid uses `minmax(160px, .65fr) minmax(0, 3fr)` with a fluid 32–68px column gap and the page-spacing token at the edges. The main area begins 68px below the frame’s top padding. Navigation is a vertical rail.

At 1200px, project rows stack their linked title and description. At 1050px, the shell uses a 160px rail and 40px gap; biography and video grids become one column. At 700px, the shell becomes a vertical flex layout, navigation wraps horizontally, and main top padding becomes 44px. The name scales to `clamp(86px, 23vw, 145px)` with a .9 line height; ordinary page headings use `clamp(48px, 12vw, 76px)`.

Copyright is left aligned and footer links sit on the right. On mobile they occupy separate rows; links retain right alignment and wrap. Video thumbnails retain a 16:9 ratio. Tool content is capped at 760px, and explanatory prose at 65ch.

## Elevation & Depth

The system has no box shadows. Space, restrained border lines, and subtle surface tone supply separation. The OLED dropzone is true black; thumbnail fallback and secondary hover surfaces use raised charcoal.

**The Flat Surface Rule.** Separate content with space, subtle borders, and tone rather than shadows.

## Shapes

Portfolio content remains open and mostly square. Thumbnail corners, control corners, and the larger dropzone radius use the frontmatter tokens. Project dividers are thin solid lines; the dropzone has a dashed outline. Rounded containers belong to the tool’s interactions and media, not every section of prose.

## Components

### Navigation and footer

The rail uses muted sans-serif links; hover and `aria-current="page"` turn pale olive. On desktop, thin gutter markers extend with pointer proximity over a 110px radius, while labels shift up to 14px with a 240ms ease-out. Hit areas remain stationary. Current and keyboard-focused links keep an extended marker; keyboard focus also shifts the label. There is no idle animation. Reduced motion disables proximity and label movement. Mobile navigation uses 18px text with 8px vertical padding, omits markers and movement, and underlines the current page. Footer links are underlined, with a 36px minimum height increasing to 44px on mobile.

### Text actions

About-page biography links lift 2px and draw a 2px olive underline over 280ms on hover or keyboard focus. Project title text shifts 4px over 240ms while its hit area, description, and row divider stay fixed. Video thumbnails scale to 1.02 over 300ms within their crop, and captions turn olive. Pointer hover effects require a fine pointer with hover support; keyboard focus receives equivalent feedback. Reduced motion retains instant color and underline feedback without transforms. All effects use CSS, run only during interaction, and need no animation library or persistent rendering loop.

Inline text links use thin underlines offset by .22em. Prominent actions pair olive underlined text with an inline SVG arrow. The arrow moves 4px on hover over 200ms. Color, background, and border transitions use 180ms and the shared ease-out curve.

### Tool buttons and upload area

Primary buttons use olive fill and dark text, changing to ivory on hover. Secondary buttons have transparent fill and a visible border; hover adds a charcoal fill and olive border. Both have a 46px minimum height. Disabled paste controls use .55 opacity and a waiting cursor. The upload input is hidden behind the Choose image button; there is no visible text-field primitive.

The black dropzone centers its prompt and wrapping actions. Dragging adds an olive outline around the checker. Its padding reduces to 28px 16px on mobile. Errors appear below the tool, and loading/results use a polite live status region.

### Portfolio entries and results

Project rows use consistent columns for linked serif titles and muted descriptions; dividers separate successive rows. Titles have a subtle underline that turns olive on hover, and serve as the sole project link. Video entries pair a thumbnail with a sans-serif caption; hover underlines the caption. The checker’s numeric result uses monospaced tabular figures above a 4px meter, followed by image details and a contained preview.

All links, buttons, and inputs receive a 2px olive focus outline with a 6px offset. Reduced-motion preferences disable transitions and the action-arrow translation.

## Do's and Don'ts

### Do:

- Do keep copyright on the left and footer links on the right; stack the footer on narrow screens.
- Do retain visible keyboard focus and reduced-motion behavior.
- Do use the shared serif for page and project headings and the sans-serif for supporting text.

### Don't:

- Don’t substitute Bodoni Moda SC for the regular display family.
- Don’t introduce a dotted background or decorative shadows.
- Don’t wrap every portfolio entry in a filled card.
