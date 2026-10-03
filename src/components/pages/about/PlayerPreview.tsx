// Original 16x32 voxel figure drawn as SVG rects; no Mojang skin textures.
const pixels: [string, number, number, number, number][] = [
  // head: hair, face, glasses, mouth
  ["#2a1c15", 4, 0, 8, 3],
  ["#2a1c15", 4, 3, 1, 3],
  ["#2a1c15", 11, 3, 1, 3],
  ["#c48a5c", 5, 3, 6, 5],
  ["#c48a5c", 4, 6, 8, 2],
  ["#1d1f22", 5, 4, 6, 1],
  ["#f2f2f2", 6, 5, 1, 1],
  ["#f2f2f2", 9, 5, 1, 1],
  ["#26221f", 7, 5, 1, 1],
  ["#26221f", 10, 5, 1, 1],
  ["#8d5a3c", 7, 7, 2, 1],
  // hoodie with drawstrings and a pixel code glyph
  ["#3f6c32", 4, 8, 8, 12],
  ["#5c8f36", 5, 8, 6, 2],
  ["#e8e2c9", 6, 10, 1, 3],
  ["#e8e2c9", 9, 10, 1, 3],
  ["#7db74b", 6, 15, 1, 1],
  ["#7db74b", 5, 16, 1, 1],
  ["#7db74b", 6, 17, 1, 1],
  ["#7db74b", 9, 15, 1, 1],
  ["#7db74b", 10, 16, 1, 1],
  ["#7db74b", 9, 17, 1, 1],
  // arms and hands
  ["#335a29", 0, 8, 4, 10],
  ["#335a29", 12, 8, 4, 10],
  ["#c48a5c", 0, 18, 4, 2],
  ["#c48a5c", 12, 18, 4, 2],
  // legs and shoes
  ["#30353a", 4, 20, 4, 10],
  ["#262a2e", 8, 20, 4, 10],
  ["#e9e9e4", 4, 30, 4, 2],
  ["#cfcfca", 8, 30, 4, 2],
];

const PlayerPreview = () => (
  <div className="pi-player" aria-hidden>
    <svg viewBox="-2 -2 20 36" shapeRendering="crispEdges">
      <ellipse cx="8" cy="32.6" rx="8" ry="1.3" fill="rgba(0,0,0,.35)" />
      {pixels.map(([fill, x, y, width, height], index) => (
        <rect key={index} fill={fill} x={x} y={y} width={width} height={height} />
      ))}
    </svg>
  </div>
);

export default PlayerPreview;
