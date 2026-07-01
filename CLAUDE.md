# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static one-page marketing site (landing page) for **Ouro Minas**, a corporate fleet
management / vehicle leasing company (Belo Horizonte, MG, Brazil). No build step,
no framework, no package manager — just plain HTML/CSS/JS served as static files.

## Running the site

There is no build/test/lint tooling. To preview locally, just open `index.html`
directly in a browser, or serve the folder with any static file server, e.g.:

```
python -m http.server 8000
```

## Architecture

- [index.html](index.html) — the entire page markup, section by section (nav, hero,
  diferenciais, frota, como funciona, comparativo, FAQ, contato, footer). Two sections
  render their content from JS instead of static markup: `#fleetGrid` (frota) and
  `#faqList` (FAQ).
- [script.js](script.js) — all page behavior, driven by two data arrays at the top of
  the file:
  - `fleet` — list of vehicle models/categories/versions rendered into `#fleetGrid` by
    `buildFleet()`. This is the single source of truth for the fleet lineup shown on
    the site; add/edit vehicles here, not in the HTML. Entries may include an optional
    `img` field (path into `assets/Fotos Ourominas/`) — `buildFleet()` renders a real
    `<img>` when present, falling back to the `fleet-ph` text placeholder otherwise.
  - `faqs` — question/answer pairs rendered into `#faqList` by `buildFaq()`.
  - `WA_NUMBER` — the WhatsApp number used to build all `wa.me` links across the page
    (nav CTA, hero CTA, floating button, contact form submission). Currently a
    placeholder (`5531000000000`) — update in one place here rather than editing each
    `wa.me` link in `index.html`.
  - `buildContactForm()` wires the contact form to open a pre-filled WhatsApp chat
    (no backend/API — form data is only ever sent via `wa.me` deep link).
  - `buildNav()` handles the mobile nav toggle.
- [style.css](style.css) — all styling, using CSS custom properties defined once under
  `:root` (`--gold`, `--dark`, `--bg-light`, `--radius-card`, `--max-w`, `--px`, etc.).
  Prefer reusing these tokens over hardcoding new colors/spacing.

## Assets

- `assets/` — logos and icons actually referenced by `index.html`
  (`logo-ouro-minas.png`, `logo-ouro-minas-tagline.png`, `icone.png`).
- `assets/Fotos Ourominas/` — photo library (fleet vehicle photos, team/office photos,
  hero images). This is where new fleet vehicle photos should be added — see note
  below on wiring them into the fleet cards.
- `extracted/` — a reference copy of an earlier/alternate version of the site
  (`Ouro Minas.dc.html`, `support.js`, its own `assets/` and `uploads/`). Treat as
  reference material only, not part of the live site.

## Known gaps / in-progress state

- Fleet cards with a photo available now render a real `<img>` (see the `img` field on
  entries in the `fleet` array in [script.js](script.js)); cars without a matching
  photo still fall back to the `fleet-ph` text placeholder. Currently wired: Mobi,
  Kwid, Polo (MPI), Montana, Saveiro, Spin, Strada (Endurance), T-Cross, Hilux. Still
  missing photos: Argo, Cronos, Gol, Onix, Yaris — add a matching file to
  `assets/Fotos Ourominas/` and set `img` on that entry to wire it in.
- `assets/Fotos Ourominas/` also has photos for a few models not currently in the
  `fleet` array at all (`Jetta.png`, `Nivus.png`, `Frontier.png`, `Fiorino
  Endurance.png`, `Polo Track.png`) — these are only usable once/if those models are
  added as new `fleet` entries.
- `WA_NUMBER` and the `wa.me` links hardcoded in `index.html` are placeholder values
  and need to be replaced with the real WhatsApp number before launch.
