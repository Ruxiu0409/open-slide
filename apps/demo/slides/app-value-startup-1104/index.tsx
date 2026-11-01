import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { type CSSProperties, type ReactNode, useEffect, useState } from 'react';

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
  '·×→↻✓、。「」一三上下不世之也了事二交人什今他付以件伴位住作你使來促修個值假做停價先光免入內公具再分別到制刻前剛創功助動務勢包卡卻去及友只可台合同否告呢品哪商問善喜單嗎四回因困園圖團在場塊夜夥大天好如始媒學完官室宵家容實審導小就工己師帳常幫平年店度廣式弱待很後得從心怎想意慢慣成我或手才打扣批找抽持排推撐據擾收改放教數新方於明易是時曝書最會月有朋服本材束東果架某校核業標模樣機次歡正每比求決沒活流測準為然煩營版猜獎班現理瑞生產用由甲界留當療登發的目直看真碰社科種第等算素結絡給繼續義習者聊聯聽育能自與舉萬著薦號被補裡西要見角解訂訊設評試誰課證讀變讓買費資賺購賽起身躺較送這逢進過選還邊那都醫量錢鎖鐘開閱隊階際需項題願麻麼點！（），／：＝？';
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
      <span style={{ ...MONO, color: MUTED, marginLeft: 18 }}>App 登場時刻 · 商業模式與上架</span>
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
  x = 120,
  y = 96,
  color = BUTTER,
}: {
  n: string;
  children: ReactNode;
  live: boolean;
  x?: number;
  y?: number;
  color?: string;
}) => (
  <div
    style={abs(x, y, {
      display: 'flex',
      alignItems: 'stretch',
      height: 46,
      border: `3px solid ${INK}`,
      borderRadius: 999,
      background: color,
      boxShadow: shadow(4),
      overflow: 'hidden',
      ...rise(live, 0, 20),
    })}
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

const Cover: Page = () => {
  const live = useLive();
  return (
    <Stage footer={false}>
      <div style={abs(120, 108, { display: 'flex', alignItems: 'center', gap: 22, ...rise(live) })}>
        <Mark size={52} />
        <span style={{ ...MONO, fontSize: 24 }}>App 登場時刻 · 商業模式與上架 · 瑞瑞</span>
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
      <p style={{ ...BODY, ...abs(126, 840), fontSize: 34, ...rise(live, 500) }}>
        今天聊聊，怎麼讓 App 活過比賽結束那天。
      </p>
      <p style={{ ...MONO, ...abs(120, 984), color: MUTED }}>
        逢甲大學 · 從比賽作品，到有人用的產品
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
          ...abs(140, 712),
          width: 1660,
          fontSize: 50,
          lineHeight: 1.4,
          ...rise(live, 650),
        }}
      >
        得獎看的是評審的 <span style={{ color: TOMATO }}>5 分鐘</span>。<br />
        App 能不能活下去，看的是你想不想做，
        <br />
        還有你找不找得到<span style={{ color: TOMATO }}>一個理由</span>撐下去。
      </div>
      <FooterNote>醫療、教育當然可以做。先問，誰真的需要？</FooterNote>
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

const ReasonsToContinue: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="02" live={live}>
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
          ...abs(140, 875),
          fontSize: 38,
          fontWeight: 700,
          ...rise(live, 900),
        }}
      >
        理由也可以很實際：如果這個 App 每個月幫你賺 <span style={{ color: TOMATO }}>6 萬</span>
        呢？
      </p>
    </Stage>
  );
};

