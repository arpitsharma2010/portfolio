import React, { useRef, useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import PageSection from "../common/PageSection.tsx";
import { MinecraftInventoryGrid, MinecraftItemIcon, useMinecraftSelection } from "../minecraft";
import type { MinecraftItem } from "../minecraft";
import { DEFAULT_PROJECT_ID, projects, type ArchitectureItem, type ProjectDefinition } from "./projects/projectData";
import "./projects/project-chests.css";
import { revealIfOffscreen } from "../../utils/motion";

const GRID_COLUMNS = 9;
const PANEL_ID = "project-chest-panel";

const slotLabel = (item: MinecraftItem) => `${(item as ArchitectureItem).label}, ${item.name}`;

const ChestArt = ({ project }: { project: ProjectDefinition }) => (
  <span className="pc-art" aria-hidden>
    <span className="pc-art__lid" />
    <span className="pc-art__base" />
    <span className="pc-art__badge"><MinecraftItemIcon name={project.badge} /></span>
  </span>
);

const ProjectSelector = ({ project, selected, onOpen }: { project: ProjectDefinition; selected: boolean; onOpen: () => void }) => (
  <li>
    <article className={`pc-tile pc-theme--${project.theme}${selected ? " is-open" : ""}`}>
      <ChestArt project={project} />
      <div className="pc-tile__text">
        <p className="pc-kicker">{project.container}</p>
        <h3>{project.title}</h3>
        <p className="pc-tile__summary">{project.summary}</p>
        <p className="pc-tile__stack"><span className="mc-visually-hidden">Technologies: </span>{project.stack.slice(0, 3).join(" · ")}</p>
      </div>
      {/* Stretched over the whole tile, so one click or tap anywhere opens the chest. */}
      <button type="button" className="pc-tile__open" aria-pressed={selected} aria-controls={PANEL_ID} onClick={onOpen}>
        <span aria-hidden>{selected ? "Opened" : "Open"}</span>
        <span className="mc-visually-hidden">Open {project.title} chest</span>
      </button>
    </article>
  </li>
);

const ArchitectureDetail = ({ item, project }: { item: ArchitectureItem; project: ProjectDefinition }) => (
  <section className="pc-detail" aria-labelledby="pc-detail-title" aria-live="polite">
    <p className="pc-label">Selected item</p>
    <div className="pc-detail__head">
      <span className="pc-detail__icon"><MinecraftItemIcon name={item.icon} /></span>
      <div>
        <p className="pc-detail__item">{item.itemName}</p>
        <h4 id="pc-detail-title">{item.label}</h4>
      </div>
    </div>
    <p className="pc-detail__text">{item.details}</p>
    <p className="pc-detail__meta"><span className="pc-label">Technology</span> {item.technologies.join(", ")}</p>
    <p className="pc-detail__meta"><span className="pc-label">Project</span> {project.title}</p>
  </section>
);

const Fact = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="pc-fact">
    <h4 className="pc-label">{label}</h4>
    {children}
  </div>
);

const Projects: React.FC = () => {
  const [projectId, setProjectId] = useState(DEFAULT_PROJECT_ID);
  const project = projects.find((entry) => entry.id === projectId) ?? projects[0];
  const { selectedItemId, select } = useMinecraftSelection({ initialSelectedId: project.defaultItemId });
  const selectedItem = project.items.find((item) => item.id === selectedItemId)
    ?? project.items.find((item) => item.id === project.defaultItemId)!;
  const panelRef = useRef<HTMLElement>(null);

  const openProject = (next: ProjectDefinition) => {
    setProjectId(next.id);
    select(next.defaultItemId);
    // When the panel sits below the selector.
    revealIfOffscreen(panelRef.current, .6);
  };

  return (
    <PageSection
      eyebrow="Storage Room"
      title="Projects"
      description="Open a chest to inspect the architecture."
      variant="grass"
    >
      <div className="project-chests">
        <ul className="pc-selector" aria-label="Project chests">
          {projects.map((entry) => (
            <ProjectSelector key={entry.id} project={entry} selected={entry.id === project.id} onOpen={() => openProject(entry)} />
          ))}
        </ul>

        <section ref={panelRef} id={PANEL_ID} className={`pc-panel pc-theme--${project.theme}`} aria-labelledby="pc-panel-title">
          <header className="pc-panel__head">
            <ChestArt project={project} />
            <div>
              <p className="pc-kicker">Project chest · {project.container}</p>
              <h3 id="pc-panel-title">{project.title}</h3>
              <p className="pc-panel__summary">{project.summary}</p>
            </div>
          </header>

          <div key={project.id} className="pc-panel__body">
            <div className="pc-facts">
              <Fact label="Problem"><p>{project.problem}</p></Fact>
              <Fact label="Built"><p>{project.built}</p></Fact>
              {project.challenge && <Fact label="Engineering challenge"><p>{project.challenge}</p></Fact>}
              {project.outcome && <Fact label="Outcome"><p>{project.outcome}</p></Fact>}
              <Fact label="Stack">
                <ul className="loot-list pc-stack" aria-label={`${project.title} technologies`}>
                  {project.stack.map((tech) => <li key={tech} className="loot-tag">{tech}</li>)}
                </ul>
              </Fact>
              {project.links.length > 0 && (
                <Fact label="Links">
                  <ul className="pc-links">
                    {project.links.map((link) => (
                      <li key={link.url}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="pc-link">
                          {link.label}<span className="mc-visually-hidden"> for {project.title} (opens in a new tab)</span>
                          <FiExternalLink aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>
                </Fact>
              )}
              {project.image && (
                <img src={project.image} alt={`${project.title} interface`} className="pc-image" loading="lazy" />
              )}
            </div>

            <div className="pc-architecture">
              <h4 className="pc-label">Architecture · {project.items.length} items</h4>
              <div className="pc-grid">
                <MinecraftInventoryGrid
                  items={project.items}
                  rows={Math.ceil(project.items.length / GRID_COLUMNS)}
                  columns={GRID_COLUMNS}
                  mobileColumns={5}
                  ariaLabel={`${project.title} architecture`}
                  selectedItemId={selectedItem.id}
                  onSelect={select}
                  showTooltipWhenSelected={false}
                  getSlotLabel={slotLabel}
                />
              </div>
              <ArchitectureDetail item={selectedItem} project={project} />
            </div>
          </div>
        </section>
      </div>
    </PageSection>
  );
};

export default Projects;
