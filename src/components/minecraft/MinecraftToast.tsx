import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import MinecraftItemIcon from "./MinecraftItemIcon";
import { MinecraftToastContext } from "./MinecraftToastContext";
import type { MinecraftToastEntry, MinecraftToastMessage } from "./types";

const MinecraftToast = ({ toast, onDismiss }: { toast: MinecraftToastEntry; onDismiss: () => void }) => (
  <div className="mc-toast" role="status" aria-live="polite" aria-atomic="true">
    {toast.icon && <span className="mc-toast__icon" aria-hidden><MinecraftItemIcon name={toast.icon} /></span>}
    <div className="mc-toast__copy">
      <strong>{toast.title}</strong>
      <span>{toast.message}</span>
    </div>
    <button type="button" onClick={onDismiss} aria-label={`Dismiss ${toast.title}`}>×</button>
  </div>
);

const MinecraftToastProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<MinecraftToastEntry[]>([]);
  const nextId = useRef(0);
  const active = queue[0];

  const showToast = useCallback((message: MinecraftToastMessage) => {
    const id = message.id ?? `mc-toast-${nextId.current++}`;
    setQueue((current) => [...current.filter((toast) => toast.id !== id), { ...message, id }]);
    return id;
  }, []);

  const dismissToast = useCallback((id?: string) => {
    setQueue((current) => id ? current.filter((toast) => toast.id !== id) : current.slice(1));
  }, []);

  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(() => dismissToast(active.id), active.duration ?? 4000);
    return () => window.clearTimeout(timer);
  }, [active, dismissToast]);

  const value = useMemo(() => ({ showToast, dismissToast }), [dismissToast, showToast]);

  return (
    <MinecraftToastContext.Provider value={value}>
      {children}
      <div className="mc-toast-viewport" aria-label="Notifications">
        {active && <MinecraftToast toast={active} onDismiss={() => dismissToast(active.id)} />}
      </div>
    </MinecraftToastContext.Provider>
  );
};

export { MinecraftToast, MinecraftToastProvider };
