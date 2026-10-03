import React from "react";
import PageSection from "../common/PageSection.tsx";
import { MinecraftInventoryGrid, MinecraftItemIcon, MinecraftSlot, useMinecraftSelection } from "../minecraft";
import type { MinecraftItem } from "../minecraft";
import PlayerPreview from "./about/PlayerPreview.tsx";
import {
  aboutItems,
  craftingResult,
  DEFAULT_ABOUT_ITEM_ID,
  equipmentItems,
  inventoryItems,
  profileActions,
  type AboutItem,
} from "./about/aboutInventoryItems";
import { NAME } from "../../utils/constants";
import "./about/player-inventory.css";

const itemLabel = (item: MinecraftItem) => `${item.name}, ${item.category}`;
const equipmentLabel = (item: MinecraftItem) => `${(item as AboutItem).slot} slot: ${itemLabel(item)}`;
const ingredientLabel = (item: MinecraftItem) => `Crafting ingredient: ${itemLabel(item)}`;

const SelectedItemDetail = ({ item }: { item: AboutItem }) => (
  <section className="pi-detail" aria-labelledby="pi-detail-title" aria-live="polite">
    <p className="pi-label">Selected item</p>
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
  </section>
);

const About: React.FC = () => {
  const { selectedItemId, select } = useMinecraftSelection({ initialSelectedId: DEFAULT_ABOUT_ITEM_ID });
  const selectedItem = aboutItems.find((item) => item.id === selectedItemId) ?? aboutItems[0];

  return (
    <PageSection eyebrow="Player Inventory" title="About Arpit" variant="grass">
      <div className="player-inventory">
        <div className="pi-panel">
          <div className="pi-identity">
            <p className="pi-label">Player profile</p>
            <dl>
              <div><dt>Player</dt><dd>{NAME}</dd></div>
              <div><dt>Class</dt><dd>Software Engineer</dd></div>
              <div><dt>Specialization</dt><dd>Backend · Distributed Systems · Cloud</dd></div>
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
                showTooltipWhenSelected={false}
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
                showTooltipWhenSelected={false}
                getSlotLabel={ingredientLabel}
              />
              <span className="pi-crafting__arrow" aria-hidden />
              <div className="pi-crafting__result">
                <MinecraftSlot
                  item={craftingResult}
                  selected={selectedItemId === craftingResult.id}
                  onSelect={select}
                  showTooltipWhenSelected={false}
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
              showTooltipWhenSelected={false}
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
            Most of what I have shipped, I have owned rather than contributed to: the service, its
            design, and its releases. At Skopus AI that means a codebase I wrote almost all of; at DNB
            it meant being the engineer accountable for a microservice reaching production intact across
            four environments, and for diagnosing it when a release did not. That is the level I work at
            best.
          </p>
          <p>
            I read systems before I change them. The Sbanken service had no documentation and no
            original authors left, so the work started with tracing endpoints and downstream calls until
            the data flow was written down. The Tesserae fix that took an API response from ~50,000
            records to 50 came from the same place. The interesting question was not how to paginate;
            it was why an endpoint was returning a result set nobody rendered.
          </p>
          <p>
            My centre of gravity is backend and distributed systems: API design, service boundaries,
            concurrency, caching, and what happens when a downstream dependency is slow instead of
            down. I build the front end for the APIs I write when that is what the work needs, and I
            run my own infrastructure (ECS, S3, Terraform, CI/CD) because a service you cannot deploy
            is not finished. Taco-DB and the Pintos kernel are where I go to keep the layer underneath
            the framework from becoming a black box.
          </p>
          <p>
            I work AI-natively, both on AI and with it. Building an 8-endpoint RAG service taught me
            that the hard part is the boundary around the model: validating its output, routing intent,
            deciding what happens when it fails. Calling it is the easy part. I use Claude Code and Codex daily
            as tooling for exploration and refactoring, with review and tests still deciding what
            merges.
          </p>
        </div>
      </div>
    </PageSection>
  );
};

export default About;
