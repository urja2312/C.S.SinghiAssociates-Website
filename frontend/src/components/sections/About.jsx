import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT_BODY, STATS, TIMELINE, PROBONO } from "../../lib/siteData";

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
        opacity: 0, y: 60, duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: ".about__heading", start: "top 85%", once: true },
      });
      gsap.from(".about__body", {
        opacity: 0, y: 30, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".about__body", start: "top 85%", once: true },
      });

      // Timeline — featured exhibit with sequential reveal
      gsap.from(".tl__header", {
        opacity: 0, y: 30, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".tl--featured", start: "top 80%", once: true },
      });
      gsap.from(".tl__track-fill", {
        scaleX: 0, transformOrigin: "left center", duration: 2.0, ease: "expo.out",
        scrollTrigger: { trigger: ".tl--featured", start: "top 75%", once: true },
        delay: 0.25,
      });
      gsap.from(".tl__node", {
        opacity: 0, scale: 0.2, stagger: 0.22, duration: 0.55, ease: "back.out(2.4)",
        scrollTrigger: { trigger: ".tl--featured", start: "top 75%", once: true },
        delay: 0.35,
      });
      gsap.from(".tl__year", {
        opacity: 0, y: 14, stagger: 0.22, duration: 0.55, ease: "expo.out",
        scrollTrigger: { trigger: ".tl--featured", start: "top 75%", once: true },
        delay: 0.45,
      });
      gsap.from(".tl__title, .tl__desc", {
        opacity: 0, y: 10, stagger: 0.06, duration: 0.5, ease: "expo.out",
        scrollTrigger: { trigger: ".tl--featured", start: "top 72%", once: true },
        delay: 0.6,
      });

      gsap.from(".purpose", {
        opacity: 0, y: 40, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".purpose", start: "top 85%", once: true },
      });

      gsap.from(".metrics", {
        opacity: 0, y: 40, duration: 0.9, ease: "expo.out",
        scrollTrigger: { trigger: ".metrics", start: "top 85%", once: true },
      });

      // Stat counters
      const played = new WeakSet();
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || played.has(e.target)) return;
          played.add(e.target);
          const target = parseInt(e.target.dataset.value, 10);
          const suffix = e.target.dataset.suffix || "";
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 1.6, ease: "power2.out",
            onUpdate: () => { e.target.textContent = Math.round(obj.val) + suffix; },
          });
        });
      }, { threshold: 0.4 });
      document.querySelectorAll(".metric__value").forEach((el) => io.observe(el));
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="section about" ref={ref} data-testid="section-about">
      <div className="about__grid-bg" aria-hidden="true" />
      <div className="about__wire" aria-hidden="true" />

      <div className="section__inner about__inner">
        {/* TOP — story + purpose */}
        <div className="about__layout">
          <div className="about__left">
            <div className="kicker">— OUR STORY · 2001 → 2026</div>
            <h2 className="about__heading">
              <span>ABOUT</span>
              <em>us.</em>
            </h2>
            <p className="about__body" data-testid="about-body">{ABOUT_BODY}</p>
          </div>

          <div className="about__right">
            <article className="card purpose">
              <header className="card__title">Our Purpose</header>
              <span className="purpose__mark" aria-hidden="true">&ldquo;</span>
              <blockquote className="purpose__quote">
                True architecture is measured not just in structures, but in the
                ethical foundation upon which they are built.
              </blockquote>
              <div className="purpose__attr">
                <span className="purpose__rule" />
                Chhatra S. Singhi · Founding Principal
              </div>
            </article>
          </div>
        </div>

        {/* FEATURED — timeline exhibit */}
        <article className="card tl tl--featured" aria-label="Our journey timeline" data-testid="about-timeline">
          <header className="tl__header">
            <div className="tl__eyebrow">— Twenty-Five Years · Five Defining Chapters</div>
            <h3 className="tl__title-main">Our Journey</h3>
          </header>
          <div className="tl__track" aria-hidden="true">
            <span className="tl__track-line" />
            <span className="tl__track-fill" />
            {TIMELINE.map((_, i) => (
              <span
                key={i}
                className="tl__node"
                style={{ left: `${(i / (TIMELINE.length - 1)) * 100}%` }}
              />
            ))}
          </div>
          <div className="tl__items">
            {TIMELINE.map((m) => (
              <div className="tl__item" key={m.year}>
                <div className="tl__year">{m.year}</div>
                <div className="tl__title">{m.title}</div>
                <div className="tl__desc">{m.desc}</div>
              </div>
            ))}
          </div>
        </article>

        {/* BOTTOM — metrics */}
        <article className="card metrics" aria-label="Company metrics">
          {STATS.map((s, i) => (
            <div className="metric" key={i}>
              <div
                className="metric__value"
                data-value={s.value}
                data-suffix={s.suffix}
              >
                0{s.suffix}
              </div>
              <div className="metric__label">{s.label}</div>
            </div>
          ))}
        </article>
      </div>

      <div className="probono" data-testid="about-probono">
        <div className="probono__inner">
          <div className="probono__heading">Pro Bono Work · A gift to the community</div>
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

      {/* Atmospheric transition into the next chapter */}
      <div className="about__fade" aria-hidden="true" data-testid="about-fade-out" />
    </section>
  );
}
