import React, { useEffect, useState } from "react";

const WorldLoader: React.FC = () => {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem("world-generated") !== "true";
  });

  useEffect(() => {
    if (!visible) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(() => {
      window.sessionStorage.setItem("world-generated", "true");
      setVisible(false);
    }, reducedMotion ? 150 : 1450);
    return () => window.clearTimeout(timeout);
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => {
    window.sessionStorage.setItem("world-generated", "true");
    setVisible(false);
  };

  return (
    <div className="world-loader" role="status" aria-live="polite">
      <div className="world-loader__mark" aria-hidden>
        <span /><span /><span /><span />
      </div>
      <p>Generating World...</p>
      <div className="world-loader__track" aria-hidden><span /></div>
      <small>Loading portfolio chunks</small>
      <button type="button" onClick={dismiss}>Skip intro</button>
    </div>
  );
};

export default WorldLoader;
