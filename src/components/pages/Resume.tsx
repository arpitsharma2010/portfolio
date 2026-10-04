import React, { useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { FiChevronLeft, FiChevronRight, FiExternalLink } from "react-icons/fi";
import PageSection from "../common/PageSection.tsx";
import { MinecraftItemIcon } from "../minecraft";
import type { MinecraftIconName } from "../minecraft/types";
import { RESUME_URL } from "../../utils/constants";
import "./resume/written-book.css";

/** Two-page spread from this width up; below it the book shows one readable page at a time. */
const SPREAD_QUERY = "(min-width: 1024px)";

const subscribeSpread = (onChange: () => void) => {
  if (typeof window.matchMedia !== "function") return () => {};
  const query = window.matchMedia(SPREAD_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const getSpread = () => typeof window.matchMedia === "function" && window.matchMedia(SPREAD_QUERY).matches;

/** One resume link, rendered below the book and again on its last page so neither reads as the book itself. */
const resumeLink = (
  <a className="pixel-button pixel-button--primary" href={RESUME_URL} target="_blank" rel="noopener noreferrer">
    <span className="wbook__action-icon" aria-hidden><MinecraftItemIcon name="book" /></span>
    Open resume <FiExternalLink aria-hidden />
  </a>
);

/** Navigation labels only: they point at the existing sections, they don't summarise them. */
const contents: { id: string; label: string; icon: MinecraftIconName }[] = [
  { id: "experience", label: "Experience", icon: "map" },
  { id: "skills", label: "Skills", icon: "diamond-pickaxe" },
  { id: "projects", label: "Projects", icon: "chest" },
  { id: "education", label: "Education", icon: "enchanted-book" },
];

const pages: { id: string; title: string; body: React.ReactNode }[] = [
  {
    id: "cover",
    title: "Cover",
    body: (
      <>
        {/* Same decorative cover as before the redesign: hidden from assistive technology. */}
        <div className="wbook-cover" aria-hidden>
          <span className="wbook-cover__gem">✦</span>
          <MinecraftItemIcon name="book" />
          <span className="wbook-cover__name">Arpit Sharma</span>
          <small>Software Engineer</small>
        </div>
        <p className="mc-kicker">Signed copy · Updated 2026</p>
      </>
    ),
  },
  {
    id: "contents",
    title: "Contents",
    body: (
      <nav aria-label="Resume contents">
        <ol className="wbook-contents">
          {contents.map((entry) => (
            <li key={entry.id}>
              <a href={`#${entry.id}`}>
                <span className="wbook-contents__icon" aria-hidden><MinecraftItemIcon name={entry.icon} /></span>
                {entry.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    ),
  },
  {
    id: "edition",
    title: "Want the printable edition?",
    body: (
      <>
        <p>
          Open the full resume in Google Drive. It includes the same verified work history and
          engineering background presented throughout this world.
        </p>
        <div className="wbook__action">{resumeLink}</div>
      </>
    ),
  },
];

const Resume: React.FC = () => {
  const spread = useSyncExternalStore(subscribeSpread, getSpread, () => false);
  const perView = spread ? 2 : 1;
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);

  // Snap to the start of a spread so a resize never shows a half-turned pair.
  const first = page - (page % perView);
  const lastFirst = Math.floor((pages.length - 1) / perView) * perView;
  const visible = pages.slice(first, first + perView).map((_, offset) => first + offset);
  const lastVisible = visible[visible.length - 1];
  const status = visible.length > 1
    ? `Pages ${first + 1}–${lastVisible + 1} of ${pages.length}`
    : `Page ${first + 1} of ${pages.length}`;

  const turnTo = (target: number) => {
    const next = Math.min(Math.max(target, 0), lastFirst);
    if (next === first) return;
    setDirection(next > first ? "next" : "prev");
    setPage(next);
  };

  /** Arrow/Home/End only while focus is on the book's own controls; never captured globally. */
  const handleKeys = (event: KeyboardEvent<HTMLElement>) => {
    const targets: Record<string, number> = {
      ArrowLeft: first - perView,
      ArrowRight: first + perView,
      Home: 0,
      End: lastFirst,
    };
    if (!(event.key in targets)) return;
    event.preventDefault();
    turnTo(targets[event.key]);
  };

  return (
    <PageSection
      eyebrow="Written Book"
      title="The complete character sheet"
      description="A concise record of my experience, education, projects and technical capabilities."
      variant="wood"
    >
      <article className="wbook" aria-label="Resume book">
        <div key={first} className={`wbook__spread${direction ? ` wbook__spread--${direction}` : ""}${spread ? " is-pair" : ""}`}>
          <span className="wbook__spine" aria-hidden />
          {pages.map((entry, index) => (
            <section
              key={entry.id}
              className="wbook__page"
              aria-labelledby={`wbook-page-${entry.id}`}
              hidden={!visible.includes(index)}
              // The cover only turns the page; the resume itself opens from the links.
              onClick={entry.id === "cover" ? () => turnTo(first + perView) : undefined}
            >
              <h3 id={`wbook-page-${entry.id}`} className="wbook__title">{entry.title}</h3>
              {entry.body}
              <span className="wbook__folio" aria-hidden>{index + 1}</span>
            </section>
          ))}
          {/* Endpaper fills the empty right-hand page of the last spread; nothing to read there. */}
          {visible.length === 1 && spread && (
            <div className="wbook__page wbook__page--endpaper" aria-hidden>
              <span className="wbook__quill" />
            </div>
          )}
          <span className="wbook__ribbon" aria-hidden />
        </div>

        <nav className="wbook__controls" aria-label="Book pages" onKeyDown={handleKeys}>
          <button
            type="button"
            className="wbook__turn"
            aria-label="Previous page"
            aria-disabled={first === 0}
            onClick={() => turnTo(first - perView)}
          >
            <FiChevronLeft aria-hidden />
          </button>
          <p className="wbook__status" aria-live="polite">{status}</p>
          <button
            type="button"
            className="wbook__turn"
            aria-label="Next page"
            aria-disabled={first === lastFirst}
            onClick={() => turnTo(first + perView)}
          >
            <FiChevronRight aria-hidden />
          </button>
        </nav>

        {/* This copy stays outside page state: always visible, always in the HTML. */}
        <div className="wbook__action">{resumeLink}</div>
      </article>
    </PageSection>
  );
};

export default Resume;
