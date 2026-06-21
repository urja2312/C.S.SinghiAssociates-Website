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

    // Premium scroll choreography — three layers, three rates.
    const buildingTween = gsap.to(imgRef.current, {
      yPercent: -8,
      scale: 1.07,
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
      opacity: 0.65,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      },
    });

    const titleTween = gsap.to(titleRef.current, {
      yPercent: -6,
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
      {/* Layers — all in service of the building, no UI chrome */}
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__wash" aria-hidden="true" />
      <div className="hero__halo" ref={auraRef} aria-hidden="true" />

      {/* The architecture — monumental, blended, partially off-canvas */}
      <img
        ref={imgRef}
        src={ASSETS.hero}
        alt="Exploded axonometric drawing of a C.S. Singhi Himalayan tower"
        className="hero__building"
      />

      {/* Title + lede — the only copy in the hero */}
      <div className="hero__title-block" ref={titleRef} data-testid="hero-panel">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-rule" />
          Architecture · Sikkim · Since 2001
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
    </section>
  );
}
