import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../../lib/siteData";
import { scrollToSection } from "../../hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Reveal animations only — no pinned horizontal scrub
  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.from(".projects__eyebrow, .projects__title, .projects__lede", {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".projects__intro", start: "top 85%", once: true },
      });

      gsap.from(".project-card", {
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: "expo.out",
        clearProps: "opacity",
        scrollTrigger: { trigger: ".projects__viewport", start: "top 90%", once: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Track scroll position to disable arrows at edges
  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;

    const update = () => {
      const max = vp.scrollWidth - vp.clientWidth;
      setCanScrollLeft(vp.scrollLeft > 4);
      setCanScrollRight(vp.scrollLeft < max - 4);
    };
    update();
    vp.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      vp.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Close drawer with Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setActiveProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const scrollByCard = (dir) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const card = vp.querySelector(".project-card");
    const step = card ? card.offsetWidth + 32 : vp.clientWidth * 0.6;
    vp.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      className="section projects projects--manual"
      ref={sectionRef}
      data-testid="section-projects"
    >
      <div className="section__inner">
        <div className="projects__intro">
          <div className="projects__eyebrow" data-testid="projects-eyebrow">— Selected Work · 2001 → 2026</div>
          <h2 className="projects__title">
            Projects{" "}
            <em
              style={{
                fontFamily: '"EB Garamond", serif',
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--wood)",
              }}
            >
              that last.
            </em>
          </h2>
          <p className="projects__lede">
            A curated portfolio of residences, civic landmarks and heritage
            commissions across the Himalayan belt. Use the arrows to browse.
          </p>
        </div>
      </div>

      <div className="projects__gallery">
        <button
          type="button"
          className="projects__arrow projects__arrow--left"
          onClick={() => scrollByCard(-1)}
          disabled={!canScrollLeft}
          aria-label="Previous project"
          data-testid="projects-arrow-left"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M14 4l-7 7 7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
          </svg>
        </button>

        <div
          className="projects__viewport"
          ref={viewportRef}
          data-testid="projects-viewport"
        >
          <div className="projects__track" data-testid="projects-track">
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
          </div>
        </div>

        <button
          type="button"
          className="projects__arrow projects__arrow--right"
          onClick={() => scrollByCard(1)}
          disabled={!canScrollRight}
          aria-label="Next project"
          data-testid="projects-arrow-right"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M8 4l7 7-7 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
          </svg>
        </button>
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
