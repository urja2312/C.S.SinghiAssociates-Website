import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionDivider from "../site/SectionDivider";
import { PROJECTS } from "../../lib/siteData";
import { scrollToSection } from "../../hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;

      // Headline reveal
      gsap.from(".projects__title, .projects__hint", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".projects__intro",
          start: "top 85%",
          once: true,
        },
      });

      if (prefersReduced) {
        // Static stack on reduced motion
        track.style.flexWrap = "wrap";
        track.style.position = "relative";
        return;
      }

      // Horizontal scroll: as user scrolls vertically through viewport,
      // translate the track horizontally.
      const setTween = () => {
        const distance = track.scrollWidth - viewport.clientWidth;
        if (distance <= 0) return null;
        return gsap.to(track, {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: viewport,
            start: "top top+=80",
            end: () => `+=${distance + 200}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      };
      let tween = setTween();

      const onResize = () => {
        if (tween) tween.scrollTrigger?.kill();
        tween = setTween();
      };
      window.addEventListener("resize", onResize);

      return () => window.removeEventListener("resize", onResize);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Close drawer with Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="projects"
      className="section projects"
      ref={sectionRef}
      data-testid="section-projects"
    >
      <SectionDivider label="03 · Projects" />
      <div className="section__inner">
        <div className="projects__intro">
          <h2 className="projects__title">
            Projects <em style={{ fontFamily: '"EB Garamond", serif', fontStyle: "italic", fontWeight: 400, color: "var(--wood)" }}>that last.</em>
          </h2>
          <span className="projects__hint">
            ← Scroll to explore →
          </span>
        </div>
      </div>

      <div
        className="projects__viewport"
        ref={viewportRef}
        data-testid="projects-viewport"
      >
        <div className="projects__track" ref={trackRef} data-testid="projects-track">
          {PROJECTS.map((p) => {
            const badgeClass =
              p.statusVariant === "moss"
                ? "project-card__badge--moss"
                : p.statusVariant === "construction"
                ? "project-card__badge--construction"
                : "";
            return (
              <button
                key={p.id}
                className="project-card"
                onClick={() => setActiveProject(p)}
                data-testid={`project-card-${p.id}`}
                aria-label={`View details for ${p.title}`}
                style={{ textAlign: "left" }}
              >
                <div
                  className="project-card__img"
                  style={{ backgroundImage: `url("${p.image}")` }}
                />
                <div className="project-card__overlay" />
                <div className={`project-card__badge ${badgeClass}`}>
                  {p.status}
                </div>
                <div className="project-card__index">— {p.index}</div>
                <div className="project-card__meta">
                  <div className="project-card__title">{p.title}</div>
                  <div className="project-card__loc">
                    {p.location} · {p.year}
                  </div>
                  <div className="project-card__specs">
                    {p.price}
                    <br />
                    {p.config} · {p.area}
                  </div>
                </div>
              </button>
            );
          })}
          {/* trailing spacer so last card is visible */}
          <div style={{ minWidth: "20vw", flexShrink: 0 }} aria-hidden="true" />
        </div>
      </div>

      {/* Drawer */}
      <div
        className={`project-drawer ${activeProject ? "project-drawer--open" : ""}`}
        data-testid="project-drawer"
        role="dialog"
        aria-modal="true"
        aria-hidden={!activeProject}
      >
        {activeProject && (
          <div className="project-drawer__inner">
            <button
              className="project-drawer__close"
              onClick={() => setActiveProject(null)}
              data-testid="project-drawer-close"
              aria-label="Close project details"
            >
              ×
            </button>
            <div className="kicker">— {activeProject.index} / Featured Project</div>
            <h3 className="project-drawer__title">{activeProject.title}</h3>
            <div className="project-drawer__loc">
              {activeProject.location} · {activeProject.year} ·{" "}
              {activeProject.status}
            </div>
            <div className="project-drawer__grid">
              <div>
                <p
                  style={{
                    fontSize: "var(--text-base)",
                    color: "var(--ink)",
                    lineHeight: 1.7,
                    marginBottom: "1.5rem",
                  }}
                >
                  {activeProject.description}
                </p>
                <div className="kicker" style={{ marginBottom: "0.75rem" }}>
                  Amenities
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {activeProject.amenities.map((a, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: "var(--text-sm)",
                        color: "var(--concrete)",
                        paddingLeft: "1rem",
                        position: "relative",
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "0.6em",
                          width: 6,
                          height: 1,
                          background: "var(--wood)",
                        }}
                      />
                      {a}
                    </li>
                  ))}
                </ul>

                <button
                  className="project-drawer__cta"
                  data-testid="project-drawer-enquire"
                  onClick={() => {
                    setActiveProject(null);
                    setTimeout(() => scrollToSection("contact"), 400);
                  }}
                >
                  Enquire about this project →
                </button>
              </div>
              <div className="project-drawer__specs">
                <div className="spec">
                  <div className="spec__label">Price</div>
                  <div className="spec__value">{activeProject.price}</div>
                </div>
                <div className="spec">
                  <div className="spec__label">Area</div>
                  <div className="spec__value">{activeProject.area}</div>
                </div>
                <div className="spec">
                  <div className="spec__label">Configuration</div>
                  <div className="spec__value">{activeProject.config}</div>
                </div>
                <div className="spec">
                  <div className="spec__label">Architect</div>
                  <div className="spec__value">{activeProject.architect}</div>
                </div>
                <div className="spec">
                  <div className="spec__label">Status</div>
                  <div className="spec__value">{activeProject.status}</div>
                </div>
                <div className="spec">
                  <div className="spec__label">Year</div>
                  <div className="spec__value">{activeProject.year}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
