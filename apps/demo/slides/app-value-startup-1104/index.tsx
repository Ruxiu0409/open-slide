import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { type CSSProperties, type ReactNode, useEffect, useState } from 'react';
import banfengHome from './assets/banfeng-home.webp';
import igQr from './assets/ig-qr.svg';
import ntd100 from './assets/ntd-100-specimen.jpg';

export const design: DesignSystem = {
  palette: { bg: '#FFF3DF', text: '#151313', accent: '#FF5A2C' },
  fonts: {
    display: '"Gabarito", "Noto Sans TC", system-ui, sans-serif',
    body: '"Gabarito", "Noto Sans TC", system-ui, sans-serif',
  },
  typeScale: { hero: 300, body: 30 },
  radius: 28,
};

const CREAM = 'var(--osd-bg)';
const INK = 'var(--osd-text)';
const TOMATO = 'var(--osd-accent)';
const BUTTER = '#FFD23F';
const MINT = '#7EDDB0';
const PERI = '#98A6FF';
const PINK = '#FFB0D0';
const PAPER = '#FFFCF6';
const MUTED = 'rgba(21, 19, 19, 0.6)';
const FAINT = 'rgba(21, 19, 19, 0.16)';

const SLIDE_ID = 'app-value-startup-1104';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=DM+Mono:wght@500&family=Gabarito:wght@500;700;800;900&display=swap';
const CJK_TEXT =
  '、。「」【】一三上下不世主之也了事二五些交享人什今介仍他付代以件伴但位低住作你使來例供便係促保修個們候值假做停偶傘備像價元先光免入內全兩公六其具冊再出分判別利到制券刻前剛創力功加助動務勢勵包十千半卡卻原厲去參及友只可台右合同名向否告呢和品哪唱商問善喜喝單嗎嚮四回因困園圖團在地報場塊境多夜夠夥大天套好如始媒子字學它完官定宜室害宵家容實審寫專對導小少就局展工左己師帳常幣幫平年底店度廢廣弄式弱張形往待很後得從心忙怎思情想意感慢慣憶應成我或截所手才打扣批找把抽拜拿持指按掉掌排接推提換揪搭搶撐據擾收改放教散整數料新斷方於明易是時晴曝更書最會月有朋服本材束杯東板果架某查校核格案棄楚業標模樣機次歡正段每比求決沒沿法注活流清測準滑演濕濟為然照煩營片版牌特猜獎班現理瑞生產用由甲界留畫當療登發百的盈目直省看真知碰確示社神票禮科種空立競第筆等答算箭簡粉精系約紅紙素累結絡給統絲經繼續置美群義習考者而聊聯聲聽育能自至臺與舉花茶萬著蓋薦號表被補裡西要見覺角解觸訂計訊記設註評試話該認說誰課調請講謝證識讀變讓買費貼資賣賺購賽走起越跟跳蹺躍身躺車較載輩辦近送透這通逢連進遇過道適選邀還邊那都醒醫重量金錢錯鎖鐘門開間閱關附陪隊階際離難雨需靠面頁項順頒頭題願食飲餐首高麻麼點！（）＋，／：；＝？';
const CJK_FONT_HREF = `https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@500;700;900&display=swap&text=${encodeURIComponent(CJK_TEXT)}`;
const CJK_FONT_LINK_ID = `osd-webfont-cjk-${SLIDE_ID}`;
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;

const springAt = (t: number, zeta: number, omega: number) => {
  if (t >= 1) return 1;
  const wd = omega * Math.sqrt(1 - zeta * zeta);
  const decay = Math.exp(-zeta * omega * t);
  return 1 - decay * (Math.cos(wd * t) + ((zeta * omega) / wd) * Math.sin(wd * t));
};

// Gravity drop with two shrinking bounces; never passes the floor, unlike a spring.
const dropAt = (t: number) => {
  const e = 0.3;
  const segs = [1, 2 * e, 2 * e * e];
  const total = segs[0] + segs[1] + segs[2];
  let u = t * total;
  if (u <= 1) return u * u;
  u -= 1;
  for (let k = 1; k < segs.length; k++) {
    if (u <= segs[k]) {
      const x = u / segs[k];
      return 1 - e ** (2 * k) * 4 * x * (1 - x);
    }
    u -= segs[k];
  }
  return 1;
};
const DROP_LAND = 1 / (1 + 0.6 + 0.18);

const toLinear = (f: (t: number) => number, n: number) =>
  `linear(${Array.from({ length: n + 1 }, (_, i) => Number(f(i / n).toFixed(4))).join(', ')})`;

const BOUNCY = toLinear((t) => springAt(t, 0.38, 15), 64);
const SNAPPY = toLinear((t) => springAt(t, 0.62, 10.5), 48);
const DROP = toLinear(dropAt, 72);
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const SLAP = 'cubic-bezier(0.2, 0.8, 0.3, 1)';
const HOLD: Keyframe[] = [{ opacity: 1 }, { opacity: 1 }];
const CSS = `
@keyframes pm-rise { from { opacity: 0; transform: translateY(var(--pm-rise, 32px)) } to { opacity: 1; transform: translateY(0) } }
@keyframes pm-drop { from { transform: translateY(var(--pm-from, -320px)) } to { transform: translateY(0) } }
@keyframes pm-pop { from { opacity: 0; transform: scale(0) } to { opacity: 1; transform: scale(1) } }
@keyframes pm-squash { 0% { transform: scale(1, 1) } 26% { transform: scale(1.14, 0.82) } 56% { transform: scale(0.96, 1.05) } 100% { transform: scale(1, 1) } }
@keyframes pm-slap {
  0% { opacity: 0; transform: rotate(calc(var(--r) - 24deg)) scale(1.9) }
  42% { opacity: 1; transform: rotate(calc(var(--r) + 4deg)) scale(0.88, 0.84) }
  70% { opacity: 1; transform: rotate(calc(var(--r) - 1.5deg)) scale(1.04) }
  100% { opacity: 1; transform: rotate(var(--r)) scale(1) }
}
@keyframes pm-wobble { 0%, 100% { transform: rotate(0deg) } 50% { transform: rotate(2.6deg) } }
@keyframes pm-bob { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }
@keyframes pm-twinkle { 0%, 100% { transform: scale(1) rotate(0deg) } 50% { transform: scale(0.7) rotate(25deg) } }
@keyframes pm-thunk { 0% { transform: scale(1) } 24% { transform: scale(1.07) rotate(-1.4deg) } 58% { transform: scale(0.985) rotate(0.4deg) } 100% { transform: scale(1) } }
@keyframes av-buy-away { from { opacity: 1; transform: translateY(0) scale(1) } to { opacity: 0; transform: translateY(-22px) scale(0.8) } }
@keyframes av-grey { from { filter: grayscale(0) } to { filter: grayscale(1) } }
@keyframes av-tip { from { transform: rotate(0deg) } }
@keyframes av-grow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
@keyframes av-draw{ from { opacity: 0; stroke-dashoffset: 1 } 1% { opacity: 1 } to { opacity: 1; stroke-dashoffset: 0 } }
@media (prefers-reduced-motion: reduce) {
  .pm-root *, .pm-root *::before, .pm-root *::after { animation: none !important; transition: none !important; }
}
`;
if (typeof document !== 'undefined') {
  let link = document.getElementById(FONT_LINK_ID);
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.setAttribute('rel', 'stylesheet');
    document.head.appendChild(link);
  }
  if (link instanceof HTMLLinkElement && link.href !== FONT_HREF) link.href = FONT_HREF;

  let cjkLink = document.getElementById(CJK_FONT_LINK_ID);
  if (!cjkLink) {
    cjkLink = document.createElement('link');
    cjkLink.id = CJK_FONT_LINK_ID;
    cjkLink.setAttribute('rel', 'stylesheet');
    document.head.appendChild(cjkLink);
  }
  if (cjkLink instanceof HTMLLinkElement && cjkLink.href !== CJK_FONT_HREF) {
    cjkLink.href = CJK_FONT_HREF;
  }

  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  if (style.textContent !== CSS) style.textContent = CSS;
}

