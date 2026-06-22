import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_BODY, STATS, VALUES, PROBONO } from "../../lib/siteData";

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
        scrollTrigger: { trigger: ".about__heading", start: "top 85%", once: true },
      });

      gsap.from(".about__body, .about__quote", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: { trigger: ".about__body", start: "top 85%", once: true },
      });

      // Stat counters via IntersectionObserver — fail-safe with Lenis
      const counterEls = document.querySelectorAll(".stat__value");
      const played = new WeakSet();
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (!e.isIntersecting || played.has(e.target)) return;
            played.add(e.target);
            const target = parseInt(e.target.dataset.value, 10);
            const suffix = e.target.dataset.suffix || "";
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                e.target.textContent = Math.round(obj.val) + suffix;
              },
            });
          });
        },
        { threshold: 0.4 }
      );
      counterEls.forEach((el) => io.observe(el));

      gsap.from(".value", {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: { trigger: ".values", start: "top 80%", once: true },
      });

      gsap.from(".probono__card", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: ".probono", start: "top 80%", once: true },
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
      {/* Architectural ambience matching the hero */}
      <div className="about__grid-bg" aria-hidden="true" />
      <div className="about__halo" aria-hidden="true" />

      {/* Drafting marks */}
      <span className="about__cross about__cross--tl" aria-hidden="true">+</span>
      <span className="about__cross about__cross--tr" aria-hidden="true">+</span>
      <span className="about__cross about__cross--mr" aria-hidden="true">+</span>

      <div className="section__inner about__inner">
        <div className="about__head">
          <div className="kicker">— Our Story · 2001 → 2026</div>
          <h2 className="about__heading">
            About <em>us.</em>
          </h2>
        </div>

        <p className="about__body" data-testid="about-body">
          {ABOUT_BODY}
        </p>

        {/* Hero quote — the visual anchor of the section */}
        <figure className="about__quote-block">
          <span className="about__quote-mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="about__quote">
            True architecture is measured not just in structures, but in the
            ethical foundation upon which they are built.
          </blockquote>
          <figcaption className="about__quote-attr">
            <span className="about__quote-rule" />
            Chhatra S. Singhi · Founding Principal
          </figcaption>
        </figure>

        {/* Stats */}
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

        <div className="kicker about__pillars-kicker">
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
            &ldquo;Architecture at its finest is a gift to the community it
            serves.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
