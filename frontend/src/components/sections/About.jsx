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

      // Timeline draw
      gsap.from(".tl__track-fill", {
        scaleX: 0, transformOrigin: "left center", duration: 1.6, ease: "expo.out",
        scrollTrigger: { trigger: ".tl", start: "top 80%", once: true },
      });
      gsap.from(".tl__node", {
        opacity: 0, scale: 0.4, stagger: 0.15, duration: 0.6, ease: "back.out(2)",
        scrollTrigger: { trigger: ".tl", start: "top 80%", once: true },
      });
      gsap.from(".tl__year, .tl__title, .tl__desc", {
        opacity: 0, y: 12, stagger: 0.04, duration: 0.6, ease: "expo.out",
        scrollTrigger: { trigger: ".tl", start: "top 78%", once: true },
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
        <div className="about__layout">
          {/* LEFT — story */}
          <div className="about__left">
            <div className="kicker">— OUR STORY · 2001 → 2026</div>
            <h2 className="about__heading">
              <span>ABOUT</span>
              <em>us.</em>
            </h2>
            <p className="about__body" data-testid="about-body">{ABOUT_BODY}</p>
          </div>

          {/* RIGHT — timeline + purpose */}
          <div className="about__right">
            <article className="card tl" aria-label="Our journey timeline">
              <header className="card__title">
                Our Journey : Twenty-five Years, Five Defining Chapters
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
    </section>
  );
}
