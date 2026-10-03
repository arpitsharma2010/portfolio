import { useId, useRef, useState, type ButtonHTMLAttributes, type KeyboardEvent, type PointerEvent } from "react";
import MinecraftItemIcon from "./MinecraftItemIcon";
import MinecraftTooltip from "./MinecraftTooltip";
import type { MinecraftItem } from "./types";

interface MinecraftSlotProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onSelect"> {
  item?: MinecraftItem | null;
  selected?: boolean;
  onSelect?: (item: MinecraftItem) => void;
  onActivate?: (item: MinecraftItem) => void;
  /** Primary controls such as navigation may activate on the first click/tap. */
  activateOnClick?: boolean;
  showTooltip?: boolean;
  showTooltipWhenSelected?: boolean;
  slotLabel?: string;
}

const MinecraftSlot = ({
  item = null,
  selected = item?.selected ?? false,
  onSelect,
  onActivate,
  activateOnClick = false,
  showTooltip = true,
  showTooltipWhenSelected = true,
  slotLabel,
  className = "",
  disabled,
  onClick,
  onDoubleClick,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  onPointerDown,
  onKeyDown,
  ...buttonProps
}: MinecraftSlotProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pointerTypeRef = useRef("");
  const tooltipId = `mc-tooltip-${useId().replace(/:/g, "")}`;
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const isDisabled = disabled ?? item?.disabled ?? false;
  const tooltipVisible = Boolean(item && showTooltip && (hovered || focused || (selected && showTooltipWhenSelected)));

  const select = () => {
    if (item && !isDisabled) onSelect?.(item);
  };

  const activate = () => {
    if (!item || isDisabled) return;
    onActivate?.(item);
    if (item.href) {
      if (item.action?.type === "external") window.open(item.href, "_blank", "noopener,noreferrer");
      else window.location.assign(item.href);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !item || isDisabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select();
      activate();
    }
  };

  return (
    <>
      <button
        {...buttonProps}
        ref={buttonRef}
        type="button"
        className={`mc-slot${selected ? " is-selected" : ""}${item ? " has-item" : " is-empty"} ${className}`.trim()}
        disabled={isDisabled}
        aria-label={slotLabel ?? (item ? item.name : "Empty inventory slot")}
        aria-pressed={item ? selected : undefined}
        aria-describedby={item ? tooltipId : undefined}
        data-item-id={item?.id}
        onPointerDown={(event: PointerEvent<HTMLButtonElement>) => {
          pointerTypeRef.current = event.pointerType;
          onPointerDown?.(event);
        }}
        onClick={(event) => {
          onClick?.(event);
          if (event.defaultPrevented || !item) return;
          const wasSelected = selected;
          select();
          if (activateOnClick) {
            activate();
            pointerTypeRef.current = "";
            return;
          }
          // Touch has no hover: the first tap selects and reveals lore, the next activates.
          if (wasSelected && pointerTypeRef.current === "touch") activate();
          pointerTypeRef.current = "";
        }}
        onDoubleClick={(event) => {
          onDoubleClick?.(event);
          if (!event.defaultPrevented) activate();
        }}
        onKeyDown={handleKeyDown}
        onFocus={(event) => { setFocused(true); onFocus?.(event); }}
        onBlur={(event) => { setFocused(false); onBlur?.(event); }}
        onMouseEnter={(event) => { setHovered(true); onMouseEnter?.(event); }}
        onMouseLeave={(event) => { setHovered(false); onMouseLeave?.(event); }}
      >
        {item && <MinecraftItemIcon name={item.icon} />}
        {item?.quantity !== undefined && item.quantity > 1 && <span className="mc-slot__count" aria-label={`Quantity ${item.quantity}`}>{item.quantity}</span>}
        {item?.rarity === "enchanted" && <span className="mc-slot__enchant" aria-hidden />}
      </button>
      {item && <MinecraftTooltip id={tooltipId} item={item} anchorRef={buttonRef} visible={tooltipVisible} />}
    </>
  );
};

export default MinecraftSlot;
