/**
 * Original reward chime, synthesised with Web Audio (no audio asset): three quick ascending triangle notes
 * with a soft octave sparkle on the last, about half a second in total.
 */
const NOTES = [784, 1047, 1568]; // G5, C6, G6
const STEP = .085;
const STORAGE_KEY = "rewardSound";

let context: AudioContext | null = null;

/** Create/resume the context. Call only from a real user gesture, where browsers allow audio to start. */
export const unlockAudio = async () => {
  try {
    context ??= new AudioContext();
    if (context.state === "suspended") await context.resume();
    return context.state === "running";
  } catch {
    return false;
  }
};

/** Plays once if audio is already unlocked; otherwise does nothing (nothing is queued for later). */
export const playRewardChime = () => {
  if (!context || context.state !== "running") return false;
  try {
    const start = context.currentTime + .01;
    NOTES.forEach((frequency, index) => {
      const at = start + index * STEP;
      const last = index === NOTES.length - 1;
      [[frequency, "triangle", .16], ...(last ? [[frequency * 2, "sine", .05]] : [])].forEach(([hz, type, peak]) => {
        const oscillator = context!.createOscillator();
        const gain = context!.createGain();
        oscillator.type = type as OscillatorType;
        oscillator.frequency.setValueAtTime(hz as number, at);
        gain.gain.setValueAtTime(.0001, at);
        gain.gain.exponentialRampToValueAtTime(peak as number, at + .012);
        gain.gain.exponentialRampToValueAtTime(.0001, at + (last ? .38 : .14));
        oscillator.connect(gain).connect(context!.destination);
        oscillator.start(at);
        oscillator.stop(at + (last ? .4 : .16));
      });
    });
    return true;
  } catch {
    return false;
  }
};

/** A quieter, original two-note pickup tick for Portal Crystals. */
export const playPortalCrystalTone = () => {
  if (!context || context.state !== "running") return false;
  try {
    const start = context.currentTime + .01;
    [660, 880].forEach((frequency, index) => {
      const at = start + index * .055;
      const oscillator = context!.createOscillator();
      const gain = context!.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, at);
      gain.gain.setValueAtTime(.0001, at);
      gain.gain.exponentialRampToValueAtTime(.055, at + .008);
      gain.gain.exponentialRampToValueAtTime(.0001, at + .11);
      oscillator.connect(gain).connect(context!.destination);
      oscillator.start(at);
      oscillator.stop(at + .12);
    });
    return true;
  } catch {
    return false;
  }
};

export const readSoundPreference = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
};

export const writeSoundPreference = (enabled: boolean) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  } catch {
    // Private mode or blocked storage: the toggle still works for this visit.
  }
};
