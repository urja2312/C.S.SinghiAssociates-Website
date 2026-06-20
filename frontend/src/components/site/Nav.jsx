import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ASSETS, NAV_LINKS } from "../../lib/siteData";
import { scrollToSection } from "../../hooks/useLenis";

gsap.registerPlugin(ScrollTrigger);

export default function Nav({ onSearchOpen }) {
  const navRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const trigger = ScrollTrigger.create({
      start: () => `${window.innerHeight * 0.7} top`,
      end: "max",
      toggleClass: { targets: nav, className: "nav--solid" },
    });
    return () => trigger.kill();
  }, []);

  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <nav className="nav" ref={navRef} data-testid="site-nav">
        <div className="nav__inner">
          <a
            href="#top"
            className="nav__brand"
            data-testid="nav-brand"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("top");
            }}
          >
            <img
              src={ASSETS.logo}
              alt="C.S. Singhi & Associates"
              className="nav__compass"
              style={{ objectFit: "contain" }}
            />
            <div className="nav__wordmark">
              <span className="nav__name">C.S. Singhi &amp; Associates</span>
              <span className="nav__est">Est. 2001 · Gangtok · Sikkim</span>
            </div>
          </a>

          <div className="nav__actions">
            <button
              className="nav__search-btn"
              aria-label="Search"
              onClick={onSearchOpen}
              data-testid="nav-search-btn"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <a
              href="#contact"
              className="nav__cta"
              data-testid="nav-contact-cta"
              onClick={handleNavClick("contact")}
            >
              Contact Us
            </a>
            <button
              className="nav__hamburger"
              aria-label="Menu"
              onClick={() => setMobileOpen(true)}
              data-testid="nav-mobile-toggle"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`mobile-menu ${mobileOpen ? "mobile-menu--open" : ""}`}
        data-testid="mobile-menu"
      >
        <button
          className="mobile-menu__close"
          onClick={() => setMobileOpen(false)}
          data-testid="mobile-menu-close"
        >
          CLOSE ×
        </button>
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            onClick={handleNavClick(link.id)}
            data-testid={`mobile-nav-${link.id}`}
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
}
