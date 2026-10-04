import { afterEach, describe, expect, it, vi } from "vitest";

const loadModule = async () => {
  vi.resetModules();
  return import("../rewardSound");
};

afterEach(() => {
  vi.unstubAllGlobals();
  window.localStorage.clear();
});

describe("reward sound", () => {
  it("does nothing before a gesture has unlocked audio", async () => {
    const { playRewardChime } = await loadModule();
    expect(playRewardChime()).toBe(false);
  });

  it("plays three ascending notes once audio is running", async () => {
    const frequencies: number[] = [];
    const node = () => ({ connect: vi.fn((next) => next), start: vi.fn(), stop: vi.fn(), type: "", frequency: { setValueAtTime: vi.fn((hz) => frequencies.push(hz)) }, gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() } });
    vi.stubGlobal("AudioContext", class { state = "running"; currentTime = 0; destination = {}; createOscillator = node; createGain = node; resume = vi.fn(); });
    const { playRewardChime, unlockAudio } = await loadModule();
    await unlockAudio();
    expect(playRewardChime()).toBe(true);
    const notes = frequencies.filter((_, index) => index < 3);
    expect(notes).toEqual([...notes].sort((a, b) => a - b));
  });

  it("plays the smaller two-note Portal Crystal pickup through the same unlocked context", async () => {
    const frequencies: number[] = [];
    const node = () => ({ connect: vi.fn((next) => next), start: vi.fn(), stop: vi.fn(), type: "", frequency: { setValueAtTime: vi.fn((hz) => frequencies.push(hz)) }, gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() } });
    vi.stubGlobal("AudioContext", class { state = "running"; currentTime = 0; destination = {}; createOscillator = node; createGain = node; resume = vi.fn(); });
    const { playPortalCrystalTone, unlockAudio } = await loadModule();
    await unlockAudio();
    expect(playPortalCrystalTone()).toBe(true);
    expect(frequencies).toEqual([660, 880]);
  });

  it("swallows AudioContext failures", async () => {
    vi.stubGlobal("AudioContext", class { constructor() { throw new Error("blocked"); } });
    const { playRewardChime, unlockAudio } = await loadModule();
    await expect(unlockAudio()).resolves.toBe(false);
    expect(playRewardChime()).toBe(false);
  });

  it("persists the mute preference, defaulting to on", async () => {
    const { readSoundPreference, writeSoundPreference } = await loadModule();
    expect(readSoundPreference()).toBe(true);
    writeSoundPreference(false);
    expect(readSoundPreference()).toBe(false);
    writeSoundPreference(true);
    expect(readSoundPreference()).toBe(true);
  });
});
