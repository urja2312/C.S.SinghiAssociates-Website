import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionDivider from "../site/SectionDivider";
import {
  TEAM_LEADS,
  TEAM_GRID,
  SUPPORT_TEAM,
} from "../../lib/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.from(".team__title", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".team__title",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".team__feature", {
        opacity: 0,
        x: -40,
        duration: 0.9,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".team__feature",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".team__grid .team-card", {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.7,
        ease: "expo.out",
        clearProps: "opacity,transform",
        scrollTrigger: {
          trigger: ".team__grid",
          start: "top 88%",
          once: true,
        },
      });

      gsap.from(".team__grid--support .team-card", {
        opacity: 0,
        y: 30,
        stagger: 0.07,
        duration: 0.6,
        ease: "expo.out",
        clearProps: "opacity,transform",
        scrollTrigger: {
          trigger: ".team__grid--support",
          start: "top 90%",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      className="section team"
      ref={ref}
      data-testid="section-team"
    >
      <SectionDivider label="04 · Our Team" />
      <div className="section__inner">
        <div className="kicker">The studio</div>
        <h2 className="team__title">Our team.</h2>

        <div className="team__features-row">
          {/* Decorative architectural line illustration */}
          <div className="team__deco" aria-hidden="true" data-testid="team-deco" />

          {/* Founding Principal feature */}
          <div className="team__feature" data-testid="team-principal">
            <div
              className={`team__portrait ${
                TEAM_LEADS.principal.photo ? "team__portrait--photo" : "team__portrait--placeholder"
              }`}
              style={
                TEAM_LEADS.principal.photo
                  ? { backgroundImage: `url("${TEAM_LEADS.principal.photo}")` }
                  : undefined
              }
            >
              {TEAM_LEADS.principal.photo ? null : TEAM_LEADS.principal.initials}
            </div>
            <div className="team__feature-body">
              <div className="team__feature-eyebrow">
                {TEAM_LEADS.principal.eyebrow}
              </div>
              <div className="team__feature-name">
                {TEAM_LEADS.principal.name}
              </div>
              <div className="team__feature-role">
                {TEAM_LEADS.principal.role} · COA · IIA Certified
              </div>
            </div>
          </div>

          {/* Sakshi feature */}
          <div className="team__feature team__feature--alt" data-testid="team-architect">
            <div
              className={`team__portrait ${
                TEAM_LEADS.architect.photo ? "team__portrait--photo" : "team__portrait--placeholder"
              }`}
              style={
                TEAM_LEADS.architect.photo
                  ? { backgroundImage: `url("${TEAM_LEADS.architect.photo}")` }
                  : undefined
              }
            >
              {TEAM_LEADS.architect.photo ? null : TEAM_LEADS.architect.initials}
            </div>
            <div className="team__feature-body">
              <div className="team__feature-eyebrow" style={{ color: "var(--wood)" }}>
                {TEAM_LEADS.architect.eyebrow}
              </div>
              <div
                className="team__feature-name"
                style={{ color: "var(--ink)" }}
              >
                {TEAM_LEADS.architect.name}
              </div>
              <div className="team__feature-role">
                {TEAM_LEADS.architect.role}
              </div>
            </div>
          </div>
        </div>

        <div className="kicker team__section-kicker">
          Technical Team
        </div>
        <div className="team__grid" data-testid="team-grid">
          {TEAM_GRID.map((m, i) => (
            <div className="team-card" key={i} data-testid={`team-member-${i}`}>
              <div
                className={`team-card__portrait ${m.photo ? "team-card__portrait--photo" : ""}`}
                style={m.photo ? { backgroundImage: `url("${m.photo}")` } : undefined}
              >
                {m.photo ? null : m.initials}
              </div>
              <div className="team-card__body">
                <div className="team-card__name">{m.name}</div>
                <div className="team-card__role">{m.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="kicker team__section-kicker team__section-kicker--support">
          Non-Technical Team
        </div>
        <div className="team__grid team__grid--support" data-testid="team-support-grid">
          {SUPPORT_TEAM.map((m, i) => (
            <div
              className="team-card"
              key={i}
              data-testid={`team-support-${i}`}
            >
              <div
                className={`team-card__portrait ${m.photo ? "team-card__portrait--photo" : ""}`}
                style={m.photo ? { backgroundImage: `url("${m.photo}")` } : undefined}
              >
                {m.photo ? null : m.initials}
              </div>
              <div className="team-card__body">
                <div className="team-card__name">{m.name}</div>
                <div className="team-card__role">{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
