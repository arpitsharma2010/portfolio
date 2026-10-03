import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import type { MinecraftItem } from "./types";

interface MinecraftTooltipProps {
  id: string;
  item: MinecraftItem;
  anchorRef: RefObject<HTMLElement | null>;
  visible: boolean;
}

const EDGE_GAP = 8;

const MinecraftTooltip = ({ id, item, anchorRef, visible }: MinecraftTooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ left: 0, top: 0, ready: false });

  useLayoutEffect(() => {
    if (!visible) return;

    const updatePosition = () => {
      const anchor = anchorRef.current;
      const tooltip = tooltipRef.current;
      if (!anchor || !tooltip) return;
      const anchorRect = anchor.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      // A focused slot scrolled out of view must not leave its lore clamped over other content.
      if (anchorRect.bottom < 0 || anchorRect.top > window.innerHeight) {
        setPosition((current) => ({ ...current, ready: false }));
        return;
      }
      const preferredTop = anchorRect.top - tooltipRect.height - EDGE_GAP;
      const top = preferredTop >= EDGE_GAP
        ? preferredTop
        : Math.min(window.innerHeight - tooltipRect.height - EDGE_GAP, anchorRect.bottom + EDGE_GAP);
      const left = Math.min(
        window.innerWidth - tooltipRect.width - EDGE_GAP,
        Math.max(EDGE_GAP, anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2),
      );
      setPosition({ left, top: Math.max(EDGE_GAP, top), ready: true });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [anchorRef, visible]);

  const description = [item.category, ...(item.lore ?? []), item.description].filter(Boolean).join(". ");

  return (
    <>
      <span id={id} className="mc-visually-hidden">{item.name}. {description}</span>
      {visible && typeof document !== "undefined" && createPortal(
        <div
          ref={tooltipRef}
          className={`mc-tooltip mc-tooltip--${item.rarity ?? "common"}`}
          role="tooltip"
          aria-hidden="true"
          style={{ left: position.left, top: position.top, visibility: position.ready ? "visible" : "hidden" }}
        >
          <strong className="mc-tooltip__name">{item.name}</strong>
          <span className="mc-tooltip__category">{item.category}</span>
          {item.lore?.map((line, index) => <span className="mc-tooltip__lore" key={`${line}-${index}`}>{line}</span>)}
          {item.description && <span className="mc-tooltip__description">{item.description}</span>}
          {item.action && <span className="mc-tooltip__action">{item.action.label}</span>}
        </div>,
        document.body,
      )}
    </>
  );
};

export default MinecraftTooltip;
