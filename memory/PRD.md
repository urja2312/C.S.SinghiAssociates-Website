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

## Recent updates (Feb 2026 — current fork)
- **Projects (Feb 26)** — Renamed "The Himalayan Heights" → **Golden Heights**. Removed "The Skyline Residency". Added two new real projects: **Tashi Namgyal Academy Admin Block** (2021, ~20,000 sq ft, 5 photos) and **Tashi Namgyal Academy Washroom Renovation** (3-phase, 7 photos). Renumbered to 01–04. Updated **Sky Gangtok** with real rendering + floor plans + parking gallery, 90,000+ sq ft, 2021–Present timeline, 2-line description.
- **Project drawer (Feb 26)** — Converted full-bleed panel to **centered modal popup** (max 1320×695, rounded 22px, backdrop blur, click-outside-to-close). Columns now stretch to equal height (`justify-content: space-between` on left + `flex: 1` gallery). Added support for `phases: [...]` (multi-phase projects render staggered phase blocks instead of Area/Year). 100% pass on testing_agent_v3 (iteration_3.json).
- **Hero (Feb 25)** — Replaced golden blueprint with new multi-blueprint composition. Background switched to near-black (#07101c) matching About top. Blueprint hue softened to beige/champagne. Title-block readability hardened with radial dark wash.
- **About (Feb 24)** — Featured Timeline exhibit, Purpose card aligned to paragraph height, navy→ivory transition zone (~28vh) handing off into Practice.
- **Practice/Projects gallery (Feb 24)** — PRACTICE eyebrow promoted to larger gold mono label. Manual arrow-driven horizontal gallery with snap scroll.
- **Team (Feb 25–26)** — "Ar." prefix + 280px portraits + architectural blueprint line-art beside featured cards. Roster updated to **Technical Team** (7 members) and **Non-Technical Team** (5 members, all with correct titles). Flex-wrap centering. Verified 100% pass on testing_agent_v3 (iteration_2.json).
- **Contact (Feb 24)** — Form removed. Two-line headline, centered lede, direct phone/email/WhatsApp rows.
- **Footer (Feb 24)** — Larger logo, split tagline, city reduced to Gangtok.
- **Nav (Feb 24)** — Removed standalone "Contact" link, kept only the Contact CTA button.

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
