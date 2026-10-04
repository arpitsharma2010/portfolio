import React from "react";
import "./biomes.css";

export type BiomeKind = "plains" | "forest" | "cave" | "mountains" | "badlands" | "cherry" | "taiga" | "nether";

// Original blocky scenery, drawn on a 1-unit voxel grid. Far = horizon silhouettes, structure = the biome's landmark.
const far: Record<BiomeKind, React.ReactNode> = {
  plains: <path fill="#4f7a3a" d="M8 30h10v-6l5-4 5 4v6h14v-8l6-5 6 5v8h30v-5l4-3 4 3v5h12v-7l5-4 5 4v7h6v10H8z" />,
  forest: <path fill="#24401f" d="M0 40V18h6v-8h12v8h6v-6h4v-8h14v8h4v10h8v-14h14v14h6v-6h12v6h6v-12h12v12h6v-4h10v26zM10 40v-6h4v6m24 0v-8h4v8m26 0v-8h4v8m36 0v-8h4v8" />,
  cave: <path fill="#1d2326" d="M0 0h120v4l-4 6-3-6-6 10-4-10-5 6-4-6-8 12-4-12-6 8-5-8-7 9-4-9-6 13-4-13-7 8-4-8-6 10-4-10-5 7-4-7-6 9-4-9L8 8 5 4 0 6z" />,
  mountains: (
    <>
      <path fill="#6f7f92" opacity=".7" d="M0 40V26l10-10 6 4 14-16 12 12 8-6 16 16 10-10 14 8 12-12 18 14v14z" />
      <path fill="#4e5d6d" d="M0 40V32l14-8 10 4 18-14 14 12 10-4 18 10 14-14 22 18v4z" />
      <path fill="#f3f7fa" d="M24 10l6-6 6 6-3 2-3-2-3 2zm72 2l6-6 7 6-3 2-4-2-3 2zm-54 6l4-4 4 4-2 1-2-1z" />
    </>
  ),
  badlands: <path fill="#9c4a2b" d="M0 40V22h18v-8h22v8h8v6h16V12h30v10h10v6h16v12z" />,
  cherry: <><path fill="#e59ab8" opacity=".8" d="M4 26h6v-8h-6zM5 18h4v-3h-4zM18 26h6v-8h-6zM19 18h4v-3h-4zM33 26h6v-8h-6zM34 18h4v-3h-4zM47 26h6v-8h-6zM48 18h4v-3h-4zM62 26h6v-8h-6zM63 18h4v-3h-4zM78 26h6v-8h-6zM79 18h4v-3h-4zM92 26h6v-8h-6zM93 18h4v-3h-4zM108 26h6v-8h-6zM109 18h4v-3h-4z" /><path fill="#7a4a3a" opacity=".7" d="M6.5 26h1v14h-1zM20.5 26h1v14h-1zM35.5 26h1v14h-1zM49.5 26h1v14h-1zM64.5 26h1v14h-1zM80.5 26h1v14h-1zM94.5 26h1v14h-1zM110.5 26h1v14h-1z" /></>,
  taiga: <path fill="#1f3a33" d="M10 40V34H4l6-8H6l6-8H8l6-10 6 10h-4l6 8h-4l6 8h-6v6zm40 0V32h-7l7-9h-5l7-9h-4l6-10 6 10h-4l7 9h-5l7 9h-7v8zm42 0v-6h-6l6-8h-4l6-8h-4l6-10 6 10h-4l6 8h-4l6 8h-6v6z" />,
  nether: <path fill="#3b2326" d="M0 40V20h6V8h6v14h10V14h8v12h12V4h6v18h14v-8h8v16h14V10h6v12h10v-6h8v24z" />,
};