export const transition: SlideTransition = {
  duration: 240,
  exit: { duration: 240, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 240,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const BORDER = `4px solid ${INK}`;
const shadow = (n = 8) => `${n}px ${n}px 0 ${INK}`;

const DISPLAY: CSSProperties = {
  fontFamily: 'var(--osd-font-display)',
  fontWeight: 900,
  letterSpacing: '-0.035em',
  lineHeight: 1.15,
  margin: 0,
};

const MONO: CSSProperties = {
  fontFamily: '"DM Mono", "Noto Sans TC", ui-monospace, monospace',
  fontWeight: 500,
  fontSize: 17,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  lineHeight: 1.2,
};

const BODY: CSSProperties = {
  fontFamily: 'var(--osd-font-body)',
  fontWeight: 500,
  fontSize: 'var(--osd-size-body)',
  lineHeight: 1.32,
  margin: 0,
  textWrap: 'pretty',
};

const NUM: CSSProperties = { ...DISPLAY, fontVariantNumeric: 'tabular-nums' };

const abs = (left: number, top: number, extra?: CSSProperties): CSSProperties => ({
  position: 'absolute',
  left,
  top,
  ...extra,
});

const pad = (n: number) => String(n).padStart(2, '0');

const anim = (live: boolean, value: string): CSSProperties => (live ? { animation: value } : {});

const rise = (live: boolean, delay = 0, dist = 32): CSSProperties =>
  live
    ? ({
        animation: `pm-rise 820ms ${SNAPPY} ${delay}ms both`,
        '--pm-rise': `${dist}px`,
      } as CSSProperties)
    : {};

const useLive = () => {
  const active = useIsActivePage();
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  return active && !reduced;
};

const useCount = (target: number, live: boolean, delay: number, dur = 1700) => {
  const [value, setValue] = useState(live ? 0 : target);
  useEffect(() => {
    if (!live) {
      setValue(target);
      return;
    }
    setValue(0);
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / dur));
      setValue(target * (1 - (1 - p) ** 4));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [live, target, delay, dur]);
  return value;
};

const Mark = ({ size = 56 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    aria-hidden="true"
    style={{ display: 'block', overflow: 'visible' }}
  >
    <path
      d="M36.5 13.5 C 38.5 6, 46.5 2.5, 55 4.5 C 53 12, 45 16, 36.5 13.5 Z"
      style={{ fill: MINT, stroke: INK, strokeWidth: 3.5, strokeLinejoin: 'round' }}
    />
    <path
      d="M32 19 C 32 13, 33 9, 36 6"
      style={{ fill: 'none', stroke: INK, strokeWidth: 4, strokeLinecap: 'round' }}
    />
    <path
      d="M32 19 C 23 13, 6 15, 6 34 C 6 50, 17 60, 25 60 C 28 60, 30 58.5, 32 58.5 C 34 58.5, 36 60, 39 60 C 47 60, 58 50, 58 34 C 58 15, 41 13, 32 19 Z"
      style={{ fill: TOMATO, stroke: INK, strokeWidth: 4, strokeLinejoin: 'round' }}
    />
    <path
      d="M26.5 58.6 V 47 A 5.5 5.5 0 0 1 37.5 47 V 58.6"
      style={{ fill: CREAM, stroke: INK, strokeWidth: 3.5, strokeLinejoin: 'round' }}
    />
    <path
      d="M15 30 C 15.5 25.5, 18.5 22.5, 22.5 21.5"
      style={{ fill: 'none', stroke: PAPER, strokeWidth: 3.5, strokeLinecap: 'round' }}
    />
  </svg>
);

const Letter = ({
  ch,
  i,
  live,
  delay,
  children,
}: {
  ch: string;
  i: number;
  live: boolean;
  delay: number;
  children?: ReactNode;
}) => {
  const d = delay + i * 85;
  return (
    <span
      style={{
        display: 'inline-block',
        position: 'relative',
        ...(live
          ? ({
              animation: `pm-drop 940ms ${DROP} ${d}ms both`,
              '--pm-from': '-1.6em',
            } as CSSProperties)
          : {}),
      }}
    >
      <span
        style={{
          display: 'inline-block',
          transformOrigin: '50% 88%',
          ...anim(live, `pm-squash 560ms ease-out ${d + Math.round(940 * DROP_LAND)}ms both`),
        }}
      >
        {ch}
      </span>
      {children}
    </span>
  );
};

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={abs(120, 996, {
        width: 1680,
        height: 44,
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        zIndex: 8,
      })}
    >
      <Mark size={34} />
      <span style={{ ...DISPLAY, fontSize: 30, letterSpacing: '-0.04em' }}>瑞瑞</span>
      <span style={{ ...MONO, color: MUTED, marginLeft: 18 }}>App 登場時刻 · 商業模式與價值</span>
      <span style={{ ...MONO, color: MUTED, marginLeft: 'auto', marginRight: 10 }}>
        比賽結束，才剛開始
      </span>
      <span
        style={{
          ...MONO,
          height: 38,
          padding: '0 16px',
          borderRadius: 999,
          background: INK,
          color: CREAM,
          display: 'inline-flex',
          alignItems: 'center',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {pad(current)} / {pad(total)}
      </span>
    </div>
  );
};

const Stage = ({ footer = true, children }: { footer?: boolean; children: ReactNode }) => (
  <div
    className="pm-root"
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      isolation: 'isolate',
      background: CREAM,
      color: INK,
      fontFamily: 'var(--osd-font-body)',
      textAlign: 'center',
    }}
  >
    {children}
    {footer && <Footer />}
  </div>
);

