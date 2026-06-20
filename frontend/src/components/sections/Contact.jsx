import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionDivider from "../site/SectionDivider";
import { CONTACT, ASSETS } from "../../lib/siteData";

gsap.registerPlugin(ScrollTrigger);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Contact() {
  const ref = useRef(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ state: "idle", msg: "" });

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

      gsap.from(".contact__form", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".contact__form",
          start: "top 85%",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus({ state: "err", msg: "Name, email and message are required." });
      return;
    }
    setStatus({ state: "loading", msg: "Sending…" });
    try {
      await axios.post(`${API}/contact`, form);
      setStatus({
        state: "ok",
        msg: "Thank you — we'll be in touch within 48 hours.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
      // Also open mailto as a parallel channel (non-blocking)
      // (commented out so we don't trigger a download/redirect popup)
    } catch (err) {
      const msg =
        err?.response?.data?.detail?.[0]?.msg ||
        err?.response?.data?.detail ||
        "Could not submit. Please try email directly.";
      setStatus({ state: "err", msg: typeof msg === "string" ? msg : "Submission failed." });
    }
  };

  return (
    <section
      id="contact"
      className="section contact"
      ref={ref}
      data-testid="section-contact"
    >
      <SectionDivider label="06 · Contact" />
      <div className="section__inner">
        <div className="contact__grid">
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
              Whether you have a plot, a sketch, or simply a vision — write to
              us. The first conversation is always on the house.
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

          <form
            className="contact__form"
            onSubmit={onSubmit}
            data-testid="contact-form"
          >
            <div className="contact__field">
              <label htmlFor="cname">Name</label>
              <input
                id="cname"
                type="text"
                name="name"
                value={form.name}
                onChange={onChange}
                data-testid="contact-name"
                autoComplete="name"
              />
            </div>
            <div className="contact__field">
              <label htmlFor="cemail">Email</label>
              <input
                id="cemail"
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                data-testid="contact-email-input"
                autoComplete="email"
              />
            </div>
            <div className="contact__field">
              <label htmlFor="csubject">Subject</label>
              <input
                id="csubject"
                type="text"
                name="subject"
                value={form.subject}
                onChange={onChange}
                data-testid="contact-subject"
              />
            </div>
            <div className="contact__field">
              <label htmlFor="cmessage">Message</label>
              <textarea
                id="cmessage"
                name="message"
                rows={4}
                value={form.message}
                onChange={onChange}
                data-testid="contact-message"
              />
            </div>
            <button
              type="submit"
              className="contact__submit"
              disabled={status.state === "loading"}
              data-testid="contact-submit"
            >
              {status.state === "loading" ? "Sending…" : "Send Message →"}
            </button>
            {status.state !== "idle" && status.state !== "loading" && (
              <div
                className={`contact__msg contact__msg--${
                  status.state === "ok" ? "ok" : "err"
                }`}
                data-testid="contact-status"
              >
                {status.msg}
              </div>
            )}
          </form>
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
