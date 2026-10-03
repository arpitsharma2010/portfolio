import { useMemo, useRef, type CSSProperties, type KeyboardEvent } from "react";
import MinecraftSlot from "./MinecraftSlot";
import type { MinecraftItem, MinecraftSlotContent } from "./types";

interface MinecraftInventoryGridProps {
  items: readonly MinecraftSlotContent[];
  rows: number;
  columns?: number;
  mobileColumns?: number;
  selectedItemId?: string | null;
  onSelect?: (item: MinecraftItem) => void;
  onActivate?: (item: MinecraftItem) => void;
  ariaLabel?: string;
  className?: string;
  /** Inline inventories should not pin a tooltip open for the persistent selection. */
  showTooltipWhenSelected?: boolean;
  getSlotLabel?: (item: MinecraftItem) => string;
}

const MinecraftInventoryGrid = ({
  items,
  rows,
  columns = 9,
  mobileColumns = 4,
  selectedItemId,
  onSelect,
  onActivate,
  ariaLabel = "Inventory",
  className = "",
  showTooltipWhenSelected,
  getSlotLabel = (item) => item.name,
}: MinecraftInventoryGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const slotCount = rows * columns;
  const slots = useMemo(
    () => Array.from({ length: slotCount }, (_, index) => items[index] ?? null),
    [items, slotCount],
  );
  const selectedIndex = slots.findIndex((item) => item?.id === selectedItemId);
  const firstEnabledIndex = slots.findIndex((item) => item && !item.disabled);

  const getVisualColumns = () => {
    if (typeof window === "undefined") return columns;
    if (window.innerWidth <= 520) return Math.min(mobileColumns, columns);
    if (window.innerWidth <= 768) return Math.min(6, columns);
    return columns;
  };

  /** Empty and disabled slots are skipped in the direction of travel; past the last item, focus stays put. */
  const focusSlot = (index: number, step: 1 | -1) => {
    const buttons = gridRef.current?.querySelectorAll<HTMLButtonElement>(".mc-slot");
    if (!buttons?.length) return;
    for (let candidate = (index + buttons.length) % buttons.length; candidate >= 0 && candidate < buttons.length; candidate += step) {
      if (!buttons[candidate].disabled) {
        buttons[candidate].focus();
        return;
      }
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const target = (event.target as HTMLElement).closest<HTMLButtonElement>(".mc-slot");
    if (!target) return;
    const currentIndex = Number(target.dataset.slotIndex);
    const visualColumns = getVisualColumns();
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight") nextIndex = currentIndex + 1;
    if (event.key === "ArrowLeft") nextIndex = currentIndex - 1;
    if (event.key === "ArrowDown") nextIndex = currentIndex + visualColumns;
    if (event.key === "ArrowUp") nextIndex = currentIndex - visualColumns;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = slotCount - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    focusSlot(nextIndex, event.key === "End" || nextIndex < currentIndex ? -1 : 1);
  };

  return (
    <div
      ref={gridRef}
      className={`mc-inventory-grid ${className}`.trim()}
      role="grid"
      aria-label={ariaLabel}
      aria-rowcount={rows}
      aria-colcount={columns}
      style={{
        "--mc-grid-columns": columns,
        "--mc-grid-tablet-columns": Math.min(6, columns),
        "--mc-grid-mobile-columns": Math.min(mobileColumns, columns),
      } as CSSProperties}
      onKeyDown={handleKeyDown}
    >
      {slots.map((item, index) => (
        <div
          key={item?.id ?? `empty-${index}`}
          role="gridcell"
          aria-rowindex={Math.floor(index / columns) + 1}
          aria-colindex={(index % columns) + 1}
        >
          <MinecraftSlot
            item={item}
            selected={Boolean(item && item.id === selectedItemId)}
            onSelect={onSelect}
            onActivate={onActivate}
            disabled={item ? undefined : true}
            aria-hidden={item ? undefined : true}
            data-slot-index={index}
            tabIndex={index === (selectedIndex >= 0 ? selectedIndex : Math.max(0, firstEnabledIndex)) ? 0 : -1}
            showTooltipWhenSelected={showTooltipWhenSelected}
            slotLabel={item ? getSlotLabel(item) : `Empty slot ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default MinecraftInventoryGrid;
