import { useCallback, useState } from "react";
import type { MinecraftItem } from "./types";

interface UseMinecraftSelectionOptions {
  initialSelectedId?: string | null;
  onActivate?: (item: MinecraftItem) => void;
}

const useMinecraftSelection = ({
  initialSelectedId = null,
  onActivate,
}: UseMinecraftSelectionOptions = {}) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(initialSelectedId);

  const select = useCallback((itemOrId: MinecraftItem | string) => {
    const id = typeof itemOrId === "string" ? itemOrId : itemOrId.id;
    setSelectedItemId(id);
  }, []);

  const clear = useCallback(() => setSelectedItemId(null), []);

  const activate = useCallback((item: MinecraftItem) => {
    if (item.disabled) return;
    setSelectedItemId(item.id);
    onActivate?.(item);
  }, [onActivate]);

  return { selectedItemId, select, clear, activate } as const;
};

export default useMinecraftSelection;
