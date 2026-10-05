import React, { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import PageSection from "../common/PageSection.tsx";
import { MinecraftItemIcon } from "../minecraft";
import {
  employerName,
  experience,
  formatDates,
  isCurrent,
  type AdvancementType,
  type ExperienceEntry,
} from "./experience/experienceData";
import "./experience/advancements.css";
import { revealIfOffscreen } from "../../utils/motion";

const DETAIL_ID = "experience-detail";

/** Desktop map coordinates, in % of the map box. The two ongoing roles branch from the TCS line because they overlap. */
const MAP_LAYOUT: Record<string, { x: number; y: number }> = {
  "tcs-dnb-se1": { x: 18, y: 44 },
  "tcs-dnb-se2": { x: 47, y: 44 },
  "ub-tesserae": { x: 74, y: 16 },
  "skopus-ai": { x: 90, y: 70 },
};
const BRANCH_X = 60;

const TYPE_LABEL: Record<AdvancementType, string> = {
  standard: "Role",
  milestone: "Milestone · Promotion",
  current: "Current role",
};

const point = (id: string) => `${MAP_LAYOUT[id].x} ${MAP_LAYOUT[id].y}`;

const Connectors = () => {
  const trunkY = MAP_LAYOUT["tcs-dnb-se2"].y;
  const paths = [
    `M${point("tcs-dnb-se1")} L${point("tcs-dnb-se2")} L${BRANCH_X} ${trunkY}`,
    ...["ub-tesserae", "skopus-ai"].map((id) => `M${BRANCH_X} ${trunkY} L${BRANCH_X} ${MAP_LAYOUT[id].y} L${point(id)}`),
  ];
  return (
    <svg className="xp-connectors" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden focusable="false">
      {paths.map((d) => <path key={d} className="xp-connectors__edge" d={d} vectorEffect="non-scaling-stroke" />)}
      {paths.map((d) => <path key={`${d}-core`} className="xp-connectors__core" d={d} vectorEffect="non-scaling-stroke" />)}
    </svg>
  );
};

const AdvancementNode = ({ entry, step, selected, onSelect }: {
  entry: ExperienceEntry;
  step: number;
  selected: boolean;
  onSelect: () => void;
}) => {
  const current = isCurrent(entry);
  const focusId = `xp-focus-${entry.id}`;
  const layout = MAP_LAYOUT[entry.id];
  return (
    <li
      className={`xp-node xp-node--${entry.advancementType}${selected ? " is-selected" : ""}`}
      style={{ "--x": `${layout.x}%`, "--y": `${layout.y}%` } as CSSProperties}
    >
      <span className="xp-node__frame" aria-hidden>
        <MinecraftItemIcon name={entry.icon} />
        <span className="xp-node__step">{step}</span>
        {current && <span className="xp-node__beacon" />}
      </span>
      <div className="xp-node__text">
        <h3 className="xp-node__title">{entry.title}</h3>
        <p className="xp-node__org">{employerName(entry)}</p>
        <p className="xp-node__dates">{formatDates(entry)}</p>
        {current && <p className="xp-node__current">Current</p>}
        <p className="xp-node__focus" id={focusId}>{entry.focus}</p>
      </div>
      {/* Stretched over the whole node, so one click or tap anywhere selects it. */}
      <button
        type="button"
        className="xp-node__select"
        data-experience-id={entry.id}
        aria-pressed={selected}
        aria-controls={DETAIL_ID}
        aria-describedby={focusId}
        onClick={onSelect}
      >
        <span className="mc-visually-hidden">
          {entry.title}, {employerName(entry)}, {formatDates(entry)}{current ? ", current role" : ""}
        </span>
      </button>
    </li>
  );
};

const ExperienceDetail = ({ entry }: { entry: ExperienceEntry }) => (
  <div key={entry.id} className="xp-detail__body">
    <header className="xp-detail__head">
      <span className={`xp-node__frame xp-node--${entry.advancementType}`} aria-hidden>
        <MinecraftItemIcon name={entry.icon} />
      </span>
      <div>
        <p className="xp-kicker">{TYPE_LABEL[entry.advancementType]}</p>
        <h3 id="xp-detail-title">{entry.title}</h3>
      </div>
    </header>

    <dl className="xp-facts">
      <div>
        <dt>Organization</dt>
        <dd>
          {entry.website ? (
            <a href={entry.website} target="_blank" rel="noopener noreferrer" className="text-link">
              {employerName(entry)}<span className="mc-visually-hidden"> (opens in a new tab)</span>
            </a>
          ) : employerName(entry)}
        </dd>
      </div>
      <div><dt>Role</dt><dd>{entry.title}</dd></div>
      <div><dt>Dates</dt><dd>{formatDates(entry)}</dd></div>
      {entry.location && <div><dt>Location</dt><dd>{entry.location}</dd></div>}
    </dl>

    <div className="xp-detail__columns">
      <div>
        <h4 className="xp-label">Focus</h4>
        <p className="xp-detail__summary">{entry.summary}</p>
        <h4 className="xp-label">Impact</h4>
        <ul className="xp-impact">
          {entry.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
        </ul>
        {entry.metrics && (
          <>
            <h4 className="xp-label">Verified metrics</h4>
            <ul className="loot-list xp-tools" aria-label={`${entry.title} metrics`}>
              {entry.metrics.map((metric) => <li key={metric} className="loot-tag">{metric}</li>)}
            </ul>
          </>
        )}
      </div>
      <div>
        <h4 className="xp-label">Evidence</h4>
        <ul className="xp-evidence" aria-label={`${entry.title} evidence`}>
          {entry.evidenceItems.map((item) => (
            <li key={item.label} className="xp-evidence__item">
              <span className="xp-evidence__icon" aria-hidden><MinecraftItemIcon name={item.icon} /></span>
              <span>
                <strong>{item.label}</strong>
                <span>{item.summary}</span>
              </span>
            </li>
          ))}
        </ul>
        <h4 className="xp-label">Systems / Tools</h4>
        <ul className="loot-list xp-tools" aria-label={`${entry.title} technologies`}>
          {entry.technologies.map((tech) => <li key={tech} className="loot-tag">{tech}</li>)}
        </ul>
      </div>
    </div>
  </div>
);

const Experience: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const listRef = useRef<HTMLOListElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const selected = experience.find((entry) => entry.id === selectedId);
  const concurrent = experience.filter(isCurrent).map(employerName);

  const select = (entry: ExperienceEntry) => {
    // Flushed so the detail is unhidden (on the first pick) before measuring it.
    flushSync(() => {
      setSelectedId(entry.id);
      setAnnouncement(`Showing ${entry.title}, ${employerName(entry)}, ${formatDates(entry)}`);
    });
    // On narrow screens the detail sits below the path.
    revealIfOffscreen(detailRef.current, .75);
  };

  /** Chronological, not geometric: next/previous role, Home/End for the ends. Scoped to this list. */
  const handleKeyDown = (event: KeyboardEvent<HTMLOListElement>) => {
    const buttons = [...(listRef.current?.querySelectorAll<HTMLButtonElement>(".xp-node__select") ?? [])];
    const index = buttons.indexOf(event.target as HTMLButtonElement);
    if (index < 0) return;
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = Math.min(index + 1, buttons.length - 1);
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = Math.max(index - 1, 0);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = buttons.length - 1;
    if (next === null) return;
    event.preventDefault();
    buttons[next].focus();
  };

  return (
    <PageSection
      eyebrow="Advancements"
      title="Professional Experience"
      description="A progression through the systems, products and teams I've worked on."
      variant="deepslate"
    >
      <div className="xp-advancements">
        <div className="xp-map">
          <Connectors />
          <ol ref={listRef} className="xp-path" aria-label="Roles, oldest to newest" onKeyDown={handleKeyDown}>
            {experience.map((entry, index) => (
              <AdvancementNode
                key={entry.id}
                entry={entry}
                step={index + 1}
                selected={entry.id === selectedId}
                onSelect={() => select(entry)}
              />
            ))}
          </ol>
        </div>
        <p className="xp-legend">
          <span className="xp-legend__item xp-legend__item--standard">Role</span>
          <span className="xp-legend__item xp-legend__item--milestone">Promotion</span>
          <span className="xp-legend__item xp-legend__item--current">Current</span>
          <span className="xp-legend__note">{concurrent.join(" and ")} are concurrent, ongoing roles.</span>
        </p>

        <section ref={detailRef} id={DETAIL_ID} className="xp-detail" aria-labelledby="xp-detail-title" hidden={!selected}>
          {selected && <ExperienceDetail entry={selected} />}
        </section>
        <p className="mc-visually-hidden" aria-live="polite">{announcement}</p>
      </div>
    </PageSection>
  );
};

export default Experience;
