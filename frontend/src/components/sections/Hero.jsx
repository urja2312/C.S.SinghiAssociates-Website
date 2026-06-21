import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS, NAV_LINKS } from "../../lib/siteData";
import { scrollToSection } from "../../hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Subtle parallax drift on the hero image
    const tween = gsap.to(imgRef.current, {
      yPercent: -8,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section
      id="top"
      className="hero hero--split"
      ref={heroRef}
      data-testid="hero-section"
    >
      {/* Background blueprint grid + warm canvas */}
      <div className="hero__canvas" aria-hidden="true" />
      <div className="blueprint-grid" aria-hidden="true" />
      <div className="structural-glow" aria-hidden="true" />

      <div className="hero__corner">
        <span>
          <span className="dot" /> SILVER JUBILEE · 2026
        </span>
        <span>27.3389° N · 88.6065° E</span>
      </div>

      <div className="hero__split">
        {/* LEFT: copy panel */}
        <div className="hero__panel" data-testid="hero-panel">
          <div className="hero__eyebrow">
            <span style={{ width: 24, height: 1, background: "currentColor" }} />
            Gangtok · Sikkim · Est. 2001
          </div>
          <h1 className="hero__title" data-testid="hero-title">
            <span className="hero__title-line">
              <span>C.S.</span>&nbsp;<span>Singhi</span>
            </span>
            <span className="hero__title-line hero__title-line--accent">
              <span>&amp;</span>&nbsp;<span>Associates</span>
            </span>
          </h1>
          <p className="hero__sub">
            25 years of design &amp; architecture. <br />
            A new era begins.
          </p>
          <div className="hero__rule" />
          <nav className="hero__nav" data-testid="hero-nav">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                data-testid={`hero-nav-${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* RIGHT: building render, free-floating */}
        <div className="hero__stage" aria-hidden="true">
          <div className="hero__stage-label">
            <span className="dot" />
            EXPLODED AXONOMETRIC · MIXED-USE TOWER · GANGTOK
          </div>
          <img
            ref={imgRef}
            src={ASSETS.hero}
            alt="Exploded axonometric architectural drawing of a C.S. Singhi & Associates mixed-use tower"
            className="hero__building"
          />
          <div className="hero__stage-meta">
            <span>SCALE 1:200</span>
            <span>SHEET 01 / 12</span>
            <span>PROJECT 2026-A</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
