import type { ReactNode } from "react";

export type MinecraftItemRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "enchanted";

export type MinecraftItemCategory =
  | "tool"
  | "weapon"
  | "knowledge"
  | "navigation"
  | "material"
  | "utility"
  | "project"
  | "achievement"
  | (string & {});

export type MinecraftIconName =
  | "wooden-pickaxe"
  | "stone-pickaxe"
  | "iron-pickaxe"
  | "diamond-pickaxe"
  | "netherite-pickaxe"
  | "axe"
  | "sword"
  | "shovel"
  | "hoe"
  | "bow"
  | "shield"
  | "book"
  | "enchanted-book"
  | "compass"
  | "map"
  | "clock"
  | "sun-clock"
  | "moon-clock"
  | "redstone-dust"
  | "redstone-torch"
  | "chest"
  | "ender-chest"
  | "portal"
  | "crafting-table"
  | "furnace"
  | "anvil"
  | "enchanting-table"
  | "potion"
  | "emerald"
  | "diamond"
  | "iron-ingot"
  | "gold-ingot"
  | "lapis-gem"
  | "experience-bottle"
  | "command-cube"
  | "server-network"
  | "scroll"
  | "name-tag";

export interface MinecraftItemAction {
  label: string;
  type?: "activate" | "navigate" | "external";
}

export interface MinecraftItem {
  id: string;
  name: string;
  icon: MinecraftIconName;
  category: MinecraftItemCategory;
  lore?: string[];
  description?: string;
  quantity?: number;
  /** Visual treatment only. It must never be used as a proficiency score. */
  rarity?: MinecraftItemRarity;
  href?: string;
  action?: MinecraftItemAction;
  disabled?: boolean;
  selected?: boolean;
  metadata?: Readonly<Record<string, unknown>>;
}

export type MinecraftContainerMode =
  | "inventory"
  | "chest"
  | "large-chest"
  | "crafting"
  | "enchanting"
  | "book"
  | "advancement";

export interface MinecraftToastMessage {
  id?: string;
  title: string;
  message: string;
  icon?: MinecraftIconName;
  duration?: number;
}

export interface MinecraftToastEntry extends MinecraftToastMessage {
  id: string;
}

export type MinecraftSlotContent = MinecraftItem | null;

export interface MinecraftContainerFooter {
  label?: string;
  content: ReactNode;
}