const Tag = ({
  n,
  children,
  live,
  y = 96,
  color = BUTTER,
}: {
  n: string;
  children: ReactNode;
  live: boolean;
  y?: number;
  color?: string;
}) => (
  <div style={abs(0, y, { width: 1920, display: 'flex', justifyContent: 'center' })}>
    <div
      style={{
        display: 'flex',
        alignItems: 'stretch',
        height: 46,
        border: `3px solid ${INK}`,
        borderRadius: 999,
        background: color,
        boxShadow: shadow(4),
        overflow: 'hidden',
        ...rise(live, 0, 20),
      }}
    >
      <span
        style={{
          ...MONO,
          fontSize: 18,
          padding: '0 14px 0 16px',
          display: 'flex',
          alignItems: 'center',
          background: INK,
          color: CREAM,
        }}
      >
        {n}
      </span>
      <span
        style={{
          ...MONO,
          fontSize: 18,
          padding: '0 20px 0 16px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {children}
      </span>
    </div>
  </div>
);

const Title = ({
  children,
  live,
  x = 120,
  y = 168,
  size = 88,
  width = 1680,
  delay = 70,
}: {
  children: ReactNode;
  live: boolean;
  x?: number;
  y?: number;
  size?: number;
  width?: number;
  delay?: number;
}) => (
  <h2 style={{ ...DISPLAY, ...abs(x, y), width, fontSize: size, ...rise(live, delay, 40) }}>
    {children}
  </h2>
);

const Footnote = ({
  x = 120,
  y,
  width = 1680,
  children,
}: {
  x?: number;
  y: number;
  width?: number;
  children: ReactNode;
}) => (
  <p style={{ ...BODY, ...abs(x, y), width, fontSize: 22, lineHeight: 1.4, color: MUTED }}>
    {children}
  </p>
);

const Sticker = ({
  x,
  y,
  r,
  live,
  delay,
  bg,
  children,
  round,
  pad: padding = '14px 26px',
  z = 6,
}: {
  x: number;
  y: number;
  r: number;
  live: boolean;
  delay: number;
  bg: string;
  children: ReactNode;
  round?: number;
  pad?: string;
  z?: number;
}) => (
  <div
    style={
      {
        ...abs(x, y),
        '--r': `${r}deg`,
        transform: `rotate(${r}deg)`,
        zIndex: z,
        ...anim(live, `pm-slap 760ms ${SLAP} ${delay}ms both`),
      } as CSSProperties
    }
  >
    <div
      style={{
        ...anim(live, `pm-wobble 5.2s ease-in-out ${delay + 900}ms infinite`),
        background: bg,
        border: BORDER,
        boxShadow: shadow(6),
        borderRadius: round ? '50%' : 22,
        width: round,
        height: round,
        padding: round ? 0 : padding,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  </div>
);

const Sparkle = ({
  x,
  y,
  size,
  color = BUTTER,
  live,
  delay,
}: {
  x: number;
  y: number;
  size: number;
  color?: string;
  live: boolean;
  delay: number;
}) => (
  <div
    style={{
      ...abs(x, y),
      width: size,
      height: size,
      ...anim(live, `pm-pop 700ms ${BOUNCY} ${delay}ms both`),
    }}
  >
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      aria-hidden="true"
      style={{
        display: 'block',
        overflow: 'visible',
        ...anim(live, `pm-twinkle 2.8s ease-in-out ${delay + 700}ms infinite`),
      }}
    >
      <path
        d="M20 2 C 22 14, 26 18, 38 20 C 26 22, 22 26, 20 38 C 18 26, 14 22, 2 20 C 14 18, 18 14, 20 2 Z"
        style={{ fill: color, stroke: INK, strokeWidth: 3, strokeLinejoin: 'round' }}
      />
    </svg>
  </div>
);

const Panel = ({
  x,
  y,
  width,
  height,
  color = PAPER,
  live,
  delay = 200,
  children,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  live: boolean;
  delay?: number;
  children: ReactNode;
}) => (
  <div
    style={abs(x, y, {
      width,
      height,
      boxSizing: 'border-box',
      padding: 36,
      background: color,
      border: BORDER,
      borderRadius: 34,
      boxShadow: shadow(10),
      ...rise(live, delay, 48),
    })}
  >
    {children}
  </div>
);

const AppStoreIcon = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    role="img"
    aria-label="App Store"
    style={{
      display: 'inline-block',
      verticalAlign: '-0.12em',
      marginRight: '0.18em',
      overflow: 'visible',
      filter: `drop-shadow(6px 6px 0 ${INK})`,
    }}
  >
    <defs>
      <linearGradient id="av-appstore" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1AC4FA" />
        <stop offset="1" stopColor="#1F6CF0" />
      </linearGradient>
    </defs>
    <rect
      x={2}
      y={2}
      width={60}
      height={60}
      rx={14}
      fill="url(#av-appstore)"
      stroke={INK}
      strokeWidth={3}
    />
    <g stroke="#FFFFFF" strokeWidth={4.6} strokeLinecap="round" fill="none">
      <path d="M 35.5 14.5 L 19 43" />
      <path d="M 28.5 14.5 L 45 43" />
      <path d="M 15 36.5 H 41" />
      <path d="M 15.5 47.5 L 13.5 51" />
    </g>
  </svg>
);

const TitleCover: Page = () => {
  const live = useLive();
  return (
    <Stage footer={false}>
      <p
        style={{
          ...MONO,
          ...abs(120, 120),
          width: 1200,
          fontSize: 24,
          textTransform: 'none',
          ...rise(live),
        }}
      >
        iOS Club · App 登場時刻
      </p>
      <h1
        style={{
          ...DISPLAY,
          ...abs(120, 300),
          fontSize: 150,
          lineHeight: 1.12,
          width: 1200,
          ...rise(live, 120),
        }}
      >
        <AppStoreIcon size={132} />
        App 的價值、
        <br />
        <span style={{ color: TOMATO }}>商業模式</span>與新創
      </h1>
      <p
        style={{
          ...BODY,
          ...abs(120, 720),
          width: 1200,
          fontSize: 40,
          fontWeight: 700,
          ...rise(live, 400),
        }}
      >
        分享 · 瑞瑞
      </p>
      <Panel x={1330} y={250} width={430} height={520} color={BUTTER} live={live} delay={250}>
        <div
          style={{
            margin: '60px auto 0',
            width: 300,
            ...anim(live, 'pm-bob 3.6s ease-in-out 1400ms infinite'),
          }}
        >
          <Mark size={300} />
        </div>
      </Panel>
      <Sticker x={1250} y={190} r={-8} live={live} delay={800} bg={MINT} pad="14px 28px">
        <span style={{ ...NUM, fontSize: 40 }}>11.04</span>
      </Sticker>
      <Sparkle x={1770} y={800} size={50} color={PINK} live={live} delay={1100} />
    </Stage>
  );
};

const Cover: Page = () => {
  const live = useLive();
  return (
    <Stage footer={false}>
      <div
        style={abs(120, 108, {
          width: 1220,
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          ...rise(live),
        })}
      >
        <Mark size={52} />
        <span style={{ ...MONO, fontSize: 24 }}>App 登場時刻 · 商業模式與價值 · 瑞瑞</span>
      </div>
      <h1
        style={{
          ...DISPLAY,
          ...abs(120, 270),
          fontSize: 118,
          lineHeight: 1.22,
          width: 1220,
          ...rise(live, 120),
        }}
      >
        如果這次沒得獎，
        <br />
        你的 App
        <br />
        <span style={{ color: TOMATO }}>還會繼續做下去嗎？</span>
      </h1>
      <Panel x={1390} y={275} width={370} height={490} color={PERI} live={live}>
        <div
          style={{
            margin: '18px auto 0',
            width: 240,
            ...anim(live, 'pm-bob 3.6s ease-in-out 1400ms infinite'),
          }}
        >
          <Mark size={240} />
        </div>
        <p style={{ ...DISPLAY, fontSize: 38, textAlign: 'center', marginTop: 50 }}>
          比完，然後呢？
        </p>
      </Panel>
      <Sticker x={1350} y={170} r={-7} live={live} delay={900} bg={BUTTER} pad="22px 34px">
        <span style={{ ...DISPLAY, fontSize: 44 }}>會的，舉手！</span>
      </Sticker>
      <Sparkle x={1750} y={770} size={50} color={PINK} live={live} delay={1150} />
      <p style={{ ...BODY, ...abs(120, 840), width: 1220, fontSize: 34, ...rise(live, 500) }}>
        今天聊聊，怎麼讓 App 活過比賽結束那天。
      </p>
      <p style={{ ...MONO, ...abs(120, 984), width: 1220, color: MUTED, textTransform: 'none' }}>
        iOS Club · 從比賽作品，到有人用的產品
      </p>
    </Stage>
  );
};

const AfterCompetition: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="01" live={live}>
        常見的選題習慣
      </Tag>
      <Title live={live}>題目很有意義，然後呢？</Title>
      <Panel x={120} y={350} width={760} height={280} color={PERI} live={live}>
        <p style={{ ...BODY, fontWeight: 700 }}>以前選題時，常聽到</p>
        <h3 style={{ ...DISPLAY, fontSize: 62, marginTop: 28 }}>
          「醫療、教育，
          <br />
          比較容易得獎。」
        </h3>
      </Panel>
      <div style={{ ...DISPLAY, ...abs(922, 440), fontSize: 80, ...rise(live, 350) }}>→</div>
      <Panel x={1060} y={350} width={740} height={280} color={PINK} live={live} delay={420}>
        <p style={{ ...BODY, fontWeight: 700 }}>卻可能變成</p>
        <h3 style={{ ...DISPLAY, fontSize: 62, marginTop: 28 }}>
          比賽結束那天，
          <br />
          App 也停了。
        </h3>
      </Panel>
      <div
        style={{
          ...DISPLAY,
          ...abs(120, 712),
          width: 1680,
          fontSize: 50,
          lineHeight: 1.4,
          ...rise(live, 650),
        }}
      >
        得獎了，至少還有<span style={{ color: TOMATO }}>獎金和掌聲</span>。
        <br />
        沒得獎呢？它就<span style={{ color: TOMATO }}>真的沒有了</span>嗎？
      </div>
      <FooterNote>醫療、教育當然可以做。先問，誰真的需要？</FooterNote>
    </Stage>
  );
};

const WhoDecides: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="02" live={live}>
        誰來決定
      </Tag>
      <Title live={live}>為什麼要把 App 的結局，交給評審決定？</Title>
      <Panel x={120} y={350} width={760} height={330} color={PAPER} live={live}>
        <p style={{ ...BODY, fontWeight: 700 }}>評審決定的</p>
        <h3 style={{ ...DISPLAY, fontSize: 64, marginTop: 28 }}>得不得獎</h3>
        <p style={{ ...BODY, fontSize: 30, marginTop: 22, color: MUTED }}>看的是評審的喜好。</p>
      </Panel>
      <div style={{ ...DISPLAY, ...abs(922, 470), fontSize: 80, ...rise(live, 350) }}>≠</div>
      <Panel x={1060} y={350} width={740} height={330} color={BUTTER} live={live} delay={420}>
        <p style={{ ...BODY, fontWeight: 700 }}>你自己決定的</p>
        <h3 style={{ ...DISPLAY, fontSize: 64, marginTop: 28 }}>要不要繼續做</h3>
        <p style={{ ...BODY, fontSize: 30, marginTop: 22 }}>看的是你想不想。</p>
      </Panel>
      <div
        style={{
          ...DISPLAY,
          ...abs(120, 760),
          width: 1680,
          fontSize: 50,
          lineHeight: 1.4,
          ...rise(live, 650),
        }}
      >
        App 要不要活下去，應該由<span style={{ color: TOMATO }}>你自己</span>決定。
      </div>
    </Stage>
  );
};

const FooterNote = ({ children }: { children: ReactNode }) => (
  <Footnote y={940}>{children}</Footnote>
);

const ReasonCard = ({
  x,
  y,
  r,
  color,
  title,
  children,
  live,
  delay,
}: {
  x: number;
  y: number;
  r: number;
  color: string;
  title: string;
  children: ReactNode;
  live: boolean;
  delay: number;
}) => (
  <Sticker x={x} y={y} r={r} live={live} delay={delay} bg={color} pad="36px">
    <div style={{ width: 430, height: 260, textAlign: 'left' }}>
      <h3 style={{ ...DISPLAY, fontSize: 52, lineHeight: 1.22 }}>{title}</h3>
      <p style={{ ...BODY, fontSize: 32, lineHeight: 1.5, marginTop: 36 }}>{children}</p>
    </div>
  </Sticker>
);

const Blank: Page = () => <Stage>{null}</Stage>;

const ReasonsToContinue: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="03" live={live}>
        撐下去的理由
      </Tag>
      <Title live={live}>你為什麼想做這個 App？</Title>
      <ReasonCard x={145} y={385} r={-3} color={BUTTER} title="改善生活" live={live} delay={200}>
        解決你自己每天都會碰到的
        <br />
        麻煩，你就是第一個使用者。
      </ReasonCard>
      <ReasonCard x={715} y={425} r={2} color={MINT} title="幫助弱勢" live={live} delay={400}>
        做給真的需要的人，有人因為你的 App 過得好一點。
      </ReasonCard>
      <ReasonCard
        x={1285}
        y={385}
        r={-2}
        color={PERI}
        title="完成心裡的理想"
        live={live}
        delay={600}
      >
        你一直想做、想證明給自己看的那件事。
      </ReasonCard>
      <p
        style={{
          ...BODY,
          ...abs(120, 875),
          width: 1680,
          fontSize: 38,
          fontWeight: 700,
          ...rise(live, 900),
        }}
      >
        理由也可以很實際：<span style={{ color: TOMATO }}>有人願意為它付出</span>。
      </p>
    </Stage>
  );
};

const CampusMath: Page = () => {
  const live = useLive();
  const revenue = useCount(60000, live, 650, 1700);
  return (
    <Stage>
      <Tag n="08" live={live}>
        算給你看
      </Tag>
      <Title live={live}>不用先改變世界，先從你的學校開始。</Title>
      <div
        style={abs(120, 338, {
          width: 1680,
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
          gap: 60,
          ...rise(live, 180),
        })}
      >
        <div>
          <span style={{ ...NUM, fontSize: 134 }}>6,000</span>
          <span style={{ ...BODY, marginLeft: 24 }}>人</span>
        </div>
        <span style={{ ...DISPLAY, fontSize: 80 }}>×</span>
        <div>
          <span style={{ ...NUM, fontSize: 134 }}>NT$10</span>
          <span style={{ ...BODY, marginLeft: 24 }}>／月</span>
        </div>
        <span style={{ ...DISPLAY, fontSize: 80 }}>＝</span>
      </div>
      <Panel x={120} y={540} width={1680} height={280} color={TOMATO} live={live} delay={350}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            gap: 24,
            ...anim(live, 'pm-thunk 620ms ease-out 2350ms both'),
          }}
        >
          <span style={{ ...DISPLAY, fontSize: 70 }}>NT$</span>
          <span style={{ ...NUM, fontSize: 230, lineHeight: 0.86, letterSpacing: '-0.05em' }}>
            {Math.round(revenue).toLocaleString('en-US')}
          </span>
          <span style={{ ...DISPLAY, fontSize: 60 }}>／月</span>
        </div>
      </Panel>
      <p
        style={{
          ...BODY,
          ...abs(120, 866),
          width: 1680,
          fontSize: 36,
          fontWeight: 700,
          ...rise(live, 750),
        }}
      >
        躺在家做自己喜歡的事，也能過生活。
      </p>
      <FooterNote>
        假設學校裡有 6,000 個人用，每人每月付 10 塊。這是營收試算，還沒扣成本與費用。
      </FooterNote>
    </Stage>
  );
};

