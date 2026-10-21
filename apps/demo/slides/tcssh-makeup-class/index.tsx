import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  Step,
  Steps,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from 'react';
import closingPhoto from './assets/closing.jpg';
import colorWheel from './assets/color-wheel.png';
import concealer from './assets/concealer.png';
import concealerLiquid from './assets/concealer-liquid.png';
import concealerPalette from './assets/concealer-palette.png';
import concealerStick from './assets/concealer-stick.png';
import cosmeticsAct from './assets/cosmetics-act.jpg';
import foundation from './assets/foundation.png';
import foundationCompact from './assets/foundation-compact.png';
import foundationCushion from './assets/foundation-cushion.png';
import foundationLiquid from './assets/foundation-liquid.png';
import foundationStick from './assets/foundation-stick.png';
import linerGel from './assets/liner-gel.png';
import linerLiquid from './assets/liner-liquid.png';
import linerPencil from './assets/liner-pencil.png';
import loosePowder from './assets/loose-powder.jpg';
import pressedPowder from './assets/pressed-powder.png';
import primer from './assets/primer.png';
import primerSamples from './assets/primer-samples.png';
import qrInstagram from './assets/qr-instagram.png';
import qrSurvey from './assets/qr-survey.png';
import skincare from './assets/skincare.jpg';
import speakerPhoto from './assets/speaker.jpg';
import toolBrush from './assets/tool-brush.png';
import toolCushionPuff from './assets/tool-cushion-puff.png';
import toolPuff from './assets/tool-puff.png';
import toolSponge from './assets/tool-sponge.png';
import tools from './assets/tools.png';

export const design: DesignSystem = {
  palette: { bg: '#1A1C2C', text: '#F4F4F4', accent: '#FFCD75' },
  fonts: {
    display: '"Press Start 2P", "Cubic 11", monospace',
    body: '"Cubic 11", "Jersey 15", monospace',
  },
  typeScale: { hero: 110, body: 44 },
  radius: 0,
};

const C = {
  navy: '#1A1C2C',
  plum: '#5D275D',
  red: '#B13E53',
  orange: '#EF7D57',
  yellow: '#FFCD75',
  lime: '#A7F070',
  green: '#38B764',
  teal: '#257179',
  deep: '#29366F',
  blue: '#3B5DC9',
  sky: '#41A6F6',
  cyan: '#73EFF7',
  white: '#F4F4F4',
  silver: '#94B0C2',
  slate: '#566C86',
  ink: '#333C57',
  pink: '#F4A6B8',
  skin: '#F4C29B',
} as const;

const DARK = '#0E0F1A';

const PIX: Record<string, string> = {
  '0': C.navy,
  '1': C.plum,
  '2': C.red,
  '3': C.orange,
  '4': C.yellow,
  '5': C.lime,
  '6': C.green,
  '7': C.teal,
  '8': C.deep,
  '9': C.blue,
  a: C.sky,
  b: C.cyan,
  c: C.white,
  d: C.silver,
  e: C.slate,
  f: C.ink,
  p: C.pink,
  s: C.skin,
};

const P = 8;

const SLIDE_ID = 'tcssh-makeup-class';
const CUBIC_URL = new URL('./assets/cubic-11.woff2', import.meta.url).href;
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Jersey+15&family=Press+Start+2P&family=Silkscreen&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;
const CSS = `
@font-face { font-family: "Cubic 11"; src: url("${CUBIC_URL}") format("woff2"); font-display: swap; }
@keyframes mk-bob { 0%, 49.9% { transform: translateY(0) } 50%, 100% { transform: translateY(-8px) } }
@keyframes mk-blink { 0%, 49.9% { opacity: 1 } 50%, 100% { opacity: 0 } }
@keyframes mk-on { from { opacity: 0 } to { opacity: 1 } }
@keyframes mk-fill { from { transform: scaleX(0) } to { transform: none } }
@keyframes mk-flicker { 0%, 100% { opacity: 1 } 20% { opacity: 0.8 } 45% { opacity: 1 } 70% { opacity: 0.88 } }
@keyframes mk-tw { 0%, 69.9% { opacity: 1 } 70%, 100% { opacity: 0.2 } }
@keyframes mk-toast { from { opacity: 0; transform: translateX(48px) } to { opacity: 1; transform: none } }
.mk-live [data-osd-step="revealed"] .mk-in { animation: mk-toast 320ms steps(4, end) both }
@media (prefers-reduced-motion: reduce) {
  .mk-m, .mk-in { animation: none !important }
}
`;

if (typeof document !== 'undefined') {
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (link.href !== FONT_HREF) link.href = FONT_HREF;

  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  if (style.textContent !== CSS) style.textContent = CSS;
}

const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const HOLD: Keyframe[] = [{ opacity: 1 }, { opacity: 1 }];

