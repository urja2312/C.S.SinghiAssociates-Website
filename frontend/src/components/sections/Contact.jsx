import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT, ASSETS } from "../../lib/siteData";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReduced) return;

      gsap.from(".contact__headline", {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".contact__headline",
          start: "top 85%",
          once: true,
        },
      });

      gsap.from(".contact__lede, .contact__row", {
        opacity: 0,
        y: 30,
        stagger: 0.07,
        duration: 0.7,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".contact__info",
          start: "top 85%",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      className="section contact contact--no-form"
      ref={ref}
      data-testid="section-contact"
    >
      <div className="section__inner">
        <div className="contact__grid contact__grid--single">
          <div>
            <div className="kicker" style={{ marginBottom: "1rem" }}>
              Let&rsquo;s begin a conversation
            </div>
            <h2 className="contact__headline">
              Let&rsquo;s build <br />
              something <br />
              <em>that lasts.</em>
            </h2>
            <p className="contact__lede">
              Whether you have a plot, a sketch, or simply a vision — reach out
              directly via phone, email or WhatsApp. The first conversation is
              always on the house.
            </p>

            <div className="contact__info" data-testid="contact-info">
              <div className="contact__row">
                <div className="contact__row-label">Studio</div>
                <div className="contact__row-value">{CONTACT.address}</div>
              </div>
              <a
                href={`tel:${CONTACT.phone.replace(/\s+/g, "")}`}
                className="contact__row"
                data-testid="contact-phone"
              >
                <div className="contact__row-label">Phone</div>
                <div className="contact__row-value">{CONTACT.phone}</div>
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="contact__row"
                data-testid="contact-email"
              >
                <div className="contact__row-label">Email</div>
                <div className="contact__row-value">{CONTACT.email}</div>
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="contact__row"
                data-testid="contact-whatsapp"
              >
                <div className="contact__row-label">WhatsApp</div>
                <div className="contact__row-value">{CONTACT.whatsapp}</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer" data-testid="site-footer">
        <div className="footer__inner">
          <div className="footer__col">
            <img
              src={ASSETS.logo}
              alt="C.S. Singhi & Associates"
              style={{ width: 60, height: "auto", marginBottom: "0.5rem" }}
            />
            <div className="footer__brand">C.S. Singhi &amp; Associates</div>
            <div>© 2026 · All Rights Reserved</div>
            <div className="footer__love">
              Designed with love in the Himalayas.
            </div>
          </div>
          <div className="footer__col">
            <div>Gangtok · Delhi · Mumbai</div>
            <div>{CONTACT.address}</div>
            <div>{CONTACT.phone}</div>
            <div>{CONTACT.email}</div>
          </div>
          <div className="footer__col">
            <div>COA · Council of Architecture</div>
            <div>IIA · Indian Institute of Architects</div>
            <div>Instagram · LinkedIn</div>
            <div>Site by Arushi &amp; Urja Singhi</div>
          </div>
        </div>
      </footer>
    </section>
  );
}
