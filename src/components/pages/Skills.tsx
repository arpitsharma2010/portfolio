import React, { useRef, useState } from "react";
import PageSection from "../common/PageSection.tsx";
import { MinecraftInventoryGrid, MinecraftItemIcon, useMinecraftSelection } from "../minecraft";
import type { MinecraftItem } from "../minecraft";
import {
  coreToolkitItems,
  DEFAULT_SKILL_ID,
  isRoleSource,
  matchesSearch,
  SKILL_CATEGORIES,
  skillItems,
  type SkillCategoryId,
  type SkillItem,
} from "./skills/skillItems";
import "./skills/skills-chest.css";

const CHEST_COLUMNS = 9;
const CHEST_ROWS = Math.ceil(skillItems.length / CHEST_COLUMNS);

const slotLabel = (item: MinecraftItem) => `${(item as SkillItem).technology}, ${item.category}`;

const isReducedMotion = () =>
  typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const EvidenceChips = ({ label, sources }: { label: string; sources: string[] }) => sources.length > 0 && (
  <div className="sc-detail__evidence">
    <p className="sc-label">{label}</p>
    <ul>{sources.map((source) => <li key={source}>{source}</li>)}</ul>
  </div>
);

const SkillDetail = ({ item, detailRef }: { item: SkillItem; detailRef: React.Ref<HTMLElement> }) => (
  <section ref={detailRef} className="sc-detail" aria-labelledby="sc-detail-title" aria-live="polite">
    <p className="sc-label">Selected item</p>
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
    <EvidenceChips label="Projects" sources={item.evidence.filter((source) => !isRoleSource(source))} />
  </section>
);

const Skills: React.FC = () => {
  const { selectedItemId, select } = useMinecraftSelection({ initialSelectedId: DEFAULT_SKILL_ID });
  const [category, setCategory] = useState<SkillCategoryId | "all">("all");
  const [query, setQuery] = useState("");
  const detailRef = useRef<HTMLElement>(null);

  const selectedItem = skillItems.find((item) => item.id === selectedItemId) ?? skillItems[0];
  // Matches reflow to the front; the chest keeps its size so filtering never jumps the layout.
  const visibleItems = skillItems.filter((item) => (category === "all" || item.categoryId === category) && matchesSearch(item, query));
  const categoryLabel = SKILL_CATEGORIES.find((entry) => entry.id === category)?.label;
  const status = `Showing ${visibleItems.length} of ${skillItems.length} items${categoryLabel ? ` in ${categoryLabel}` : ""}${query.trim() ? ` matching "${query.trim()}"` : ""}`;

  const selectSkill = (item: MinecraftItem) => {
    select(item);
    // Stacked layouts put the detail below the chest; bring it into view after an explicit pick only.
    const detail = detailRef.current;
    if (!detail || typeof window.matchMedia !== "function" || !window.matchMedia("(max-width: 1199px)").matches) return;
    const rect = detail.getBoundingClientRect();
    if (rect.top > window.innerHeight * .6 || rect.bottom < 0) {
      detail.scrollIntoView?.({ behavior: isReducedMotion() ? "auto" : "smooth", block: "nearest" });
    }
  };

  const filters = [{ id: "all" as const, label: "All", icon: "chest" as const }, ...SKILL_CATEGORIES];

  return (
    <PageSection
      eyebrow="Large Chest"
      title="Technical Skills"
      description="The tools, languages and systems I build with. Each item shows where I used it."
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

          <div className="sc-body">
            <div className="sc-chest">
              <MinecraftInventoryGrid
                items={visibleItems}
                rows={CHEST_ROWS}
                columns={CHEST_COLUMNS}
                mobileColumns={5}
                ariaLabel="Large Chest: technical skills"
                selectedItemId={selectedItemId}
                onSelect={selectSkill}
                showTooltipWhenSelected={false}
                getSlotLabel={slotLabel}
              />
              {visibleItems.length === 0 && <p className="sc-empty">No items match. Try another category or search.</p>}
            </div>
            <SkillDetail item={selectedItem} detailRef={detailRef} />
          </div>

          <div className="sc-toolkit">
            <h3 className="sc-label">Core Toolkit</h3>
            <p className="sc-note">Technologies with the broadest evidence across my roles and projects, in no particular order.</p>
            <MinecraftInventoryGrid
              items={coreToolkitItems}
              rows={1}
              columns={9}
              mobileColumns={5}
              ariaLabel="Core Toolkit"
              selectedItemId={selectedItemId}
              onSelect={selectSkill}
              showTooltipWhenSelected={false}
              getSlotLabel={slotLabel}
            />
          </div>
        </div>

        <section className="sc-contents" aria-labelledby="sc-contents-title">
          <h3 id="sc-contents-title">Chest contents</h3>
          <dl>
            {SKILL_CATEGORIES.map((entry) => (
              <div key={entry.id}>
                <dt>{entry.label}</dt>
                <dd>{skillItems.filter((item) => item.categoryId === entry.id).map((item) => item.technology).join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </PageSection>
  );
};

export default Skills;