export const transition: SlideTransition = {
  duration: 240,
  exit: { duration: 240, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 240,
    easing: 'steps(4, end)',
    keyframes: [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const abs = (left: number, top: number, extra?: CSSProperties): CSSProperties => ({
  position: 'absolute',
  left,
  top,
  ...extra,
});

const snap = (v: number) => Math.round(v / P) * P;

const useMotion = () => {
  const live = useIsActivePage();
  return (animation: string): CSSProperties => (live ? { animation } : {});
};

const DISPLAY: CSSProperties = {
  fontFamily: 'var(--osd-font-display)',
  fontWeight: 400,
  lineHeight: 1,
  margin: 0,
  whiteSpace: 'nowrap',
};

const PIXEL_TC: CSSProperties = {
  fontFamily: '"Cubic 11", monospace',
  fontWeight: 400,
  lineHeight: 1,
  margin: 0,
  whiteSpace: 'nowrap',
};

const LABEL: CSSProperties = {
  fontFamily: '"Silkscreen", "Cubic 11", monospace',
  fontSize: 22,
  lineHeight: 1,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  whiteSpace: 'nowrap',
};

const notch = (n: number) =>
  `polygon(${n}px 0, calc(100% - ${n}px) 0, calc(100% - ${n}px) ${n}px, 100% ${n}px, 100% calc(100% - ${n}px), calc(100% - ${n}px) calc(100% - ${n}px), calc(100% - ${n}px) 100%, ${n}px 100%, ${n}px calc(100% - ${n}px), 0 calc(100% - ${n}px), 0 ${n}px, ${n}px ${n}px)`;

const LIPSTICK = [
  '...22..',
  '..222..',
  '..2222.',
  '..2222.',
  '..2222.',
  '.ddddd.',
  '.dcccd.',
  '.ddddd.',
  '.fffff.',
  '.fefef.',
  '.fffff.',
  '.fefef.',
  '.fffff.',
  '.fffff.',
];

const COMPACT = [
  '..eeeeeeee..',
  '.ebbbbbbbbe.',
  '.ebcbbbbbbe.',
  '.ebbbbbbbbe.',
  '..eeeeeeee..',
  '..dddddddd..',
  '.dppppppppd.',
  '.dpcppppppd.',
  '.dppppppppd.',
  '..dddddddd..',
];

const BRUSH = [
  '.ppp.',
  'ppppp',
  'ppppp',
  '.ppp.',
  '.ddd.',
  '.ddd.',
  '..1..',
  '..1..',
  '..1..',
  '..1..',
  '..1..',
  '..1..',
];

const SPARKLE = ['..4..', '..4..', '44c44', '..4..', '..4..'];

const HEART = ['.22.22.', '2c22222', '2222222', '.22222.', '..222..', '...2...'];

const TROPHY = [
  '.44444444.',
  '4.c44443.4',
  '4.c44443.4',
  '.4c444434.',
  '..444443..',
  '...4443...',
  '....43....',
  '....43....',
  '..444443..',
  '..333333..',
];

const PINE = [
  '....7....',
  '...777...',
  '..77777..',
  '.7777777.',
  '...777...',
  '..77777..',
  '.7777777.',
  '777777777',
  '..77777..',
  '.7777777.',
  '777777777',
  '....8....',
  '....8....',
];

const CHECK = ['......5', '.....55', '5...55.', '55.55..', '.555...', '..5....'];

const ARROW_RIGHT = ['c...', 'cc..', 'ccc.', 'cccc', 'ccc.', 'cc..', 'c...'];

const ARROW_DOWN = ['ccccccc', '.ccccc.', '..ccc..', '...c...'];

const ARROW_UP = ['...c...', '..ccc..', '.ccccc.', 'ccccccc'];

const DOT = ['.cc.', 'cccc', 'cccc', '.cc.'];

type SpriteProps = {
  art: readonly string[];
  px?: number;
  x?: number;
  y?: number;
  swap?: Record<string, string>;
  style?: CSSProperties;
};

const Sprite = ({ art, px = P, x, y, swap, style }: SpriteProps) => {
  const w = art[0].length;
  const h = art.length;
  const cells: ReactNode[] = [];
  for (let j = 0; j < h; j++) {
    const row = art[j];
    let i = 0;
    while (i < w) {
      const ch = row[i];
      if (ch === '.' || ch === undefined) {
        i++;
        continue;
      }
      let k = i + 1;
      while (k < w && row[k] === ch) k++;
      cells.push(
        <rect
          key={`${i}:${j}`}
          x={i}
          y={j}
          width={k - i}
          height={1}
          fill={swap?.[ch] ?? PIX[ch] ?? C.white}
        />,
      );
      i = k;
    }
  }
  return (
    <svg
      width={w * px}
      height={h * px}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={{
        display: 'block',
        ...(x !== undefined && y !== undefined ? abs(x, y) : {}),
        ...style,
      }}
    >
      {cells}
    </svg>
  );
};

const Bob = ({
  x,
  y,
  delay = 0,
  period = 1.2,
  children,
}: {
  x: number;
  y: number;
  delay?: number;
  period?: number;
  children: ReactNode;
}) => {
  const m = useMotion();
  return (
    <div
      className="mk-m"
      style={{ ...abs(x, y), ...m(`mk-bob ${period}s steps(1, end) ${delay}s infinite`) }}
    >
      {children}
    </div>
  );
};

const LightPool = ({
  cx,
  cy,
  radii,
  alphas,
  color = C.yellow,
}: {
  cx: number;
  cy: number;
  radii: number[];
  alphas: number[];
  color?: string;
}) => {
  const m = useMotion();
  const R = Math.max(...radii);
  const rows: ReactNode[] = [];
  for (let ri = 0; ri < radii.length; ri++) {
    const r = radii[ri];
    const n = Math.ceil(r / P);
    for (let j = -n; j < n; j++) {
      const yc = (j + 0.5) * P;
      if (Math.abs(yc) >= r) continue;
      const hw = Math.floor(Math.sqrt(r * r - yc * yc) / P) * P;
      if (hw <= 0) continue;
      rows.push(
        <rect
          key={`${ri}:${j}`}
          x={R - hw}
          y={R + j * P}
          width={hw * 2}
          height={P}
          fill={color}
          fillOpacity={alphas[ri]}
        />,
      );
    }
  }
  return (
    <svg
      width={R * 2}
      height={R * 2}
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={abs(cx - R, cy - R, { pointerEvents: 'none' })}
    >
      <g className="mk-m" style={m('mk-flicker 1.6s steps(1, end) infinite')}>
        {rows}
      </g>
    </svg>
  );
};

const Starfield = ({
  seed = 7,
  count = 110,
  avoid = [],
}: {
  seed?: number;
  count?: number;
  avoid?: [number, number, number, number][];
}) => {
  const live = useIsActivePage();
  let s = seed;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  const stars: ReactNode[] = [];
  for (let n = 0; n < count; n++) {
    const x = Math.floor(rnd() * 240) * P;
    const y = Math.floor(rnd() * 135) * P;
    const r = rnd();
    const size = r > 0.86 ? P : P / 2;
    const fill = r > 0.86 ? C.white : r > 0.5 ? C.silver : C.slate;
    if (
      avoid.some(([ax, ay, aw, ah]) => x >= ax - P && x <= ax + aw && y >= ay - P && y <= ay + ah)
    )
      continue;
    const tw = live && n % 6 === 0;
    stars.push(
      <rect
        key={n}
        x={x}
        y={y}
        width={size}
        height={size}
        fill={fill}
        className="mk-m"
        style={
          tw
            ? {
                animation: `mk-tw ${1.4 + (n % 5) * 0.35}s steps(1, end) ${(n % 4) * 0.4}s infinite`,
              }
            : undefined
        }
      />,
    );
    if (r > 0.97) {
      stars.push(
        <rect key={`${n}h`} x={x - P} y={y} width={P * 3} height={P} fill={C.pink} opacity={0.5} />,
        <rect key={`${n}v`} x={x} y={y - P} width={P} height={P * 3} fill={C.pink} opacity={0.5} />,
      );
    }
  }
  return (
    <svg
      width={1920}
      height={1080}
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={abs(0, 0, { pointerEvents: 'none' })}
    >
      {stars}
    </svg>
  );
};

const ridge = (peaks: [number, number, number][], base: number, step = 16) => {
  let d = `M 0 ${base}`;
  for (let x = 0; x < 1920; x += step) {
    let h = 0;
    for (const [px, ph, sl] of peaks) h = Math.max(h, ph - Math.abs(x + step / 2 - px) * sl);
    d += ` V ${base - snap(Math.max(0, h))} H ${x + step}`;
  }
  return `${d} V ${base} Z`;
};

const FAR_PEAKS: [number, number, number][] = [
  [120, 216, 0.7],
  [470, 296, 0.75],
  [760, 184, 0.6],
  [1240, 312, 0.72],
  [1560, 208, 0.6],
  [1840, 272, 0.7],
];

const NEAR_PEAKS: [number, number, number][] = [
  [80, 120, 0.3],
  [520, 96, 0.25],
  [980, 72, 0.2],
  [1420, 128, 0.28],
  [1880, 104, 0.3],
];

const Pine = ({ x, y, tone = 'mid' }: { x: number; y: number; tone?: 'mid' | 'far' }) => (
  <Sprite
    art={PINE}
    x={x}
    y={y}
    swap={tone === 'far' ? { '7': C.deep, '8': C.ink } : { '7': C.teal, '8': C.plum }}
  />
);

const GROUND = 880;

const Landscape = () => (
  <>
    <svg
      width={1920}
      height={GROUND}
      shapeRendering="crispEdges"
      aria-hidden="true"
      style={abs(0, 0, { pointerEvents: 'none' })}
    >
      <path d={ridge(FAR_PEAKS, GROUND)} fill={C.slate} />
      <path d={ridge(FAR_PEAKS, GROUND + P)} fill={C.ink} />
      <path d={ridge(NEAR_PEAKS, GROUND)} fill={C.blue} />
      <path d={ridge(NEAR_PEAKS, GROUND + P)} fill={C.deep} />
    </svg>
    <Pine x={24} y={GROUND - 104} />
    <Pine x={136} y={GROUND - 104} />
    <Pine x={248} y={GROUND - 104} />
    <Pine x={480} y={GROUND - 104} tone="far" />
    <Pine x={1440} y={GROUND - 104} tone="far" />
    <Pine x={1696} y={GROUND - 104} />
    <Pine x={1808} y={GROUND - 104} />
    <div style={abs(0, GROUND, { width: 1920, height: P, background: C.lime })} />
    <div style={abs(0, GROUND + P, { width: 1920, height: P * 2, background: C.green })} />
    <div
      style={abs(0, GROUND + P * 3, {
        width: 1920,
        height: 1080 - GROUND - P * 3,
        background: C.ink,
      })}
    />
    <div
      style={abs(0, GROUND + P * 3, {
        width: 1920,
        height: P,
        background: `repeating-linear-gradient(90deg, ${C.teal} 0 8px, transparent 8px 24px, ${C.teal} 24px 32px, transparent 32px 56px)`,
        opacity: 0.6,
      })}
    />
  </>
);

const Screen = ({
  children,
  hud = true,
  stars = false,
  avoid,
}: {
  children: ReactNode;
  hud?: boolean;
  stars?: boolean;
  avoid?: [number, number, number, number][];
}) => {
  const live = useIsActivePage();
  return (
    <div
      className={live ? 'mk-live' : undefined}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--osd-bg)',
        color: 'var(--osd-text)',
        fontFamily: 'var(--osd-font-body)',
      }}
    >
      {stars && <Starfield avoid={avoid} />}
      {children}
      {hud && <Hud />}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'repeating-linear-gradient(180deg, rgba(0,0,0,0) 0 4px, rgba(0,0,0,0.08) 4px 8px)',
          zIndex: 30,
        }}
      />
    </div>
  );
};

