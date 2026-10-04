import { useEffect, useReducer, useRef, type KeyboardEvent } from "react";
import { playRewardChime } from "../../utils/rewardSound";
import {
  createInitialEndEncounterState,
  CRYSTAL_COUNT,
  CRYSTAL_MAX_INTEGRITY,
  DRAGON_MAX_HEALTH,
  DRAGON_REGEN_INTERVAL_MS,
  endEncounterReducer,
  livingCrystals,
} from "./endEncounterState";
import type { PortalState } from "./portalProgress";
import "./end-encounter.css";

const DragonArt = () => (
  <svg className="end-dragon__art" viewBox="0 0 300 132" aria-hidden="true" focusable="false">
    <g className="end-dragon__wing end-dragon__wing--left">
      <path d="M126 58 60 9 13 20l71 55z" />
      <path className="end-dragon__membrane" d="m113 58-51-36-27 5 53 39z" />
    </g>
    <g className="end-dragon__wing end-dragon__wing--right">
      <path d="m174 58 66-49 47 11-71 55z" />
      <path className="end-dragon__membrane" d="m187 58 51-36 27 5-53 39z" />
    </g>
    <path className="end-dragon__tail" d="m113 76-48 18-43-5 40 17 64-13z" />
    <path className="end-dragon__body" d="M103 55h96v38h-25v20h-48V94h-23z" />
    <path className="end-dragon__neck" d="m184 62 36-31 20 13-28 34z" />
    <path className="end-dragon__head" d="M218 29h55v31h-62V42z" />
    <path className="end-dragon__horn" d="m229 30 6-18 9 19m10-1 9-16 3 19" />
    <path className="end-dragon__eye" d="M254 40h10v6h-10z" />
    <path className="end-dragon__legs" d="M124 89h13v28h-22v-8h9zm48 0h13v20h12v8h-25z" />
  </svg>
);

const EndCity = () => (
  <div className="end-city" aria-hidden="true">
    <i /><i /><i /><i /><i />
  </div>
);

interface EndEncounterProps {
  portalState: PortalState;
  filledSockets: number;
  entryRequest?: number;
  soundEnabled?: boolean;
}

