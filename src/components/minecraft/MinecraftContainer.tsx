import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import type { MinecraftContainerMode } from "./types";

interface MinecraftContainerProps {
  open: boolean;
  title: string;
  mode?: MinecraftContainerMode;
  children: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  overlay?: boolean;
  closeLabel?: string;
  className?: string;
}

const FOCUSABLE = "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

const MinecraftContainer = ({
  open,
  title,
  mode = "inventory",
  children,
  footer,
  onClose,
  overlay = true,
  closeLabel = "Close container",
  className = "",
}: MinecraftContainerProps) => {
  const titleId = `mc-container-title-${useId().replace(/:/g, "")}`;
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    if (overlay) document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => {
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      (firstFocusable ?? panelRef.current)?.focus();
    });

    return () => {
      cancelAnimationFrame(frame);
      if (overlay) document.body.style.overflow = previousOverflow;
      returnFocusRef.current?.focus();
    };
  }, [open, overlay]);

  if (!open) return null;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (!overlay || event.key !== "Tab") return;
    const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
    if (focusable.length === 0) {
      event.preventDefault();
      panelRef.current?.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const panel = (
    <div className={overlay ? "mc-screen-backdrop" : "mc-container-host"} onMouseDown={(event) => {
      if (overlay && event.target === event.currentTarget) onClose();
    }}>
      <div
        ref={panelRef}
        className={`mc-container mc-container--${mode} ${className}`.trim()}
        role={overlay ? "dialog" : "region"}
        aria-modal={overlay ? true : undefined}
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <header className="mc-container__header">
          <h2 id={titleId}>{title}</h2>
          <button className="mc-container__close mc-button-press" type="button" onClick={onClose} aria-label={closeLabel}>×</button>
        </header>
        <div className="mc-container__content">{children}</div>
        {footer && <footer className="mc-container__footer">{footer}</footer>}
      </div>
    </div>
  );

  return overlay && typeof document !== "undefined" ? createPortal(panel, document.body) : panel;
};

export default MinecraftContainer;