const Hud = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <>
      <div style={abs(120, 1016, { ...LABEL, color: C.slate, display: 'flex', gap: 16 })}>
        <span style={{ color: C.red }}>♥♥♥</span>
        <span>現代視覺文化同人社 / 基礎化妝課程</span>
      </div>
      <div style={{ ...LABEL, position: 'absolute', right: 120, top: 1016, color: C.slate }}>
        Stage{' '}
        <span style={{ color: C.silver }}>
          {String(current).padStart(2, '0')}/{String(total).padStart(2, '0')}
        </span>
      </div>
    </>
  );
};

const Kicker = ({ world, children }: { world: string; children: ReactNode }) => (
  <div
    style={abs(120, 104, {
      ...LABEL,
      color: 'var(--osd-accent)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    })}
  >
    <span style={{ background: 'var(--osd-accent)', color: C.navy, padding: '5px 10px' }}>
      World {world}
    </span>
    <span>{children}</span>
  </div>
);

const Title = ({
  children,
  color = C.white,
  shadow = C.plum,
}: {
  children: ReactNode;
  color?: string;
  shadow?: string;
}) => (
  <h2
    style={{
      ...PIXEL_TC,
      ...abs(120, 152),
      fontSize: 66,
      color,
      textShadow: `6px 6px 0 ${shadow}`,
    }}
  >
    {children}
  </h2>
);

const Meta = ({ children }: { children: ReactNode }) => (
  <div style={{ ...LABEL, position: 'absolute', right: 120, top: 184, color: C.silver }}>
    {children}
  </div>
);

const PixelBox = ({
  x,
  y,
  w,
  h,
  fill = C.deep,
  edge = C.white,
  shade = true,
  children,
}: {
  x?: number;
  y?: number;
  w: number;
  h: number;
  fill?: string;
  edge?: string;
  shade?: boolean;
  children?: ReactNode;
}) => (
  <div
    style={{
      ...(x !== undefined && y !== undefined ? abs(x, y) : { position: 'relative' }),
      width: w,
      height: h,
      flex: 'none',
    }}
  >
    {shade && (
      <div
        style={{
          position: 'absolute',
          left: P,
          top: P,
          width: w,
          height: h,
          background: 'rgba(0,0,0,0.5)',
          clipPath: notch(P),
        }}
      />
    )}
    <div style={{ position: 'absolute', inset: 0, background: edge, clipPath: notch(P) }} />
    <div
      style={{
        position: 'absolute',
        inset: P,
        background: fill,
        boxShadow: `inset 0 ${P}px 0 rgba(255,255,255,0.07), inset 0 -${P}px 0 rgba(0,0,0,0.22)`,
      }}
    />
    <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
  </div>
);

// Downsampling into a tiny canvas and upscaling with `pixelated` is what turns the
// product photos into sprites; CSS alone can't sample an <img> at a lower resolution.
const PixelPhoto = ({
  src,
  w,
  h,
  px = 2,
  bg = C.white,
  cover = false,
  zoom = 1,
  turn = false,
}: {
  src: string;
  w: number;
  h: number;
  px?: number;
  bg?: string;
  cover?: boolean;
  zoom?: number;
  turn?: boolean;
}) => {
  const ref = useRef<HTMLCanvasElement>(null);
  const cw = Math.round(w / px);
  const ch = Math.round(h / px);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let alive = true;
    const img = new Image();
    img.onload = () => {
      if (!alive) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cw, ch);
      const iw = turn ? img.naturalHeight : img.naturalWidth;
      const ih = turn ? img.naturalWidth : img.naturalHeight;
      const fit = cover ? Math.max : Math.min;
      const scale = fit(cw / iw, ch / ih) * zoom;
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.imageSmoothingQuality = 'high';
      ctx.save();
      ctx.translate(cw / 2, ch / 2);
      if (turn) ctx.rotate(Math.PI / 2);
      ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);
      ctx.restore();
      canvas.dataset.drawn = '';
    };
    img.src = src;
    return () => {
      alive = false;
    };
  }, [src, cw, ch, bg, cover, zoom, turn]);
  return (
    <div data-waitfor="canvas[data-drawn]" style={{ width: w, height: h, flex: 'none' }}>
      <canvas
        ref={ref}
        width={cw}
        height={ch}
        style={{ display: 'block', width: w, height: h, imageRendering: 'pixelated' }}
      />
    </div>
  );
};

const REVEAL_LEVELS = [48, 32, 24, 16, 12, 8, 6, 4, 3, 2];

const RevealPhoto = ({ src, w, h }: { src: string; w: number; h: number }) => {
  const live = useIsActivePage();
  const ref = useRef<HTMLCanvasElement>(null);
  const [sharp, setSharp] = useState(!live);
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!live || reduced) {
      setSharp(true);
      return;
    }
    setSharp(false);
    let level = 0;
    let timer: number | undefined;
    const img = new Image();
    const draw = () => {
      const canvas = ref.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;
      const px = REVEAL_LEVELS[level];
      const cw = Math.max(1, Math.round(w / px));
      const ch = Math.max(1, Math.round(h / px));
      canvas.width = cw;
      canvas.height = ch;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const dw = img.naturalWidth * scale;
      const dh = img.naturalHeight * scale;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    };
    img.onload = () => {
      draw();
      timer = window.setInterval(() => {
        level++;
        if (level >= REVEAL_LEVELS.length) {
          window.clearInterval(timer);
          setSharp(true);
          return;
        }
        draw();
      }, 130);
    };
    img.src = src;
    return () => {
      img.onload = null;
      window.clearInterval(timer);
    };
  }, [live, src, w, h]);
  return (
    <div style={{ position: 'relative', width: w, height: h, flex: 'none' }}>
      <img src={src} alt="" style={{ display: 'block', width: w, height: h, objectFit: 'cover' }} />
      {!sharp && (
        <canvas
          ref={ref}
          style={{
            position: 'absolute',
            inset: 0,
            width: w,
            height: h,
            background: C.ink,
            imageRendering: 'pixelated',
          }}
        />
      )}
    </div>
  );
};

const SegBar = ({
  x,
  y,
  value,
  max = 10,
  w = 312,
  h = 24,
  color,
  delay = 0,
}: {
  x: number;
  y: number;
  value: number;
  max?: number;
  w?: number;
  h?: number;
  color: string;
  delay?: number;
}) => {
  const m = useMotion();
  const pitch = (w + P) / max;
  const seg = pitch - P;
  const bg = (c: string) =>
    `repeating-linear-gradient(90deg, ${c} 0 ${seg}px, transparent ${seg}px ${pitch}px)`;
  return (
    <div style={abs(x, y, { width: w, height: h })}>
      <div style={{ position: 'absolute', inset: 0, background: bg(C.ink) }} />
      <div
        className="mk-m"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: h,
          width: pitch * value - P,
          background: bg(color),
          transformOrigin: '0 50%',
          ...m(`mk-fill 600ms steps(${value}, end) ${delay}ms both`),
        }}
      />
    </div>
  );
};

