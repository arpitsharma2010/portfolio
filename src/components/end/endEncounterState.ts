export const DRAGON_MAX_HEALTH = 100;
export const DRAGON_DAMAGE = 5;
export const CRYSTAL_MAX_INTEGRITY = 3;
export const CRYSTAL_COUNT = 5;

export interface EndEncounterState {
  dragonHealth: number;
  crystals: number[];
  endActive: boolean;
  dragonDefeated: boolean;
  hitCrystal: number | null;
  burstCrystal: number | null;
  dragonHit: boolean;
  announcement: string;
}

export type EndEncounterAction =
  | { type: "enter" }
  | { type: "exit" }
  | { type: "attack-crystal"; index: number }
  | { type: "attack-dragon" }
  | { type: "regenerate" }
  | { type: "clear-effects" };

export const createInitialEndEncounterState = (): EndEncounterState => ({
  dragonHealth: DRAGON_MAX_HEALTH,
  crystals: Array.from({ length: CRYSTAL_COUNT }, () => CRYSTAL_MAX_INTEGRITY),
  endActive: false,
  dragonDefeated: false,
  hitCrystal: null,
  burstCrystal: null,
  dragonHit: false,
  announcement: "",
});

export const livingCrystals = (crystals: number[]) => crystals.filter((integrity) => integrity > 0).length;

export const endEncounterReducer = (state: EndEncounterState, action: EndEncounterAction): EndEncounterState => {
  switch (action.type) {
    case "enter":
      return { ...state, endActive: true, announcement: "" };
    case "exit":
      return { ...state, endActive: false, hitCrystal: null, burstCrystal: null, dragonHit: false, announcement: "" };
    case "attack-crystal": {
      if (!state.endActive || state.dragonDefeated || state.crystals[action.index] <= 0) return state;
      const crystals = [...state.crystals];
      crystals[action.index] = Math.max(0, crystals[action.index] - 1);
      const destroyed = crystals[action.index] === 0;
      const allDestroyed = livingCrystals(crystals) === 0;
      return {
        ...state,
        crystals,
        hitCrystal: action.index,
        burstCrystal: destroyed ? action.index : null,
        announcement: destroyed
          ? allDestroyed ? "All End Crystals destroyed" : `End Crystal ${action.index + 1} destroyed`
          : "",
      };
    }
    case "attack-dragon": {
      if (!state.endActive || state.dragonDefeated) return state;
      const crystalsRemain = livingCrystals(state.crystals) > 0;
      const floor = crystalsRemain ? 1 : 0;
      const dragonHealth = Math.max(floor, state.dragonHealth - DRAGON_DAMAGE);
      const dragonDefeated = dragonHealth === 0 && !crystalsRemain;
      return {
        ...state,
        dragonHealth,
        dragonDefeated,
        dragonHit: true,
        announcement: dragonDefeated ? "Dragon defeated" : "",
      };
    }
    case "regenerate": {
      const regenRate = livingCrystals(state.crystals);
      if (!state.endActive || state.dragonDefeated || regenRate === 0 || state.dragonHealth >= DRAGON_MAX_HEALTH) return state;
      return { ...state, dragonHealth: Math.min(DRAGON_MAX_HEALTH, state.dragonHealth + regenRate), dragonHit: false };
    }
    case "clear-effects":
      return { ...state, hitCrystal: null, burstCrystal: null, dragonHit: false };
  }
};