const CampusMath: Page = () => {
  const live = useLive();
  const revenue = useCount(60000, live, 650, 1700);
  return (
    <Stage>
      <Tag n="03" live={live}>
        算給你看
      </Tag>
      <Title live={live}>不用先改變世界，先從逢甲開始。</Title>
      <div
        style={abs(140, 338, {
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
      <p style={{ ...BODY, ...abs(140, 866), fontSize: 36, fontWeight: 700, ...rise(live, 750) }}>
        躺在家做自己喜歡的事，也能過生活。
      </p>
      <FooterNote>
        假設逢甲有 6,000 個人用，每人每月付 10 塊。這是營收試算，還沒扣成本與費用。
      </FooterNote>
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
      <Tag n="04" live={live}>
        免費，也能有價值
      </Tag>
      <Title live={live}>有人每天打開，就有變現的機會。</Title>
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
      <p style={{ ...BODY, ...abs(140, 840), fontSize: 38, fontWeight: 700 }}>
        就算免費，6,000 人每天打開，也是一項資產。
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
      <Tag n="05" live={live}>
        四種賺錢方式
      </Tag>
      <Title live={live}>誰付錢？為什麼願意付？</Title>
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
      <p style={{ ...BODY, ...abs(140, 900), fontSize: 34, fontWeight: 700 }}>
        同樣是校園 App，付錢的人可以是同學，也可以是店家。
      </p>
    </Stage>
  );
};

const FindProblem: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="06" live={live}>
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
      <p style={{ ...BODY, ...abs(140, 900), fontSize: 34, fontWeight: 700 }}>
        先去問正在被這件事困擾的人，別只猜評審喜歡什麼。
      </p>
    </Stage>
  );
};

const LaunchStep = ({
  x,
  n,
  color,
  title,
  children,
  live,
  delay,
}: {
  x: number;
  n: string;
  color: string;
  title: ReactNode;
  children: ReactNode;
  live: boolean;
  delay: number;
}) => (
  <Panel x={x} y={345} width={390} height={290} color={color} live={live} delay={delay}>
    <span style={{ ...MONO, fontSize: 20 }}>{n}</span>
    <h3 style={{ ...DISPLAY, fontSize: 44, lineHeight: 1.22, marginTop: 20 }}>{title}</h3>
    <p style={{ ...BODY, fontSize: 28, marginTop: 24 }}>{children}</p>
  </Panel>
);

const ShipIt: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="07" live={live}>
        實際上架
      </Tag>
      <Title live={live}>先讓人用得到，再慢慢改好。</Title>
      <LaunchStep
        x={120}
        n="01 →"
        color={BUTTER}
        title={
          <>
            做最小
            <br />
            可用版本
          </>
        }
        live={live}
        delay={200}
      >
        只解決核心問題。
      </LaunchStep>
      <LaunchStep
        x={550}
        n="02 →"
        color={MINT}
        title={
          <>
            上架
            <br />
            商店
          </>
        }
        live={live}
        delay={350}
      >
        帳號、測試、送審。
      </LaunchStep>
      <LaunchStep
        x={980}
        n="03 →"
        color={PERI}
        title={
          <>
            找到第一批
            <br />
            100 個使用者
          </>
        }
        live={live}
        delay={500}
      >
        從身邊有需求的人開始。
      </LaunchStep>
      <LaunchStep
        x={1410}
        n="04 ↻"
        color={PINK}
        title={
          <>
            看數據
            <br />
            再改
          </>
        }
        live={live}
        delay={650}
      >
        有沒有回來？卡在哪？
      </LaunchStep>
      <Panel x={120} y={700} width={1680} height={210} live={live} delay={850}>
        <div style={{ display: 'flex', gap: 70, alignItems: 'center', height: '100%' }}>
          <div style={{ width: 710 }}>
            <p style={{ ...BODY, fontSize: 28, fontWeight: 700 }}>Google Play 開發者帳號</p>
            <p style={{ ...DISPLAY, fontSize: 62, marginTop: 12 }}>
              US$25<span style={{ fontSize: 30, marginLeft: 22 }}>一次付費</span>
            </p>
          </div>
          <div style={{ borderLeft: `3px dashed ${FAINT}`, paddingLeft: 65 }}>
            <p style={{ ...BODY, fontSize: 28, fontWeight: 700 }}>Apple Developer Program</p>
            <p style={{ ...DISPLAY, fontSize: 62, marginTop: 12 }}>
              US$99<span style={{ fontSize: 30, marginLeft: 22 }}>每年</span>
            </p>
          </div>
        </div>
      </Panel>
      <FooterNote>
        帳號費不等於上架完成，還要完成測試與審核。費用以 Google Play、Apple 官方公告為準。
      </FooterNote>
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
      <Tag n="08" live={live}>
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
      <Tag n="09" live={live} color={TOMATO}>
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
        如果沒得獎也想做下去，
        <br />
        或你想做的
        <br />
        不只是一個作業，
      </h2>
      <div style={{ ...DISPLAY, ...abs(120, 570), fontSize: 148, color: TOMATO }}>
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
        你身邊有沒有一件事，
        <br />
        煩到你願意每個月付 10 塊解決？
        <br />
        想到了，下課來找我聊。
      </p>
      <Panel x={1360} y={300} width={410} height={570} color={BUTTER} live={live} delay={350}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <Mark size={92} />
        </div>
        <div
          style={{
            width: 300,
            height: 270,
            border: `4px dashed ${INK}`,
            borderRadius: 22,
            background: PAPER,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxSizing: 'border-box',
            gap: 16,
          }}
        >
          <span style={{ ...DISPLAY, fontSize: 44 }}>IG / LINE</span>
          <span style={{ ...BODY, fontSize: 28 }}>QR 放這裡</span>
        </div>
        <p style={{ ...DISPLAY, fontSize: 30, marginTop: 30, textAlign: 'center' }}>
          聯絡方式（待補）
        </p>
      </Panel>
      <Sparkle x={1270} y={680} size={48} color={MINT} live={live} delay={1350} />
      <p style={{ ...MONO, ...abs(120, 984), color: MUTED }}>
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
  `【先讓大家看題目，留時間舉手。】
大家好，我是瑞瑞。今天在「App 登場時刻」，我想先問大家一個有點直接的問題。如果這次沒得獎，你的 App 還會繼續做下去嗎？會的，可以舉個手嗎？
【看看台下，停一下再接。】
先不用急著給我一個很熱血的答案。你可以想想，比賽結束以後，還有誰會打開它？隊友還會不會願意一起修問題？
我也是這次的評審，但今天這段，我想跟大家聊的是作品離開比賽之後的事。商業模式聽起來很遠，其實就是有人需要你做的東西，而且有人願意為它付出。
我自己也想創業，也在找願意把東西做出來、做到有人用的夥伴。所以今天這段話，既是說給參賽隊伍聽，也是我想跟未來可能一起做事的人聊的事。`,
  `以前聊比賽題目，很常聽到一種想法，醫療或教育比較有社會意義，感覺評審比較會買單，所以先往那邊想。
醫療、教育當然可以做。我想問的是，這個題目也是你自己想做的嗎？還是我們只是在想，簡報上怎麼講比較感人、比較像一個能得獎的題目？
如果做的每個決定，都只是為了上台那一刻，比完之後，很容易就不知道下一步要幹嘛。功能做完了，簡報也交了，然後 App 就躺在那裡。
得獎看的是評審的五分鐘。App 能不能活下去，看的是你想不想做，還有你找不找得到一個理由撐下去。
沒得獎的時候，你還願不願意打開專案、繼續修問題？那個理由不一定跟比賽有關，也不一定是賺錢。我們接著來聊，你為什麼想做這個 App。`,
  `所以，撐下去的理由可以是什麼？醫療、教育題目都很好，問題是比賽結束以後，你還有沒有一個讓自己願意繼續做的理由。
可能是改善生活。你每天都遇到同一個麻煩，真的受不了了，想自己做一個工具。你就是第一個使用者，明天還會用到，所以你會想把它修好。
也可能是幫助弱勢。你認識一些真的需要幫忙的人，看到有人因為你的 App，生活方便了一點，那就會想繼續把它做好。
或者是完成心裡的理想。這件事你一直很想做，也想證明給自己看，就算沒人頒獎，你還是想把它完成。
【停一下，讓大家想想自己的理由。】
沒有哪一種理由比較厲害，重點是它對你來說是不是真的。做下去會遇到麻煩，那個理由能不能讓你願意再回來改一次？
理由也可以很實際。如果這個 App 每個月幫你賺六萬呢？我們下一頁就來算算看。`,
  `我們來算一個很小、很貼近校園的情境。假設在逢甲，有六千個人用你的 App，每個人每個月付十塊，會是多少？
【等數字跳完，讓大家算一下。】
每個月六萬。不是要你現在就去做全世界都在用的東西，也不用一開始就談什麼很大的市場。
先找到一件同學真的很煩、而且你能持續幫他解決的事情。十塊聽起來很少，但對方願不願意付，會讓你很快知道，這個功能到底有沒有用。
我自己會嚮往的是，躺在家做自己喜歡的事，也能過生活。不過這裡算的是營收，還要扣伺服器、商店費用和維護成本，也得持續有人願意付。
六千人是我們拿來算的假設，不是實際人數，更不是下載了就等於付費。接下來要做的，就是驗證這個假設，真的有人願意拿錢出來嗎？`,
  `那如果大家都說，我就是不想付錢，免費才會用，這個 App 是不是就沒價值？也不一定。
假設同樣有六千個人，而且是每天真的打開，不是下載完就忘了。你其實已經知道，這裡有一群人，會為了某個需求回來找你。
比方說大家在找宵夜，附近店家可能想讓這些人看到自己的餐點。大家在找二手書，你可能幫買賣雙方省下很多時間。
所以可以照這個順序想，先有人，這些人持續使用才有流量，再看誰願意為這個流量，或你促成的事情付錢。
這不是說有下載數，就可以等著收錢。你要知道大家為什麼回來、在這裡做什麼，還有誰真的願意買單。
免費可以是起點，但如果連免費都沒人想再打開，我會先回頭看需求，不會急著塞廣告。`,
  `賺錢的方式先記這幾種就夠了，不用一開始就寫得很複雜。
訂閱制，是使用者持續付費，換你持續幫他解決問題。像社團排班，社團每個月都要用，進階功能就可能按月收費。
單次付費或內購，就是為某個東西付錢。像做校園活動照片，基本修圖免費，想用某組素材再買。
廣告，付錢的人換成店家。像宵夜資訊，店家可能願意買推薦版位，但推薦要說清楚，也不能弄到同學不想用。
抽成或媒合，則是在你幫忙完成交易時收費。像二手教科書，你幫大家找到書、順利交易，再收服務費。
這些都是拿來想的例子，不是保證能賣。你可以挑最適合需求的方式，先去問對方願不願意。先把「誰付錢、為什麼付」講清楚，比把每種收費方式都放進企畫書有用。`,
  `所以題目從哪裡來？我會先找一件煩到大家願意每個月付十塊解決的事。
不用先開一個很大的主題，先想你這禮拜被什麼事情煩到。選課資訊很散？找室友不知道合不合？揪宵夜要一直對名單？二手教科書總是找不到？想找讀書夥伴卻不知道問誰？
【停一下，讓大家選一個自己有感的例子。】
但有感還不夠。你要去問正在做這件事的人，現在怎麼解決，最麻煩的是哪一段，有沒有已經能用的工具。
如果只是覺得選課很煩，也許大家需要的是資訊整理，不一定要你重新寫一套很大的系統。先把那個小麻煩解掉。
十塊也不是所有產品都要套的定價，它是在逼你問，對方到底有多在意？比起猜什麼題目容易得獎，我更想聽到你說，我去問了使用者，他真的想要這個。`,
  `找到需求之後，就把最小可用版本做出來。所謂可用，不是每個功能都有，而是你答應解決的核心問題，真的能走完。
接著準備上架。Google Play 開發者帳號是一次二十五美元，Apple Developer Program 是每年九十九美元。付了帳號費還不算上架，還要處理測試、商店資料、隱私說明和審核，別把這些留到最後。
上架以後，先去找第一批一百個使用者。從你問過需求的同學、社團、相關群組開始，親自找人來用，也看看他們用到哪裡會卡住。
然後看數據再改。人有沒有回來？核心功能有沒有用完？不要只看下載數很開心，打開之後什麼都沒做的人，也是在告訴你問題。
先完成這個循環，再決定下一個功能。上架是開始接觸真正使用者的起點。
費用來源：Google Play 官方說明 https://support.google.com/googleplay/android-developer/answer/6112435 ，Apple Developer Program https://developer.apple.com/programs/ 。`,
  `比賽結束後，我會用這幾個問題，看看這個產品還能不能繼續走。
先回到開場，團隊自己還想做下去嗎？真的上架以後會有問題要修，也會發現自己猜錯。隊友願不願意回來一起改，這件事很實際。你們有沒有找到那個願意繼續做的理由？
有人每天用嗎？不是只有評審來看的那天有人打開，而是他生活裡真的有一個理由，會想回來。
有人願意付錢嗎？如果現在還沒收費，有沒有人願意主動幫你推給朋友？那表示它至少已經幫到某些人，接下來再去確認怎麼收費。
先說清楚，這是我看產品能不能繼續做的角度，不是這次比賽的正式評分標準，也不是叫大家改簡報來迎合我。
我比較希望你們把它當成賽後要討論的問題。如果其中一個答不出來，可以從那裡開始補，而不是直接把整個作品收起來。`,
  `最後再回到一開始的問題。如果沒得獎，你還想不想把 App 做下去？如果想，我很想聽你在做什麼。
你不需要已經有一份很完整的商業計畫。可以拿一個需求來，可以帶你上架時卡住的地方，也可以跟我說，現在有人在用，可是我不知道接下來怎麼收錢。
如果你們之後參加小比賽，想找人陪著看題目、商業價值或上架，也可以找我當導師。我自己也想創業，想認識願意做事、願意聽使用者說話的夥伴。先聊、先做點東西，才知道彼此適不適合一起走。
所以現在你可以想一下，你身邊有沒有一件事，煩到你願意每個月付十塊解決？
【留一點時間，看看大家。】
想到了，下課來找我聊。我是瑞瑞，謝謝大家。
【上台前把右邊「聯絡方式（待補）」換成自己的 IG 或 LINE QR。】`,
];

export default [
  Cover,
  AfterCompetition,
  ReasonsToContinue,
  CampusMath,
  Traffic,
  BusinessModels,
  FindProblem,
  ShipIt,
  StillAlive,
  Close,
] satisfies Page[];