const EndEncounter = ({ portalState, filledSockets, entryRequest = 0, soundEnabled = false }: EndEncounterProps) => {
  const [state, dispatch] = useReducer(endEncounterReducer, undefined, createInitialEndEncounterState);
  const handledDefeatSound = useRef(false);
  const handledEntryRequest = useRef(0);
  const activeCrystalCount = livingCrystals(state.crystals);
  const regenerating = activeCrystalCount > 0 && state.dragonHealth < DRAGON_MAX_HEALTH && !state.dragonDefeated;
  const activateWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, action: () => void) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    action();
  };

  useEffect(() => {
    if (!state.endActive || state.dragonDefeated || activeCrystalCount === 0) return;
    const timer = window.setInterval(() => dispatch({ type: "regenerate" }), DRAGON_REGEN_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [activeCrystalCount, state.dragonDefeated, state.endActive]);

  useEffect(() => {
    if (state.hitCrystal === null && !state.dragonHit) return;
    const timer = window.setTimeout(() => dispatch({ type: "clear-effects" }), 420);
    return () => window.clearTimeout(timer);
  }, [state.burstCrystal, state.dragonHit, state.hitCrystal]);

  useEffect(() => {
    if (!state.dragonDefeated || handledDefeatSound.current) return;
    handledDefeatSound.current = true;
    if (soundEnabled) playRewardChime();
  }, [soundEnabled, state.dragonDefeated]);

  useEffect(() => {
    if (portalState !== "active" || entryRequest <= handledEntryRequest.current) return;
    handledEntryRequest.current = entryRequest;
    dispatch({ type: "enter" });
  }, [entryRequest, portalState]);

  const portalLabel = portalState === "active"
    ? "Enter the End Portal"
    : portalState === "filling"
      ? "Filling End Portal"
      : portalState === "ready"
        ? "End Portal ready. Use Portal Crystals from slot 0"
        : "End Portal locked. Collect 12 Portal Crystals";

  return (
    <section id="end-encounter" className={`end-encounter${state.endActive ? " is-active" : ""}`} aria-label="Optional End encounter">
      {!state.endActive ? (
        <div className={`end-gateway is-${portalState}`} data-portal-state={portalState}>
          <div className="end-gateway__frame" aria-hidden>
            <div className="end-gateway__sockets">
              {Array.from({ length: 12 }, (_, index) => (
                <i key={index} className={index < filledSockets ? "is-filled" : undefined} />
              ))}
            </div>
            <div className="end-gateway__portal"><i /><i /><i /><i /></div>
          </div>
          <button
            type="button"
            className="end-gateway__button"
            disabled={portalState !== "active"}
            onClick={() => dispatch({ type: "enter" })}
            aria-label={portalLabel}
          >
            <strong>END PORTAL</strong>
            <span>{portalState === "active" ? "ENTER END" : portalState === "filling" ? `${filledSockets} / 12` : portalState === "ready" ? "PRESS 0 TO FILL" : "0 / 12 SOCKETS"}</span>
          </button>
        </div>
      ) : (
        <div className={`end-arena${state.dragonDefeated ? " is-defeated" : ""}`}>
          <div className="end-bossbar">
            <div className="end-bossbar__labels">
              <strong>END DRAGON</strong>
              <span>{state.dragonHealth}%</span>
            </div>
            <div
              className="end-bossbar__track"
              role="progressbar"
              aria-label="End Dragon health"
              aria-valuemin={0}
              aria-valuemax={DRAGON_MAX_HEALTH}
              aria-valuenow={state.dragonHealth}
            >
              <span style={{ width: `${state.dragonHealth}%` }} />
            </div>
            <div className="end-bossbar__status">
              <span>Crystals: {activeCrystalCount} / {CRYSTAL_COUNT}</span>
              {regenerating && <span className="end-bossbar__regen">Regenerating</span>}
              {state.dragonDefeated && <span>Dragon defeated</span>}
            </div>
          </div>

          <div className="end-arena__scene">
            <EndCity />
            {!state.dragonDefeated && (
              <svg className="end-beams" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">
                {state.crystals.map((integrity, index) => integrity > 0 && (
                  <line key={index} className={`end-beam end-beam--${index + 1}`} x1={[90, 285, 500, 715, 910][index]} y1={[300, 235, 190, 250, 315][index]} x2="550" y2="180" />
                ))}
              </svg>
            )}

            <div className="end-pillars" aria-label="End Crystal targets">
              {state.crystals.map((integrity, index) => {
                const destroyed = integrity === 0;
                const integrityState = integrity === 3 ? "full" : integrity === 2 ? "flickering" : integrity === 1 ? "cracked" : "destroyed";
                return (
                  <div
                    className={`end-pillar end-pillar--${index + 1}${state.hitCrystal === index ? " is-targeted" : ""}`}
                    key={index}
                  >
                    <button
                      type="button"
                      className={`end-crystal is-${integrityState}`}
                      onClick={() => dispatch({ type: "attack-crystal", index })}
                      onKeyDown={(event) => activateWithKeyboard(event, () => dispatch({ type: "attack-crystal", index }))}
                      disabled={destroyed || state.dragonDefeated}
                      aria-label={`End Crystal ${index + 1}, ${integrity} of ${CRYSTAL_MAX_INTEGRITY} integrity${destroyed ? ", destroyed" : ""}`}
                    >
                      <span aria-hidden><i /></span>
                    </button>
                    {state.burstCrystal === index && <span className="end-crystal__burst" aria-hidden><i /><i /><i /><i /><i /><i /></span>}
                    <div className="end-pillar__cap" aria-hidden />
                    <div className="end-pillar__shaft" aria-hidden />
                  </div>
                );
              })}
            </div>

            {!state.dragonDefeated && (
              <button
                type="button"
                className={`end-dragon${state.dragonHit ? " is-hit" : ""}`}
                onClick={() => dispatch({ type: "attack-dragon" })}
                onKeyDown={(event) => activateWithKeyboard(event, () => dispatch({ type: "attack-dragon" }))}
                aria-label={`End Dragon, ${state.dragonHealth} percent health`}
              >
                <DragonArt />
              </button>
            )}
            {state.dragonDefeated && <div className="end-victory-pulse" aria-hidden />}
          </div>

          <p className="mc-visually-hidden" aria-live="polite" aria-atomic="true">{state.announcement}</p>
          <button type="button" className="end-return" onClick={() => dispatch({ type: "exit" })}>Return through portal</button>
        </div>
      )}
    </section>
  );
};

export default EndEncounter;
