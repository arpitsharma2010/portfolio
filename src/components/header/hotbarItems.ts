import type { MinecraftIconName, MinecraftItem } from "../minecraft/types";

export const portfolioSectionIds = [
  "home",
  "about",
  "skills",
  "experience",
  "projects",
  "education",
  "resume",
  "contact",
] as const;

export type PortfolioSectionId = (typeof portfolioSectionIds)[number];

export interface HotbarEntry {
  slot: number;
  item: MinecraftItem;
  displayLabel: string;
  sectionId?: PortfolioSectionId;
  kind: "navigation" | "theme" | "portal-crystals";
}

const navigationEntries: Omit<HotbarEntry, "slot">[] = [
  { kind: "navigation", sectionId: "home", displayLabel: "Home / Spawn", item: { id: "hotbar-home", name: "Compass", icon: "compass", category: "Home", lore: ["Return to spawn"] } },
  { kind: "navigation", sectionId: "about", displayLabel: "About", item: { id: "hotbar-about", name: "Name Tag", icon: "name-tag", category: "About", lore: ["Meet the player"] } },
  { kind: "navigation", sectionId: "skills", displayLabel: "Skills", item: { id: "hotbar-skills", name: "Diamond Pickaxe", icon: "diamond-pickaxe", category: "Skills", lore: ["Open technical inventory"], rarity: "rare" } },
  { kind: "navigation", sectionId: "experience", displayLabel: "Experience", item: { id: "hotbar-experience", name: "Map", icon: "map", category: "Experience", lore: ["View career advancements"] } },
  { kind: "navigation", sectionId: "projects", displayLabel: "Projects", item: { id: "hotbar-projects", name: "Chest", icon: "chest", category: "Projects", lore: ["Browse completed builds"] } },
  { kind: "navigation", sectionId: "education", displayLabel: "Education", item: { id: "hotbar-education", name: "Enchanted Book", icon: "enchanted-book", category: "Education", lore: ["Review learning milestones"], rarity: "enchanted" } },
  { kind: "navigation", sectionId: "resume", displayLabel: "Resume", item: { id: "hotbar-resume", name: "Written Book", icon: "book", category: "Resume", lore: ["Open professional summary"] } },
  { kind: "navigation", sectionId: "contact", displayLabel: "Contact", item: { id: "hotbar-contact", name: "Portal", icon: "portal", category: "Contact", lore: ["Open a communication portal"], rarity: "epic" } },
];

export const getHotbarEntries = (isDark: boolean, portalCrystalCount = 0): HotbarEntry[] => {
  const themeIcon: MinecraftIconName = isDark ? "moon-clock" : "sun-clock";
  const themeAction = isDark ? "Switch to day mode" : "Switch to night mode";
  return [
    ...navigationEntries.map((entry, index) => ({ ...entry, slot: index + 1 })),
    {
      slot: 9,
      kind: "theme",
      displayLabel: themeAction,
      item: {
        id: "hotbar-theme",
        name: "Clock",
        icon: themeIcon,
        category: themeAction,
        lore: [isDark ? "Current world state: night" : "Current world state: day"],
      },
    },
    {
      slot: 0,
      kind: "portal-crystals",
      displayLabel: `${portalCrystalCount} / 12 Portal Crystals`,
      item: {
        id: "hotbar-portal-crystals",
        name: "Portal Crystal",
        icon: "portal-crystal",
        category: "End Portal",
        quantity: portalCrystalCount,
        rarity: "enchanted",
        lore: [portalCrystalCount === 12 ? "Activate End Portal" : `${portalCrystalCount} of 12 collected`],
      },
    },
  ];
};

export const getSectionFromHash = (hash: string): PortfolioSectionId | null => {
  const id = hash.replace(/^#/, "");
  return portfolioSectionIds.includes(id as PortfolioSectionId) ? id as PortfolioSectionId : null;
};
