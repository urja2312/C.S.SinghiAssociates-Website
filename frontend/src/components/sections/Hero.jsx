import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "../../lib/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const imgRef = useRef(null);
  const auraRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Subtle premium scroll choreography:
    //  - building rises slightly upward on scroll
    //  - scales gently as if drawing closer to the viewer
    //  - warm aura behind it expands
    const buildingTween = gsap.to(imgRef.current, {
      yPercent: -12,
      scale: 1.06,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    const auraTween = gsap.to(auraRef.current, {
      scale: 1.18,
      opacity: 0.7,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    return () => {
      buildingTween.scrollTrigger?.kill();
      buildingTween.kill();
      auraTween.scrollTrigger?.kill();
      auraTween.kill();
    };
  }, []);

  return (
    <section
      id="top"
      className="hero hero--split"
      ref={heroRef}
      data-testid="hero-section"
    >
      {/* Layered architectural ambience — unifies the two sides */}
      <div className="hero__canvas" aria-hidden="true" />
      <div className="blueprint-grid" aria-hidden="true" />
      <div className="hero__aura" ref={auraRef} aria-hidden="true" />
      <div className="hero__seam" aria-hidden="true" />

      <div className="hero__split">
        {/* LEFT: copy panel */}
        <div className="hero__panel" data-testid="hero-panel">
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-rule" />
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
          <p className="hero__lede">
            An architectural practice quietly shaping the Himalayan skyline —
            from sacred monasteries to luxury residences, every line drawn with
            intention.
          </p>
        </div>

        {/* RIGHT: building render, free-floating, blended */}
        <div className="hero__stage" aria-hidden="true">
          <img
            ref={imgRef}
            src={ASSETS.hero}
            alt="Exploded axonometric architectural drawing of a C.S. Singhi & Associates mixed-use tower"
            className="hero__building"
          />
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll to explore</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  );
}