const structures: Record<BiomeKind, { viewBox: string; art: React.ReactNode }> = {
  plains: {
    viewBox: "0 0 40 34",
    art: (
      <>
        <path fill="#8a5a32" d="M2 14h36v-3h-4V8h-4V5h-4V2H14v3h-4v3H6v3H2z" />
        <rect x="31" y="1" width="4" height="9" fill="#7d7d76" />
        <rect x="5" y="14" width="30" height="20" fill="#c49a5e" />
        <path fill="#6b4a2c" d="M5 14h3v20H5zm27 0h3v20h-3zM5 14h30v2H5z" />
        <rect x="17" y="22" width="6" height="12" fill="#5a3b22" />
        <path fill="#9fd3ea" d="M10 19h4v4h-4zm16 0h4v4h-4z" />
      </>
    ),
  },
  forest: {
    viewBox: "0 0 44 36",
    art: (
      <>
        <path fill="#4b3424" d="M0 14h44l-6-8H6z" />
        <path fill="#7a5233" d="M4 14h36v22H4z" />
        <path fill="#5d3e27" d="M4 18h36v2H4zm0 6h36v2H4zm0 6h36v2H4zM4 14h3v22H4zm33 0h3v22h-3z" />
        <rect x="18" y="24" width="8" height="12" fill="#3a271a" />
        <rect className="biome__lantern" x="10" y="20" width="4" height="5" fill="#ffc35c" />
        <rect className="biome__lantern" x="30" y="20" width="4" height="5" fill="#ffc35c" />
      </>
    ),
  },
  cave: {
    viewBox: "0 0 48 32",
    art: (
      <>
        <path fill="#7a5631" d="M6 4h4v24H6zm32 0h4v24h-4zM4 2h40v4H4z" />
        <path fill="#5d3f22" d="M10 6h28v2H10z" />
        <path fill="#8d8d8d" d="M0 27h48v1H0zm0 3h48v1H0z" />
        <path fill="#6b4a2c" d="M2 26h2v6H2zm8 0h2v6h-2zm8 0h2v6h-2zm8 0h2v6h-2zm8 0h2v6h-2zm8 0h2v6h-2z" />
        <rect x="16" y="14" width="6" height="6" fill="#5b6062" />
        <path fill="#5fe0d8" d="M17 15h2v2h-2zm3 2h1v2h-1z" />
        <rect x="26" y="16" width="6" height="6" fill="#5b6062" />
        <path fill="#f0c84a" d="M27 17h2v1h-2zm2 2h2v2h-2z" />
        <rect className="biome__ore-glow" x="21" y="9" width="6" height="5" fill="#5b6062" />
        <path className="biome__ore-glow" fill="#e0453a" d="M22 10h2v1h-2zm2 2h2v1h-2z" />
      </>
    ),
  },
  mountains: {
    viewBox: "0 0 30 48",
    art: (
      <>
        <path fill="#7a7d78" d="M7 20h16v28H7z" />
        <path fill="#5f625e" d="M7 26h16v2H7zm0 8h16v2H7zm0 8h16v2H7z" />
        <path fill="#7a5233" d="M3 16h24v4H3zm2-8h2v8H5zm18 0h2v8h-2zM4 6h22v3H4z" />
        <path fill="#f3f7fa" d="M4 5h22v2H4z" />
        <path fill="#5d3e27" d="M14 0h1v6h-1z" />
        <path fill="#d9433a" d="M15 0h6v3h-6z" />
        <rect x="13" y="38" width="5" height="10" fill="#3d2a1d" />
        <rect className="biome__lantern" x="13" y="11" width="4" height="4" fill="#ffc35c" />
      </>
    ),
  },
  badlands: {
    viewBox: "0 0 52 34",
    art: (
      <>
        <path fill="#6b4a2c" d="M4 6h3v28H4zm20 0h3v28h-3zm20 0h3v28h-3zM2 4h48v3H2z" />
        <path fill="#8a6038" d="M7 8l17 14-2 2L7 11zm38 0L27 22l2 2 16-13z" />
        <path fill="#a0753f" d="M30 22h10v10H30zm-22 4h8v8H8z" />
        <path fill="#6b4a2c" d="M30 26h10v1H30zm4-4h1v10h-1zm-26 7h8v1H8z" />
        <path fill="#8d8d8d" d="M0 32h52v1H0z" />
        <rect x="41" y="27" width="7" height="5" fill="#7d7d76" />
      </>
    ),
  },
  cherry: {
    viewBox: "0 0 56 44",
    art: (
      <>
        <path fill="#d97ea4" d="M2 16h52l-6-6H8zm16-6h20l-6-8h-8z" />
        <path fill="#efe6d6" d="M6 16h44v28H6zm16-6h12v6H22z" />
        <path fill="#7a5233" d="M6 16h44v2H6zM6 18h2v26H6zm42 0h2v26h-2z" />
        <path fill="#8c5a32" d="M10 32h12v12H10zm24 0h12v12H34z" />
        <path fill="#c94f4f" d="M11 34h2v4h-2zm4 0h2v4h-2zm20 0h2v4h-2zm6 0h2v4h-2zm-6 6h2v4h-2zm6 0h2v4h-2z" />
        <path fill="#3b6ea0" d="M13 35h1v3h-1zm6 0h2v4h-2zm19 1h2v3h-2zm5 4h2v4h-2z" />
        <path className="biome__enchant-glow" fill="#b58cf2" d="M12 21h6v7h-6zm13 0h6v7h-6zm13 0h6v7h-6zm-12-8h4v3h-4z" />
        <rect x="25" y="34" width="6" height="10" fill="#3a271a" />
      </>
    ),
  },
  taiga: {
    viewBox: "0 0 48 38",
    art: (
      <>
        <path fill="#3e2c1f" d="M0 14h48l-8-10H8z" />
        <path fill="#f3f7fa" d="M8 4h32l2 3H6zM0 14h48v2H0z" />
        <path fill="#5b3f2a" d="M4 16h40v22H4z" />
        <path fill="#4a3220" d="M4 20h40v1H4zm0 5h40v1H4zm0 5h40v1H4z" />
        <path fill="#2e2016" d="M4 16h3v22H4zm37 0h3v22h-3z" />
        <rect className="biome__lantern" x="9" y="20" width="10" height="7" fill="#f5c26b" />
        <path fill="#7a4a2a" d="M9 23h10v1H9zm4-3h1v7h-1z" />
        <rect className="biome__lantern" x="29" y="20" width="10" height="7" fill="#f5c26b" />
        <path fill="#7a4a2a" d="M29 23h10v1H29zm4-3h1v7h-1z" />
        <rect x="20" y="27" width="8" height="11" fill="#2a1d14" />
      </>
    ),
  },
  nether: {
    viewBox: "0 0 64 36",
    art: (
      <>
        <path fill="#5a2228" d="M4 4h12v32H4zm44 0h12v32H48zM0 14h64v6H0z" />
        <path fill="#3a1418" d="M4 4h2v2H4zm4 0h2v2H8zm4 0h2v2h-2zm36 0h2v2h-2zm4 0h2v2h-2zm4 0h2v2h-2zM0 17h64v1H0zm6 8h8v1H6zm44 0h8v1h-8zm-44 6h8v1H6zm44 0h8v1h-8z" />
        <path fill="#5a2228" d="M20 20h4v16h-4zm20 0h4v16h-4z" />
        <path className="biome__lava-light" fill="#ff8a2a" d="M8 9h4v3H8zm44 0h4v3h-4z" />
      </>
    ),
  },
};