const PurchaseSticker = ({
  x,
  y,
  r,
  color,
  label,
  live,
  delay,
  children,
}: {
  x: number;
  y: number;
  r: number;
  color: string;
  label: string;
  live: boolean;
  delay: number;
  children: ReactNode;
}) => (
  <Sticker x={x} y={y} r={r} bg={color} live={live} delay={delay} pad="24px 32px">
    <svg
      width={110}
      height={90}
      viewBox="0 0 110 90"
      aria-hidden="true"
      style={{ fill: PAPER, stroke: INK, strokeWidth: 4, strokeLinejoin: 'round' }}
    >
      {children}
    </svg>
    <span style={{ ...DISPLAY, fontSize: 40, marginTop: 12 }}>{label}</span>
  </Sticker>
);

const WhatIsMoney: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="04" live={live}>
        錢是什麼
      </Tag>
      <Title live={live}>100 塊，為什麼值 100 塊？</Title>
      <p style={{ ...BODY, ...abs(120, 293), width: 1680, fontSize: 34, ...rise(live, 180) }}>
        因為它能換到東西。
      </p>
      <div style={abs(580, 410, { ...rise(live, 250) })}>
        <div
          style={{
            width: 760,
            height: 372,
            border: BORDER,
            borderRadius: 18,
            boxShadow: shadow(12),
            overflow: 'hidden',
            background: PAPER,
            transform: 'rotate(-3deg)',
          }}
        >
          <img
            src={ntd100}
            alt="新臺幣 100 元券正面樣張"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>
      <PurchaseSticker x={245} y={410} r={-8} color={BUTTER} label="便當" live={live} delay={850}>
        <rect x={10} y={15} width={90} height={62} rx={12} />
        <path d="M 65 15 V 77 M 65 46 H 100" fill="none" />
        <circle cx={38} cy={46} r={16} fill={CREAM} />
        <path d="M 77 29 L 88 34 M 78 59 L 89 64" strokeLinecap="round" />
      </PurchaseSticker>
      <PurchaseSticker x={1460} y={355} r={7} color={PINK} label="飲料" live={live} delay={1200}>
        <path d="M 30 20 H 83 L 76 82 H 37 Z" />
        <path d="M 25 20 H 88 M 60 20 L 68 2 H 82" fill="none" strokeLinecap="round" />
        <circle cx={48} cy={65} r={4} fill={INK} stroke="none" />
        <circle cx={64} cy={68} r={4} fill={INK} stroke="none" />
      </PurchaseSticker>
      <PurchaseSticker x={1465} y={635} r={-5} color={PERI} label="公車" live={live} delay={1550}>
        <rect x={17} y={9} width={76} height={66} rx={12} />
        <path d="M 17 44 H 93 M 55 9 V 44 M 29 75 V 84 M 81 75 V 84" fill="none" />
        <circle cx={32} cy={60} r={5} fill={BUTTER} />
        <circle cx={78} cy={60} r={5} fill={BUTTER} />
      </PurchaseSticker>
      <p
        style={{
          ...DISPLAY,
          ...abs(120, 875),
          width: 1680,
          fontSize: 44,
          ...rise(live, 2000),
        }}
      >
        能換到便當、飲料、公車，它才值 100 塊。
      </p>
    </Stage>
  );
};

const MoneyWaste: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="04" live={live}>
        錢是什麼
      </Tag>
      <Title live={live}>如果有一天，它什麼都買不到……</Title>
      <div style={abs(580, 410, { ...rise(live, 250) })}>
        <div
          style={{
            width: 760,
            height: 372,
            border: BORDER,
            borderRadius: 18,
            boxShadow: shadow(12),
            overflow: 'hidden',
            background: PAPER,
            filter: 'grayscale(1)',
            transform: 'rotate(-3deg)',
            ...anim(live, 'av-grey 700ms ease-out 300ms both'),
          }}
        >
          <img
            src={ntd100}
            alt="新臺幣 100 元券正面樣張"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </div>
      <Sticker x={1000} y={565} r={-12} live={live} delay={900} bg={TOMATO} pad="22px 38px">
        <span style={{ ...DISPLAY, fontSize: 92 }}>廢紙</span>
      </Sticker>
      <p
        style={{
          ...DISPLAY,
          ...abs(120, 875),
          width: 1680,
          fontSize: 44,
          ...rise(live, 1500),
        }}
      >
        錢本身沒有價值，能換到東西，它才有價值。
      </p>
    </Stage>
  );
};

const Umbrella = ({ rain }: { rain: boolean }) => (
  <svg
    width={150}
    height={150}
    viewBox="0 0 120 120"
    aria-hidden="true"
    style={{ display: 'block', margin: '0 auto', overflow: 'visible' }}
  >
    {rain ? (
      <g stroke={INK} strokeWidth={4} strokeLinecap="round">
        <path d="M 14 10 L 8 24 M 40 4 L 34 18 M 84 4 L 78 18 M 110 10 L 104 24" />
        <path d="M 10 80 L 4 94 M 112 78 L 106 92" />
      </g>
    ) : (
      <g stroke={INK} strokeWidth={4}>
        <circle cx={102} cy={18} r={11} fill={BUTTER} />
        <path d="M 102 0 V 3 M 102 33 V 36 M 84 18 H 87 M 117 18 H 120" strokeLinecap="round" />
      </g>
    )}
    <path
      d="M 14 62 C 14 34, 36 18, 60 18 C 84 18, 106 34, 106 62 C 98 56, 90 56, 83 62 C 76 56, 67 56, 60 62 C 53 56, 44 56, 37 62 C 30 56, 22 56, 14 62 Z"
      fill={TOMATO}
      stroke={INK}
      strokeWidth={4}
      strokeLinejoin="round"
    />
    <path
      d="M 60 62 V 100 C 60 110, 46 110, 46 100"
      fill="none"
      stroke={INK}
      strokeWidth={5}
      strokeLinecap="round"
    />
  </svg>
);

const WhatIsValue: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="05" live={live}>
        價值是什麼
      </Tag>
      <Title live={live}>什麼是價值？</Title>
      <p style={{ ...BODY, ...abs(120, 290), width: 1680, fontSize: 34, ...rise(live, 180) }}>
        一樣東西能幫你解決多少問題、對你有多重要。
      </p>
      <Panel x={190} y={380} width={700} height={420} color={BUTTER} live={live} delay={300}>
        <Umbrella rain={false} />
        <h3 style={{ ...DISPLAY, fontSize: 52, marginTop: 24 }}>晴天的雨傘</h3>
        <p style={{ ...BODY, fontSize: 30, marginTop: 14 }}>放在包包裡，只覺得重。</p>
      </Panel>
      <Panel x={1030} y={380} width={700} height={420} color={PERI} live={live} delay={650}>
        <Umbrella rain />
        <h3 style={{ ...DISPLAY, fontSize: 52, marginTop: 24 }}>大雨裡的雨傘</h3>
        <p style={{ ...BODY, fontSize: 30, marginTop: 14 }}>沒有它，就全身濕透。</p>
      </Panel>
      <Sticker x={760} y={350} r={8} bg={PINK} live={live} delay={1300} pad="10px 24px">
        <span style={{ ...DISPLAY, fontSize: 36 }}>價值低</span>
      </Sticker>
      <Sticker x={1600} y={350} r={-6} bg={MINT} live={live} delay={1600} pad="10px 24px">
        <span style={{ ...DISPLAY, fontSize: 36 }}>價值高</span>
      </Sticker>
      <p style={{ ...DISPLAY, ...abs(120, 880), width: 1680, fontSize: 40, ...rise(live, 1900) }}>
        同一把傘，價值看的是誰、在什麼時候需要它。
      </p>
    </Stage>
  );
};

const COSTS: { title: string; detail: string; color: string }[] = [
  { title: '錢', detail: '訂閱費、內購、手續費。', color: PINK },
  { title: '時間', detail: '下載、註冊、學怎麼用。', color: BUTTER },
  { title: '注意力', detail: '看廣告、被通知打擾。', color: MINT },
  { title: '心力', detail: '要想、要選、要記得用。', color: PERI },
  { title: '精神', detail: '介面難用，越用越累。', color: BUTTER },
  { title: '習慣', detail: '放棄原本用順手的方法。', color: MINT },
  { title: '個資', detail: '交出位置和聯絡人。', color: PERI },
  { title: '機會成本', detail: '付你 10 塊，少喝杯紅茶。', color: PINK },
];

