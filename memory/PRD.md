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
- **Hero (Feb 25)** — Replaced golden blueprint with new multi-blueprint composition (axonometric + elevations + floor plans). Background switched to deep navy/near-black to match About top. Blueprint hue softened from saturated orange → beige/champagne. Title-block readability hardened with a radial dark wash + brighter, bolder lede with subtle text-shadow.
- **About (Feb 24–25)** — Featured Timeline exhibit (~35% larger, sequential GSAP reveal), Purpose card aligned to paragraph height, atmospheric navy→ivory transition zone (~28vh) handing off into Practice.
- **Practice (Feb 24)** — PRACTICE eyebrow promoted to larger gold mono label with leading rule. Card stagger animation reworked (no more y-drift on cards 02/03/etc).
- **Projects (Feb 24)** — Pinned horizontal scrub removed. All projects side-by-side at editorial size with paper-stock arrow buttons on both edges (auto-disable at start/end). Native touch swipe preserved.
- **Team (Feb 25)** — Two featured cards with "Ar." prefix and enlarged 280px portraits. Architectural blueprint line-art added to the right of the featured cards (luminance-masked, warm champagne tint). 
- **Team content (Feb 25)** — "Sakshi" corrected to "Saakshi"; Saakshi role line simplified to "Studio Lead". Sections renamed: "Architects & Engineers" → **Technical Team** (7 members: AS, YM, CB, RB, JT, plus new Dawa Bhutia & Deepak Tamang; Tenzing Palkye Bhutia removed). "Support Team" → **Non-Technical Team** (5 members: PS, SU, Aruna Chettri now Manager, Pushpa Nirola now Assistant Manager, new Sushila Chettri Receptionist). Both grids switched to flex-wrap + justify-content: center so any orphan card in the last row is centered. Verified by testing_agent_v3 — 100% pass (iteration_2.json).
- **Contact (Feb 24)** — Send-message form removed entirely. Headline "Let's build something / that lasts." centered on two lines; lede centered; only direct phone/email/WhatsApp rows.
- **Footer (Feb 24)** — Logo enlarged (clamp 110–140px). "Designed with love" / "By Arushi Singhi & Urja Singhi" split across two lines. Cities reduced to "Gangtok".
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
