import React, { useRef, useState, type KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import PageSection from "../common/PageSection.tsx";
import { MinecraftItemIcon, useMinecraftSelection } from "../minecraft";
import type { MinecraftItem } from "../minecraft";
import {
  coreToolkitItems,
  isRoleSource,
  matchesSearch,
  SKILL_CATEGORIES,
  skillItems,
  type SkillCategoryId,
  type SkillItem,
} from "./skills/skillItems";
import "./skills/skills-chest.css";
import { revealIfOffscreen } from "../../utils/motion";

/** Labels are part of each button, so the stack is readable before selection. */
const SkillFrames = ({ items, label, selectedItemId, onSelect }: {
  items: readonly SkillItem[];
  label: string;
  selectedItemId: string | null;
  onSelect: (item: SkillItem) => void;
}) => {
  const handleKeys = (event: KeyboardEvent<HTMLUListElement>) => {
    const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("button")];
    const index = buttons.indexOf(event.target as HTMLButtonElement);
    if (index < 0) return;
    const columns = getComputedStyle(event.currentTarget).gridTemplateColumns.split(" ").length;
    const targets: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      ArrowDown: index + columns,
      ArrowUp: index - columns,
      Home: 0,
      End: buttons.length - 1,
    };
    if (!(event.key in targets)) return;
    event.preventDefault();
    buttons[targets[event.key]]?.focus();
  };

  return (
    <ul className="sc-frames" aria-label={label} onKeyDown={handleKeys}>
      {items.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            className="sc-frame"
            aria-label={`${item.technology}, ${item.categoryLabel}`}
            aria-pressed={selectedItemId === item.id}
            aria-controls="sc-skill-detail"
            data-skill-id={item.id}
            onClick={() => onSelect(item)}
          >
            <span className="sc-frame__icon" aria-hidden><MinecraftItemIcon name={item.icon} /></span>
            <span className="sc-frame__name">{item.technology}</span>
          </button>
        </li>
      ))}
    </ul>
  );
};

const shelfLabel = (id: SkillCategoryId, label: string) =>
  id === "languages" ? "Programming" : id === "testing" ? "Testing / Tools" : label;

const EvidenceChips = ({ label, sources }: { label: string; sources: string[] }) => sources.length > 0 && (
  <div className="sc-detail__evidence">
    <p className="sc-label">{label}</p>
    <ul>{sources.map((source) => <li key={source}>{source}</li>)}</ul>
  </div>
);

/** Optional evidence stays mounted and opens only after an explicit selection. */
const SkillDetail = ({ item, detailRef }: { item?: SkillItem; detailRef: React.Ref<HTMLElement> }) => (
  <section id="sc-skill-detail" ref={detailRef} className="sc-detail" hidden={!item} aria-labelledby={item ? "sc-detail-title" : undefined} aria-live="polite">
    <p className="sc-label">Selected item</p>
    {item ? (
      <>
        <div className="sc-detail__head">
          <span className="sc-detail__icon"><MinecraftItemIcon name={item.icon} /></span>
          <div>
            <p className="sc-detail__item">{item.itemName} · {item.categoryLabel}</p>
            <h3 id="sc-detail-title">{item.technology}</h3>
          </div>
        </div>
        <p className="sc-detail__summary">{item.summary}</p>
        <div>
          <p className="sc-label">Used for</p>
          <ul className="sc-detail__uses">{item.uses.map((use) => <li key={use}>{use}</li>)}</ul>
        </div>
        <EvidenceChips label="Experience" sources={item.evidence.filter(isRoleSource)} />
        <EvidenceChips label="Toolkit" sources={item.evidence.filter((source) => source === "Engineering toolkit")} />
        <EvidenceChips label="Projects" sources={item.evidence.filter((source) => !isRoleSource(source) && source !== "Engineering toolkit")} />
      </>
    ) : <span className="sc-detail__icon" aria-hidden />}
  </section>
);

const Skills: React.FC = () => {
  const { selectedItemId, select } = useMinecraftSelection();
  const [category, setCategory] = useState<SkillCategoryId | "all">("all");
  const [query, setQuery] = useState("");
  const detailRef = useRef<HTMLElement>(null);

  const selectedItem = skillItems.find((item) => item.id === selectedItemId);
  // Filtering preserves category shelves; selection never changes the available technologies.
  const visibleItems = skillItems.filter((item) => (category === "all" || item.categoryId === category) && matchesSearch(item, query));
  const categoryLabel = SKILL_CATEGORIES.find((entry) => entry.id === category)?.label;
  const status = `Showing ${visibleItems.length} of ${skillItems.length} items${categoryLabel ? ` in ${categoryLabel}` : ""}${query.trim() ? ` matching "${query.trim()}"` : ""}`;

  const selectSkill = (item: MinecraftItem) => {
    flushSync(() => select(item));
    // Evidence is optional and remains reachable from any shelf.
    revealIfOffscreen(detailRef.current, .6, "nearest");
  };

  const filters = [{ id: "all" as const, label: "All", icon: "chest" as const }, ...SKILL_CATEGORIES];

  return (
    <PageSection
      eyebrow="Minecraft Armory"
      title="Technical Skills"
      description="The tools, languages and systems I build with. Explore engineering capabilities and their role, project, or toolkit context."
      variant="wood"
    >
      <div className="skills-chest">
        <div className="sc-panel">
          <div className="sc-titlebar">
            <span className="sc-chest-art" aria-hidden>
              <span className="sc-chest-art__lid" />
              <span className="sc-chest-art__base" />
            </span>
            <p>Arpit&rsquo;s engineering toolkit · {skillItems.length} items</p>
          </div>

          <section className="sc-toolkit" aria-labelledby="sc-core-title">
            <h3 id="sc-core-title" className="sc-label">Core Stack</h3>
            <p className="sc-note">Technologies with the broadest evidence across my roles and projects, in no particular order.</p>
            <SkillFrames
              items={coreToolkitItems}
              label="Core Toolkit"
              selectedItemId={selectedItemId}
              onSelect={selectSkill}
            />
          </section>

          <SkillDetail item={selectedItem} detailRef={detailRef} />

          <div className="sc-controls">
            <div className="sc-tabs" role="group" aria-label="Filter skills by category">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  className="sc-tab"
                  aria-pressed={category === filter.id}
                  onClick={() => setCategory(filter.id)}
                >
                  <MinecraftItemIcon name={filter.icon} />
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
            <label className="sc-search">
              <span className="mc-visually-hidden">Search skills by technology, category or where it was used</span>
              <input
                type="search"
                placeholder="Search inventory..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                autoComplete="off"
              />
            </label>
          </div>

          <p className="sc-status" role="status">{status}</p>

          <section className="sc-shelves" aria-label="Skill shelves">
            {SKILL_CATEGORIES.map((entry) => {
              const items = visibleItems.filter((item) => item.categoryId === entry.id);
              if (items.length === 0) return null;
              return (
                <section key={entry.id} className="sc-shelf" aria-labelledby={`sc-shelf-${entry.id}`}>
                  <h3 id={`sc-shelf-${entry.id}`} className="sc-shelf__title">
                    <span aria-hidden><MinecraftItemIcon name={entry.icon} /></span>
                    {shelfLabel(entry.id, entry.label)}
                  </h3>
                  <SkillFrames
                    items={items}
                    label={`${entry.label} skills`}
                    selectedItemId={selectedItemId}
                    onSelect={selectSkill}
                  />
                </section>
              );
            })}
            {visibleItems.length === 0 && <p className="sc-empty">No items match. Try another category or search.</p>}
          </section>
        </div>
      </div>
    </PageSection>
  );
};

export default Skills;