const WhatIsCost: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="06" live={live}>
        成本是什麼
      </Tag>
      <Title live={live}>什麼是成本？</Title>
      <p style={{ ...BODY, ...abs(120, 290), width: 1680, fontSize: 34, ...rise(live, 180) }}>
        為了得到一樣東西，你得先放棄的東西。不只是錢。
      </p>
      {COSTS.map((cost, i) => (
        <Panel
          key={cost.title}
          x={120 + (i % 4) * 430}
          y={i < 4 ? 375 : 625}
          width={390}
          height={220}
          color={cost.color}
          live={live}
          delay={300 + i * 140}
        >
          <h3 style={{ ...DISPLAY, fontSize: 60 }}>{cost.title}</h3>
          <p style={{ ...BODY, fontSize: 27, lineHeight: 1.45, marginTop: 16 }}>{cost.detail}</p>
        </Panel>
      ))}
      <p style={{ ...DISPLAY, ...abs(120, 890), width: 1680, fontSize: 40, ...rise(live, 1600) }}>
        使用者每打開一次你的 App，都在付出成本。
      </p>
    </Stage>
  );
};

const ValueWeight = ({
  x,
  height,
  color,
  label,
  children,
  live,
  delay,
}: {
  x: number;
  height: number;
  color: string;
  label: string;
  children: ReactNode;
  live: boolean;
  delay: number;
}) => (
  <div
    style={{
      ...abs(x, 190 - height),
      width: 260,
      height,
      ...anim(live, `pm-drop 900ms ${DROP} ${delay}ms both`),
    }}
  >
    <div
      style={{
        height: '100%',
        boxSizing: 'border-box',
        background: color,
        border: BORDER,
        borderRadius: 22,
        boxShadow: shadow(6),
        padding: '18px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transformOrigin: '50% 100%',
        ...anim(live, `pm-squash 520ms ease-out ${delay + 505}ms both`),
      }}
    >
      <span style={{ ...BODY, fontSize: 24, fontWeight: 700 }}>{label}</span>
      <span style={{ ...DISPLAY, fontSize: 39 }}>{children}</span>
    </div>
  </div>
);

const ValueBalance = ({ purchase, live }: { purchase: 'bag' | 'concert'; live: boolean }) => {
  const isApp = purchase === 'concert';
  const delay = isApp ? 2800 : 450;
  return (
    <div style={abs(34, 190, { width: 730, height: 275 })}>
      <div style={abs(0, 273, { width: 730, height: 4, background: INK, borderRadius: 2 })} />
      <svg width={130} height={82} viewBox="0 0 130 82" aria-hidden="true" style={abs(300, 193)}>
        <path
          d="M 65 4 L 124 80 H 6 Z"
          fill={BUTTER}
          stroke={INK}
          strokeWidth={4}
          strokeLinejoin="round"
        />
        <circle cx={65} cy={8} r={7} fill={INK} />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: '365px 200px',
          transform: `rotate(${isApp ? 8 : -8}deg)`,
          ...anim(live, `av-tip 1300ms ${BOUNCY} ${delay + 1050}ms both`),
        }}
      >
        <div
          style={abs(0, 190, {
            width: 730,
            height: 24,
            boxSizing: 'border-box',
            background: PAPER,
            border: BORDER,
            borderRadius: 12,
          })}
        />
        <ValueWeight
          x={22}
          height={isApp ? 110 : 165}
          color={PINK}
          label="你付出的成本"
          live={live}
          delay={delay}
        >
          {isApp ? '票價＋搶票' : '價格很重'}
        </ValueWeight>
        <ValueWeight
          x={448}
          height={isApp ? 165 : 110}
          color={MINT}
          label="你換到的價值"
          live={live}
          delay={delay + 550}
        >
          {isApp ? '難忘回憶' : '生活用不到'}
        </ValueWeight>
      </div>
    </div>
  );
};

const ValueExchange: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="07" live={live}>
        價值
      </Tag>
      <Title live={live}>付出成本，是在換一個值得的東西。</Title>
      <p style={{ ...BODY, ...abs(120, 272), width: 1680, fontSize: 28, color: MUTED }}>
        左邊是成本，右邊是價值。
      </p>
      <Panel x={120} y={350} width={800} height={510} live={live}>
        <h3 style={{ ...DISPLAY, fontSize: 52 }}>名牌包</h3>
        <p style={{ ...BODY, fontSize: 28, lineHeight: 1.5, marginTop: 20 }}>
          學生生活用不到這個價值，
          <br />
          也拿不出能換它的錢。
        </p>
        <ValueBalance purchase="bag" live={live} />
      </Panel>
      <Panel x={1000} y={350} width={800} height={510} live={live} delay={350}>
        <h3 style={{ ...DISPLAY, fontSize: 52 }}>演唱會門票</h3>
        <p style={{ ...BODY, fontSize: 28, lineHeight: 1.5, marginTop: 20 }}>
          票不便宜，還要花時間搶，
          <br />
          但對粉絲來說，換到的更重。
        </p>
        <ValueBalance purchase="concert" live={live} />
      </Panel>
      <Sticker x={723} y={320} r={8} bg={PINK} live={live} delay={2150} pad="12px 24px">
        <span style={{ ...DISPLAY, fontSize: 38 }}>不買</span>
      </Sticker>
      <Sticker x={1554} y={320} r={-6} bg={MINT} live={live} delay={4500} pad="12px 24px">
        <span style={{ ...DISPLAY, fontSize: 38 }}>願意付</span>
      </Sticker>
      <p style={{ ...DISPLAY, ...abs(120, 908), width: 1680, fontSize: 38 }}>
        使用者願不願意付出成本，看的是你給的價值夠不夠重。
      </p>
    </Stage>
  );
};

const POLL_USERS = 6000;
const POLL_PRICE = 10;
const POLL_RATIOS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const POLL_BAR_MAX = 520;

const PollQuestion = ({
  n,
  children,
  live,
  delay,
}: {
  n: string;
  children: ReactNode;
  live: boolean;
  delay: number;
}) => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', ...rise(live, delay, 20) }}>
    <span
      style={{
        ...NUM,
        flex: 'none',
        width: 48,
        height: 48,
        borderRadius: '50%',
        border: `3px solid ${INK}`,
        background: BUTTER,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 26,
      }}
    >
      {n}
    </span>
    <p style={{ ...DISPLAY, fontSize: 32, lineHeight: 1.3 }}>{children}</p>
  </div>
);

const LivePoll: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="09" live={live}>
        現場調查
      </Tag>
      <Title live={live} size={80}>
        你能不能提供價值，讓使用者買單？
      </Title>
      <div
        style={abs(120, 300, {
          width: 250,
          height: 543,
          border: BORDER,
          borderRadius: 36,
          boxShadow: shadow(10),
          overflow: 'hidden',
          background: PAPER,
          ...rise(live, 200, 48),
        })}
      >
        <img
          src={banfengHome}
          alt="半逢遇甲的美食首頁截圖"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div style={abs(410, 300, { width: 370, ...rise(live, 320, 24) })}>
        <h3 style={{ ...DISPLAY, fontSize: 56 }}>半逢遇甲</h3>
        <p style={{ ...BODY, fontSize: 24, lineHeight: 1.5, marginTop: 12 }}>
          逢甲的校園資訊 App：課表、iLearn、公車、停車，加上 596 家店的美食地圖。
        </p>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            gap: 10,
            marginTop: 18,
            padding: '8px 18px',
            border: `3px solid ${INK}`,
            borderRadius: 999,
            background: MINT,
            boxShadow: shadow(4),
          }}
        >
          <span style={{ ...BODY, fontSize: 22, fontWeight: 700 }}>每月活躍 約</span>
          <span style={{ ...NUM, fontSize: 34 }}>6,000</span>
          <span style={{ ...BODY, fontSize: 22, fontWeight: 700 }}>人</span>
        </div>
      </div>
      <div style={abs(410, 600, { width: 380, display: 'flex', flexDirection: 'column', gap: 22 })}>
        <PollQuestion n="1" live={live} delay={700}>
          你有在用半逢遇甲嗎？
        </PollQuestion>
        <PollQuestion n="2" live={live} delay={1000}>
          如果一個月收 10 塊，你會買單嗎？
        </PollQuestion>
      </div>
      <Sticker x={640} y={770} r={-7} bg={TOMATO} live={live} delay={1400} pad="10px 22px">
        <span style={{ ...DISPLAY, fontSize: 34 }}>舉手！</span>
      </Sticker>
      <div
        style={abs(860, 296, {
          width: 940,
          display: 'flex',
          flexDirection: 'column',
          gap: 11,
        })}
      >
        {POLL_RATIOS.map((ratio, i) => {
          const income = (POLL_USERS * ratio * POLL_PRICE) / 100;
          return (
            <div key={ratio} style={{ display: 'flex', alignItems: 'center', gap: 18, height: 44 }}>
              <span style={{ ...NUM, width: 96, fontSize: 32, textAlign: 'right' }}>{ratio}%</span>
              <div style={{ width: POLL_BAR_MAX, height: 34, position: 'relative' }}>
                <div
                  style={{
                    width: (POLL_BAR_MAX * ratio) / 100,
                    height: '100%',
                    boxSizing: 'border-box',
                    background: ratio === 100 ? TOMATO : BUTTER,
                    border: `3px solid ${INK}`,
                    borderRadius: 10,
                    boxShadow: shadow(4),
                    transformOrigin: 'left center',
                    ...anim(live, `av-grow 700ms ${SNAPPY} ${1600 + i * 110}ms both`),
                  }}
                />
              </div>
              <span
                style={{
                  ...NUM,
                  width: 270,
                  fontSize: 36,
                  textAlign: 'right',
                  ...rise(live, 1750 + i * 110, 12),
                }}
              >
                NT${income.toLocaleString('en-US')}
              </span>
            </div>
          );
        })}
      </div>
      <p style={{ ...DISPLAY, ...abs(120, 908), width: 1680, fontSize: 38 }}>
        這樣的比例，我一個月躺在家裡，就能賺到這麼多。
      </p>
    </Stage>
  );
};

