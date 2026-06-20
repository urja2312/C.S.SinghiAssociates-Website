import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionDivider from "../site/SectionDivider";
import { SERVICES } from "../../lib/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.from(".services__lead-title, .services__lead-desc", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".services__lead",
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(".service-card", {
        opacity: 0,
        y: 40,
        duration: 0.7,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".services__cards",
          start: "top 80%",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      className="section services"
      ref={ref}
      data-testid="section-services"
    >
      <SectionDivider label="02 · Services" />
      <div className="section__inner">
        <div className="services__grid">
          <div className="services__lead">
            <div className="kicker">Practice</div>
            <h2 className="services__lead-title">
              All property solutions, <br />
              under one roof.
            </h2>
            <p className="services__lead-desc">
              From the first topographic survey to the last interior fitting —
              we draw, build, and deliver the entire arc of a project, in-house.
            </p>
          </div>
          <div className="services__cards" data-testid="services-grid">
            {SERVICES.map((s, i) => (
              <div className="service-card" key={i} data-testid={`service-card-${s.num}`}>
                <div>
                  <div className="service-card__num">{s.num} / 06</div>
                  <div className="service-card__name">{s.name}</div>
                  <div className="service-card__desc">{s.desc}</div>
                </div>
                <div>
                  <div className="service-card__rule" />
                  <div className="service-card__arrow">
                    Learn more
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                      <path
                        d="M1 5h14m0 0l-4-4m4 4l-4 4"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