const Chip = ({
  children,
  bg = C.yellow,
  color = C.navy,
  size = 33,
}: {
  children: ReactNode;
  bg?: string;
  color?: string;
  size?: number;
}) => (
  <span
    style={{
      ...PIXEL_TC,
      display: 'inline-block',
      fontSize: size,
      background: bg,
      color,
      padding: '8px 16px',
    }}
  >
    {children}
  </span>
);

const Typewriter = ({
  text,
  start = 0,
  cps = 24,
}: {
  text: string;
  start?: number;
  cps?: number;
}) => {
  const live = useIsActivePage();
  const chars = Array.from(text);
  const step = 1000 / cps;
  const end = Math.round(start + chars.length * step);
  const cursor = (
    <span
      className="mk-m"
      style={{
        display: 'inline-block',
        width: '0.45em',
        height: '0.85em',
        marginLeft: 8,
        verticalAlign: '-0.08em',
        background: 'var(--osd-accent)',
        animation: live ? `mk-blink 1s steps(1, end) ${end}ms infinite` : undefined,
      }}
    />
  );
  if (!live)
    return (
      <span>
        {text}
        {cursor}
      </span>
    );
  return (
    <span>
      {chars.map((ch, i) => (
        <span
          key={i}
          className="mk-m"
          style={{ animation: `mk-on 1ms steps(1, end) ${Math.round(start + i * step)}ms both` }}
        >
          {ch}
        </span>
      ))}
      {cursor}
    </span>
  );
};

const Blink = ({ children, period = 1.1 }: { children: ReactNode; period?: number }) => {
  const m = useMotion();
  return (
    <span
      className="mk-m"
      style={{ display: 'inline-flex', ...m(`mk-blink ${period}s steps(1, end) infinite`) }}
    >
      {children}
    </span>
  );
};

const TabChip = ({ world, label, on }: { world: string; label: string; on: boolean }) => (
  <PixelBox w={208} h={80} fill={on ? C.yellow : C.ink} edge={on ? C.white : C.slate} shade={on}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        color: on ? C.navy : C.slate,
      }}
    >
      <span style={{ ...LABEL, fontSize: 18, color: 'inherit' }}>W{world}</span>
      <span style={{ ...PIXEL_TC, fontSize: 33 }}>{label}</span>
    </div>
  </PixelBox>
);

const Tabs = ({ active }: { active: 'base' | 'color' }) => (
  <div style={{ position: 'absolute', right: 120, top: 136, display: 'flex', gap: 24 }}>
    <TabChip world="2" label="底妝" on={active === 'base'} />
    <TabChip world="3" label="彩妝" on={active === 'color'} />
  </div>
);