const AttentionNode = ({
  x,
  y,
  label,
  detail,
  color,
  live,
  delay,
}: {
  x: number;
  y: number;
  label: string;
  detail: string;
  color: string;
  live: boolean;
  delay: number;
}) => (
  <Panel x={x} y={y} width={340} height={235} color={color} live={live} delay={delay}>
    <h3 style={{ ...DISPLAY, fontSize: 80 }}>{label}</h3>
    <p style={{ ...BODY, fontSize: 28, marginTop: 22 }}>{detail}</p>
  </Panel>
);

const AttentionArrow = ({ d, live, delay }: { d: string; live: boolean; delay: number }) => (
  <path
    d={d}
    fill="none"
    stroke={INK}
    strokeWidth={7}
    strokeLinecap="round"
    strokeLinejoin="round"
    markerEnd="url(#av-arrow)"
    pathLength={1}
    strokeDasharray={1}
    style={anim(live, `av-draw 750ms ${EASE_OUT} ${delay}ms both`)}
  />
);

const Instagram: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="10" live={live}>
        IG 靠什麼賺錢
      </Tag>
      <Title live={live}>IG 不收你錢，那它靠什麼賺？</Title>
      <svg
        width={1680}
        height={550}
        viewBox="0 0 1680 550"
        aria-hidden="true"
        style={{ ...abs(120, 330), overflow: 'visible' }}
      >
        <defs>
          <marker
            id="av-arrow"
            markerWidth={14}
            markerHeight={14}
            refX={9}
            refY={5}
            orient="auto"
            markerUnits="userSpaceOnUse"
          >
            <path
              d="M 1 1 L 9 5 L 1 9"
              fill="none"
              stroke={INK}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>
        <AttentionArrow d="M 390 265 H 620" live={live} delay={650} />
        <AttentionArrow d="M 1010 195 C 1090 100 1160 100 1240 195" live={live} delay={1700} />
        <AttentionArrow d="M 1240 350 C 1150 465 1080 465 1010 350" live={live} delay={2900} />
      </svg>
      <AttentionNode
        x={160}
        y={480}
        label="你"
        detail="滑 Reels、看內容"
        color={BUTTER}
        live={live}
        delay={200}
      />
      <AttentionNode
        x={760}
        y={480}
        label="IG"
        detail="用內容留住你"
        color={PERI}
        live={live}
        delay={400}
      />
      <AttentionNode
        x={1400}
        y={480}
        label="廣告商"
        detail="想讓你看到產品"
        color={MINT}
        live={live}
        delay={1550}
      />
      <p style={{ ...DISPLAY, ...abs(524, 520), fontSize: 28, ...rise(live, 850, 12) }}>
        時間、注意力
      </p>
      <p style={{ ...DISPLAY, ...abs(1125, 385), fontSize: 30, ...rise(live, 2000, 12) }}>
        你的注意力
      </p>
      <Sticker x={1190} y={755} r={-6} bg={TOMATO} live={live} delay={3350} pad="10px 30px">
        <span style={{ ...DISPLAY, fontSize: 46 }}>錢</span>
      </Sticker>
      <p style={{ ...DISPLAY, ...abs(120, 905), width: 1680, fontSize: 44 }}>
        你沒有付錢，你付的是時間，也就是你的注意力。
      </p>
    </Stage>
  );
};

const FlowCard = ({
  x,
  color,
  title,
  children,
  live,
  delay,
}: {
  x: number;
  color: string;
  title: string;
  children: ReactNode;
  live: boolean;
  delay: number;
}) => (
  <Panel x={x} y={390} width={470} height={350} color={color} live={live} delay={delay}>
    <h3 style={{ ...DISPLAY, fontSize: 76, marginTop: 16 }}>{title}</h3>
    <p style={{ ...BODY, fontSize: 32, marginTop: 48 }}>{children}</p>
  </Panel>
);

const Traffic: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="11" live={live}>
        注意力，也有價值
      </Tag>
      <Title live={live}>有人每天打開，就有變現的機會。</Title>
      <p style={{ ...BODY, ...abs(120, 295), width: 1680, fontSize: 30, ...rise(live, 120) }}>
        從 IG 回到校園，注意力也能換到錢。
      </p>
      <FlowCard x={120} color={MINT} title="使用者" live={live} delay={200}>
        真的需要，
        <br />
        才會一直回來。
      </FlowCard>
      <span style={{ ...DISPLAY, ...abs(615, 510), fontSize: 72, ...rise(live, 350) }}>→</span>
      <FlowCard x={725} color={PERI} title="流量" live={live} delay={450}>
        每天有人看，
        <br />
        也有人找東西。
      </FlowCard>
      <span style={{ ...DISPLAY, ...abs(1220, 510), fontSize: 72, ...rise(live, 600) }}>→</span>
      <FlowCard x={1330} color={BUTTER} title="變現" live={live} delay={700}>
        付費功能、廣告，
        <br />
        或促成交易。
      </FlowCard>
      <Sticker x={1290} y={300} r={5} live={live} delay={1150} bg={PINK}>
        <span style={{ fontSize: 30, fontWeight: 900 }}>先留住人，再想怎麼收錢。</span>
      </Sticker>
      <p style={{ ...BODY, ...abs(120, 840), width: 1680, fontSize: 38, fontWeight: 700 }}>
        6,000 個人的注意力，就是廣告商想買的東西。
      </p>
      <FooterNote>有流量不是自動有收入。還得找到願意付錢的人，以及他願意買的價值。</FooterNote>
    </Stage>
  );
};

const ModelCard = ({
  x,
  color,
  title,
  payer,
  children,
  live,
  delay,
}: {
  x: number;
  color: string;
  title: ReactNode;
  payer: string;
  children: ReactNode;
  live: boolean;
  delay: number;
}) => (
  <Panel x={x} y={365} width={390} height={470} color={color} live={live} delay={delay}>
    <h3 style={{ ...DISPLAY, fontSize: 48, lineHeight: 1.22, minHeight: 126 }}>{title}</h3>
    <p
      style={{
        ...BODY,
        fontSize: 28,
        fontWeight: 700,
        paddingTop: 22,
        borderTop: `3px dashed ${FAINT}`,
      }}
    >
      {payer}
    </p>
    <p style={{ ...BODY, fontSize: 30, lineHeight: 1.5, marginTop: 24 }}>{children}</p>
  </Panel>
);

const BusinessModels: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="12" live={live}>
        四種賺錢方式
      </Tag>
      <Title live={live}>誰付錢？為什麼願意付？</Title>
      <p style={{ ...BODY, ...abs(120, 290), width: 1680, fontSize: 30, fontWeight: 700 }}>
        確定有價值，接下來是怎麼收。
      </p>
      <ModelCard
        x={120}
        color={BUTTER}
        title="訂閱制"
        payer="為持續使用付費"
        live={live}
        delay={200}
      >
        社團排班工具，
        <br />
        每月付費用進階功能。
      </ModelCard>
      <ModelCard
        x={550}
        color={MINT}
        title={
          <>
            單次付費
            <br />
            ／內購
          </>
        }
        payer="為某個功能付費"
        live={live}
        delay={350}
      >
        校園活動修圖，
        <br />
        付費解鎖素材包。
      </ModelCard>
      <ModelCard x={980} color={PERI} title="廣告" payer="店家為曝光付費" live={live} delay={500}>
        宵夜資訊 App，
        <br />
        校園店家買推薦版位。
      </ModelCard>
      <ModelCard
        x={1410}
        color={PINK}
        title={
          <>
            抽成
            <br />
            ／媒合
          </>
        }
        payer="為促成交易付費"
        live={live}
        delay={650}
      >
        二手教科書成交，
        <br />
        平台收服務費。
      </ModelCard>
      <p style={{ ...BODY, ...abs(120, 900), width: 1680, fontSize: 34, fontWeight: 700 }}>
        同樣是校園 App，付錢的人可以是同學，也可以是店家。
      </p>
    </Stage>
  );
};

type CaseStudyData = {
  name: string;
  batch: string;
  tagline: string;
  problem: string;
  solution: string;
  revenue: string;
  icon: string;
  shots: string[];
  source: string;
};

const CaseCard = ({
  y,
  color,
  label,
  live,
  delay,
  children,
}: {
  y: number;
  color: string;
  label: string;
  live: boolean;
  delay: number;
  children: ReactNode;
}) => (
  <div
    style={abs(900, y, {
      width: 900,
      height: 150,
      boxSizing: 'border-box',
      padding: '20px 32px',
      background: color,
      border: BORDER,
      borderRadius: 26,
      boxShadow: shadow(8),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 8,
      ...rise(live, delay, 32),
    })}
  >
    <span style={{ ...DISPLAY, fontSize: 30 }}>{label}</span>
    <span style={{ ...BODY, fontSize: 27, lineHeight: 1.4 }}>{children}</span>
  </div>
);

