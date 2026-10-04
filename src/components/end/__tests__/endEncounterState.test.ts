import { describe, expect, it } from "vitest";
import {
  createInitialEndEncounterState,
  endEncounterReducer,
  livingCrystals,
} from "../endEncounterState";

const enter = () => endEncounterReducer(createInitialEndEncounterState(), { type: "enter" });

describe("End encounter state", () => {
  it("initializes one 100 HP dragon and five intact three-hit crystals", () => {
    const state = createInitialEndEncounterState();
    expect(state).toMatchObject({ dragonHealth: 100, endActive: false, dragonDefeated: false });
    expect(state.crystals).toEqual([3, 3, 3, 3, 3]);
    expect(livingCrystals(state.crystals)).toBe(5);
  });

  it("destroys a crystal in three hits without going negative", () => {
    let state = enter();
    for (let hit = 0; hit < 4; hit += 1) state = endEncounterReducer(state, { type: "attack-crystal", index: 0 });
    expect(state.crystals[0]).toBe(0);
    expect(livingCrystals(state.crystals)).toBe(4);
  });

  it("deals five damage, regenerates deterministically, and clamps health", () => {
    let state = enter();
    state = endEncounterReducer(state, { type: "attack-dragon" });
    expect(state.dragonHealth).toBe(95);
    state = { ...state, dragonHealth: 50 };
    state = endEncounterReducer(state, { type: "regenerate" });
    expect(state.dragonHealth).toBe(55);
    state = endEncounterReducer({ ...state, dragonHealth: 99 }, { type: "regenerate" });
    expect(state.dragonHealth).toBe(100);
  });

  it("reduces regeneration with destroyed crystals and stops at zero living crystals", () => {
    let state = { ...enter(), dragonHealth: 50, crystals: [3, 3, 3, 3, 3] };
    state = endEncounterReducer(state, { type: "regenerate" });
    expect(state.dragonHealth).toBe(55);
    state = { ...state, crystals: [0, 0, 3, 3, 3] };
    state = endEncounterReducer(state, { type: "regenerate" });
    expect(state.dragonHealth).toBe(58);
    state = { ...state, crystals: [0, 0, 0, 0, 0] };
    state = endEncounterReducer(state, { type: "regenerate" });
    expect(state.dragonHealth).toBe(58);
  });

  it("cannot be defeated while crystals live and cannot be attacked after defeat", () => {
    let protectedState = { ...enter(), dragonHealth: 3 };
    protectedState = endEncounterReducer(protectedState, { type: "attack-dragon" });
    expect(protectedState).toMatchObject({ dragonHealth: 1, dragonDefeated: false });

    let vulnerableState = { ...protectedState, crystals: [0, 0, 0, 0, 0], dragonHealth: 5 };
    vulnerableState = endEncounterReducer(vulnerableState, { type: "attack-dragon" });
    expect(vulnerableState).toMatchObject({ dragonHealth: 0, dragonDefeated: true });
    expect(endEncounterReducer(vulnerableState, { type: "attack-dragon" })).toBe(vulnerableState);
  });
});
