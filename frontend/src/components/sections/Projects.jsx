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
  const [galleryIndex, setGalleryIndex] = useState(0);

  // Reset gallery index when project changes
  useEffect(() => {
    setGalleryIndex(0);
  }, [activeProject]);

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
        {activeProject && (() => {
          const gallery = activeProject.gallery && activeProject.gallery.length
            ? activeProject.gallery
            : [activeProject.image];
          const total = gallery.length;
          const goPrev = () =>
            setGalleryIndex((i) => (i - 1 + total) % total);
          const goNext = () =>
            setGalleryIndex((i) => (i + 1) % total);
          const thumb1 = gallery[(galleryIndex + 1) % total];
          const thumb2 = gallery[(galleryIndex + 2) % total];

          return (
            <div className="project-drawer__inner project-drawer__inner--editorial">
              <button
                className="project-drawer__close"
                onClick={() => setActiveProject(null)}
                data-testid="project-drawer-close"
                aria-label="Close project details"
              >
                ×
              </button>

              <div className="project-drawer__layout">
                {/* LEFT — editorial copy */}
                <div className="project-drawer__copy">
                  <div className="project-drawer__kicker">
                    — {activeProject.index} / Featured Project
                  </div>
                  <h3 className="project-drawer__title">
                    {activeProject.title}
                  </h3>
                  <div className="project-drawer__meta">
                    {activeProject.location} · {activeProject.year} ·{" "}
                    {activeProject.status}
                  </div>

                  <p className="project-drawer__desc">
                    {activeProject.description}
                  </p>

                  <div className="project-drawer__facts">
                    <div className="project-drawer__fact">
                      <div className="project-drawer__fact-label">Area</div>
                      <div className="project-drawer__fact-value">
                        {activeProject.area}
                      </div>
                    </div>
                    <div className="project-drawer__fact">
                      <div className="project-drawer__fact-label">Year</div>
                      <div className="project-drawer__fact-value">
                        {activeProject.year}
                      </div>
                    </div>
                  </div>

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

                {/* RIGHT — gallery */}
                <div className="project-drawer__gallery" data-testid="project-drawer-gallery">
                  <div className="project-drawer__gallery-grid">
                    <div
                      className="project-drawer__main-image"
                      key={`main-${galleryIndex}`}
                      data-testid="project-drawer-main-image"
                    >
                      <img
                        src={gallery[galleryIndex]}
                        alt={`${activeProject.title} — view ${galleryIndex + 1}`}
                        draggable={false}
                      />
                      <button
                        type="button"
                        className="project-drawer__gallery-arrow project-drawer__gallery-arrow--prev"
                        onClick={goPrev}
                        aria-label="Previous image"
                        data-testid="project-drawer-prev"
                        disabled={total < 2}
                      >
                        <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                          <path d="M14 4l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="project-drawer__gallery-arrow project-drawer__gallery-arrow--next"
                        onClick={goNext}
                        aria-label="Next image"
                        data-testid="project-drawer-next"
                        disabled={total < 2}
                      >
                        <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                          <path d="M8 4l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>

                    <div className="project-drawer__thumbs">
                      <button
                        type="button"
                        className="project-drawer__thumb"
                        onClick={() => setGalleryIndex((galleryIndex + 1) % total)}
                        aria-label="Show next view"
                        data-testid="project-drawer-thumb-1"
                        disabled={total < 2}
                      >
                        <img
                          src={thumb1}
                          alt={`${activeProject.title} — view ${((galleryIndex + 1) % total) + 1}`}
                          draggable={false}
                        />
                      </button>
                      <button
                        type="button"
                        className="project-drawer__thumb"
                        onClick={() => setGalleryIndex((galleryIndex + 2) % total)}
                        aria-label="Show another view"
                        data-testid="project-drawer-thumb-2"
                        disabled={total < 3}
                      >
                        <img
                          src={thumb2}
                          alt={`${activeProject.title} — view ${((galleryIndex + 2) % total) + 1}`}
                          draggable={false}
                        />
                      </button>
                    </div>
                  </div>

                  {total > 1 && (
                    <div
                      className="project-drawer__dots"
                      role="tablist"
                      aria-label="Gallery navigation"
                      data-testid="project-drawer-dots"
                    >
                      {gallery.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          role="tab"
                          aria-selected={i === galleryIndex}
                          aria-label={`Go to image ${i + 1}`}
                          onClick={() => setGalleryIndex(i)}
                          className={
                            i === galleryIndex
                              ? "project-drawer__dot project-drawer__dot--active"
                              : "project-drawer__dot"
                          }
                          data-testid={`project-drawer-dot-${i}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </section>
  );
}