const TitleScreen = ({
  top,
  world,
  title,
  sub,
}: {
  top: ReactNode;
  world?: string;
  title: string;
  sub?: string;
}) => {
  const offset = world ? 40 : 0;
  return (
    <Screen hud={false} stars avoid={[[240, 80, 1440, 480]]}>
      <Landscape />
      <LightPool
        cx={960}
        cy={800}
        radii={[296, 216, 136]}
        alphas={[0.05, 0.07, 0.1]}
        color={C.pink}
      />
      <div
        style={abs(120, 96, {
          ...LABEL,
          fontSize: 24,
          width: 1680,
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        {top}
      </div>
      {world && (
        <div
          style={{
            ...DISPLAY,
            ...abs(0, 200, { width: 1920, textAlign: 'center' }),
            fontSize: 32,
            color: C.cyan,
            textShadow: `4px 4px 0 ${C.deep}`,
          }}
        >
          {world}
        </div>
      )}
      <h1
        style={{
          ...PIXEL_TC,
          ...abs(0, 232 + offset, { width: 1920, textAlign: 'center' }),
          fontSize: 'var(--osd-size-hero)',
          color: 'var(--osd-accent)',
          textShadow: `8px 8px 0 ${C.red}, 16px 16px 0 ${C.plum}`,
        }}
      >
        {title}
      </h1>
      {sub && (
        <div
          style={{
            ...PIXEL_TC,
            ...abs(0, 384 + offset, { width: 1920, textAlign: 'center' }),
            fontSize: 44,
            color: C.cyan,
            textShadow: `4px 4px 0 ${C.deep}`,
          }}
        >
          {sub}
        </div>
      )}
      <div
        style={abs(0, (sub ? 472 : 400) + offset, {
          width: 1920,
          display: 'flex',
          justifyContent: 'center',
        })}
      >
        <Blink>
          <span style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Sprite art={ARROW_RIGHT} px={4} />
            <span style={{ ...DISPLAY, fontSize: 28, color: C.white }}>PRESS START</span>
          </span>
        </Blink>
      </div>
      <Bob x={736} y={GROUND - 196}>
        <Sprite art={LIPSTICK} px={14} />
      </Bob>
      <Bob x={880} y={GROUND - 140} delay={0.3} period={0.9}>
        <Sprite art={COMPACT} px={14} />
      </Bob>
      <Bob x={1096} y={GROUND - 168} delay={0.6} period={1}>
        <Sprite art={BRUSH} px={14} />
      </Bob>
      <Bob x={656} y={GROUND - 296} delay={0.2} period={1.4}>
        <Sprite art={SPARKLE} px={8} />
      </Bob>
      <Bob x={1224} y={GROUND - 320} delay={0.7} period={1.3}>
        <Sprite art={SPARKLE} px={8} />
      </Bob>
      <Bob x={1000} y={GROUND - 248} delay={0.4} period={1.1}>
        <Sprite art={HEART} px={6} />
      </Bob>
    </Screen>
  );
};

const TermCover: Page = () => (
  <TitleScreen
    top={
      <>
        <span>
          <span style={{ color: C.red }}>1P</span>
          <span style={{ marginLeft: 20 }}>115學年度</span>
        </span>
        <span>
          <span style={{ color: C.red }}>Term</span>
          <span style={{ marginLeft: 20 }}>第一學期</span>
        </span>
        <span>
          <span style={{ color: C.red }}>Credit</span>
          <span style={{ marginLeft: 20 }}>01</span>
        </span>
      </>
    }
    title="現代視覺文化同人社"
  />
);

const CourseTop = () => (
  <>
    <span>
      <span style={{ color: C.red }}>Term</span>
      <span style={{ marginLeft: 20 }}>115學年度 第一學期</span>
    </span>
    <span>
      <span style={{ color: C.red }}>Club</span>
      <span style={{ marginLeft: 20 }}>現代視覺文化同人社</span>
    </span>
  </>
);

const BasicCover: Page = () => (
  <TitleScreen top={<CourseTop />} world="WORLD 1" title="基礎化妝課程" sub="底妝 · 彩妝" />
);

const DemoCover: Page = () => (
  <TitleScreen top={<CourseTop />} world="WORLD 4" title="實作示範課程" sub="跟著做一次" />
);

const Achievement = ({ y, children }: { y: number; children: ReactNode }) => (
  <div style={abs(48, y, { display: 'flex', alignItems: 'center', gap: 32 })}>
    <div
      style={{
        width: 112,
        height: 112,
        flex: 'none',
        background: DARK,
        boxShadow: `inset 0 0 0 4px ${C.slate}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Sprite art={TROPHY} px={6} />
    </div>
    <div>
      <div style={{ ...LABEL, fontSize: 18, color: C.lime, marginBottom: 16 }}>
        Achievement unlocked
      </div>
      <div style={{ ...PIXEL_TC, fontSize: 44 }}>{children}</div>
    </div>
  </div>
);

const Speaker: Page = () => (
  <Screen>
    <Kicker world="0-1">選擇角色</Kicker>
    <Title>講師登場</Title>
    <Meta>Player 1 · Ready</Meta>
    <PixelBox x={120} y={280} w={560} h={672} fill={C.ink}>
      <div style={abs(32, 32, { background: DARK, padding: 8 })}>
        <RevealPhoto src={speakerPhoto} w={480} h={480} />
      </div>
      <div style={abs(32, 560, { ...LABEL, color: C.yellow })}>Player 1 · 化妝師</div>
      <div style={{ ...PIXEL_TC, ...abs(32, 600), fontSize: 55 }}>瑞瑞</div>
    </PixelBox>
    <PixelBox x={744} y={280} w={1056} h={672} fill={C.deep}>
      <div style={abs(48, 48, { ...LABEL, color: C.silver })}>成就 · Achievements</div>
      <Achievement y={192}>現代視覺文化同人社 16 屆公關</Achievement>
      <Achievement y={400}>TCS 中部動漫文化祭 12 屆副召集人</Achievement>
    </PixelBox>
  </Screen>
);

const CanYouMakeup: Page = () => (
  <Screen stars avoid={[[200, 280, 1520, 520]]}>
    <Kicker world="1-1">暖身問題</Kicker>
    <h2
      style={{
        ...PIXEL_TC,
        ...abs(0, 360, { width: 1920, textAlign: 'center' }),
        fontSize: 132,
        color: 'var(--osd-accent)',
        textShadow: `8px 8px 0 ${C.red}, 16px 16px 0 ${C.plum}`,
      }}
    >
      <Typewriter text="你會化妝嗎？" start={200} cps={10} />
    </h2>
    <div
      style={abs(0, 640, {
        width: 1920,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
      })}
    >
      <Blink period={1}>
        <Sprite art={ARROW_RIGHT} px={6} swap={{ c: C.yellow }} />
      </Blink>
      <span style={{ ...PIXEL_TC, fontSize: 55 }}>會</span>
      <span style={{ ...PIXEL_TC, fontSize: 55, color: C.slate, marginLeft: 120 }}>不會</span>
    </div>
  </Screen>
);

const CosmeticsLaw: Page = () => (
  <Screen>
    <Kicker world="1-2">法規說明</Kicker>
    <Title>什麼是化粧品？</Title>
    <Meta>化粧品衛生安全管理法 · 第 3 條</Meta>
    <PixelBox x={120} y={280} w={1000} h={672} fill={C.white} edge={C.silver}>
      <img
        src={cosmeticsAct}
        alt="化粧品衛生安全管理法條文截圖"
        style={abs(16, 16, {
          width: 968,
          height: 640,
          objectFit: 'cover',
          objectPosition: 'top',
        })}
      />
    </PixelBox>
    <Steps>
      <Step>
        <div className="mk-in" style={abs(1184, 280)}>
          <PixelBox w={616} h={672} fill={C.deep} edge={C.yellow}>
            <div style={abs(40, 40)}>
              <Chip>定義</Chip>
            </div>
            <div
              style={abs(40, 136, {
                ...PIXEL_TC,
                width: 536,
                fontSize: 44,
                lineHeight: 1.5,
                whiteSpace: 'normal',
              })}
            >
              化粧品：指施於<span style={{ color: C.yellow }}>人體外部</span>
              、牙齒或口腔黏膜，用以潤澤髮膚、刺激嗅覺、改善體味、
              <span style={{ color: C.yellow }}>修飾容貌</span>
              或清潔身體之製劑。
            </div>
          </PixelBox>
        </div>
      </Step>
    </Steps>
  </Screen>
);

const RouteCard = ({
  x,
  world,
  label,
  note,
  art,
  edge,
}: {
  x: number;
  world: string;
  label: string;
  note: string;
  art: readonly string[];
  edge: string;
}) => (
  <PixelBox x={x} y={296} w={808} h={640} fill={C.ink} edge={edge}>
    <div
      style={abs(40, 40, {
        width: 728,
        height: 280,
        background: DARK,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      })}
    >
      <Sprite art={art} px={16} />
    </div>
    <div style={abs(40, 360, { ...LABEL, color: edge })}>{world}</div>
    <div style={{ ...PIXEL_TC, ...abs(40, 400), fontSize: 110 }}>{label}</div>
    <div style={{ ...PIXEL_TC, ...abs(40, 552), fontSize: 33, color: C.silver }}>{note}</div>
  </PixelBox>
);

const BaseVsColor: Page = () => (
  <Screen>
    <Kicker world="1-3">路線選擇</Kicker>
    <Title>化妝分兩大關</Title>
    <RouteCard
      x={120}
      world="World 2"
      label="底妝"
      note="保養 → 蜜粉，共 6 樣道具"
      art={COMPACT}
      edge={C.cyan}
    />
    <RouteCard
      x={992}
      world="World 3"
      label="彩妝"
      note="眉毛、眼線、口紅…共 7 個部位"
      art={LIPSTICK}
      edge={C.pink}
    />
  </Screen>
);

type BaseItem = 'skincare' | 'foundation' | 'tools' | 'concealer' | 'powder' | 'primer';

const NAMES: Record<BaseItem, string> = {
  skincare: '保養品',
  foundation: '粉底',
  tools: '上妝工具',
  concealer: '遮瑕',
  powder: '蜜粉',
  primer: '妝前乳',
};

const Slot = ({
  x,
  n,
  src,
  label,
  focus = false,
  dim = false,
}: {
  x: number;
  n: string;
  src: string;
  label: string;
  focus?: boolean;
  dim?: boolean;
}) => (
  <div style={abs(x, 384, { opacity: dim ? 0.28 : 1 })}>
    <PixelBox w={248} h={480} fill={C.ink} edge={focus ? C.yellow : C.white}>
      <div style={abs(24, 28, { ...LABEL, color: focus ? C.yellow : C.silver })}>{n}</div>
      <div style={abs(24, 64)}>
        <PixelBox w={200} h={280} fill={C.white} edge={C.silver} shade={false}>
          <div style={abs(8, 8)}>
            <PixelPhoto src={src} w={184} h={264} px={2} />
          </div>
        </PixelBox>
      </div>
      <div
        style={{
          ...PIXEL_TC,
          ...abs(0, 384, { width: 248, textAlign: 'center' }),
          fontSize: 44,
        }}
      >
        {label}
      </div>
    </PixelBox>
    {focus && (
      <div style={abs(0, -72, { width: 248, display: 'flex', justifyContent: 'center' })}>
        <Blink>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Chip size={22}>NEXT</Chip>
            <Sprite art={ARROW_DOWN} px={5} swap={{ c: C.yellow }} />
          </span>
        </Blink>
      </div>
    )}
  </div>
);

const Inventory = ({ focus }: { focus?: BaseItem }) => {
  const dim = (item: BaseItem) => focus !== undefined && focus !== item;
  const on = (item: BaseItem) => focus === item;
  return (
    <Screen>
      <Kicker world="2-0">{focus ? '下一關' : '底妝道具'}</Kicker>
      <Title>{focus ? `下一個：${NAMES[focus]}` : '底妝道具欄'}</Title>
      <Tabs active="base" />
      <Slot
        x={120}
        n="01"
        src={skincare}
        label="保養品"
        focus={on('skincare')}
        dim={dim('skincare')}
      />
      <Slot
        x={408}
        n="02"
        src={foundation}
        label="粉底"
        focus={on('foundation')}
        dim={dim('foundation')}
      />
      <Slot x={696} n="03" src={tools} label="上妝工具" focus={on('tools')} dim={dim('tools')} />
      <Slot
        x={984}
        n="04"
        src={concealer}
        label="遮瑕"
        focus={on('concealer')}
        dim={dim('concealer')}
      />
      <Slot
        x={1272}
        n="05"
        src={loosePowder}
        label="蜜粉"
        focus={on('powder')}
        dim={dim('powder')}
      />
      <Slot x={1560} n="06" src={primer} label="妝前乳" focus={on('primer')} dim={dim('primer')} />
    </Screen>
  );
};

const BaseIntro: Page = () => <Inventory />;
const NextPrimer: Page = () => <Inventory focus="primer" />;
const NextTools: Page = () => <Inventory focus="tools" />;
const NextFoundation: Page = () => <Inventory focus="foundation" />;
const NextConcealer: Page = () => <Inventory focus="concealer" />;
const NextPowder: Page = () => <Inventory focus="powder" />;

const Legend = () => (
  <div
    style={{
      ...PIXEL_TC,
      position: 'absolute',
      right: 120,
      top: 248,
      fontSize: 22,
      color: C.silver,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    }}
  >
    <Sprite art={ARROW_UP} px={3} swap={{ c: C.lime }} />
    <span>優點</span>
    <Sprite art={ARROW_DOWN} px={3} swap={{ c: C.red }} style={{ marginLeft: 16 }} />
    <span>缺點</span>
    <Sprite art={DOT} px={3} swap={{ c: C.slate }} style={{ marginLeft: 16 }} />
    <span>特性</span>
  </div>
);

const ItemDetail = ({
  world,
  n,
  name,
  src,
  legend = false,
  children,
}: {
  world: string;
  n: string;
  name: string;
  src: string;
  legend?: boolean;
  children: ReactNode;
}) => (
  <Screen>
    <Kicker world={world}>道具說明</Kicker>
    <Title>{name}</Title>
    <Tabs active="base" />
    {legend && <Legend />}
    <PixelBox x={120} y={296} w={400} h={640} fill={C.ink} edge={C.yellow}>
      <div style={abs(32, 32, { ...LABEL, color: C.yellow })}>Item {n}</div>
      <div style={abs(32, 72)}>
        <PixelBox w={336} h={440} fill={C.white} edge={C.silver} shade={false}>
          <div style={abs(8, 8)}>
            <PixelPhoto src={src} w={320} h={424} px={2} />
          </div>
        </PixelBox>
      </div>
      <div
        style={{
          ...PIXEL_TC,
          ...abs(0, 552, { width: 400, textAlign: 'center' }),
          fontSize: 55,
        }}
      >
        {name}
      </div>
    </PixelBox>
    <div style={abs(584, 296, { width: 1216, height: 640 })}>{children}</div>
  </Screen>
);

const Question = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 24, height: 72 }}>
    <Sprite art={ARROW_RIGHT} px={6} swap={{ c: C.yellow }} />
    <span style={{ ...PIXEL_TC, fontSize: 55, color: C.yellow }}>{children}</span>
  </div>
);

const Reason = ({ children }: { children: ReactNode }) => (
  <div className="mk-in" style={{ display: 'flex', alignItems: 'center', gap: 28, height: 88 }}>
    <div
      style={{
        width: 56,
        height: 56,
        flex: 'none',
        background: DARK,
        boxShadow: `inset 0 0 0 4px ${C.slate}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Sprite art={CHECK} px={5} />
    </div>
    <span style={{ ...PIXEL_TC, fontSize: 44 }}>{children}</span>
  </div>
);

const Skincare: Page = () => (
  <ItemDetail world="2-1" n="01" name="保養品" src={skincare}>
    <Question>為什麼要保養？</Question>
    <div style={{ marginTop: 24 }}>
      <Steps>
        <Step>
          <Reason>基底好，化完妝更好看</Reason>
        </Step>
        <Step>
          <Reason>避免乾燥起皮，讓妝不服貼</Reason>
        </Step>
      </Steps>
    </div>
    <Steps>
      <Step>
        <div className="mk-in" style={abs(0, 336)}>
          <PixelBox w={1216} h={304} fill={C.deep}>
            <div style={abs(40, 40, { ...LABEL, color: C.silver })}>持妝時間 · Makeup HP</div>
            <div style={{ ...PIXEL_TC, ...abs(40, 104), fontSize: 44, color: C.silver }}>
              沒保養
            </div>
            <SegBar x={280} y={108} value={2} max={8} w={600} h={40} color={C.red} />
            <div style={{ ...PIXEL_TC, ...abs(928, 104), fontSize: 44, color: C.red }}>
              1–2 小時
            </div>
            <div style={{ ...PIXEL_TC, ...abs(40, 200), fontSize: 44 }}>有保養</div>
            <SegBar x={280} y={204} value={8} max={8} w={600} h={40} color={C.lime} delay={200} />
            <div style={{ ...PIXEL_TC, ...abs(928, 200), fontSize: 44, color: C.lime }}>8 小時</div>
          </PixelBox>
        </div>
      </Step>
    </Steps>
  </ItemDetail>
);

const Primer: Page = () => (
  <ItemDetail world="2-2" n="06" name="妝前乳" src={primer}>
    <Question>為什麼要妝前？</Question>
    <div style={{ marginTop: 24 }}>
      <Steps>
        <Step>
          <Reason>修飾表面，讓膚色更均勻</Reason>
        </Step>
        <Step>
          <Reason>填滿缺陷，讓妝容更服貼</Reason>
        </Step>
        <Step>
          <div className="mk-in" style={{ marginTop: 64 }}>
            <div style={{ ...LABEL, color: C.silver, marginBottom: 24 }}>舉例 · Examples</div>
            <div style={{ display: 'flex', gap: 24 }}>
              <Chip bg={C.pink}>妝前乳</Chip>
              <Chip bg={C.lime}>BB 霜</Chip>
              <Chip bg={C.cyan}>CC 霜</Chip>
            </div>
          </div>
        </Step>
      </Steps>
    </div>
    <Steps>
      <Step>
        <div className="mk-in" style={abs(760, 0)}>
          <PixelBox w={456} h={304} fill={C.white} edge={C.silver}>
            <div style={abs(16, 16)}>
              <PixelPhoto src={primerSamples} w={424} h={272} px={2} />
            </div>
          </PixelBox>
        </div>
      </Step>
      <Step>
        <div className="mk-in" style={abs(760, 336)}>
          <PixelBox w={456} h={304} fill={C.white} edge={C.silver}>
            <div style={abs(16, 16)}>
              <PixelPhoto src={colorWheel} w={424} h={272} px={2} />
            </div>
          </PixelBox>
        </div>
      </Step>
    </Steps>
  </ItemDetail>
);

const Perk = ({ kind, children }: { kind: 'pro' | 'con' | 'note'; children: ReactNode }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 44 }}>
    <span style={{ width: 21, flex: 'none', display: 'flex', justifyContent: 'center' }}>
      {kind === 'pro' && <Sprite art={ARROW_UP} px={3} swap={{ c: C.lime }} />}
      {kind === 'con' && <Sprite art={ARROW_DOWN} px={3} swap={{ c: C.red }} />}
      {kind === 'note' && <Sprite art={DOT} px={3} swap={{ c: C.slate }} />}
    </span>
    <span style={{ ...PIXEL_TC, fontSize: 33, color: kind === 'note' ? C.silver : C.white }}>
      {children}
    </span>
  </div>
);

const ItemCard = ({ src, name, children }: { src: string; name: string; children: ReactNode }) => (
  <div className="mk-in">
    <PixelBox w={588} h={300} fill={C.ink}>
      <div style={abs(24, 24)}>
        <PixelBox w={160} h={252} fill={C.white} edge={C.silver} shade={false}>
          <div style={abs(8, 8)}>
            <PixelPhoto src={src} w={144} h={236} px={2} />
          </div>
        </PixelBox>
      </div>
      <div style={{ ...PIXEL_TC, ...abs(208, 32), fontSize: 44, color: C.yellow }}>{name}</div>
      <div style={abs(208, 96)}>{children}</div>
    </PixelBox>
  </div>
);

const cardGrid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '588px 588px',
  gridAutoRows: 300,
  gap: 40,
};

const Tools: Page = () => (
  <ItemDetail world="2-3" n="03" name="上妝工具" src={tools} legend>
    <div style={cardGrid}>
      <Steps>
        <Step>
          <ItemCard src={toolPuff} name="粉撲">
            <Perk kind="note">傳統用具</Perk>
            <Perk kind="con">易消耗化妝品</Perk>
          </ItemCard>
        </Step>
        <Step>
          <ItemCard src={toolCushionPuff} name="氣墊粉撲">
            <Perk kind="pro">較不易消耗</Perk>
            <Perk kind="pro">無須用水</Perk>
            <Perk kind="con">無法搭配粉餅使用</Perk>
          </ItemCard>
        </Step>
        <Step>
          <ItemCard src={toolBrush} name="刷具">
            <Perk kind="con">須一定技法</Perk>
            <Perk kind="con">易有刷痕（不推）</Perk>
          </ItemCard>
        </Step>
        <Step>
          <ItemCard src={toolSponge} name="美妝蛋">
            <Perk kind="con">需用水（不方便）</Perk>
            <Perk kind="con">較易消耗化妝品</Perk>
            <Perk kind="pro">初學者愛用款</Perk>
          </ItemCard>
        </Step>
      </Steps>
    </div>
  </ItemDetail>
);

const Foundation: Page = () => (
  <ItemDetail world="2-4" n="02" name="粉底" src={foundation} legend>
    <div style={cardGrid}>
      <Steps>
        <Step>
          <ItemCard src={foundationCompact} name="粉餅">
            <Perk kind="note">適合中性膚質</Perk>
            <Perk kind="con">難推開</Perk>
            <Perk kind="con">能駕馭的人不多</Perk>
          </ItemCard>
        </Step>
        <Step>
          <ItemCard src={foundationCushion} name="氣墊粉餅（氣墊）">
            <Perk kind="note">適合中性膚質</Perk>
            <Perk kind="pro">較好推開</Perk>
            <Perk kind="note">啞光愛好者</Perk>
          </ItemCard>
        </Step>
        <Step>
          <ItemCard src={foundationLiquid} name="粉底液">
            <Perk kind="note">適合油／乾性膚質</Perk>
            <Perk kind="pro">超推開</Perk>
            <Perk kind="pro">市面上最受喜愛</Perk>
          </ItemCard>
        </Step>
        <Step>
          <ItemCard src={foundationStick} name="粉底棒">
            <Perk kind="con">底妝感重</Perk>
            <Perk kind="con">難推開</Perk>
            <Perk kind="note">近年推出的產品</Perk>
            <Perk kind="note">（沒看過有人用…）</Perk>
          </ItemCard>
        </Step>
      </Steps>
    </div>
  </ItemDetail>
);

const Concealer: Page = () => (
  <ItemDetail world="2-5" n="04" name="遮瑕" src={concealer} legend>
    <div style={cardGrid}>
      <Steps>
        <Step>
          <ItemCard src={concealerLiquid} name="遮瑕膏">
            <Perk kind="pro">易推開</Perk>
            <Perk kind="pro">市面上的愛用款</Perk>
            <Perk kind="note">單一使用</Perk>
          </ItemCard>
        </Step>
        <Step>
          <ItemCard src={concealerPalette} name="遮瑕盤">
            <Perk kind="note">化妝師愛用</Perk>
            <Perk kind="note">具有一定實力</Perk>
            <Perk kind="note">能清楚辨識顏色</Perk>
            <Perk kind="pro">使用範圍廣泛</Perk>
          </ItemCard>
        </Step>
        <Step>
          <ItemCard src={concealerStick} name="遮瑕棒">
            <Perk kind="pro">用量好抓</Perk>
            <Perk kind="con">不易推開，妝感重</Perk>
            <Perk kind="pro">遮瑕力極佳</Perk>
          </ItemCard>
        </Step>
      </Steps>
    </div>
  </ItemDetail>
);

const PowderCard = ({
  src,
  name,
  tool,
  skin,
}: {
  src: string;
  name: string;
  tool: string;
  skin: string;
}) => (
  <div className="mk-in">
    <PixelBox w={808} h={640} fill={C.ink}>
      <div style={abs(144, 40)}>
        <PixelBox w={520} h={320} fill={C.white} edge={C.silver} shade={false}>
          <div style={abs(8, 8)}>
            <PixelPhoto src={src} w={504} h={304} px={2} />
          </div>
        </PixelBox>
      </div>
      <div
        style={{
          ...PIXEL_TC,
          ...abs(0, 408, { width: 808, textAlign: 'center' }),
          fontSize: 66,
          color: C.yellow,
        }}
      >
        {name}
      </div>
      <div style={abs(0, 520, { width: 808, display: 'flex', justifyContent: 'center', gap: 24 })}>
        <Chip bg={C.cyan}>{tool}</Chip>
        <Chip bg={C.pink}>{skin}</Chip>
      </div>
    </PixelBox>
  </div>
);

const Powder: Page = () => (
  <Screen>
    <Kicker world="2-6">道具說明</Kicker>
    <Title>蜜粉</Title>
    <Tabs active="base" />
    <div style={abs(120, 296, { display: 'flex', gap: 64 })}>
      <Steps>
        <PowderCard src={loosePowder} name="蜜粉" tool="搭配刷子使用" skin="適合油性膚質" />
        <Step>
          <PowderCard src={pressedPowder} name="蜜粉餅" tool="搭配粉撲使用" skin="適合乾性膚質" />
        </Step>
      </Steps>
    </div>
  </Screen>
);

const ComboSlot = ({ x, n, src, label }: { x: number; n: string; src: string; label: string }) => (
  <PixelBox x={x} y={336} w={272} h={500} fill={C.ink}>
    <div style={{ ...DISPLAY, ...abs(24, 28), fontSize: 28, color: C.yellow }}>{n}</div>
    <div style={abs(24, 80)}>
      <PixelBox w={224} h={300} fill={C.white} edge={C.silver} shade={false}>
        <div style={abs(8, 8)}>
          <PixelPhoto src={src} w={208} h={284} px={2} />
        </div>
      </PixelBox>
    </div>
    <div
      style={{
        ...PIXEL_TC,
        ...abs(0, 416, { width: 272, textAlign: 'center' }),
        fontSize: 44,
      }}
    >
      {label}
    </div>
  </PixelBox>
);

const ComboArrow = ({ x }: { x: number }) => (
  <Sprite art={ARROW_RIGHT} px={8} x={x + 24} y={556} swap={{ c: C.yellow }} />
);

const BaseOrder = ({ world }: { world: string }) => (
  <Screen>
    <Kicker world={world}>連段</Kicker>
    <Title>底妝順序</Title>
    <Tabs active="base" />
    <ComboSlot x={120} n="1" src={skincare} label="保養品" />
    <ComboArrow x={392} />
    <ComboSlot x={472} n="2" src={primer} label="妝前乳" />
    <ComboArrow x={744} />
    <ComboSlot x={824} n="3" src={foundation} label="粉底" />
    <ComboArrow x={1096} />
    <ComboSlot x={1176} n="4" src={concealer} label="遮瑕" />
    <ComboArrow x={1448} />
    <ComboSlot x={1528} n="5" src={loosePowder} label="蜜粉" />
  </Screen>
);

const BaseOrderBase: Page = () => <BaseOrder world="2-7" />;
const BaseOrderDemo: Page = () => <BaseOrder world="4-1" />;

const PartTile = ({
  x,
  y,
  n,
  name,
  sub,
}: {
  x: number;
  y: number;
  n: string;
  name: string;
  sub?: string;
}) => (
  <PixelBox x={x} y={y} w={396} h={264} fill={C.ink} edge={sub ? C.pink : C.white}>
    <div style={abs(32, 32, { ...LABEL, color: C.pink })}>{n}</div>
    <div style={{ ...PIXEL_TC, ...abs(32, 80), fontSize: 66 }}>{name}</div>
    {sub && (
      <div style={{ ...PIXEL_TC, ...abs(32, 184), fontSize: 22, color: C.silver }}>{sub}</div>
    )}
  </PixelBox>
);

const ColorParts = ({ world, tools: showTools }: { world: string; tools: boolean }) => (
  <Screen>
    <Kicker world={world}>彩妝部位</Kicker>
    <Title>{showTools ? '彩妝部位與工具' : '彩妝七個部位'}</Title>
    <Tabs active="color" />
    <PartTile x={120} y={312} n="3-1" name="眉毛" sub={showTools ? '眉粉／眉筆' : undefined} />
    <PartTile
      x={548}
      y={312}
      n="3-2"
      name="眼線"
      sub={showTools ? '眼線筆／眼線膠筆／眼線液' : undefined}
    />
    <PartTile x={976} y={312} n="3-3" name="腮紅" />
    <PartTile x={1404} y={312} n="3-4" name="眼影" />
    <PartTile x={334} y={624} n="3-5" name="鼻影" />
    <PartTile x={762} y={624} n="3-6" name="修容" sub={showTools ? '修容盤／修容棒' : undefined} />
    <PartTile x={1190} y={624} n="3-7" name="口紅" />
  </Screen>
);

const ColorOverview: Page = () => <ColorParts world="3-0" tools={false} />;
const ColorTools: Page = () => <ColorParts world="3-1" tools />;
const ColorToolsDemo: Page = () => <ColorParts world="4-2" tools />;

const LinerCard = ({
  x,
  src,
  name,
  children,
}: {
  x: number;
  src: string;
  name: string;
  children: ReactNode;
}) => (
  <div className="mk-in" style={abs(x, 296)}>
    <PixelBox w={528} h={640} fill={C.ink}>
      <div style={abs(32, 32)}>
        <PixelBox w={464} h={288} fill={C.white} edge={C.silver} shade={false}>
          <div style={abs(8, 8)}>
            <PixelPhoto src={src} w={448} h={272} px={2} zoom={1.35} turn />
          </div>
        </PixelBox>
      </div>
      <div style={abs(32, 352)}>
        <Chip>{name}</Chip>
      </div>
      <div style={abs(32, 440)}>{children}</div>
    </PixelBox>
  </div>
);

const Eyeliner: Page = () => (
  <Screen>
    <Kicker world="3-2">部位說明</Kicker>
    <Title>眼線</Title>
    <Tabs active="color" />
    <Legend />
    <Steps>
      <Step>
        <LinerCard x={120} src={linerPencil} name="眼線筆">
          <Perk kind="con">需要削</Perk>
          <Perk kind="con">不尖不好使用</Perk>
          <Perk kind="pro">可以根據力度掌控使用量</Perk>
        </LinerCard>
      </Step>
      <Step>
        <LinerCard x={696} src={linerGel} name="眼線膠筆">
          <Perk kind="pro">新手愛用款</Perk>
          <Perk kind="con">沒辦法畫細筆</Perk>
          <Perk kind="pro">好施力，比較不怕</Perk>
        </LinerCard>
      </Step>
      <Step>
        <LinerCard x={1272} src={linerLiquid} name="眼線液">
          <Perk kind="pro">可以畫比較細</Perk>
          <Perk kind="pro">筆觸流暢</Perk>
          <Perk kind="con">需要練習</Perk>
          <Perk kind="con">戳到眼睛很麻煩</Perk>
        </LinerCard>
      </Step>
    </Steps>
  </Screen>
);

const Dialog = ({
  x,
  y,
  w,
  h,
  name,
  portrait,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  name: string;
  portrait: string;
  children: ReactNode;
}) => (
  <PixelBox x={x} y={y} w={w} h={h} fill={C.deep}>
    <div style={abs(40, -32)}>
      <PixelBox w={176} h={64} fill={C.red} edge={C.white} shade={false}>
        <div
          style={{
            ...PIXEL_TC,
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 33,
          }}
        >
          {name}
        </div>
      </PixelBox>
    </div>
    <div style={abs(40, 64)}>
      <PixelBox w={208} h={208} fill={DARK} edge={C.slate} shade={false}>
        <div style={abs(8, 8)}>
          <PixelPhoto src={portrait} w={192} h={192} px={3} cover bg={C.ink} />
        </div>
      </PixelBox>
    </div>
    <div style={abs(296, 64, { width: w - 376 })}>{children}</div>
    <div style={abs(w - 72, h - 56)}>
      <Blink period={1}>
        <Sprite art={ARROW_DOWN} px={4} swap={{ c: C.yellow }} />
      </Blink>
    </div>
  </PixelBox>
);

const QandA: Page = () => (
  <Screen>
    <Kicker world="4-3">Q&amp;A</Kicker>
    <Title>有問題嗎？</Title>
    <Dialog x={120} y={400} w={1680} h={336} name="瑞瑞" portrait={speakerPhoto}>
      <div style={{ ...PIXEL_TC, fontSize: 44, lineHeight: 1.6, whiteSpace: 'normal' }}>
        <Typewriter text="不管是底妝還是彩妝，有任何問題都可以舉手問！" start={200} />
      </div>
    </Dialog>
  </Screen>
);

const QrCard = ({ x, src, label }: { x: number; src: string; label: string }) => (
  <PixelBox x={x} y={672} w={248} h={296} fill={C.ink} edge={C.yellow}>
    <img
      src={src}
      alt={label}
      style={abs(24, 24, { width: 200, height: 200, background: '#fff', padding: 8 })}
    />
    <div
      style={{
        ...PIXEL_TC,
        ...abs(0, 244, { width: 248, textAlign: 'center' }),
        fontSize: 22,
        color: C.yellow,
      }}
    >
      {label}
    </div>
  </PixelBox>
);

const Closing: Page = () => (
  <Screen hud={false} stars avoid={[[120, 80, 1680, 580]]}>
    <Landscape />
    <LightPool
      cx={520}
      cy={800}
      radii={[296, 216, 136]}
      alphas={[0.05, 0.07, 0.1]}
      color={C.pink}
    />
    <h2
      style={{
        ...DISPLAY,
        ...abs(0, 104, { width: 1920, textAlign: 'center' }),
        fontSize: 88,
        color: 'var(--osd-accent)',
        textShadow: `8px 8px 0 ${C.red}, 16px 16px 0 ${C.plum}`,
      }}
    >
      GAME CLEAR
    </h2>
    <Dialog x={120} y={296} w={1680} h={320} name="瑞瑞" portrait={closingPhoto}>
      <div style={{ ...PIXEL_TC, fontSize: 44, lineHeight: 1.6 }}>
        不要透過化妝而喜歡自己
        <br />
        對自己保有信心
        <br />
        才能透過化妝讓別人喜歡你
      </div>
    </Dialog>
    <Bob x={240} y={GROUND - 196}>
      <Sprite art={LIPSTICK} px={14} />
    </Bob>
    <Bob x={384} y={GROUND - 140} delay={0.3} period={0.9}>
      <Sprite art={COMPACT} px={14} />
    </Bob>
    <Bob x={600} y={GROUND - 168} delay={0.6} period={1}>
      <Sprite art={BRUSH} px={14} />
    </Bob>
    <Bob x={720} y={GROUND - 248} delay={0.4} period={1.1}>
      <Sprite art={HEART} px={6} />
    </Bob>
    <QrCard x={1264} src={qrSurvey} label="問卷調查" />
    <QrCard x={1552} src={qrInstagram} label="Instagram" />
  </Screen>
);

export const meta: SlideMeta = {
  title: '台中二中上課簡報：基礎化妝課程',
  createdAt: '2026-10-20T12:34:28.227Z',
};

export default [
  TermCover,
  Speaker,
  BasicCover,
  CanYouMakeup,
  CosmeticsLaw,
  BaseVsColor,
  BaseIntro,
  Skincare,
  NextPrimer,
  Primer,
  NextTools,
  Tools,
  NextFoundation,
  Foundation,
  NextConcealer,
  Concealer,
  NextPowder,
  Powder,
  BaseOrderBase,
  ColorOverview,
  ColorTools,
  Eyeliner,
  DemoCover,
  BaseOrderDemo,
  ColorToolsDemo,
  QandA,
  Closing,
] satisfies Page[];
