import React, { memo, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, { SharedValue, useAnimatedProps } from 'react-native-reanimated';
import Svg, { Path, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { Position, WaveContainer } from './WaveBackground.styles';
import { useTheme } from 'styled-components/native';
import { buildWavePath, makeHarmonics, mulberry32 } from './WaveBackground.utils';


type WaveBackgroundProps = {
  x: SharedValue<number>;
  width?: number;
  height?: number;
  position?: Position;
  layers?: number;
  baseFrequency?: number;
  segments?: number;
  seed?: number;
  colors?: string[];
  strokeColors?: string[];
  fillOpacity?: number;
  strokeOpacity?: number;

  backgroundColor?: string;
  bgGradientFrom?: string;
  bgGradientTo?: string;
  bgGradientOpacityFrom?: number;
  bgGradientOpacityTo?: number;

  bottomFadeEnabled?: boolean;
  bottomFadeStart?: number;  
  bottomFadeSize?: number; 
  bottomFadeColor?: string;        
  bottomFadeOpacityFrom?: number;   
  bottomFadeOpacityTo?: number;     
};

const AnimatedPath = Animated.createAnimatedComponent(Path);
const DEFAULT_WHITE = '#ffffff';

type LayerCfg = {
  ampBase: number;
  ampSwell: number;
  vDrift: number;
  k: number;
  phaseOffset: number;
  harmonics: { a: number; p: number; f: number }[];
  fillAlpha: number;
  strokeAlpha: number;
};

function WaveLayer({
  x,
  W,
  H,
  baseline,
  segments,
  cfg,
  fill,
  stroke,
  fillOpacity = 1,
  strokeOpacity = 0.5,
}: {
  x: SharedValue<number>;
  W: number;
  H: number;
  baseline: number;
  segments: number;
  cfg: LayerCfg;
  fill: string;
  stroke: string;
  fillOpacity?: number;
  strokeOpacity?: number;
}) {
  const animatedProps = useAnimatedProps(() => {
    const PAGE = W || 1;
    const progress = x.value / PAGE;
    const frac = progress - Math.floor(progress);
    const phase = progress * Math.PI * 2 + cfg.phaseOffset;

    const amplitude = cfg.ampBase + cfg.ampSwell * Math.sin(frac * Math.PI);
    const verticalDrift = cfg.vDrift * Math.sin(progress * Math.PI);

    const d = buildWavePath({
      width: W,
      height: H,
      baseline: baseline + verticalDrift,
      amplitude,
      phase,
      k: cfg.k,
      segments,
      harmonics: cfg.harmonics,
    });

    return { d };
  });

  return (
    <>
      <AnimatedPath
        animatedProps={animatedProps}
        fill={fill}
        fillOpacity={cfg.fillAlpha * fillOpacity}
        stroke="none"
      />
      <AnimatedPath
        animatedProps={animatedProps}
        fill="none"
        stroke={stroke}
        strokeOpacity={cfg.strokeAlpha * strokeOpacity}
        strokeWidth={2}
      />
    </>
  );
}

function WaveBackground({
  x,
  width,
  height,
  position = 'top',
  layers = 3,
  baseFrequency = 3.2,
  segments = 36,
  seed = 42,
  colors,
  strokeColors,
  fillOpacity = 1,
  strokeOpacity = 0.5,
  backgroundColor,
  bgGradientFrom,
  bgGradientTo,
  bgGradientOpacityFrom,
  bgGradientOpacityTo,
  bottomFadeEnabled = true,
  bottomFadeStart = 0.75,
  bottomFadeSize = 0.25,
  bottomFadeColor,
  bottomFadeOpacityFrom = 0,
  bottomFadeOpacityTo = 1,
}: WaveBackgroundProps) {
  const theme = useTheme();
  const { width: winW, height: winH } = useWindowDimensions();

  const W = width ?? winW;
  const H = height ?? Math.max(winH * 0.55, 280);
  const baseline = H * 0.55;

  const layerConfigs: LayerCfg[] = useMemo(() => {
    const rand = mulberry32(seed);
    return Array.from({ length: layers }).map((_, idx) => {
      const ampBase = 14 + rand() * 16;
      const ampSwell = 8 + rand() * 10;
      const vDrift = 5 + rand() * 8;
      const k = baseFrequency * (0.8 + rand() * 0.6);
      const phaseOffset = rand() * Math.PI * 2;
      const harmonics = makeHarmonics(rand, 3 + Math.floor(rand() * 2));
      const depth = (idx + 1) / layers;
      const fillAlpha = 0.65 * (0.35 + 0.65 * depth);
      const strokeAlpha = 0.5 * (0.25 + 0.75 * depth);
      return { ampBase, ampSwell, vDrift, k, phaseOffset, harmonics, fillAlpha, strokeAlpha };
    });
  }, [layers, baseFrequency, seed]);

  const palette = useMemo(() => {
    const base =
      (theme as any)?.invertedBackground ||
      (theme as any)?.textPrimary ||
      DEFAULT_WHITE;
    const fallback = Array.from({ length: layers }).map(() => base);
    const user = colors && colors.length ? colors : fallback;
    return user.slice(0, layers);
  }, [colors, layers, theme]);

  const strokePalette = useMemo(() => {
    const fallback = Array.from({ length: layers }).map(() => DEFAULT_WHITE);
    const user = strokeColors && strokeColors.length ? strokeColors : fallback;
    return user.slice(0, layers);
  }, [strokeColors, layers]);

  const bgSolid =
    backgroundColor ?? (theme as any)?.background ?? '#F2F2F2';

  const gradFrom =
    bgGradientFrom ?? (theme as any)?.textPrimary ?? DEFAULT_WHITE;
  const gradTo =
    bgGradientTo ?? (theme as any)?.textPrimary ?? DEFAULT_WHITE;
  const gradOpFrom = bgGradientOpacityFrom ?? 0.12;
  const gradOpTo = bgGradientOpacityTo ?? 0;

  // Bottom fade geometry
  const fadeY = Math.min(Math.max(bottomFadeStart, 0), 1) * H;
  const fadeH = Math.min(Math.max(bottomFadeSize, 0), 1) * H;
  const fadeColor = bottomFadeColor ?? bgSolid;

  return (
    <WaveContainer $position={position} pointerEvents="none">
      <Svg width={W} height={H}>
        <Defs>
          <LinearGradient id="bgGrad" x1="0" y1="0" x2="0" y2={H}>
            <Stop offset="0" stopOpacity={gradOpFrom} stopColor={gradFrom} />
            <Stop offset="1" stopOpacity={gradOpTo} stopColor={gradTo} />
          </LinearGradient>

          {/* Bottom fade gradient */}
          <LinearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={fadeColor} stopOpacity={bottomFadeOpacityFrom} />
            <Stop offset="1" stopColor={fadeColor} stopOpacity={bottomFadeOpacityTo} />
          </LinearGradient>
        </Defs>

        {/* Solid background replaces default grey */}
        <Rect x="0" y="0" width={W} height={H} fill={bgSolid} />
        {/* Soft overlay to blend waves */}
        <Rect x="0" y="0" width={W} height={H} fill="url(#bgGrad)" />

        {layerConfigs.map((cfg, idx) => (
          <WaveLayer
            key={`wave-${idx}`}
            x={x}
            W={W}
            H={H}
            baseline={baseline}
            segments={segments}
            cfg={cfg}
            fill={palette[idx] || DEFAULT_WHITE}
            stroke={strokePalette[idx] || DEFAULT_WHITE}
            fillOpacity={fillOpacity}
            strokeOpacity={strokeOpacity}
          />
        ))}

        {bottomFadeEnabled && fadeH > 0 ? (
          <Rect x="0" y={Math.min(fadeY, H)} width={W} height={Math.max(0, Math.min(fadeH, H - fadeY))} fill="url(#bottomFade)" />
        ) : null}
      </Svg>
    </WaveContainer>
  );
}

export default memo(WaveBackground);
