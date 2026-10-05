import React from "react";
import PageSection from "../common/PageSection.tsx";
import { MinecraftInventoryGrid, MinecraftItemIcon, MinecraftSlot, useMinecraftSelection } from "../minecraft";
import type { MinecraftItem } from "../minecraft";
import PlayerPreview from "./about/PlayerPreview.tsx";
import {
  aboutItems,
  craftingResult,
  equipmentItems,
  inventoryItems,
  profileActions,
  type AboutItem,
} from "./about/aboutInventoryItems";
import { LOCATION_DETAIL, NAME } from "../../utils/constants";
import "./about/player-inventory.css";

const itemLabel = (item: MinecraftItem) => `${item.name}, ${item.category}`;
const equipmentLabel = (item: MinecraftItem) => `${(item as AboutItem).slot} slot: ${itemLabel(item)}`;
const ingredientLabel = (item: MinecraftItem) => `Crafting ingredient: ${itemLabel(item)}`;

/** Stays mounted while empty so the live region exists before the first pick; empty = label and a blank slot only. */
const SelectedItemDetail = ({ item }: { item?: AboutItem }) => (
  <section className="pi-detail" aria-labelledby={item ? "pi-detail-title" : undefined} aria-live="polite">
    <p className="pi-label">Selected item</p>
    {item ? (
      <>
        <div className="pi-detail__head">
          <span className="pi-detail__icon"><MinecraftItemIcon name={item.icon} /></span>
          <div>
            <p className="pi-detail__name">{item.name}{item.slot && ` · ${item.slot} slot`}</p>
            <h3 id="pi-detail-title">{item.category}</h3>
          </div>
        </div>
        <p className="pi-detail__summary">{item.summary}</p>
        <ul className="pi-detail__lore">
          {item.lore?.map((line) => <li key={line}>{line}</li>)}
        </ul>
      </>
    ) : <span className="pi-detail__icon" aria-hidden />}
  </section>
);

const About: React.FC = () => {
  const { selectedItemId, select } = useMinecraftSelection();
  const selectedItem = aboutItems.find((item) => item.id === selectedItemId);

  return (
    <PageSection eyebrow="Player Inventory" title="About Arpit" variant="grass">
      <div className="player-inventory">
        <div className="pi-panel">
          <div className="pi-identity">
            <p className="pi-label">Player profile</p>
            <dl>
              <div><dt>Player</dt><dd>{NAME}</dd></div>
              <div><dt>Class</dt><dd>Software Engineer</dd></div>
              <div><dt>Specialization</dt><dd>Backend · Full-Stack · Distributed Systems · Cloud</dd></div>
              <div><dt>Current build</dt><dd>Cloud-native &amp; AI-powered applications</dd></div>
              <div><dt>Education</dt><dd>M.S. Computer Science &amp; Engineering, University at Buffalo (SUNY) · GPA 3.77 / 4</dd></div>
              <div><dt>Core domains</dt><dd>{equipmentItems.map((item) => item.category).join(" · ")}</dd></div>
            </dl>
          </div>

          <div className="pi-figure">
            <div>
              <h3 className="pi-label">Equipment</h3>
              <MinecraftInventoryGrid
                className="pi-fixed-grid"
                items={equipmentItems}
                rows={4}
                columns={1}
                mobileColumns={1}
                ariaLabel="Equipment: core professional domains"
                selectedItemId={selectedItemId}
                onSelect={select}
                getSlotLabel={equipmentLabel}
              />
            </div>
            <PlayerPreview />
          </div>

          <div className="pi-crafting">
            <h3 className="pi-label">Crafting</h3>
            <div className="pi-crafting__recipe">
              <MinecraftInventoryGrid
                className="pi-fixed-grid"
                items={equipmentItems}
                rows={2}
                columns={2}
                mobileColumns={2}
                ariaLabel="Crafting ingredients"
                selectedItemId={selectedItemId}
                onSelect={select}
                getSlotLabel={ingredientLabel}
              />
              <span className="pi-crafting__arrow" aria-hidden />
              <div className="pi-crafting__result">
                <MinecraftSlot
                  item={craftingResult}
                  selected={selectedItemId === craftingResult.id}
                  onSelect={select}
                  slotLabel={`Crafting result: ${craftingResult.name}`}
                />
              </div>
            </div>
            <p className="pi-crafting__note">A metaphor for how the strengths combine, not a job title.</p>
          </div>

          <div className="pi-inventory">
            <h3 className="pi-label">Inventory</h3>
            <MinecraftInventoryGrid
              items={inventoryItems}
              rows={1}
              columns={9}
              mobileColumns={5}
              ariaLabel="Profile inventory"
              selectedItemId={selectedItemId}
              onSelect={select}
              getSlotLabel={itemLabel}
            />
          </div>

          <SelectedItemDetail item={selectedItem} />

          <nav className="pi-actions" aria-label="Profile links">
            <h3 className="pi-label">Profile actions</h3>
            <ul>
              {profileActions.map((action) => (
                <li key={action.label}>
                  <a
                    href={action.href}
                    {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    aria-label={action.external ? `${action.label} (opens in a new tab)` : action.label}
                  >
                    <span className="pi-actions__slot"><MinecraftItemIcon name={action.icon} /></span>
                    <span>{action.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="pi-lore">
          <p>
            Software Engineer with 4+ years of experience building backend, full-stack,
            cloud-native, and distributed systems across fintech, research, and applied AI.
            My work spans REST APIs, microservices, event-driven architectures, asynchronous
            processing, frontend development, CI/CD, infrastructure automation, authentication,
            observability, database systems, and production support.
          </p>
          <p>
            At Tata Consultancy Services supporting DNB, I worked on pension, investment,
            transaction, and merger-integration systems: API performance, event-driven
            processing, customer-facing workflows, production releases, and troubleshooting.
            That work combined C#/.NET services with React, TypeScript, DynamoDB, and AWS.
          </p>
          <p>
            More recently, I have optimized Python/Flask research systems at the University
            at Buffalo and built AI products with RAG, LangGraph, OpenAI APIs, PostgreSQL,
            pgvector, and Neo4j. At Skopus AI, I own backend services, secure service-to-service
            communication, concurrency controls, and automated AWS deployments.
            My broader toolkit includes Java, Spring Boot, Node.js, Docker, Kubernetes,
            Terraform, GitLab CI/CD, and GitHub Actions.
          </p>
          <p>
            I am interested in Software Engineer, Backend Engineer, Full-Stack Engineer,
            Platform Engineer, and cloud-focused roles.
            {" "}{LOCATION_DETAIL}
          </p>
        </div>
      </div>
    </PageSection>
  );
};

export default About;