const caseStudyPage = (data: CaseStudyData): Page => {
  const CaseStudy: Page = () => {
    const live = useLive();
    const shotWidth = data.shots.length > 2 ? 220 : 260;
    const gap = 24;
    const rowWidth = data.shots.length * shotWidth + (data.shots.length - 1) * gap;
    return (
      <Stage>
        <Tag n="12" live={live}>
          886 案例 · {data.batch}
        </Tag>
        <div
          style={abs(120, 168, {
            width: 1680,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 28,
            ...rise(live, 70, 40),
          })}
        >
          <img
            src={data.icon}
            alt=""
            style={{
              width: 96,
              height: 96,
              borderRadius: 22,
              border: BORDER,
              boxShadow: shadow(5),
              display: 'block',
            }}
          />
          <h2 style={{ ...DISPLAY, fontSize: 88 }}>{data.name}</h2>
        </div>
        <p style={{ ...BODY, ...abs(120, 290), width: 1680, fontSize: 32, ...rise(live, 180) }}>
          {data.tagline}
        </p>
        <div
          style={abs(120 + (740 - rowWidth) / 2, 360, {
            display: 'flex',
            gap,
            ...rise(live, 250, 40),
          })}
        >
          {data.shots.map((shot, i) => (
            <img
              key={shot}
              src={shot}
              alt={`${data.name} 畫面 ${i + 1}`}
              style={{
                width: shotWidth,
                height: 480,
                objectFit: 'cover',
                objectPosition: 'top',
                borderRadius: 26,
                border: BORDER,
                boxShadow: shadow(8),
                display: 'block',
                background: PAPER,
              }}
            />
          ))}
        </div>
        <CaseCard y={360} color={PINK} label="遇到的問題" live={live} delay={450}>
          {data.problem}
        </CaseCard>
        <CaseCard y={525} color={MINT} label="解決辦法" live={live} delay={650}>
          {data.solution}
        </CaseCard>
        <CaseCard y={690} color={BUTTER} label="盈利模式" live={live} delay={850}>
          {data.revenue}
        </CaseCard>
        <Footnote y={890}>{data.source}</Footnote>
      </Stage>
    );
  };
  return CaseStudy;
};

type CompetitionData = {
  name: string;
  organizer: string;
  who: string;
  flow: string;
  rewards: string[];
  source: string;
};

const competitionPage = (data: CompetitionData): Page => {
  const Competition: Page = () => {
    const live = useLive();
    return (
      <Stage>
        <Tag n="13" live={live}>
          新創競賽
        </Tag>
        <Title live={live}>{data.name}</Title>
        <p style={{ ...BODY, ...abs(120, 290), width: 1680, fontSize: 32, ...rise(live, 180) }}>
          {data.organizer}
        </p>
        <Panel x={120} y={370} width={760} height={225} color={PERI} live={live} delay={300}>
          <h3 style={{ ...DISPLAY, fontSize: 36 }}>誰可以參加</h3>
          <p style={{ ...BODY, fontSize: 27, lineHeight: 1.45, marginTop: 12 }}>{data.who}</p>
        </Panel>
        <Panel x={120} y={625} width={760} height={225} color={MINT} live={live} delay={500}>
          <h3 style={{ ...DISPLAY, fontSize: 36 }}>怎麼比</h3>
          <p style={{ ...BODY, fontSize: 27, lineHeight: 1.45, marginTop: 12 }}>{data.flow}</p>
        </Panel>
        <Panel x={940} y={370} width={860} height={480} color={BUTTER} live={live} delay={700}>
          <h3 style={{ ...DISPLAY, fontSize: 44 }}>獎勵</h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              marginTop: 22,
            }}
          >
            {data.rewards.map((reward) => (
              <p key={reward} style={{ ...DISPLAY, fontSize: 32, lineHeight: 1.3 }}>
                {reward}
              </p>
            ))}
          </div>
        </Panel>
        <Footnote y={890}>{data.source}</Footnote>
      </Stage>
    );
  };
  return Competition;
};

const FindProblem: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="13" live={live}>
        怎麼找題目
      </Tag>
      <Title live={live} size={82}>
        找一件煩到大家願意
        <br />
        <span style={{ color: TOMATO }}>每個月付 10 塊</span>解決的事。
      </Title>
      <Sticker x={155} y={485} r={-5} live={live} delay={350} bg={BUTTER} pad="28px 42px">
        <span style={{ ...DISPLAY, fontSize: 58 }}>選課</span>
      </Sticker>
      <Sticker x={510} y={500} r={4} live={live} delay={500} bg={MINT} pad="28px 42px">
        <span style={{ ...DISPLAY, fontSize: 58 }}>找室友</span>
      </Sticker>
      <Sticker x={1060} y={460} r={-4} live={live} delay={650} bg={PERI} pad="28px 42px">
        <span style={{ ...DISPLAY, fontSize: 58 }}>宵夜團購</span>
      </Sticker>
      <Sticker x={310} y={700} r={3} live={live} delay={800} bg={PINK} pad="28px 42px">
        <span style={{ ...DISPLAY, fontSize: 58 }}>二手教科書</span>
      </Sticker>
      <Sticker x={1030} y={690} r={-3} live={live} delay={950} bg={BUTTER} pad="28px 42px">
        <span style={{ ...DISPLAY, fontSize: 58 }}>找讀書夥伴</span>
      </Sticker>
      <Sparkle x={1660} y={650} size={50} color={MINT} live={live} delay={1150} />
      <p style={{ ...BODY, ...abs(120, 900), width: 1680, fontSize: 34, fontWeight: 700 }}>
        先去問正在被這件事困擾的人，別只猜評審喜歡什麼。
      </p>
    </Stage>
  );
};

const SurvivalRow = ({
  y,
  color,
  title,
  children,
  live,
  delay,
}: {
  y: number;
  color: string;
  title: string;
  children: ReactNode;
  live: boolean;
  delay: number;
}) => (
  <Panel x={120} y={y} width={1680} height={155} color={color} live={live} delay={delay}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
      <span style={{ ...DISPLAY, fontSize: 56 }}>✓</span>
      <h3 style={{ ...DISPLAY, fontSize: 50, width: 680 }}>{title}</h3>
      <p style={{ ...BODY, fontSize: 30 }}>{children}</p>
    </div>
  </Panel>
);

const StillAlive: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="14" live={live}>
        比賽之後
      </Tag>
      <Title live={live} size={82}>
        想繼續活著，先問自己這三件事。
      </Title>
      <SurvivalRow y={350} color={PERI} title="團隊還想做下去" live={live} delay={200}>
        比完之後，還願意修、願意改。
      </SurvivalRow>
      <SurvivalRow y={550} color={MINT} title="有人每天用" live={live} delay={400}>
        不是只在 demo 那天打開。
      </SurvivalRow>
      <SurvivalRow y={750} color={BUTTER} title="有人願意付錢" live={live} delay={600}>
        或是願意幫你推給朋友。
      </SurvivalRow>
      <FooterNote>這是我看產品能否繼續做的角度，不是這次比賽的正式評分標準。</FooterNote>
    </Stage>
  );
};

const Close: Page = () => {
  const live = useLive();
  return (
    <Stage footer={false}>
      <Tag n="15" live={live} color={TOMATO}>
        我也在找一起做事的人
      </Tag>
      <h2
        style={{
          ...DISPLAY,
          ...abs(120, 235),
          fontSize: 76,
          width: 1120,
          lineHeight: 1.3,
          ...rise(live, 100),
        }}
      >
        作品不一定要得獎，
        <br />
        才能證明自己。
        <br />
        不想比賽也沒關係，
      </h2>
      <div style={{ ...DISPLAY, ...abs(120, 570), width: 1120, fontSize: 148, color: TOMATO }}>
        <Letter ch="來" i={0} live={live} delay={400} />
        <Letter ch="找" i={1} live={live} delay={400} />
        <Letter ch="我" i={2} live={live} delay={400} />
        <Letter ch="。" i={3} live={live} delay={400} />
      </div>
      <p
        style={{
          ...BODY,
          ...abs(130, 790),
          fontSize: 34,
          lineHeight: 1.55,
          width: 1110,
          fontWeight: 700,
        }}
      >
        只要你想把一個 App 做到有人在用，
        <br />
        或身邊有件事煩到你想解決，
        <br />
        下課來找我聊。
      </p>
      <Panel x={1360} y={300} width={410} height={570} color={BUTTER} live={live} delay={350}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <Mark size={72} />
        </div>
        <div
          style={{
            width: 300,
            height: 300,
            margin: '0 auto',
            padding: 18,
            border: `4px solid ${INK}`,
            borderRadius: 22,
            background: '#FFFFFF',
            boxSizing: 'border-box',
          }}
        >
          <img
            src={igQr}
            alt="瑞瑞的 Instagram QR code"
            style={{ width: '100%', height: '100%', display: 'block', imageRendering: 'pixelated' }}
          />
        </div>
        <p style={{ ...DISPLAY, fontSize: 34, marginTop: 22, textAlign: 'center' }}>IG @cy_4.9</p>
      </Panel>
      <Sparkle x={1270} y={680} size={48} color={MINT} live={live} delay={1350} />
      <p style={{ ...MONO, ...abs(120, 984), width: 1120, color: MUTED }}>
        瑞瑞 · 商業價值聊聊 / 小比賽導師 / 一起做產品
      </p>
    </Stage>
  );
};

export const meta: SlideMeta = {
  title: 'App 的價值、商業模式與新創',
  createdAt: '2026-11-01T14:03:16.000Z',
  theme: 'pommi',
};

