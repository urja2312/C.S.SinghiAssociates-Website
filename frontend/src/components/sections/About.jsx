import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionDivider from "../site/SectionDivider";
import {
  ABOUT_BODY,
  STATS,
  VALUES,
  STOCK_PHOTOS,
  PROBONO,
} from "../../lib/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.from(".about__heading", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".about__heading",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".about__photo", {
        opacity: 0,
        rotate: (i) => [-8, 4, -2][i] || 0,
        y: 60,
        stagger: 0.15,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".about__collage",
          start: "top 75%",
          once: true,
        },
      });

      gsap.from(".about__body, .about__quote", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".about__body",
          start: "top 85%",
          once: true,
        },
      });

      // Stat counters
      document.querySelectorAll(".stat__value").forEach((el) => {
        const target = parseInt(el.dataset.value, 10);
        const suffix = el.dataset.suffix || "";
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      });

      gsap.from(".value", {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".values",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".probono__card", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".probono",
          start: "top 80%",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className="section about"
      ref={ref}
      data-testid="section-about"
    >
      <SectionDivider label="01 · About" />

      <div className="section__inner">
        <div className="about__grid">
          <div className="about__collage" data-testid="about-collage">
            <div
              className="about__photo about__photo--1"
              style={{ backgroundImage: `url("${STOCK_PHOTOS.collage1}")` }}
            />
            <div
              className="about__photo about__photo--2"
              style={{ backgroundImage: `url("${STOCK_PHOTOS.collage2}")` }}
            />
            <div
              className="about__photo about__photo--3"
              style={{ backgroundImage: `url("${STOCK_PHOTOS.collage3}")` }}
            />
          </div>

          <div>
            <div className="kicker" style={{ marginBottom: "0.75rem" }}>
              Our story · 2001 → 2026
            </div>
            <h2 className="about__heading headline">
              About <em>us.</em>
            </h2>
            <p className="about__body" data-testid="about-body">
              {ABOUT_BODY}
            </p>
            <blockquote className="about__quote">
              &ldquo;True architecture is measured not just in structures, but in the
              ethical foundation upon which they are built.&rdquo;
              <span className="about__quote-attr">
                — Chhatra S. Singhi, Founding Principal
              </span>
            </blockquote>
          </div>
        </div>

        <div className="stats" data-testid="about-stats">
          {STATS.map((s, i) => (
            <div className="stat" key={i}>
              <div
                className="stat__value"
                data-value={s.value}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="kicker" style={{ marginBottom: "0.75rem" }}>
          Our Promise · Four pillars
        </div>
        <div className="values" data-testid="about-values">
          {VALUES.map((v, i) => (
            <div className="value" key={i}>
              <div className="value__name">{v.name}</div>
              <div className="value__desc">{v.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="probono" data-testid="about-probono">
        <div className="probono__inner">
          <div className="probono__heading">
            Pro Bono Work · A gift to the community
          </div>
          <div className="probono__cards">
            {PROBONO.map((p, i) => (
              <div className="probono__card" key={i}>
                <div className="probono__card-name">{p.name}</div>
                <div className="probono__card-loc">{p.location}</div>
                <div className="probono__card-desc">{p.desc}</div>
              </div>
            ))}
          </div>
          <p className="probono__quote">
            &ldquo;Architecture at its finest is a gift to the community it serves.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
