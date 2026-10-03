import type { SVGProps } from "react";
import type { MinecraftIconName } from "./types";

interface MinecraftItemIconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: MinecraftIconName;
  title?: string;
}

const pickaxeColors: Partial<Record<MinecraftIconName, [string, string]>> = {
  "wooden-pickaxe": ["#9a673d", "#633f28"],
  "stone-pickaxe": ["#92958e", "#565b55"],
  "iron-pickaxe": ["#d9ddd6", "#8a938e"],
  "diamond-pickaxe": ["#55d9d3", "#197f83"],
  "netherite-pickaxe": ["#625661", "#332d37"],
};

const Gem = ({ color, shade }: { color: string; shade: string }) => (
  <>
    <path fill={shade} d="M16 3h10l7 8-12 21H11L3 16 8 7z" />
    <path fill={color} d="M12 6h11l6 6-10 16h-6L7 16z" />
    <path fill="#fff" fillOpacity=".45" d="M13 8h7l-4 5H9z" />
  </>
);

const MinecraftItemIcon = ({ name, title, className = "", ...props }: MinecraftItemIconProps) => {
  const pickaxe = pickaxeColors[name];
  let art;

  if (pickaxe) {
    art = <><path fill="#6f472b" d="M25 13h5v6h-5v5h-5v9h-6V20h5v-6h6z" /><path fill={pickaxe[1]} d="M4 6h24l5 6-4 4-5-4H4z" /><path fill={pickaxe[0]} d="M5 3h23l3 4H4z" /></>;
  } else {
    switch (name) {
      case "axe": art = <><path fill="#75492c" d="M18 13h6v21h-6z" /><path fill="#aeb5b1" d="M7 4h16v5h6v10H18v-5H7z" /><path fill="#68706c" d="M7 14h11v5H7z" /></>; break;
      case "sword": art = <><path fill="#d9dfdc" d="M24 3h9v9L18 27l-6-6z" /><path fill="#7f8a85" d="M18 20l5 5-5 5-5-5z" /><path fill="#815335" d="M8 24l5 5-5 5-5-5z" /></>; break;
      case "shovel": art = <><path fill="#73472d" d="M17 14h6v20h-6z" /><path fill="#aeb6b2" d="M12 3h16v10l-8 7-8-7z" /><path fill="#737c78" d="M12 10h16v4H12z" /></>; break;
      case "hoe": art = <><path fill="#74472c" d="M20 10h6v24h-6z" /><path fill="#a9b0ac" d="M6 4h25v8H18V9H6z" /></>; break;
      case "bow": art = <><path fill="none" stroke="#8f5c32" strokeWidth="6" d="M11 4c17 7 17 25 0 31" /><path fill="none" stroke="#ded8bd" strokeWidth="2" d="M11 4v31" /></>; break;
      case "shield": art = <><path fill="#81512f" d="M6 5h28v18L20 36 6 23z" /><path fill="#b27a43" d="M11 9h18v12l-9 9-9-9z" /><path fill="#d7bd72" d="M17 9h6v21h-6z" /></>; break;
      case "book":
      case "enchanted-book": art = <><path fill={name === "book" ? "#8b4a38" : "#68408e"} d="M4 7h15l3 3 3-3h11v26H24l-3 3-4-3H4z" /><path fill="#e6d8ad" d="M8 10h10v18H8zm17 0h7v18h-7z" />{name === "enchanted-book" && <path className="mc-icon__shimmer" fill="#d98cff" d="M6 3h4v4H6zm24 27h5v5h-5z" />}</>; break;
      case "compass": art = <><circle cx="20" cy="20" r="17" fill="#b8b0a0" /><circle cx="20" cy="20" r="12" fill="#31455b" /><path fill="#f25b4b" d="M22 7l3 14-5-1-5-1z" /><path fill="#eee" d="M18 33l-3-14 5 1 5 1z" /></>; break;
      case "map": art = <><path fill="#dfd4a4" d="M3 7l11-4 12 5 11-4v29l-11 4-12-5-11 4z" /><path fill="#67a65b" d="M8 12h8v7h8v10h8v4l-6 2-12-5-6 2z" /><path fill="#63a9c4" d="M17 6l8 4v9h-6v-7l-2-1z" /></>; break;
      case "clock": art = <><circle cx="20" cy="20" r="17" fill="#d7a62e" /><circle cx="20" cy="20" r="12" fill="#e6ddbd" /><path fill="#443928" d="M18 9h4v10l8 5-2 4-10-6z" /></>; break;
      case "redstone-dust": art = <><path fill="#8d151a" d="M5 25h8l5-8 6 6 7-10 5 4-9 16H14z" /><path fill="#e34a43" d="M4 28h10v6H4zm22-20h7v7h-7z" /></>; break;
      case "redstone-torch": art = <><path fill="#77482c" d="M17 13h6v23h-6z" /><path fill="#b41e25" d="M12 4h16v12H12z" /><path fill="#ff7166" d="M16 6h8v5h-8z" /></>; break;
      case "chest":
      case "ender-chest": art = <><path fill={name === "chest" ? "#9a5f2d" : "#244b4d"} d="M3 8h34v26H3z" /><path fill={name === "chest" ? "#d08a3d" : "#397779"} d="M6 11h28v9H6z" /><path fill="#25251f" d="M3 18h34v5H3z" /><path fill="#e1b94d" d="M17 17h7v9h-7z" /></>; break;
      case "crafting-table": art = <><path fill="#8c542f" d="M3 5h34v31H3z" /><path fill="#c98a4b" d="M6 8h28v9H6z" /><path fill="#38251c" d="M18 5h4v31h-4zM3 18h34v4H3z" /></>; break;
      case "furnace": art = <><path fill="#777b76" d="M4 3h32v34H4z" /><path fill="#393d3a" d="M9 8h22v9H9zm0 14h22v11H9z" /><path fill="#f08b2d" d="M14 25h12v6H14z" /></>; break;
      case "anvil": art = <><path fill="#4c514f" d="M3 7h34v8l-8 5h-5v8h7v7H9v-7h7v-8l-6-5H3z" /><path fill="#777d79" d="M7 7h27v4H7z" /></>; break;
      case "enchanting-table": art = <><path fill="#25182d" d="M5 18h30v17H5z" /><path fill="#4f2e62" d="M9 21h22v10H9z" /><path fill="#e7dcb7" d="M5 5h13l3 4 4-4h11v13H24l-3 4-4-4H5z" /></>; break;
      case "potion":
      case "experience-bottle": art = <><path fill="#9b7652" d="M15 3h10v7H15z" /><path fill="#c9e1df" d="M11 9h18v7l6 11-5 9H10l-5-9 6-11z" /><path fill={name === "potion" ? "#b84fc6" : "#77cf56"} d="M9 25h22l-3 7H12z" /><path fill="#fff" fillOpacity=".55" d="M12 15h5v7h-5z" /></>; break;
      case "emerald": art = <Gem color="#43c66a" shade="#176d45" />; break;
      case "diamond": art = <Gem color="#59ddd8" shade="#177d83" />; break;
      case "lapis-gem": art = <Gem color="#477bd5" shade="#263e8e" />; break;
      case "iron-ingot":
      case "gold-ingot": art = <><path fill={name === "iron-ingot" ? "#8e9895" : "#9d6f19"} d="M7 12h26l5 14-7 7H6L2 25z" /><path fill={name === "iron-ingot" ? "#d7dcd8" : "#f0c74c"} d="M10 9h21l3 13-6 5H7L5 22z" /></>; break;
      case "command-cube": art = <><path fill="#b98a64" d="M4 4h32v32H4z" /><path fill="#e0aa79" d="M8 8h24v24H8z" /><path fill="#65456c" d="M12 12h16v16H12z" /><path fill="#d19ed5" d="M16 16h8v8h-8z" /></>; break;
      case "server-network": art = <><path fill="#596361" d="M4 5h32v10H4zm0 20h32v10H4z" /><path fill="#9ca5a0" d="M8 8h16v4H8zm0 20h16v4H8z" /><path fill="#68d05a" d="M29 8h4v4h-4zm0 20h4v4h-4z" /><path stroke="#d6b14a" strokeWidth="3" d="M20 15v10" /></>; break;
      case "scroll": art = <><path fill="#8e693c" d="M5 5h27v6H9v21h23v6H5z" /><path fill="#ead9aa" d="M9 8h25v27H9z" /><path fill="#9b8157" d="M14 15h15v3H14zm0 7h12v3H14z" /></>; break;
      case "name-tag": art = <><path fill="#d6c9a8" d="M3 13L14 4h22v22L25 37z" /><circle cx="28" cy="12" r="4" fill="#615b50" /><path fill="#8f856e" d="M11 17h13v4H11z" /></>; break;
      default: art = <Gem color="#8fa3a0" shade="#4f5d5b" />;
    }
  }

  return (
    <svg className={`mc-item-icon ${className}`.trim()} viewBox="0 0 40 40" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} {...props}>
      {title && <title>{title}</title>}
      {art}
    </svg>
  );
};

export default MinecraftItemIcon;
