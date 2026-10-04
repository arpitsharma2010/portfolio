import React, { useRef, useState, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import { FiExternalLink } from "react-icons/fi";
import PageSection from "../common/PageSection.tsx";
import { MinecraftItemIcon, useMinecraftSelection } from "../minecraft";
import { certifications, education, type Certification, type Degree } from "./education/educationData";
import "./education/enchanting-room.css";
import { revealIfOffscreen } from "../../utils/motion";

const DETAIL_ID = "education-detail";

type Selection = { kind: "degree"; item: Degree } | { kind: "certification"; item: Certification };

const titleOf = (selection: Selection) => (selection.kind === "degree" ? selection.item.degree : selection.item.name);

/** Decorative spines: no text, no hover, hidden from assistive technology. */
const ShelfSpines = ({ count }: { count: number }) => (
  <span className="ench-spines" aria-hidden>
    {Array.from({ length: count }, (_, index) => <i key={index} />)}
  </span>
);

const OpensInNewTab = () => <span className="mc-visually-hidden"> (opens in a new tab)</span>;

const SelectButton = ({ id, label, selected, onSelect }: { id: string; label: string; selected: boolean; onSelect: () => void }) => (
  // Stretched over the whole book, so one click or tap anywhere selects it; links and disclosures sit above it.
  <button
    type="button"
    className="ench-select"
    data-education-id={id}
    aria-pressed={selected}
    aria-controls={DETAIL_ID}
    onClick={onSelect}
  >
    <span className="mc-visually-hidden">{label}</span>
  </button>
);

const DegreeBook = ({ item, selected, onSelect }: { item: Degree; selected: boolean; onSelect: () => void }) => (
  <li className={`ench-book ench-book--degree${selected ? " is-selected" : ""}`}>
    <span className="ench-book__cover" aria-hidden><MinecraftItemIcon name="book" /></span>
    <div className="ench-book__body">
      <img src={item.logo} alt={`${item.institution} logo`} className="ench-book__logo" loading="lazy" />
      <div className="ench-book__text">
        <h3>{item.degree}</h3>
        <p className="ench-book__institution">
          <a href={item.website} target="_blank" rel="noopener noreferrer" className="text-link ench-above">
            {item.institution}<OpensInNewTab />
          </a>
        </p>
        <p className="ench-book__meta">{item.period}</p>
        <p className="ench-book__meta">{item.detail}</p>
      </div>
    </div>
    <details className="coursework ench-above">
      <summary>
        Coursework
        <span>
          ({item.courses.length})
        </span>
      </summary>
      <ul className="loot-list">
        {item.courses.map((course) => <li key={course} className="loot-tag">{course}</li>)}
      </ul>
    </details>
    <SelectButton id={item.id} label={`${item.degree}, ${item.institution}, ${item.period}`} selected={selected} onSelect={onSelect} />
  </li>
);

const CertificationBook = ({ item, selected, onSelect }: { item: Certification; selected: boolean; onSelect: () => void }) => (
  <li className={`ench-book ench-book--cert${selected ? " is-selected" : ""}`}>
    <span className="ench-book__cover" aria-hidden><MinecraftItemIcon name="enchanted-book" /></span>
    <div className="ench-book__text">
      <p className="ench-book__name">{item.name}</p>
      <p className="ench-book__issuer">{item.issuer} · {item.date}</p>
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="project-link ench-above">
        Verify <FiExternalLink aria-hidden /><span className="mc-visually-hidden"> {item.name}</span><OpensInNewTab />
      </a>
    </div>
    <SelectButton id={item.id} label={`${item.name}, ${item.issuer}, ${item.date}`} selected={selected} onSelect={onSelect} />
  </li>
);

/** Original CSS art: obsidian block, cloth top, a floating book and drifting glyphs. Purely decorative; no book until one is picked. */
const EnchantingTable = ({ selection }: { selection?: Selection }) => (
  <div className={`ench-table${selection ? ` ench-table--${selection.kind}` : ""}`} aria-hidden>
    <span className="ench-table__glyphs">
      {Array.from({ length: 6 }, (_, index) => <i key={index} className={`ench-glyph ench-glyph--${index + 1}`} />)}
    </span>
    <span className="ench-table__orbs">
      {Array.from({ length: 3 }, (_, index) => <i key={index} />)}
    </span>
    {/* Keyed by selection so the cover opens again for each new book. */}
    {selection && (
      <span key={selection.item.id} className="ench-table__book">
        <span className="ench-table__page ench-table__page--left" />
        <span className="ench-table__page ench-table__page--right" />
      </span>
    )}
    <span className="ench-table__block" />
    <span className="ench-table__lapis"><MinecraftItemIcon name="lapis-gem" /></span>
    <p className="ench-table__caption">{selection && titleOf(selection)}</p>
  </div>
);

const EducationDetail = ({ selection }: { selection: Selection }) => (
  <div key={selection.item.id} className="ench-detail__body">
    <header className="ench-detail__head">
      <span className="ench-detail__icon" aria-hidden>
        <MinecraftItemIcon name={selection.kind === "degree" ? "book" : "enchanted-book"} />
      </span>
      <div>
        <p className="ench-label">Type</p>
        <p className="ench-detail__type">{selection.kind === "degree" ? "Degree" : "Certification"}</p>
      </div>
    </header>
    <h3 id="ench-detail-title">{titleOf(selection)}</h3>

    {selection.kind === "degree" ? (
      <>
        <dl className="ench-facts">
          <div>
            <dt>Institution</dt>
            <dd>
              <img src={selection.item.logo} alt="" className="ench-facts__logo" loading="lazy" />
              <a href={selection.item.website} target="_blank" rel="noopener noreferrer" className="text-link">
                {selection.item.institution}<OpensInNewTab />
              </a>
            </dd>
          </div>
          <div><dt>Dates</dt><dd>{selection.item.period}</dd></div>
          <div><dt>Details</dt><dd>{selection.item.detail}</dd></div>
        </dl>
        <h4 className="ench-label">Coursework ({selection.item.courses.length})</h4>
        <ul className="loot-list ench-courses" aria-label={`${selection.item.degree} coursework`}>
          {selection.item.courses.map((course) => <li key={course} className="loot-tag">{course}</li>)}
        </ul>
      </>
    ) : (
      <dl className="ench-facts">
        <div><dt>Issuer</dt><dd>{selection.item.issuer}</dd></div>
        <div><dt>Dates</dt><dd>{selection.item.date}</dd></div>
        <div>
          <dt>Credential</dt>
          <dd>
            <a href={selection.item.url} target="_blank" rel="noopener noreferrer" className="project-link">
              Verify <FiExternalLink aria-hidden /><span className="mc-visually-hidden"> {selection.item.name}</span><OpensInNewTab />
            </a>
          </dd>
        </div>
      </dl>
    )}
  </div>
);

/** Arrow keys move focus within one shelf (degrees or certifications); Enter/Space selects natively. */
const handleShelfKeys = (event: KeyboardEvent<HTMLUListElement>) => {
  const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>(".ench-select")];
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

const Education: React.FC = () => {
  const { selectedItemId, select } = useMinecraftSelection();
  const [announcement, setAnnouncement] = useState("");
  const detailRef = useRef<HTMLElement>(null);

  const degree = education.find((item) => item.id === selectedItemId);
  const certification = certifications.find((item) => item.id === selectedItemId);
  const selection: Selection | undefined = degree
    ? { kind: "degree", item: degree }
    : certification && { kind: "certification", item: certification };

  const choose = (next: Selection) => {
    // Flushed so the detail is unhidden (on the first pick) before measuring it.
    flushSync(() => {
      select(next.item.id);
      setAnnouncement(`Showing ${next.kind}: ${titleOf(next)}`);
    });
    // On narrow screens the detail can sit off-screen.
    revealIfOffscreen(detailRef.current, .75);
  };

  return (
    <PageSection eyebrow="Enchanting Room" title="Education & certifications" variant="stone">
      <div className="ench-room">
        <div className="ench-shelf">
          <ShelfSpines count={5} />
          <ul className="ench-books ench-books--degrees" aria-label="Degrees" onKeyDown={handleShelfKeys}>
            {education.map((item) => (
              <DegreeBook
                key={item.id}
                item={item}
                selected={item.id === selectedItemId}
                onSelect={() => choose({ kind: "degree", item })}
              />
            ))}
          </ul>
          <ShelfSpines count={5} />
        </div>

        <div className="ench-altar">
          <ShelfSpines count={3} />
          <EnchantingTable selection={selection} />
          <ShelfSpines count={3} />
        </div>

        <section ref={detailRef} id={DETAIL_ID} className="ench-detail" aria-labelledby="ench-detail-title" hidden={!selection}>
          {selection && <EducationDetail selection={selection} />}
        </section>

        <div className="ench-certs">
          <h3 id="ench-certs-heading">
            Certifications
          </h3>
          <ul className="ench-books ench-books--certs" aria-labelledby="ench-certs-heading" onKeyDown={handleShelfKeys}>
            {certifications.map((item) => (
              <CertificationBook
                key={item.id}
                item={item}
                selected={item.id === selectedItemId}
                onSelect={() => choose({ kind: "certification", item })}
              />
            ))}
          </ul>
        </div>
        <p className="mc-visually-hidden" aria-live="polite">{announcement}</p>
      </div>
    </PageSection>
  );
};

export default Education;
