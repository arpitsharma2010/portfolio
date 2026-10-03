import { createContext, useContext } from "react";
import type { MinecraftToastMessage } from "./types";

interface MinecraftToastContextValue {
  showToast: (message: MinecraftToastMessage) => string;
  dismissToast: (id?: string) => void;
}

const MinecraftToastContext = createContext<MinecraftToastContextValue | null>(null);

const useMinecraftToast = () => {
  const context = useContext(MinecraftToastContext);
  if (!context) throw new Error("useMinecraftToast must be used within MinecraftToastProvider");
  return context;
};

export { MinecraftToastContext, useMinecraftToast };
