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
}: MinecraftInventoryGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const slotCount = rows * columns;
  const slots = useMemo(
    () => Array.from({ length: slotCount }, (_, index) => items[index] ?? null),
    [items, slotCount],
  );
  const selectedIndex = slots.findIndex((item) => item?.id === selectedItemId);
  const firstEnabledIndex = slots.findIndex((item) => !item?.disabled);

  const getVisualColumns = () => {
    if (typeof window === "undefined") return columns;
    if (window.innerWidth <= 520) return Math.min(mobileColumns, columns);
    if (window.innerWidth <= 768) return Math.min(6, columns);
    return columns;
  };

  const focusSlot = (index: number) => {
    const buttons = gridRef.current?.querySelectorAll<HTMLButtonElement>(".mc-slot");
    if (!buttons?.length) return;
    let candidate = (index + buttons.length) % buttons.length;
    for (let checked = 0; checked < buttons.length; checked += 1) {
      if (!buttons[candidate].disabled) {
        buttons[candidate].focus();
        return;
      }
      candidate = (candidate + 1) % buttons.length;
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
    focusSlot(nextIndex);
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
            data-slot-index={index}
            tabIndex={index === (selectedIndex >= 0 ? selectedIndex : Math.max(0, firstEnabledIndex)) ? 0 : -1}
            slotLabel={item?.name ?? `Empty slot ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default MinecraftInventoryGrid;
