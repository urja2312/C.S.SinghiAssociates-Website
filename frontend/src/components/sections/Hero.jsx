import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "../../lib/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const imgRef = useRef(null);
  const auraRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Layered architectural parallax — building rises, aura expands,
    // title drifts subtly slower for depth.
    const buildingTween = gsap.to(imgRef.current, {
      yPercent: -10,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    const auraTween = gsap.to(auraRef.current, {
      scale: 1.15,
      opacity: 0.55,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    const titleTween = gsap.to(titleRef.current, {
      yPercent: -4,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    return () => {
      [buildingTween, auraTween, titleTween].forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
    };
  }, []);

  return (
    <section
      id="top"
      className="hero hero--studio"
      ref={heroRef}
      data-testid="hero-section"
    >
      {/* Full-bleed blueprint grid that ties the whole composition together */}
      <div className="hero__grid" aria-hidden="true" />
      {/* Soft architectural wash behind the building */}
      <div className="hero__wash" aria-hidden="true" />
      {/* Aura — animated halo that breathes with scroll */}
      <div className="hero__halo" ref={auraRef} aria-hidden="true" />

      {/* Architect-drawing annotations — small mono labels */}
      <span className="hero__note hero__note--tl" aria-hidden="true">
        <span className="hero__note-tick" />
        EST. 2001 · GANGTOK
      </span>
      <span className="hero__note hero__note--tr" aria-hidden="true">
        27.3389° N · 88.6065° E
        <span className="hero__note-tick" />
      </span>
      <span className="hero__note hero__note--br" aria-hidden="true">
        FOR 25 YEARS · A NEW ERA
        <span className="hero__note-tick" />
      </span>

      {/* The illustration — the visual hero, blended into the canvas */}
      <img
        ref={imgRef}
        src={ASSETS.hero}
        alt="Exploded axonometric drawing of a C.S. Singhi mixed-use Himalayan tower"
        className="hero__building"
      />

      {/* Title block — overlays the lower-left, composed WITH the illustration */}
      <div className="hero__title-block" ref={titleRef} data-testid="hero-panel">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-rule" />
          A Himalayan architectural practice — twenty-five years
        </div>
        <h1 className="hero__title" data-testid="hero-title">
          <span className="hero__title-line">
            <span>C.S.</span>&nbsp;<span>Singhi</span>
          </span>
          <span className="hero__title-line hero__title-line--accent">
            <span>&amp;</span>&nbsp;<span>Associates</span>
          </span>
        </h1>
        <p className="hero__lede">
          Architecture, interior, and turnkey practice shaping the skyline of
          Sikkim — quietly, deliberately, since 2001.
        </p>
      </div>

      {/* Bottom specification strip — like a drawing legend */}
      <div className="hero__spec" aria-hidden="true">
        <span><strong>25</strong> Years of Practice</span>
        <span className="hero__spec-divider" />
        <span><strong>12+</strong> Projects Delivered</span>
        <span className="hero__spec-divider" />
        <span><strong>3</strong> Offices</span>
        <span className="hero__spec-divider" />
        <span>COA · IIA Certified</span>
        <span className="hero__spec-divider" />
        <span className="hero__spec-scroll">Scroll to explore ↓</span>
      </div>
    </section>
  );
}