const particles: Partial<Record<BiomeKind, { kind: string; count: number }[]>> = {
  forest: [{ kind: "leaf", count: 10 }],
  cave: [{ kind: "dust", count: 8 }],
  badlands: [{ kind: "sand", count: 12 }],
  cherry: [{ kind: "petal", count: 12 }],
  nether: [{ kind: "ash", count: 12 }, { kind: "pop", count: 6 }],
};

/** Decorative biome layer: aria-hidden, pointer-events none, sits behind the section's content card. */
const Biome: React.FC<{ kind: BiomeKind }> = ({ kind }) => (
  <div className={`biome biome--${kind}`} aria-hidden="true" data-testid={`biome-${kind}`}>
    <svg className="biome__far" viewBox="0 0 120 40" preserveAspectRatio="none" focusable="false">{far[kind]}</svg>
    <div className="biome__ground" />
    <svg className="biome__structure" viewBox={structures[kind].viewBox} shapeRendering="crispEdges" focusable="false">
      {structures[kind].art}
    </svg>
    {particles[kind]?.map(({ kind: particle, count }) => (
      <div key={particle} className={`biome__particles biome__particles--${particle}`}>
        {Array.from({ length: count }, (_, index) => <i key={index} style={{ "--i": index } as React.CSSProperties} />)}
      </div>
    ))}
  </div>
);

export default Biome;
