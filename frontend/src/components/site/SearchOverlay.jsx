import { useEffect, useState, useMemo } from "react";
import { PROJECTS, SERVICES, TEAM_GRID, TEAM_LEADS, NAV_LINKS } from "../../lib/siteData";
import { scrollToSection } from "../../hooks/useLenis";

const ALL_RESULTS = [
  ...NAV_LINKS.map((n) => ({ tag: "SECTION", label: n.label, target: n.id })),
  ...PROJECTS.map((p) => ({ tag: "PROJECT", label: p.title, target: "projects" })),
  ...SERVICES.map((s) => ({ tag: "SERVICE", label: s.name, target: "services" })),
  { tag: "TEAM", label: TEAM_LEADS.principal.name, target: "team" },
  { tag: "TEAM", label: TEAM_LEADS.architect.name, target: "team" },
  ...TEAM_GRID.map((t) => ({ tag: "TEAM", label: t.name, target: "team" })),
];

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (!open) document.dispatchEvent(new Event("search:open"));
      }
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      const input = document.getElementById("search-input");
      if (input) setTimeout(() => input.focus(), 50);
    } else {
      setQuery("");
    }
  }, [open]);

  const results = useMemo(() => {
    if (!query.trim()) return ALL_RESULTS.slice(0, 8);
    const q = query.toLowerCase();
    return ALL_RESULTS.filter((r) => r.label.toLowerCase().includes(q)).slice(0, 12);
  }, [query]);

  const handleSelect = (target) => {
    onClose();
    setTimeout(() => scrollToSection(target), 250);
  };

  return (
    <div
      className={`search-overlay ${open ? "search-overlay--open" : ""}`}
      data-testid="search-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <button
        className="search-overlay__close"
        onClick={onClose}
        data-testid="search-overlay-close"
      >
        ESC · CLOSE
      </button>
      <div className="search-overlay__panel">
        <input
          id="search-input"
          className="search-overlay__input"
          placeholder="Search projects, services, team…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          data-testid="search-input"
        />
        <div className="search-overlay__results" data-testid="search-results">
          {results.length === 0 && (
            <div className="search-overlay__row" style={{ opacity: 0.5 }}>
              <span className="search-overlay__tag">—</span>
              <span>No results for &ldquo;{query}&rdquo;</span>
            </div>
          )}
          {results.map((r, i) => (
            <button
              key={`${r.tag}-${r.label}-${i}`}
              className="search-overlay__row"
              onClick={() => handleSelect(r.target)}
              data-testid={`search-result-${i}`}
              style={{ textAlign: "left", background: "transparent", border: "none", color: "inherit" }}
            >
              <span className="search-overlay__tag">[{r.tag}]</span>
              <span>{r.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
