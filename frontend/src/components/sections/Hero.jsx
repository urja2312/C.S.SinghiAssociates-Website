import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS } from "../../lib/siteData";
import { scrollToSection } from "../../hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const imgRef = useRef(null);
  const haloRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    // Layered scroll choreography — three rates of motion for real depth.
    const buildingTween = gsap.to(imgRef.current, {
      yPercent: -8,
      scale: 1.1,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    const haloTween = gsap.to(haloRef.current, {
      scale: 1.2,
      opacity: 0.7,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    const gridTween = gsap.to(gridRef.current, {
      yPercent: 4,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    const titleTween = gsap.to(titleRef.current, {
      yPercent: -5,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      [buildingTween, haloTween, gridTween, titleTween].forEach((t) => {
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
      {/* Background layers */}
      <div className="hero__grid" ref={gridRef} aria-hidden="true" />
      <div className="hero__wash" aria-hidden="true" />
      <div className="hero__halo" ref={haloRef} aria-hidden="true" />

      {/* Gold corner crosses — architectural drawing marks */}
      <span className="hero__cross hero__cross--tl" aria-hidden="true">+</span>
      <span className="hero__cross hero__cross--tr" aria-hidden="true">+</span>
      <span className="hero__cross hero__cross--bl" aria-hidden="true">+</span>
      <span className="hero__cross hero__cross--br" aria-hidden="true">+</span>
      <span className="hero__cross hero__cross--m1" aria-hidden="true">+</span>
      <span className="hero__cross hero__cross--m2" aria-hidden="true">+</span>

      {/* Vertical edge labels — gold mono text */}
      <span className="hero__edge hero__edge--left" aria-hidden="true">
        EST · 2001
      </span>
      <span className="hero__edge hero__edge--right" aria-hidden="true">
        27.3389° N · 88.6065° E
      </span>

      {/* The architecture — monumental, blended */}
      <img
        ref={imgRef}
        src={ASSETS.hero}
        alt="Exploded axonometric drawing of a C.S. Singhi Himalayan tower"
        className="hero__building"
      />

      {/* Title block — left-anchored editorial composition */}
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

      <a
        href="#about"
        className="hero__scroll"
        data-testid="hero-scroll"
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("about");
        }}
      >
        <span>Scroll</span>
        <span className="hero__scroll-arrow" aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
