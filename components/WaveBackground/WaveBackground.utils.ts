export const mulberry32 = (seed: number) => {
  let t = seed >>> 0;
  return function rand() {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

export const makeHarmonics = (rand: () => number, count = 3) => {
    return Array.from({ length: count }).map((_, i) => ({
        a: 0.35 * Math.pow(0.7, i) * (0.6 + rand() * 0.8),
        p: rand() * Math.PI * 2,
        f: 1 + i + rand() * 0.4,
    }));
};

export const buildWavePath = ({
    width,
    height,
    baseline,
    amplitude,
    phase,
    k = 1.6,
    segments = 20,
    harmonics = [],
}: {
    width: number;
    height: number;
    baseline: number;
    amplitude: number;
    phase: number;
    k?: number;
    segments?: number;
    harmonics?: { a: number; p: number; f: number }[];
}) => {
    'worklet';
    const step = width / segments;
    let d = `M 0 ${height} L 0 ${baseline.toFixed(2)} `;
    for (let i = 0; i <= segments; i++) {
        const x = i * step;
        const t = (i / segments) * Math.PI * 2 * k + phase;
        let y = Math.sin(t);
        for (let h = 0; h < harmonics.length; h++) {
            const H = harmonics[h];
            y += H.a * Math.sin(t * H.f + H.p);
        }
        const yy = baseline + y * amplitude;
        d += `L ${x.toFixed(2)} ${yy.toFixed(2)} `;
    }
    d += `L ${width} ${height} Z`;
    return d;
};