export const notes: string[] = [
  `【開場前一直停在這頁，人到齊再往下。】
大家好，我是瑞瑞。今天在「App 登場時刻」，我負責聊 App 的價值和商業模式。開始之前，先問大家一個問題。`,
  `【先讓大家看題目，留時間舉手。】
如果這次沒得獎，你的 App 還會繼續做下去嗎？會的，可以舉個手嗎？
【停一下，看看台下。】
我是這次的評審，自己也想創業，也在找願意一起做事的夥伴。今天想聊的，是作品離開比賽之後，還有誰會打開它。
你現在不一定知道怎麼賺錢，但可以先問，這個 App 對誰有用？他願意為它付出什麼？我們先從大家選題目的方式聊起。`,
  `以前聊比賽題目，很常聽到，醫療或教育比較有社會意義，感覺評審比較會買單。
醫療、教育當然可以做。但如果每個決定都只為了上台那一刻，比完以後，功能交了、簡報交了，App 也就停了。
【指右邊那張卡。】
得獎了，至少還有獎金和掌聲。那沒得獎呢？這個 App 就真的沒有了嗎？`,
  `得不得獎，看的是評審的喜好。這件事我們管不了。
但我想問，為什麼要把我們 App 的結局，交給評審去決定？
【指左右兩張卡。】
評審決定的，是得不得獎。App 要不要繼續做下去，應該由你自己決定。
那如果想繼續做，你可以有哪些理由？`,
  `那撐下去的理由可以是什麼？
可能是改善生活。每天都遇到同一個麻煩，想自己做工具。你就是第一個使用者，明天還會用，就會想修好。
也可能是幫助弱勢。你認識真的需要幫忙的人，看到他的生活方便一點，就想繼續做。
或者是完成心裡的理想。一直很想做、想證明給自己看，就算沒人頒獎，也想完成。
【停一下，讓大家想想。】
沒有哪種理由比較厲害，要問它能不能讓你遇到麻煩時，還願意回來改一次。
理由也可以很實際，就是有人願意為它付出。那別人為什麼會願意付出？`,
  `（空白頁）`,
  `拿一張一百塊來看，為什麼它值一百塊？因為你可以拿它換便當、買飲料，或搭公車。
【讓貼紙出現，問大家平常會拿來買什麼。】
在經濟活動裡，錢代表我們可以交換的價值。人們願意拿多少錢換一樣東西，形成了我們看到的價格。
它值一百塊，是因為能換到這些東西。`,
  `那想像一下，有一天，這張一百塊什麼都買不到，沒人願意收。紙還是同一張紙，但對你來說，就跟廢紙一樣。
【等「廢紙」蓋下來。】
所以這裡說錢本身沒有價值，是在提醒大家，重要的是它能換到什麼。錢能換到的那些東西，就是價值。那什麼叫價值？`,
  `先講什麼叫價值。價值，就是一樣東西能幫你解決多少問題、對你有多重要。
拿雨傘來說，晴天帶著它，只覺得包包變重；下大雨的時候，沒有它就全身濕透。
【指兩張卡。】
同一把傘，價值差很多。所以價值不是東西本身決定的，是看誰、在什麼時候需要它。你的 App 也一樣，要先想清楚，它對誰、在什麼時候最重要。`,
  `那成本是什麼？成本，就是為了得到一樣東西，你得先放棄的東西。而且不只是錢。
錢最直接，訂閱費、內購。時間也是，下載、註冊、學怎麼用。注意力也是，看廣告、被通知打擾。
【指下面一排。】
還有心力，你要想、要選、還要記得打開它。還有精神，介面難用，用越久越累。還有習慣，你得放棄原本用順手的方法。還有個資，要交出位置、聯絡人、照片。最後是機會成本。付給你的十塊，原本可以拿去買一杯紅茶；選了你，就等於放棄了那杯紅茶。只要做選擇，就一定有東西被放棄，所以機會成本永遠都在。
【停一下。】
所以使用者每打開一次你的 App，都在付出成本。就算 App 免費，成本也不是零。`,
  `把價值和成本放在一起，就是這個蹺蹺板。別人願意付出，是因為覺得值得。我們其實都在比，付出的成本，跟換到的東西，哪一邊比較重。
拿學生生活來想，一個名牌包價格很重，我的生活卻用不到它的價值，也拿不出能換它的錢，我就不買。喜歡名牌包的人，可能有不同的判斷。
可是演唱會門票一樣不便宜，還要熬夜搶票、排隊入場，粉絲卻搶著買。因為對他來說，換到的是難忘的回憶，比票價加上搶票的時間都重。同樣很貴，有人不買、有人搶著買，差別就在換到的價值。
【指兩個蹺蹺板。】
所以不是功能越多，就越能收錢。要看這個使用者付出的成本，能不能從你這裡換到他在意的價值。
那如果你的 App 真的值得，一個月能有多少收入？我們來算算看。`,
  `假設在你的學校，有六千個人用你的 App，每人每月付十塊，會是多少？
【等數字跳完。】
每月六萬。這是假設情境，不是實際人數；算的是營收，還沒扣成本，也不是下載了就等於付費。
不用先做全世界都在用的東西，可以先解決同學每天遇到的小麻煩。像選課資訊很散、找室友很花時間。
我嚮往的是，做自己喜歡的事，也能過生活。但這得持續有人願意付錢，不能只在試算表上成立。
講這麼多，不如直接拿我自己的 App 來試試看。`,
  `這是我做的 App，半逢遇甲。課表、iLearn、公車、停車都收在一起，還有我自己整理的逢甲美食地圖，現在每個月大概有六千個人在用。
先問第一題，你有在用半逢遇甲嗎？有的舉手。
【數一下，回應幾句。】
第二題，如果半逢遇甲一個月收十塊，你會買單嗎？願意的舉手。
【估一下比例，指著右邊對應的那一條。】
差不多是這個比例。這樣的比例，我一個月躺在家裡，就可以賺到這麼多。
你看，同一個 App，大家願不願意付錢，就是在判斷它的價值換不換得到這十塊。
不過也有 App 完全不跟你收錢。IG 就不收你錢，那它靠什麼賺？`,
  `IG 不收你錢，那它靠什麼賺？
你每天滑 Reels，IG 拿內容跟你換時間。你看的廣告、花的時間，就是你的成本，也就是注意力成本。
【沿著箭頭，從你指向 IG，再指向廣告商。】
誰想要這些注意力？廣告商。他需要很多人看到產品，才有機會讓人覺得這個產品值得買。
所以 IG 提供接觸這些人的機會，廣告商拿錢來換。
這裡有兩筆交換。你用時間換內容，廣告商用錢換注意力。你沒有付錢，還是付出了東西。
回到我們的校園 App，如果同學願意每天回來，他們的注意力，也可能是店家想買的東西。`,
  `所以，六千個人的注意力，就是廣告商想買的東西。這裡的六千人，仍然是剛才拿來想的假設。
先有使用者，因為你解決了需求，才會回來。持續有人看、有人找東西，才有流量，再看誰願意為這些注意力付錢。
像大家每天用 App 找宵夜，附近店家可能想讓這群人看到自己的餐點。
但有下載數，不等於有流量；有流量，也不是自動有收入。還要知道大家為什麼回來，誰想接觸他們，願意付多少。
如果連免費都沒人想再打開，先回頭看需求。有價值、有人要，接下來才是選收錢的方式。`,
  `確定有價值，接下來是怎麼收。先記這四種就夠了。
訂閱制，使用者持續付費，換你持續解決問題。像社團排班，按月付費用進階功能。
單次付費或內購，是為特定功能付錢。像活動修圖，付費解鎖素材包。
廣告，付錢的人換成店家。像宵夜資訊，店家買推薦版位，但要清楚標示，也別弄到同學不想用。
抽成或媒合，像二手教科書，促成交易後收服務費。
這些是思考用的例子，不是保證能賣。重點是誰付錢、他換到什麼。那能做成 App 的題目，要去哪裡找？`,
  `看完收費方式，回頭找題目。我會先找一件煩到大家願意每月付十塊解決的事。
你這禮拜被什麼煩到？選課、找室友、揪宵夜、二手教科書，還是找讀書夥伴？
【讓大家選一個有感的例子。】
接著去問正在做這件事的人，現在怎麼解決，最麻煩的是哪一段，有沒有能用的工具。
選課很煩，可能只需要整理資訊，不一定得重寫一套大系統。先確認那個小麻煩，值不值得解決。
十塊是幫你問需求的起點，不是每個產品都得用的定價。比起猜評審喜歡什麼，我更想聽到你真的問過使用者。`,
  `找到題目之後，比賽結束前，可以跟隊友聊這三件事。
團隊還想做下去嗎？做出來後，一定會發現自己猜錯、有問題要修。你們有沒有一個理由，願意一起回來改？
有人每天用嗎？不是只在展示那天打開，而是生活裡真的有一個理由，會回來找你。
有人願意付錢嗎？如果現在還沒收費，有沒有人願意主動推給朋友？那至少表示你幫到了他，再去確認怎麼收費。
這是我看產品能不能繼續做的角度，不是這次比賽的正式評分標準。有一題答不出來，就從那裡開始補。
最後，也想邀請還想繼續做的人。`,
  `最後想說，作品不一定要得獎，才能證明自己。有人用、有人覺得它有價值，它就已經證明了。也不是每個人都得朝比賽去想，不想比賽也完全沒關係。
只要你想把一個 App 做到有人在用，或身邊有件事煩到你想解決，下課來找我聊。不用先準備完整的商業計畫，帶一個想法來就好。
想參加小比賽、找人陪著看題目或商業模式，也可以找我當導師。我自己也想創業，在找願意做事、願意聽使用者說話的夥伴。先聊、先做點東西，看看適不適合一起走。
我是瑞瑞，謝謝大家。
【右邊是我的 IG QR，可以停一下讓大家掃。】`,
];

export default [
  TitleCover,
  Cover,
  AfterCompetition,
  WhoDecides,
  ReasonsToContinue,
  Blank,
  WhatIsMoney,
  MoneyWaste,
  WhatIsValue,
  WhatIsCost,
  ValueExchange,
  CampusMath,
  LivePoll,
  Instagram,
  Traffic,
  BusinessModels,
  FindProblem,
  StillAlive,
  Close,
] satisfies Page[];
