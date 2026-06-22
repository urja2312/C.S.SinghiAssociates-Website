# C.S. Singhi & Associates — Website PRD

## Original problem statement
Build a $10,000-grade single-page architectural portfolio site for C.S. Singhi & Associates (Gangtok, Sikkim). 25th anniversary in 2026. Cinematic scroll-driven, technical-drawing-meets-luxury-editorial aesthetic. Single page with 7 sections: Hero, About, Services, Projects (horizontal scroll), Team, Careers, Contact. Vanilla brief, ported to React.

## User personas
- Prospective Sikkim real-estate buyers
- Architects / engineers exploring open roles
- Press / collaborators wanting brand depth
- Returning clients submitting fresh enquiries

## Tech stack
- React 19 SPA (CRA + craco)
- GSAP 3 + ScrollTrigger for scroll-driven motion
- @studio-freight/lenis 1.0.42 for smooth scroll, wired into gsap.ticker
- FastAPI backend with MongoDB persistence
- Space Grotesk + Space Mono + EB Garamond (italic accent) via Google Fonts

## What's built (Dec 2025 → Feb 2026)
- 7-section single-page site fully wired (Hero, About, Services, Projects, Team, Careers, Contact)
- Sticky nav with transparent → frosted state swap, mobile hamburger, ⌘K / Ctrl+K search overlay
- Hero: Dark Navy Drafting Table aesthetic — axonometric render + blueprint grid + radial structural glow + panel with title, eyebrow, subhead
- About: Dark navy editorial chapter — story column + Our Purpose quote card (aligned), full-width **featured Timeline exhibit** ("Our Journey") with sequential GSAP reveal, metrics, Pro Bono strip, **atmospheric navy→ivory transition zone**
- Services, Projects, Team, Careers, Contact — still in legacy light styling, queued for dark-theme migration starting with Practice

## Backend endpoints
- GET  /api/                — health
- POST /api/contact          — persists enquiry
- GET  /api/contact          — admin listing
- POST /api/careers/apply    — persists job application
- GET  /api/careers/apply    — admin listing

## Backlog / next phases
- P1 — Upload real `admin building/` photos to replace stock collage + project images
- P1 — Real team portraits (currently elegant placeholders with initials)
- P1 — Push repo to GitHub as "C.S. Singhi & Associates Website" (user clicks "Save to GitHub" in Emergent UI)
- P2 — Optional admin view at /admin to browse submissions
- P2 — Newsletter capture or WhatsApp click-to-chat shortcut in nav
- P2 — Sticky "Enquire" floating button on mobile
- P3 — Project page route per project (currently drawer-based)
- P3 — Page-load splash with brand monogram reveal

## Known limitations
- HMR may briefly restart CSS animations during dev; production build is unaffected
- Project images and team portraits are placeholders pending real assets
