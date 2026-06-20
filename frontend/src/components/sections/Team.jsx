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

      gsap.from(".team-card", {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".team__grid",
          start: "top 85%",
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

        {/* Founding Principal feature */}
        <div className="team__feature" data-testid="team-principal">
          <div className="team__portrait team__portrait--placeholder">
            {TEAM_LEADS.principal.initials}
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
            <div className="team__feature-quote">
              &ldquo;{TEAM_LEADS.principal.quote}&rdquo;
            </div>
          </div>
        </div>

        {/* Sakshi feature */}
        <div className="team__feature team__feature--alt" data-testid="team-architect">
          <div className="team__portrait team__portrait--placeholder">
            {TEAM_LEADS.architect.initials}
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
            <div className="team__feature-quote">
              &ldquo;{TEAM_LEADS.architect.quote}&rdquo;
            </div>
          </div>
        </div>

        <div className="kicker" style={{ marginTop: "var(--space-lg)" }}>
          Architects &amp; Engineers
        </div>
        <div className="team__grid" data-testid="team-grid">
          {TEAM_GRID.map((m, i) => (
            <div className="team-card" key={i} data-testid={`team-member-${i}`}>
              <div className="team-card__portrait">{m.initials}</div>
              <div className="team-card__body">
                <div className="team-card__name">{m.name}</div>
                <div className="team-card__role">{m.role}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="team__support">
          Support team —{" "}
          {SUPPORT_TEAM.map((p, i) => (
            <span key={i}>
              <span>{p.name}</span> ({p.role})
              {i < SUPPORT_TEAM.length - 1 ? " · " : ""}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
