import type { CSSProperties } from "react";

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeStars({
  count,
  seed,
  maxY,
  minAlpha,
  maxAlpha,
  blur,
  tint,
}: {
  count: number;
  seed: number;
  maxY: number;
  minAlpha: number;
  maxAlpha: number;
  blur: number;
  tint?: [number, number, number];
}) {
  const rand = mulberry32(seed);
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.round(rand() * 2400) - 100;
    const y = Math.round(rand() * maxY);
    const alpha = (minAlpha + rand() * (maxAlpha - minAlpha)).toFixed(2);
    const color = tint
      ? `rgba(${tint[0]}, ${tint[1]}, ${tint[2]}, ${alpha})`
      : `rgba(255, 255, 255, ${alpha})`;
    parts.push(`${x}px ${y}px ${blur}px 0 ${color}`);
  }
  return parts.join(", ");
}

const STARS_SMALL = makeStars({
  count: 150,
  seed: 7,
  maxY: 2000,
  minAlpha: 0.18,
  maxAlpha: 0.55,
  blur: 0,
});

const STARS_MEDIUM = makeStars({
  count: 70,
  seed: 42,
  maxY: 2000,
  minAlpha: 0.35,
  maxAlpha: 0.75,
  blur: 0,
  tint: [200, 240, 255],
});

const STARS_LARGE = makeStars({
  count: 26,
  seed: 99,
  maxY: 2000,
  minAlpha: 0.6,
  maxAlpha: 1,
  blur: 1,
  tint: [210, 255, 245],
});

export default function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div className="aurora aurora-1" />
      <div className="aurora aurora-2" />
      <div className="aurora aurora-3" />

      <div className="bg-grid absolute inset-0" />

      <div className="stars stars-s" style={{ "--stars": STARS_SMALL } as CSSProperties} />
      <div className="stars stars-m" style={{ "--stars": STARS_MEDIUM } as CSSProperties} />
      <div className="stars stars-l" style={{ "--stars": STARS_LARGE } as CSSProperties} />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,transparent_25%,rgba(6,7,10,0.75)_80%)]" />
      <div className="grain absolute inset-0 opacity-[0.22]" />
    </div>
  );
}
