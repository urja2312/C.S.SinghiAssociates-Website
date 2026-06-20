import { NAV_LINKS } from "../../lib/siteData";
import { scrollToSection } from "../../hooks/useLenis";

export default function SectionDivider({ label }) {
  return (
    <div className="section-divider" aria-hidden="true">
      <span className="section-divider__line" />
      <span className="section-divider__label">{label}</span>
      <nav className="section-divider__nav">
        {NAV_LINKS.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection(n.id);
            }}
          >
            {n.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
