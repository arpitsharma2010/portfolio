import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { prefersReducedMotion } from "../../../utils/motion";
import "./about-entrance.css";

// A document is a page session: survives React remounts, resets on page reload.
const visitedDocuments = new WeakSet<Document>();

export default function AboutEntrance({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const finish = useRef<() => void>(() => {});
  const [phase, setPhase] = useState<"idle" | "charge" | "burst">("idle");

  useEffect(() => {
    const element = root.current;
    if (!element || visitedDocuments.has(document)) return;
    const motion = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion()) {
      visitedDocuments.add(document);
      return;
    }
    if (typeof IntersectionObserver !== "function") return;

    let started = false;
    const timers: number[] = [];
    const complete = () => {
      timers.forEach(window.clearTimeout);
      setPhase("idle");
      observer.disconnect();
    };
    finish.current = complete;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      if (!entry.isIntersecting) {
        if (started) complete();
        return;
      }
      if (started || visitedDocuments.has(document)) return;
      started = true;
      visitedDocuments.add(document);
      // Never obscure a control the visitor is already using.
      if (prefersReducedMotion() || element.contains(document.activeElement)) {
        complete();
        return;
      }
      setPhase("charge");
      timers.push(window.setTimeout(() => setPhase("burst"), 950));
      timers.push(window.setTimeout(complete, 1350));
    }, { threshold: 0 });
    observer.observe(element);
    const skipMotion = () => {
      if (motion?.matches) {
        visitedDocuments.add(document);
        complete();
      }
    };
    motion?.addEventListener?.("change", skipMotion);
    return () => {
      timers.forEach(window.clearTimeout);
      observer.disconnect();
      motion?.removeEventListener?.("change", skipMotion);
      finish.current = () => {};
    };
  }, []);

  return (
    <div ref={root} className="about-entrance" data-entrance={phase} onFocusCapture={() => finish.current()}>
      <div className="about-entrance__content">{children}</div>
      {phase !== "idle" && (
        <div className="about-entrance__effect" aria-hidden="true">
          {phase === "charge" ? (
            // Original moss-green creature: offset visor, antenna, plated torso and four feet.
            <svg className="about-entrance__creature" viewBox="0 0 80 104" focusable="false" shapeRendering="crispEdges">
              <path fill="#203f35" d="M18 0h8v12h36v32H50v8h10v28h14v16H54V84H44v20H30V84H20v12H6V80h12V52h12v-8H10V12h8z" />
              <path fill="#77ae57" d="M18 16h40v24H18zM24 52h30v28H24zM10 84h10v8H10zM34 84h6v16h-6zM58 84h12v8H58z" />
              <path fill="#b3d777" d="M18 16h12v8H18zM24 52h8v20h-8zM34 4h8v8h-8z" />
              <path fill="#172c31" d="M26 24h8v8h-8zM46 20h8v8h-8zM34 36h16v4H34zM38 60h12v12H38z" />
              <path fill="#e8d58d" d="M40 62h6v6h-6z" />
            </svg>
          ) : (
            <div className="about-entrance__burst">
              {Array.from({ length: 24 }, (_, index) => {
                const angle = index * Math.PI * 2 / 24;
                const distance = 80 + index % 4 * 28;
                return <i key={index} style={{
                  "--particle-x": `${Math.cos(angle) * distance}px`,
                  "--particle-y": `${Math.sin(angle) * distance}px`,
                  "--particle-turn": `${index % 2 ? 140 : -120}deg`,
                } as CSSProperties} />;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
