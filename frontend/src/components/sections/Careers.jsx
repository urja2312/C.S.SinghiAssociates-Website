import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionDivider from "../site/SectionDivider";
import { JOBS, CONTACT } from "../../lib/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function Careers() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.from(".careers__title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".careers__title",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".job-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".careers__grid",
          start: "top 80%",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="careers"
      className="section careers"
      ref={ref}
      data-testid="section-careers"
    >
      <SectionDivider label="05 · Careers" />
      <div className="section__inner">
        <div className="kicker">Now hiring</div>
        <h2 className="careers__title">
          Build with us, <em>from the inside.</em>
        </h2>

        <div className="careers__grid" data-testid="careers-grid">
          {JOBS.map((job, i) => (
            <div
              className="job-card"
              key={i}
              data-testid={`job-card-${i}`}
            >
              <div className="job-card__type">{job.type}</div>
              <div>
                <div className="job-card__title">{job.title}</div>
                <div className="job-card__loc" style={{ marginTop: "0.3rem" }}>
                  {job.location}
                </div>
              </div>

              <div>
                <h4>Responsibilities</h4>
                <ul style={{ marginTop: "0.6rem" }}>
                  {job.responsibilities.map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4>Requirements</h4>
                <ul style={{ marginTop: "0.6rem" }}>
                  {job.requirements.map((r, j) => (
                    <li key={j}>{r}</li>
                  ))}
                </ul>
              </div>

              <a
                href={`mailto:${CONTACT.email}?subject=Application: ${encodeURIComponent(
                  job.title
                )}`}
                className="job-card__cta"
                data-testid={`job-apply-${i}`}
              >
                Apply Now →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
