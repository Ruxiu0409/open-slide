import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import { type CSSProperties, type ReactNode, useState } from 'react';
import batchGroup from './assets/886/batch-group.webp';
import caseKardomo1 from './assets/886/kardomo-1.webp';
import caseKardomo2 from './assets/886/kardomo-2.webp';
import caseKardomo3 from './assets/886/kardomo-3.webp';
import caseKardomoIcon from './assets/886/kardomo-icon.webp';
import caseLfg1 from './assets/886/lfg-1.webp';
import caseLfg2 from './assets/886/lfg-2.webp';
import caseLfg3 from './assets/886/lfg-3.webp';
import caseLfgIcon from './assets/886/lfg-icon.webp';
import casePeeps1 from './assets/886/peeps-1.webp';
import casePeeps2 from './assets/886/peeps-2.webp';
import casePeeps3 from './assets/886/peeps-3.webp';
import casePeepsIcon from './assets/886/peeps-icon.webp';
import casePicpet1 from './assets/886/picpet-1.webp';
import casePicpet2 from './assets/886/picpet-2.webp';
import casePicpet3 from './assets/886/picpet-3.webp';
import casePicpetIcon from './assets/886/picpet-icon.webp';
import caseSugarai1 from './assets/886/sugarai-1.webp';
import caseSugarai2 from './assets/886/sugarai-2.webp';
import caseSugarai3 from './assets/886/sugarai-3.webp';
import caseSugaraiIcon from './assets/886/sugarai-icon.webp';
import caseTellitnow1 from './assets/886/tellitnow-1.webp';
import caseTellitnow2 from './assets/886/tellitnow-2.webp';
import caseTellitnow3 from './assets/886/tellitnow-3.webp';
import caseTellitnowIcon from './assets/886/tellitnow-icon.webp';
import banfengHome from './assets/banfeng-home.webp';
import founderJarshanChen from './assets/founders/jarshan-chen.webp';
import founderJerryLee from './assets/founders/jerry-lee.webp';
import founderJimmyHuang from './assets/founders/jimmy-huang.webp';
import founderMarxYeh from './assets/founders/marx-yeh.webp';
import founderPachaChen from './assets/founders/pacha-chen.webp';
import founderRonnyYen from './assets/founders/ronny-yen.webp';
import founderRyanYang from './assets/founders/ryan-yang.webp';
import igQr from './assets/ig-qr.svg';
import newsCnyes from './assets/news/cnyes.webp';
import newsMacrumors from './assets/news/macrumors.webp';
import newsTvbs from './assets/news/tvbs.webp';
import ntd100 from './assets/ntd-100-specimen.jpg';
import speaker from './assets/speaker.webp';

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
  '、。《》「」【】一三上下不世丟中串主久之也了事二互五些交亨享人什今介仍他付代以件任份企伯伴但佈位低住作你使來例供依便係促保修個倍們候值假做停偶傘備傳像價億優元先光免兒入內全兩公六共其具冊再准凸出分列初判別利到制券刻前剛創力功加助動務勞勢勵包北區十千升午半協卡卻原厲去參又及友取口另只叫可台右司各合同名向否含吵告呢和品員哪售唱商問啦善喜喝單嗎嘛器嚮四回因困圈國圍園圖團在地坊執培基堆報場塊填境壓外多夜夠夥大天太央失套好如始委媒子字存孩學它安完官定宜客宣室害宵家容實審寫寵專對導小少就局屆展層履屬山州工左差己已市師帳帶常幕幣幫平年幹幾底店府度庫廢廣廳弄式弱張形影往待很後得從心忘忙快念怎怕思性息悟情想意感慢慣慮憶應成我或截戰戲戶房所手才打扣扮批找技把投抽拆拍招拜拿持指按授掉掌排探接推提換揪搭搶摺撐撰擁擅據擬擾支收改放政故敗教散整數文料斯新斷方於日明易昕星是時景晴智曆曝更書最會月有朋服未本材束杭杯東松板果架某查校核格案桿條梯棄楚業榜構樂標模樣樹機權次款歡止正步歲歷段每比氣求決沒沿法注洞活流淡清測港源準滑滿演漫潛激濕濟灣災為無焦然照煩營爭牆片版牌牠物特猜獎玩班現理瑞生產用由甲申界留畢畫當疊痕療登發百的盈益監目直省看真睿知研破碎碑碰確礙示社神票禮私科程種積究空突立站章童競第筆等答策算管箭簡籍籤粉精系約紅紙級素累終組結絡給統絲經維網緒線練總績繪繫繼續置署美群義習考者而聊聯聲聽股育背能膽自至致臺與興舉舊色花苦英茶華萬葉著蓋薦薪藏處虛號螢行術衛衝表被裂補裡製西要見覺觀角解觸言訂計訊討記設訴診註評詢試話該認語說誰課調請論講謝證識讀變讓負責貴買費貼資賈賣賺購賽贊走起越趣趨跟路跳蹺躍身躺車軟軸較載輔輩輸轉辛辦近追退送透這通速造逢連週進遇遊運過道適選邀還邊那部都鄉配醒醫重量金鈕鉅鉸銀銘銷鋒錄錢錯鍵鎖鏈鐘鑑長門閃開間閱關附降限院陪陳隊階際障隻集離難雨零需青靜非靠面音頁項順須預頒頓領頭題額願顧食飲養餐餵首駐驗體高鬼麻麼黑點齡！（）＋，／：；＝？～';
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
      <span style={{ ...MONO, color: MUTED, marginLeft: 18 }}>App 登場時刻 · 新創</span>
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
  <div
    style={{
      ...abs(0, y, { width: 1920, display: 'flex', justifyContent: 'center' }),
      translate: '-270px 0px',
    }}
  >
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
        translate: '270px 0px',
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
          textTransform: 'none',
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
          ...abs(120, 250),
          fontSize: 124,
          lineHeight: 1.12,
          width: 1200,
          ...rise(live, 120),
        }}
      >
        <AppStoreIcon size={116} />
        創業，
        <br />
        其實沒有你想像中
        <br />
        <span style={{ color: TOMATO }}>那麼難</span>
      </h1>
      <p
        style={{
          ...BODY,
          ...abs(120, 790),
          width: 1200,
          fontSize: 40,
          fontWeight: 700,
          ...rise(live, 400),
        }}
      >
        分享 · 瑞瑞
      </p>
      <div
        style={abs(1290, 200, {
          width: 470,
          height: 640,
          border: BORDER,
          borderRadius: 34,
          boxShadow: shadow(10),
          overflow: 'hidden',
          background: PAPER,
          ...rise(live, 250, 48),
        })}
      >
        <img
          src={speaker}
          alt="講者瑞瑞"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            display: 'block',
          }}
        />
      </div>
      <Sticker x={1210} y={150} r={-8} live={live} delay={800} bg={MINT} pad="14px 28px">
        <span style={{ ...NUM, fontSize: 40 }}>11.04</span>
      </Sticker>
      <Sparkle x={1780} y={830} size={50} color={PINK} live={live} delay={1100} />
    </Stage>
  );
};

const NotAwards: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="02" live={live}>
        886 案例
      </Tag>
      <h2
        style={{
          ...DISPLAY,
          ...abs(120, 320),
          width: 1680,
          fontSize: 96,
          lineHeight: 1.35,
          ...rise(live, 200, 40),
        }}
      >
        這些團隊拿到錢，
        <br />
        不是因為得了什麼獎，
        <br />
        而是因為做出了<span style={{ color: TOMATO }}>有人在用</span>的東西。
      </h2>
    </Stage>
  );
};

const Question300: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="01" live={live}>
        開場提問
      </Tag>
      <h2
        style={{
          ...DISPLAY,
          ...abs(120, 340),
          width: 1680,
          fontSize: 140,
          lineHeight: 1.3,
          ...rise(live, 200, 40),
        }}
      >
        給你 <span style={{ color: TOMATO }}>320 萬</span>
        <br />
        你會做什麼
      </h2>
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
        <span style={{ ...MONO, fontSize: 24 }}>App 登場時刻 · 新創 · 瑞瑞</span>
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
      <Tag n="03" live={live}>
        常見的選題習慣
      </Tag>
      <Title live={live}>題目很有意義，然後呢？</Title>
      <Panel x={120} y={400} width={760} height={280} color={PERI} live={live}>
        <p style={{ ...BODY, fontWeight: 700 }}>以前選題時常先想</p>
        <h3 style={{ ...DISPLAY, fontSize: 62, marginTop: 28 }}>
          什麼題目
          <br />
          比較容易得獎
        </h3>
      </Panel>
      <div style={{ ...DISPLAY, ...abs(880, 490), width: 160, fontSize: 80, ...rise(live, 350) }}>
        →
      </div>
      <Panel x={1040} y={400} width={760} height={280} color={PINK} live={live} delay={420}>
        <p style={{ ...BODY, fontWeight: 700 }}>卻可能變成</p>
        <h3 style={{ ...DISPLAY, fontSize: 62, marginTop: 28 }}>
          比賽結束那天
          <br />
          App 也停了
        </h3>
      </Panel>
      <div
        style={{
          ...DISPLAY,
          ...abs(120, 762),
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
    </Stage>
  );
};

const WhoDecides: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="04" live={live}>
        誰來決定
      </Tag>
      <Title live={live}>為什麼要把 App 的結局，交給評審決定？</Title>
      <div
        style={abs(120, 420, {
          width: 1680,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        })}
      >
        <div style={{ width: 640, ...rise(live, 200) }}>
          <p style={{ ...BODY, fontWeight: 700, color: MUTED }}>評審決定的</p>
          <h3 style={{ ...DISPLAY, fontSize: 96, marginTop: 24 }}>得不得獎</h3>
          <p style={{ ...BODY, fontSize: 32, marginTop: 24, color: MUTED }}>看的是評審的評分標準</p>
        </div>
        <div style={{ ...DISPLAY, width: 200, fontSize: 96, ...rise(live, 350) }}>≠</div>
        <div style={{ width: 640, ...rise(live, 450) }}>
          <p style={{ ...BODY, fontWeight: 700 }}>你自己決定的</p>
          <h3 style={{ ...DISPLAY, fontSize: 96, marginTop: 24, color: TOMATO }}>要不要做</h3>
          <p style={{ ...BODY, fontSize: 32, marginTop: 24 }}>看的是你想不想</p>
        </div>
      </div>
      <div
        style={{
          ...DISPLAY,
          ...abs(120, 800),
          width: 1680,
          fontSize: 50,
          lineHeight: 1.4,
          ...rise(live, 650),
        }}
      >
        要做下去，得先找到<span style={{ color: TOMATO }}>你自己的理由</span>。
      </div>
    </Stage>
  );
};

const Blank: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <h2
        style={{
          ...DISPLAY,
          ...abs(120, 330),
          width: 1680,
          fontSize: 96,
          lineHeight: 1.35,
          ...rise(live, 200, 40),
        }}
      >
        很多事情可以靠錢解決，
        <br />
        如果錢沒辦法解決，
        <br />
        那就是<span style={{ color: TOMATO }}>不夠多</span>。
      </h2>
    </Stage>
  );
};

const REASON_TAGS = [
  '#改善生活',
  '#幫助弱勢',
  '#完成理想',
  '#解決自己的麻煩',
  '#證明自己',
  '#好玩',
  '#賺錢',
  '#交朋友',
  '#作品集',
  '#升學',
  '#找工作',
  '#讓家人更方便',
  '#學新技術',
  '#被看見',
  '#改變世界',
  '#興趣',
  '#創業',
  '#不想放棄',
  '#有人在用',
  '#做給喜歡的人',
  '#自由',
  '#成就感',
  '#留下作品',
  '#就是想做',
];
const REASON_COLORS = [BUTTER, MINT, PERI, PINK];

const ReasonsToContinue: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="05" live={live}>
        撐下去的理由
      </Tag>
      <Title live={live}>你為什麼想做這個 App？</Title>
      <div
        style={abs(160, 330, {
          width: 1600,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '26px 30px',
        })}
      >
        {REASON_TAGS.map((tag, i) => (
          <span
            key={tag}
            style={
              {
                ...DISPLAY,
                fontSize: 42,
                padding: '12px 26px',
                background: REASON_COLORS[i % REASON_COLORS.length],
                border: `4px solid ${INK}`,
                borderRadius: 999,
                boxShadow: shadow(5),
                transform: `rotate(${((i * 7) % 9) - 4}deg)`,
                '--r': `${((i * 7) % 9) - 4}deg`,
                ...anim(live, `pm-slap 600ms ${SLAP} ${250 + i * 70}ms both`),
              } as CSSProperties
            }
          >
            {tag}
          </span>
        ))}
      </div>
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
      <Tag n="06" live={live}>
        錢是什麼
      </Tag>
      <Title live={live}>100 塊，為什麼值 100 塊？</Title>
      <p style={{ ...BODY, ...abs(120, 293), width: 1680, fontSize: 34, ...rise(live, 180) }}>
        因為它能換到東西。
      </p>
      <div style={abs(410, 370, { ...rise(live, 250) })}>
        <div
          style={{
            width: 1100,
            height: 538,
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
      <PurchaseSticker x={130} y={520} r={-8} color={BUTTER} label="便當" live={live} delay={850}>
        <rect x={10} y={15} width={90} height={62} rx={12} />
        <path d="M 65 15 V 77 M 65 46 H 100" fill="none" />
        <circle cx={38} cy={46} r={16} fill={CREAM} />
        <path d="M 77 29 L 88 34 M 78 59 L 89 64" strokeLinecap="round" />
      </PurchaseSticker>
      <PurchaseSticker x={1590} y={360} r={7} color={PINK} label="飲料" live={live} delay={1200}>
        <path d="M 30 20 H 83 L 76 82 H 37 Z" />
        <path d="M 25 20 H 88 M 60 20 L 68 2 H 82" fill="none" strokeLinecap="round" />
        <circle cx={48} cy={65} r={4} fill={INK} stroke="none" />
        <circle cx={64} cy={68} r={4} fill={INK} stroke="none" />
      </PurchaseSticker>
      <PurchaseSticker x={1590} y={660} r={-5} color={PERI} label="公車" live={live} delay={1550}>
        <rect x={17} y={9} width={76} height={66} rx={12} />
        <path d="M 17 44 H 93 M 55 9 V 44 M 29 75 V 84 M 81 75 V 84" fill="none" />
        <circle cx={32} cy={60} r={5} fill={BUTTER} />
        <circle cx={78} cy={60} r={5} fill={BUTTER} />
      </PurchaseSticker>
    </Stage>
  );
};

const MoneyWaste: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="06" live={live}>
        錢是什麼
      </Tag>
      <Title live={live}>如果有一天，它什麼都買不到……</Title>
      <div style={abs(410, 340, { ...rise(live, 250) })}>
        <div
          style={{
            width: 1100,
            height: 538,
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
      <Sticker x={1060} y={600} r={-12} live={live} delay={900} bg={TOMATO} pad="22px 38px">
        <span style={{ ...DISPLAY, fontSize: 130 }}>廢紙</span>
      </Sticker>
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
      <Tag n="07" live={live}>
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
      <Tag n="08" live={live}>
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
    </Stage>
  );
};

const UX_COSTS: { title: string; detail: string; color: string }[] = [
  { title: '等太久', detail: '轉圈圈轉不停', color: PINK },
  { title: '一打開就要註冊', detail: '還沒用就先填一堆', color: BUTTER },
  { title: '找不到按鈕', detail: '想做的事要點好幾層', color: MINT },
  { title: '廣告跳不完', detail: '關了一個又一個', color: PERI },
  { title: '通知太吵', detail: '一天跳十幾次', color: BUTTER },
  { title: '一直閃退', detail: '剛打的東西全沒了', color: PINK },
];

const UxCost: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="11" live={live}>
        使用體驗的成本
      </Tag>
      <Title live={live}>不好用，也是一種成本</Title>
      {UX_COSTS.map((c, i) => (
        <Panel
          key={c.title}
          x={150 + (i % 3) * 560}
          y={i < 3 ? 330 : 600}
          width={500}
          height={230}
          color={c.color}
          live={live}
          delay={300 + i * 150}
        >
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h3 style={{ ...DISPLAY, fontSize: 52 }}>{c.title}</h3>
            <p style={{ ...BODY, fontSize: 30, marginTop: 14 }}>{c.detail}</p>
          </div>
        </Panel>
      ))}
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

const ValueBalance = ({ purchase, live }: { purchase: 'bag' | 'chatgpt'; live: boolean }) => {
  const isApp = purchase === 'chatgpt';
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
          {isApp ? '每月訂閱費' : '價格很重'}
        </ValueWeight>
        <ValueWeight
          x={448}
          height={isApp ? 165 : 110}
          color={MINT}
          label="你換到的價值"
          live={live}
          delay={delay + 550}
        >
          {isApp ? '省很多時間' : '生活用不到'}
        </ValueWeight>
      </div>
    </div>
  );
};

const ValueExchange: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="09" live={live}>
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
        <h3 style={{ ...DISPLAY, fontSize: 52 }}>ChatGPT</h3>
        <p style={{ ...BODY, fontSize: 28, lineHeight: 1.5, marginTop: 20 }}>
          每個月一點訂閱費，
          <br />
          查資料、寫報告都快很多。
        </p>
        <ValueBalance purchase="chatgpt" live={live} />
      </Panel>
      <Sticker x={723} y={320} r={8} bg={PINK} live={live} delay={2150} pad="12px 24px">
        <span style={{ ...DISPLAY, fontSize: 38 }}>不買</span>
      </Sticker>
      <Sticker x={1554} y={320} r={-6} bg={MINT} live={live} delay={4500} pad="12px 24px">
        <span style={{ ...DISPLAY, fontSize: 38 }}>願意付</span>
      </Sticker>
    </Stage>
  );
};

const POLL_USERS = 6000;
const POLL_PRICE = 10;
const POLL_RATIOS = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const POLL_BAR_MAX = 640;

const PlaceCard = ({
  x,
  color,
  place,
  wage,
  hours,
  live,
  delay,
}: {
  x: number;
  color: string;
  place: string;
  wage: string;
  hours: [string, string];
  live: boolean;
  delay: number;
}) => (
  <Panel x={x} y={340} width={760} height={500} color={color} live={live} delay={delay}>
    <h3 style={{ ...DISPLAY, fontSize: 56 }}>{place}</h3>
    <p style={{ ...BODY, fontSize: 28, marginTop: 8 }}>最低時薪 {wage}</p>
    {(['US$20 方案', 'US$100 方案'] as const).map((plan, i) => (
      <div
        key={plan}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          gap: 28,
          marginTop: i === 0 ? 40 : 18,
        }}
      >
        <span style={{ ...BODY, fontSize: 32, fontWeight: 700 }}>{plan}</span>
        <span style={{ ...NUM, fontSize: 100, lineHeight: 1.1 }}>{hours[i]}</span>
      </div>
    ))}
  </Panel>
);

const PricePerspective: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="11" live={live}>
        台灣的處境
      </Tag>
      <Title live={live}>付 ChatGPT 一個月，要工作多久？</Title>
      <PlaceCard
        x={120}
        color={PINK}
        place="台灣"
        wage="NT$196"
        hours={['3.3 小時', '16.6 小時']}
        live={live}
        delay={300}
      />
      <PlaceCard
        x={1040}
        color={MINT}
        place="舊金山"
        wage="US$19.61"
        hours={['1 小時', '5.1 小時']}
        live={live}
        delay={700}
      />
      <Footnote y={890}>
        US$20 約 NT$651、US$100 約 NT$3,256（臺灣銀行 10/30 牌告 32.555）。時薪：勞動部
        2026、舊金山市政府 2026/7/1 起。
      </Footnote>
    </Stage>
  );
};

const WhyTaiwan: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="11" live={live}>
        台灣的處境
      </Tag>
      <Title live={live}>為什麼台灣的軟體很難收錢？</Title>
      <h2
        style={{
          ...DISPLAY,
          ...abs(120, 400),
          width: 1680,
          fontSize: 84,
          lineHeight: 1.35,
          ...rise(live, 300, 40),
        }}
      >
        同樣的價值，台灣人要付出的
        <br />
        <span style={{ color: TOMATO }}>成本本來就比較高</span>。
      </h2>
      <p style={{ ...BODY, ...abs(120, 680), width: 1680, fontSize: 38, ...rise(live, 700) }}>
        同樣 US$20，台灣人要多工作好幾倍的時間。
      </p>
    </Stage>
  );
};

const GAME_PRICES: { price: string; verdict: string; color: string }[] = [
  { price: 'NT$640', verdict: '半價，一定要買！', color: MINT },
  { price: 'NT$1,280', verdict: '原價，可以買', color: BUTTER },
  { price: 'NT$2,560', verdict: '要想一下值不值得', color: PINK },
];

const GamePrices: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="10" live={live}>
        價值的例子
      </Tag>
      <Title live={live}>《黑神話：悟空》價錢變了，你還買嗎？</Title>
      {GAME_PRICES.map((item, i) => (
        <Panel
          key={item.price}
          x={140 + i * 565}
          y={445}
          width={510}
          height={380}
          color={item.color}
          live={live}
          delay={300 + i * 500}
        >
          <p style={{ ...BODY, fontWeight: 700 }}>如果它賣</p>
          <p style={{ ...NUM, fontSize: 104, lineHeight: 1.15, marginTop: 20 }}>{item.price}</p>
          <h3 style={{ ...DISPLAY, fontSize: 46, lineHeight: 1.3, marginTop: 28 }}>
            {item.verdict}
          </h3>
        </Panel>
      ))}
      <Footnote y={920}>Steam 台灣售價 NT$1,280，2026/11/2 查詢。</Footnote>
    </Stage>
  );
};

const PhoneOption = ({
  x,
  color,
  name,
  price,
  detail,
  live,
  delay,
}: {
  x: number;
  color: string;
  name: string;
  price: string;
  detail: string;
  live: boolean;
  delay: number;
}) => (
  <Panel x={x} y={360} width={760} height={400} color={color} live={live} delay={delay}>
    <h3 style={{ ...DISPLAY, fontSize: 64 }}>{name}</h3>
    <p style={{ ...NUM, fontSize: 96, lineHeight: 1.1, marginTop: 30 }}>{price}</p>
    <p style={{ ...BODY, fontSize: 30, lineHeight: 1.5, marginTop: 22 }}>{detail}</p>
  </Panel>
);

const PhoneChoice: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="10" live={live}>
        價值的例子
      </Tag>
      <Title live={live}>沒有預算上限，你選哪一支？</Title>
      <PhoneOption
        x={120}
        color={PERI}
        name="iPhone 18 Pro"
        price="NT$44,900 起"
        detail="最高 2TB，NT$88,900。"
        live={live}
        delay={300}
      />
      <PhoneOption
        x={1040}
        color={BUTTER}
        name="iPhone Duo"
        price="NT$74,900 起"
        detail="第一支摺疊 iPhone，最高 NT$118,900。"
        live={live}
        delay={600}
      />
      <Footnote y={920}>Apple 台灣官網售價，2026/11/1 查詢。</Footnote>
    </Stage>
  );
};

const NEWS: { image: string; outlet: string; headline: string }[] = [
  {
    image: newsMacrumors,
    outlet: 'MacRumors · 10/23',
    headline: '用戶回報：Duo 內螢幕沿著轉軸裂開',
  },
  {
    image: newsTvbs,
    outlet: 'TVBS · 10/28',
    headline: '台灣首批災情：螢幕裂痕、鉸鏈凸起，內螢幕維修 NT$37,350',
  },
  {
    image: newsCnyes,
    outlet: '鉅亨網 · 11/1',
    headline: 'iFixit 拆機：轉軸可能壓到內螢幕',
  },
];

const PhoneNews: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="10" live={live}>
        價值的例子
      </Tag>
      <Title live={live}>但開賣才兩週，Duo 出了這些事……</Title>
      {NEWS.map((item, i) => (
        <div
          key={item.outlet}
          style={abs(120 + i * 570, 340, {
            width: 540,
            height: 470,
            boxSizing: 'border-box',
            background: PAPER,
            border: BORDER,
            borderRadius: 26,
            boxShadow: shadow(8),
            overflow: 'hidden',
            ...rise(live, 300 + i * 250, 40),
          })}
        >
          <img
            src={item.image}
            alt=""
            style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }}
          />
          <div style={{ padding: '18px 26px' }}>
            <p style={{ ...MONO, fontSize: 18, textTransform: 'none', color: MUTED }}>
              {item.outlet}
            </p>
            <p style={{ ...DISPLAY, fontSize: 29, lineHeight: 1.35, marginTop: 10 }}>
              {item.headline}
            </p>
          </div>
        </div>
      ))}
      <Footnote y={930}>圖文出處：MacRumors、TVBS TECH、鉅亨網；維修價格依 TVBS 報導。</Footnote>
    </Stage>
  );
};

const BanfengPricing: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="12" live={live}>
        降低成本
      </Tag>
      <h2
        style={{
          ...DISPLAY,
          ...abs(120, 300),
          width: 1680,
          fontSize: 100,
          lineHeight: 1.3,
          ...rise(live, 200, 40),
        }}
      >
        如果現在半逢遇甲
        <br />
        每個月收 <span style={{ color: TOMATO }}>10 塊</span>，
        <br />
        會付錢的舉手！
      </h2>
    </Stage>
  );
};

const LivePoll: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="13" live={live}>
        現場調查
      </Tag>
      <Title live={live} size={80}>
        你能不能提供價值，讓使用者買單？
      </Title>
      <div style={abs(120, 300, { width: 560 })}>
        <div
          style={{
            width: 230,
            height: 420,
            margin: '0 auto',
            border: BORDER,
            borderRadius: 34,
            boxShadow: shadow(8),
            overflow: 'hidden',
            background: PAPER,
            ...rise(live, 150, 40),
          }}
        >
          <img
            src={banfengHome}
            alt="半逢遇甲的美食首頁截圖"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <h3 style={{ ...DISPLAY, fontSize: 56, marginTop: 28, ...rise(live, 300, 20) }}>
          半逢遇甲
        </h3>
        <p style={{ ...BODY, fontSize: 26, marginTop: 6, color: MUTED, ...rise(live, 350, 20) }}>
          逢甲的校園資訊 App
        </p>
        <div
          style={
            {
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: 10,
              marginTop: 18,
              padding: '8px 20px',
              border: `3px solid ${INK}`,
              borderRadius: 999,
              background: MINT,
              boxShadow: shadow(4),
              '--r': '-3deg',
              transform: 'rotate(-3deg)',
              ...anim(live, `pm-slap 600ms ${SLAP} 500ms both`),
            } as CSSProperties
          }
        >
          <span style={{ ...BODY, fontSize: 24, fontWeight: 700 }}>每月活躍 約</span>
          <span style={{ ...NUM, fontSize: 40 }}>6,000</span>
          <span style={{ ...BODY, fontSize: 24, fontWeight: 700 }}>人</span>
        </div>
      </div>
      <div
        style={abs(740, 300, {
          width: 1060,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          textAlign: 'left',
        })}
      >
        {POLL_RATIOS.map((ratio, i) => {
          const income = (POLL_USERS * ratio * POLL_PRICE) / 100;
          return (
            <div key={ratio} style={{ display: 'flex', alignItems: 'center', gap: 22, height: 52 }}>
              <span style={{ ...NUM, width: 110, fontSize: 38, textAlign: 'right' }}>{ratio}%</span>
              <div style={{ width: POLL_BAR_MAX, height: 40 }}>
                <div
                  style={{
                    width: (POLL_BAR_MAX * ratio) / 100,
                    height: '100%',
                    boxSizing: 'border-box',
                    background: ratio === 100 ? TOMATO : BUTTER,
                    border: `3px solid ${INK}`,
                    borderRadius: 12,
                    boxShadow: shadow(4),
                    transformOrigin: 'left center',
                    ...anim(live, `av-grow 650ms ${BOUNCY} ${450 + i * 70}ms both`),
                  }}
                />
              </div>
              <span
                style={{
                  ...NUM,
                  width: 260,
                  fontSize: 40,
                  textAlign: 'right',
                  ...rise(live, 650 + i * 70, 12),
                }}
              >
                NT${income.toLocaleString('en-US')}
              </span>
            </div>
          );
        })}
      </div>
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
      <Tag n="15" live={live}>
        Dcard 靠什麼賺錢
      </Tag>
      <Title live={live}>Dcard 不收你錢，那它靠什麼賺？</Title>
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
        detail="滑文章、看討論"
        color={BUTTER}
        live={live}
        delay={200}
      />
      <AttentionNode
        x={760}
        y={480}
        label="Dcard"
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
      <Tag n="14" live={live}>
        注意力，也有價值
      </Tag>
      <Title live={live}>有人每天打開，就有變現的機會。</Title>
      <p style={{ ...BODY, ...abs(120, 295), width: 1680, fontSize: 30, ...rise(live, 120) }}>
        就算不收錢，有人每天打開也是一種價值。
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
  <Panel x={x} y={365} width={320} height={470} color={color} live={live} delay={delay}>
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
      <Tag n="16" live={live}>
        五種賺錢方式
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
        每月付費升級。
      </ModelCard>
      <ModelCard
        x={460}
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
      <ModelCard x={800} color={PERI} title="廣告" payer="店家為曝光付費" live={live} delay={500}>
        宵夜資訊 App，
        <br />
        店家買推薦版位。
      </ModelCard>
      <ModelCard
        x={1140}
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
      <ModelCard
        x={1480}
        color={TOMATO}
        title={
          <>
            補助
            <br />
            ／贊助
          </>
        }
        payer="為公共利益付費"
        live={live}
        delay={800}
      >
        無障礙校園地圖，
        <br />
        政府、公益團體。
      </ModelCard>
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
    style={abs(860, y, {
      width: 940,
      height: 190,
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
    <span style={{ ...DISPLAY, fontSize: 36 }}>{label}</span>
    <span
      style={{
        ...BODY,
        fontSize: 34,
        lineHeight: 1.4,
        textWrap: 'balance',
        whiteSpace: 'pre-line',
      }}
    >
      {children}
    </span>
  </div>
);

const caseStudyPage = (data: CaseStudyData): Page => {
  const CaseStudy: Page = () => {
    const live = useLive();
    const shotWidth = data.shots.length > 2 ? 226 : 270;
    const gap = 24;
    const rowWidth = data.shots.length * shotWidth + (data.shots.length - 1) * gap;
    return (
      <Stage>
        <Tag n="02" live={live}>
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
        <p style={{ ...BODY, ...abs(120, 285), width: 1680, fontSize: 38, ...rise(live, 180) }}>
          {data.tagline}
        </p>
        <div
          style={abs(120 + (720 - rowWidth) / 2, 360, {
            height: 600,
            display: 'flex',
            alignItems: 'center',
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
                height: 'auto',
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
        <CaseCard y={565} color={MINT} label="解決辦法" live={live} delay={650}>
          {data.solution}
        </CaseCard>
        <CaseCard y={770} color={BUTTER} label="盈利模式" live={live} delay={850}>
          {data.revenue}
        </CaseCard>
      </Stage>
    );
  };
  return CaseStudy;
};

type Founder = {
  name: string;
  role: string;
  photo?: string;
  lines: string[];
};

type TeamData = {
  team: string;
  batch: string;
  icon: string;
  shots: string[];
  founders: Founder[];
  note?: string;
};

const FounderCard = ({
  founder,
  width,
  live,
  delay,
}: {
  founder: Founder;
  width: number;
  live: boolean;
  delay: number;
}) => (
  <div style={{ width, ...rise(live, delay, 40) }}>
    <div
      style={{
        width: 220,
        height: 220,
        margin: '0 auto',
        borderRadius: '50%',
        border: BORDER,
        boxShadow: shadow(6),
        overflow: 'hidden',
        background: PERI,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {founder.photo ? (
        <img
          src={founder.photo}
          alt={founder.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <span style={{ ...DISPLAY, fontSize: 84 }}>{founder.name.slice(0, 1)}</span>
      )}
    </div>
    <h3 style={{ ...DISPLAY, fontSize: 48, marginTop: 26 }}>{founder.name}</h3>
    <p style={{ ...BODY, fontSize: 28, fontWeight: 700, color: MUTED, marginTop: 6 }}>
      {founder.role}
    </p>
    <div style={{ marginTop: 16 }}>
      {founder.lines.map((line) => (
        <p key={line} style={{ ...BODY, fontSize: 32, lineHeight: 1.45 }}>
          {line}
        </p>
      ))}
    </div>
  </div>
);

const teamPage = (data: TeamData): Page => {
  const TeamIntro: Page = () => {
    const live = useLive();
    const width = data.founders.length > 2 ? 500 : 600;
    return (
      <Stage>
        <div
          style={abs(0, 0, {
            width: 1920,
            height: 1080,
            display: 'flex',
            opacity: 0.1,
            filter: 'blur(3px)',
          })}
        >
          {data.shots.map((shot) => (
            <img
              key={shot}
              src={shot}
              alt=""
              style={{ flex: 1, minWidth: 0, height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ))}
        </div>
        <Tag n="02" live={live}>
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
          <h2 style={{ ...DISPLAY, fontSize: 88 }}>{data.team} 的團隊</h2>
        </div>
        <div
          style={abs(120, 330, {
            width: 1680,
            display: 'flex',
            justifyContent: 'center',
            gap: 60,
          })}
        >
          {data.founders.map((founder, i) => (
            <FounderCard
              key={founder.name}
              founder={founder}
              width={width}
              live={live}
              delay={300 + i * 300}
            />
          ))}
        </div>
        {data.note && (
          <p
            style={{
              ...DISPLAY,
              ...abs(120, 880),
              width: 1680,
              fontSize: 36,
              color: TOMATO,
              ...rise(live, 1200),
            }}
          >
            {data.note}
          </p>
        )}
      </Stage>
    );
  };
  return TeamIntro;
};

const teamPicpet = teamPage({
  team: 'PicPet',
  batch: 'ikigai #01',
  icon: casePicpetIcon,
  shots: [casePicpet1, casePicpet2, casePicpet3],
  founders: [
    {
      name: 'Jimmy Huang',
      role: '執行長',
      photo: founderJimmyHuang,
      lines: ['公司設在舊金山', '入選 a16z Speedrun 加速器'],
    },
  ],
});

const teamTellitnow = teamPage({
  team: 'Tell It Now',
  batch: 'ikigai #02',
  icon: caseTellitnowIcon,
  shots: [caseTellitnow1, caseTellitnow2, caseTellitnow3],
  founders: [
    {
      name: 'Ryan Yang',
      role: '執行長',
      photo: founderRyanYang,
      lines: ['Carnegie Mellon 畢業', '前 Cisco、Palo Alto Networks 工程師', '第二次創業'],
    },
    {
      name: '陳昕睿 Pacha',
      role: '營運長',
      photo: founderPachaChen,
      lines: ['前趨勢科技', '做過 UX 設計、新創顧問'],
    },
  ],
});

const teamSugarai = teamPage({
  team: 'Sugar AI',
  batch: 'ikigai #02',
  icon: caseSugaraiIcon,
  shots: [caseSugarai1, caseSugarai2, caseSugarai3],
  founders: [
    {
      name: 'Jarshan Chen',
      role: '執行長',
      photo: founderJarshanChen,
      lines: ['前 LINE 機器學習工程師', '創業時 22 歲'],
    },
    {
      name: 'Jerry Lee',
      role: '技術長',
      photo: founderJerryLee,
      lines: ['前工研院 AI 工程師'],
    },
  ],
  note: '大學時就一起參加黑客松，一路合作到現在',
});

const teamLfg = teamPage({
  team: 'lfg',
  batch: 'ikigai #03',
  icon: caseLfgIcon,
  shots: [caseLfg1, caseLfg2, caseLfg3],
  founders: [
    {
      name: 'Prasenjit Das',
      role: '共同創辦人',
      lines: ['港科大數學系', '前 Lalamove、DASH 工程師'],
    },
    { name: 'Julia Cheung', role: '共同創辦人', lines: ['公開資料不多'] },
    { name: 'Kartikay S.', role: '共同創辦人', lines: ['和 Prasenjit 是前同事'] },
  ],
});

const teamPeeps = teamPage({
  team: 'Peeps',
  batch: 'ikigai #03',
  icon: casePeepsIcon,
  shots: [casePeeps1, casePeeps2, casePeeps3],
  founders: [
    {
      name: '葉又銘 Marx',
      role: '執行長',
      photo: founderMarxYeh,
      lines: ['台大資管／資工背景', 'Peeps 第一版一個人寫完'],
    },
    {
      name: 'Ronny Yen',
      role: '行銷長',
      photo: founderRonnyYen,
      lines: ['負責產品和商務'],
    },
  ],
  note: '一年上架十幾款 App，大多失敗，才做出總榜第一的 Peeps',
});

const Studio886: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <img
        src={batchGroup}
        alt=""
        style={abs(0, 0, {
          width: 1920,
          height: 1080,
          objectFit: 'cover',
          opacity: 0.16,
          display: 'block',
        })}
      />
      <Tag n="02" live={live}>
        886 案例
      </Tag>
      <Title live={live}>886 Studios：每隊投資 US$10 萬</Title>
      <p style={{ ...BODY, ...abs(120, 290), width: 1680, fontSize: 34, ...rise(live, 180) }}>
        台北的新創工作室，計畫叫 ikigai Launchpad。
      </p>
      <Panel x={340} y={380} width={560} height={330} color={BUTTER} live={live} delay={300}>
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <p style={{ ...NUM, fontSize: 110, lineHeight: 1.1 }}>10 週</p>
          <p style={{ ...BODY, fontSize: 30, marginTop: 18 }}>在台北實體進行</p>
        </div>
      </Panel>
      <Panel x={1020} y={380} width={560} height={330} color={MINT} live={live} delay={500}>
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <p style={{ ...NUM, fontSize: 110, lineHeight: 1.1 }}>US$100K</p>
          <p style={{ ...BODY, fontSize: 30, marginTop: 18 }}>換公司 8% 股份</p>
        </div>
      </Panel>
      <Footnote y={900}>
        投資條件：US$100K 換 8% SAFE。資料：886studios.com、886 Studios Substack；後面各頁的價格取自
        App Store／Google Play，2026/11/1 查詢。
      </Footnote>
    </Stage>
  );
};

const casePicpet = caseStudyPage({
  name: 'PicPet',
  batch: 'ikigai #01',
  tagline: '跟好朋友一起養一隻虛擬寵物，用每天的照片餵牠。',
  problem: '好朋友各自忙，很少分享生活，感情慢慢就淡了。',
  solution: '一起養寵物，每天拍照「餵」牠，\n寵物會升等、解鎖家具。',
  revenue: '免費下載。PicPet+ 月訂 NT$120／年訂 NT$1,190，另賣金幣。',
  icon: casePicpetIcon,
  shots: [casePicpet1, casePicpet2, casePicpet3],
});

const caseTellitnow = caseStudyPage({
  name: 'Tell It Now',
  batch: 'ikigai #02',
  tagline: '店家在地圖上發探店任務，附近的人到店發文領獎勵。',
  problem: '小店想宣傳，找網紅又貴又難配對，也拿不到真實口碑。',
  solution: '附近的人收到任務就能到店體驗、發文，\n店家審核後發獎勵。',
  revenue: '對發文的人免費，向店家收月費：NT$2,999 起；單次任務抽 30%。',
  icon: caseTellitnowIcon,
  shots: [caseTellitnow1, caseTellitnow2, caseTellitnow3],
});

const caseSugarai = caseStudyPage({
  name: 'Sugar AI',
  batch: 'ikigai #02',
  tagline: '跟正版授權的漫畫角色一對一聊天。',
  problem: '喜歡的角色只能看、不能互動；創作者也少有新的變現方式。',
  solution: '向創作者取得授權，個性由創作者監修，\n角色會記得你們的對話。',
  revenue: '免費下載，賣 App 內道具（NT$59 起）和月卡 NT$199。',
  icon: caseSugaraiIcon,
  shots: [caseSugarai1, caseSugarai2, caseSugarai3],
});

const caseLfg = caseStudyPage({
  name: 'lfg',
  batch: 'ikigai #03',
  tagline: '把看到的店存成共用地圖，一鍵揪朋友出門。',
  problem: '群組裡「要幹嘛」「你決定啦」來回鬼打牆，最後常常約不成。',
  solution: '想去的店丟進地圖，\n選地點、選人、送出，朋友直接回要不要。',
  revenue: '免費下載，收藏數用完再買：10 次 NT$30、50 次 NT$90。',
  icon: caseLfgIcon,
  shots: [caseLfg1, caseLfg2, caseLfg3],
});

const casePeeps = caseStudyPage({
  name: 'Peeps',
  batch: 'ikigai #03',
  tagline: '跟好朋友、另一半一起住的線上像素小家。',
  problem: '想跟朋友保持聯繫，但發限動、傳訊息都有壓力。',
  solution: '共用的像素房間，一起佈置、養寵物、玩小遊戲，\n打開就像回家。',
  revenue: '免費下載。PRIME 月訂 NT$150／年訂 NT$1,290，另賣 P 幣。',
  icon: casePeepsIcon,
  shots: [casePeeps1, casePeeps2, casePeeps3],
});

const caseKardomo = caseStudyPage({
  name: 'Kardomo',
  batch: 'ikigai #03',
  tagline: '台灣 K-pop 粉絲的一站式追星 App。',
  problem: '追星要在好幾個 App 之間跳：行程、榜單、小卡都分開記。',
  solution: '把追星行事曆、音樂榜單、\n小卡圖鑑、討論串放進同一個 App。',
  revenue: '目前免費、沒有內購，官方沒有公開怎麼收費。',
  icon: caseKardomoIcon,
  shots: [caseKardomo1, caseKardomo2, caseKardomo3],
});

const RESOURCES: { name: string; org: string; reward: string; detail: string; color: string }[] = [
  {
    name: '智在家鄉',
    org: '聯發科技教育基金會',
    reward: '最高 100 萬',
    detail: '只有點子也能報',
    color: BUTTER,
  },
  {
    name: 'U-start',
    org: '教育部青年發展署',
    reward: '50～150 萬',
    detail: '和學校育成中心申請',
    color: MINT,
  },
  { name: 'FITI', org: '國科會', reward: '最高 100 萬', detail: '四關每關都有錢', color: PERI },
  {
    name: '戰國策',
    org: '新北市青年局等',
    reward: '總獎金 32 萬',
    detail: '18～35 歲、免報名費',
    color: PINK,
  },
];

const CompetitionIntro: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="19" live={live}>
        額外資源
      </Tag>
      <Title live={live}>等你擁有作品，再拿它去爭取更多資源</Title>
      {RESOURCES.map((r, i) => (
        <Panel
          key={r.name}
          x={120 + i * 430}
          y={340}
          width={390}
          height={500}
          color={r.color}
          live={live}
          delay={300 + i * 200}
        >
          <h3 style={{ ...DISPLAY, fontSize: 58 }}>{r.name}</h3>
          <p style={{ ...BODY, fontSize: 26, fontWeight: 700, color: MUTED, marginTop: 10 }}>
            {r.org}
          </p>
          <p style={{ ...NUM, fontSize: 52, lineHeight: 1.2, marginTop: 70 }}>{r.reward}</p>
          <p style={{ ...BODY, fontSize: 30, lineHeight: 1.45, marginTop: 40 }}>{r.detail}</p>
        </Panel>
      ))}
      <Footnote y={890}>
        資料：各計畫官網與簡章（2026）。U-start 為第一階段 50 萬＋第二階段 35～100 萬。
      </Footnote>
    </Stage>
  );
};

const FindProblem: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="17" live={live}>
        怎麼找題目
      </Tag>
      <Title live={live} size={82}>
        找一件煩到大家願意
        <br />
        <span style={{ color: TOMATO }}>每個月付 10 塊</span>解決的事。
      </Title>
      <Sticker x={480} y={470} r={-5} live={live} delay={350} bg={BUTTER} pad="28px 42px">
        <span style={{ ...DISPLAY, fontSize: 58 }}>選課</span>
      </Sticker>
      <Sticker x={790} y={485} r={4} live={live} delay={500} bg={MINT} pad="28px 42px">
        <span style={{ ...DISPLAY, fontSize: 58 }}>找室友</span>
      </Sticker>
      <Sticker x={1140} y={460} r={-4} live={live} delay={650} bg={PERI} pad="28px 42px">
        <span style={{ ...DISPLAY, fontSize: 58 }}>宵夜團購</span>
      </Sticker>
      <Sticker x={540} y={690} r={3} live={live} delay={800} bg={PINK} pad="28px 42px">
        <span style={{ ...DISPLAY, fontSize: 58 }}>二手教科書</span>
      </Sticker>
      <Sticker x={1010} y={685} r={-3} live={live} delay={950} bg={BUTTER} pad="28px 42px">
        <span style={{ ...DISPLAY, fontSize: 58 }}>找讀書夥伴</span>
      </Sticker>
      <Sparkle x={1500} y={640} size={50} color={MINT} live={live} delay={1150} />
    </Stage>
  );
};

const CAMPUS_LIMITS: { title: string; detail: string; color: string }[] = [
  { title: '市場只有一個校園', detail: '全校都用，也才幾萬人', color: PINK },
  { title: '使用者預算很低', detail: '學生願意付的錢本來就少', color: BUTTER },
  { title: '很難走出學校', detail: '換一間學校，需求就不一樣', color: PERI },
];

const CampusCeiling: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="17" live={live}>
        校園題目的天花板
      </Tag>
      <Title live={live}>但要小心：校園題目有天花板</Title>
      <p style={{ ...BODY, ...abs(120, 290), width: 1680, fontSize: 34, ...rise(live, 180) }}>
        美食地圖、資訊平台、交友、各種媒合，很適合練習，但很難變成生意。
      </p>
      {CAMPUS_LIMITS.map((c, i) => (
        <Panel
          key={c.title}
          x={150 + i * 560}
          y={400}
          width={500}
          height={300}
          color={c.color}
          live={live}
          delay={300 + i * 200}
        >
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h3 style={{ ...DISPLAY, fontSize: 50 }}>{c.title}</h3>
            <p style={{ ...BODY, fontSize: 30, marginTop: 18 }}>{c.detail}</p>
          </div>
        </Panel>
      ))}
      <p
        style={{
          ...DISPLAY,
          ...abs(120, 780),
          width: 1680,
          fontSize: 44,
          ...rise(live, 1000),
        }}
      >
        想做成生意，先問：這個需求，<span style={{ color: TOMATO }}>走得出校園嗎？</span>
      </p>
      <Footnote y={900}>觀點參考：Threads @paulyao825</Footnote>
    </Stage>
  );
};

const MINDSETS: { label: string; color: string; lines: string[] }[] = [
  { label: '比賽的思維', color: PAPER, lines: ['評審喜歡什麼？', '做到 demo 那天', '獎金是終點'] },
  {
    label: '商業的思維',
    color: BUTTER,
    lines: ['使用者願意為什麼付錢？', '做到有人每天在用', '收入讓你一直做下去'],
  },
];

const StillAlive: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="18" live={live}>
        換個思維
      </Tag>
      <Title live={live}>不要用比賽的方式做，去想商業模式</Title>
      {MINDSETS.map((m, i) => (
        <Panel
          key={m.label}
          x={150 + i * 900}
          y={340}
          width={720}
          height={470}
          color={m.color}
          live={live}
          delay={300 + i * 400}
        >
          <h3 style={{ ...DISPLAY, fontSize: 60, color: i === 1 ? TOMATO : INK }}>{m.label}</h3>
          <div style={{ marginTop: 34, display: 'flex', flexDirection: 'column', gap: 22 }}>
            {m.lines.map((line) => (
              <p
                key={line}
                style={{ ...BODY, fontSize: 38, fontWeight: 700, color: i === 0 ? MUTED : INK }}
              >
                {line}
              </p>
            ))}
          </div>
        </Panel>
      ))}
      <div style={{ ...DISPLAY, ...abs(880, 520), width: 160, fontSize: 90, ...rise(live, 550) }}>
        →
      </div>
    </Stage>
  );
};

const Garage: Page = () => {
  const live = useLive();
  return (
    <Stage>
      <Tag n="20" live={live}>
        大膽想像
      </Tag>
      <p
        style={{
          ...BODY,
          ...abs(120, 230),
          width: 1680,
          fontSize: 40,
          color: MUTED,
          ...rise(live, 150),
        }}
      >
        有人交代任務，台灣人可以把它做得非常好。
      </p>
      <h2
        style={{
          ...DISPLAY,
          ...abs(120, 360),
          width: 1680,
          fontSize: 92,
          lineHeight: 1.3,
          ...rise(live, 500, 40),
        }}
      >
        賈伯斯在車庫的時候，
        <br />
        沒有人告訴他，未來會變成這樣。
      </h2>
      <p
        style={{
          ...DISPLAY,
          ...abs(120, 700),
          width: 1680,
          fontSize: 64,
          color: TOMATO,
          ...rise(live, 1100, 30),
        }}
      >
        世界上還沒有的東西，要靠你大膽想像。
      </p>
    </Stage>
  );
};

const Close: Page = () => {
  const live = useLive();
  return (
    <Stage footer={false}>
      <Tag n="21" live={live} color={TOMATO}>
        結語與下一步
      </Tag>
      <h2
        style={{
          ...DISPLAY,
          ...abs(120, 200),
          width: 1140,
          fontSize: 66,
          lineHeight: 1.3,
          ...rise(live, 100),
        }}
      >
        給你<span style={{ color: TOMATO }}>一個機會</span>，
        <br />
        現在你知道要做什麼了嗎？
      </h2>
      <div style={abs(120, 430, { width: 1140, ...rise(live, 450, 30) })}>
        <p style={{ ...BODY, fontSize: 36, fontWeight: 700, color: MUTED }}>下一步</p>
        <p style={{ ...DISPLAY, fontSize: 150, lineHeight: 1.15, color: TOMATO, marginTop: 6 }}>
          來找我
        </p>
        <p style={{ ...BODY, fontSize: 34, fontWeight: 700, marginTop: 14 }}>
          想做出商業模式、想創業，帶一個想法來就好
        </p>
      </div>
      <p
        style={{
          ...DISPLAY,
          ...abs(120, 880),
          width: 1140,
          fontSize: 52,
          color: TOMATO,
          ...rise(live, 1500),
        }}
      >
        創業，其實沒有你想像中那麼難。
      </p>
      <Panel x={1360} y={270} width={410} height={540} color={BUTTER} live={live} delay={350}>
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
      <Sparkle x={1270} y={640} size={48} color={MINT} live={live} delay={1350} />
    </Stage>
  );
};

export const meta: SlideMeta = {
  title: '創業，其實沒有你想像中那麼難',
  createdAt: '2026-11-01T14:03:16.000Z',
  theme: 'pommi',
};

export const notes: string[] = [
  `【開場前一直停在這頁，人到齊再往下。】
大家好，我是瑞瑞。今天在「App 登場時刻」，我想跟大家聊新創。
就像標題寫的：創業，其實沒有你想像中那麼難。
很多人覺得新創離我們很遠，好像要先開公司、找投資人才算。但其實，做一個 App、讓它有人用、甚至能賺錢，就已經是一次新創。開始之前，先問大家一個問題。`,
  `【讓題目停在畫面上，請兩三個人回答。】
給你三百二十萬，你會做什麼？
【聽完回應，稍微接幾句。】`,
  `這不是假設。台北有一間新創工作室叫 886 Studios，它的加速計畫 ikigai Launchpad，真的給每一隊十萬美元，換成台幣差不多就是三百二十萬。
在台北實體進行十週。
要注意，這是投資，不是獎金。十萬美元換的是你公司 8% 的股份，拿了錢，公司就有一部分是別人的。
我們快速看幾個拿到這筆錢、而且有做 App 的團隊。每一頁我都整理了三件事：他們遇到什麼問題、怎麼解決，還有怎麼賺錢。`,
  `先看 PicPet。創辦人 Jimmy Huang，公司設在舊金山，還入選了 a16z 的加速器。`,
  `PicPet。跟好朋友一起養一隻虛擬寵物，用每天的照片餵牠。
問題：好朋友各自忙，很少分享生活，感情慢慢就淡了。
解法：一起養寵物，每天拍照「餵」牠，寵物會升等、解鎖家具。
怎麼賺：免費下載。PicPet+ 月訂 NT$120／年訂 NT$1,190，另賣金幣。`,
  `Tell It Now 的兩位創辦人，Ryan 是 Carnegie Mellon 畢業、當過 Cisco 和 Palo Alto Networks 的工程師，這是他第二次創業；營運長陳昕睿待過趨勢科技，做過 UX 設計。`,
  `Tell It Now。店家在地圖上發探店任務，附近的人到店發文領獎勵。
問題：小店想宣傳，找網紅又貴又難配對，也拿不到真實口碑。
解法：附近的人收到任務就能到店體驗、發文，店家審核後發獎勵。
怎麼賺：對發文的人免費，向店家收月費：NT$2,999 起；單次任務抽 30%。`,
  `Sugar AI 的兩位創辦人就比較年輕了。執行長 Jarshan 是前 LINE 的機器學習工程師，創業時才二十二歲；技術長 Jerry 待過工研院。他們大學時就一起參加黑客松，一路合作到現在。`,
  `Sugar AI。跟正版授權的漫畫角色一對一聊天。
問題：喜歡的角色只能看、不能互動；創作者也少有新的變現方式。
解法：向創作者取得授權，個性由創作者監修，角色會記得你們的對話。
怎麼賺：免費下載，賣 App 內道具（NT$59 起）和月卡 NT$199。`,
  `lfg 是三個人在香港一起做的。Prasenjit 是港科大數學系，在 Lalamove 當過工程師，跟另一位創辦人 Kartikay 以前就是同事。`,
  `lfg。把看到的店存成共用地圖，一鍵揪朋友出門。
問題：群組裡「要幹嘛」「你決定啦」來回鬼打牆，最後常常約不成。
解法：想去的店丟進地圖，選地點、選人、送出，朋友直接回要不要。
怎麼賺：免費下載，收藏數用完再買：10 次 NT$30、50 次 NT$90。`,
  `最後這組最接近在座的大家。Peeps 的執行長葉又銘是台大資管、資工背景，一年上架了十幾款 App，大多失敗，最後才做出衝上 App Store 總榜第一的 Peeps，第一版還是他一個人寫完的。`,
  `Peeps。跟好朋友、另一半一起住的線上像素小家。
問題：想跟朋友保持聯繫，但發限動、傳訊息都有壓力。
解法：共用的像素房間，一起佈置、養寵物、玩小遊戲，打開就像回家。
怎麼賺：免費下載。PRIME 月訂 NT$150／年訂 NT$1,290，另賣 P 幣。`,
  `Kardomo。台灣 K-pop 粉絲的一站式追星 App。
問題：追星要在好幾個 App 之間跳：行程、榜單、小卡都分開記。
解法：把追星行事曆、音樂榜單、小卡圖鑑、討論串放進同一個 App。
怎麼賺：目前免費、沒有內購，官方沒有公開怎麼收費。`,
  `看完這些團隊，你會發現一件事。
【停一下，讓大家讀完。】
他們拿到錢，不是因為得了什麼獎，而是因為做出了有人在用的東西。`,
  `【先讓大家看題目，留時間舉手。】
那回到你們身上。如果這次沒得獎，你的 App 還會繼續做下去嗎？會的，可以舉個手嗎？
【停一下，看看台下。】
我也是這次的評審，所以先說清楚：今天分享的內容跟評分無關，不會因為你有沒有照今天講的做，就加分或扣分。
今天想跟大家聊的，不是怎麼得獎，而是作品離開比賽之後，怎麼把它當成一間新創，讓它活下去，甚至賺到錢。先從大家選題目的習慣聊起。`,
  `以前選題目的時候，很常先想：什麼題目比較容易得獎？
題目有意義當然很好。但如果每個決定都只為了上台那一刻，比完以後，功能交了、簡報交了，App 也就停了。
【指右邊那張卡。】
得獎了，至少還有獎金和掌聲。那沒得獎呢？這個 App 就真的沒有了嗎？`,
  `得不得獎，看的是評審的評分標準，還有當天的表現，這件事不完全由你決定。
但我想問，為什麼要把我們 App 的結局，交給評審去決定？
【指左右兩邊。】
評審決定的，是得不得獎。但 App 要不要繼續做，不是評審能幫你決定的，你得先找到自己要做下去的理由。
那你的理由會是什麼？`,
  `【讓標籤一個一個跳出來，不用逐一解釋。】
你為什麼想做這個 App？每個人的答案都不一樣，挑一個你心裡的就好。
【停一下，讓大家自己找。】
找到了，那就是你撐下去的理由。
其中有一個很實際的：有人願意為你的 App 付錢。有人付錢，你就有辦法一直做下去，這也是新創跟作業最大的差別。所以接下來，我們要先搞懂一件事：別人為什麼會願意付錢？`,
  `【停一下，讓大家笑。】
很多事情可以靠錢解決。如果錢沒辦法解決，那就是不夠多。
開玩笑的。不過對新創來說，錢真的很重要。那錢到底是什麼？`,
  `很久以前還沒有錢的時候，大家是以物易物，我用一袋米跟你換一隻雞。後來東西太多、換起來太麻煩，才有了錢，讓大家可以拿它去換任何東西。
所以拿一張一百塊來看，為什麼它值一百塊？因為你可以拿它換便當、買飲料，或搭公車。
【讓貼紙出現，問大家平常會拿來買什麼。】`,
  `那想像一下，有一天，這張一百塊什麼都買不到，沒人願意收。紙還是同一張紙，但對你來說，它就跟廢紙一樣。
【等「廢紙」蓋下來。】
所以錢本身沒有價值，它能換到東西，才有價值。
那它換到的這些東西，又有什麼價值？`,
  `價值，就是一樣東西能幫你解決多少問題、對你有多重要。
拿雨傘來說，晴天帶著它，只覺得包包變重；下大雨的時候，沒有它就全身濕透。
【指兩張卡。】
同一把傘，價值差很多。所以價值不是東西本身決定的，是看誰、在什麼時候需要它。
有價值，就會有代價。我們要得到它，得付出什麼？`,
  `這個代價就叫成本。成本，就是為了得到一樣東西，你得先放棄的東西，而且不只是錢。
錢最直接，訂閱費、內購。時間也是，下載、註冊、學怎麼用。注意力也是，看廣告、被通知打擾。
【指下面一排。】
還有心力，你要想、要選、還要記得打開它。還有精神，介面難用，用越久越累。還有習慣，你得放棄原本用順手的方法。還有個資，要交出位置、聯絡人。
最後是機會成本。付給你的十塊，原本可以買一杯紅茶；選了你，就等於放棄了那杯紅茶。只要做選擇，就一定有東西被放棄，所以機會成本永遠都在。
【停一下。】
所以使用者每打開一次你的 App，都在付出成本。就算 App 免費，成本也不是零。`,
  `把價值和成本放在一起，就是這個蹺蹺板。我們買任何東西，其實都在比：付出的成本，跟換到的價值，哪一邊比較重。
拿學生生活來想，名牌包價格很重，可是我的生活用不到它的價值，也拿不出能換它的錢，我就不買。
ChatGPT 就不一樣。每個月付一點訂閱費，查資料、寫報告、改程式都快很多，一個月省下好幾個小時。用比較低的價格，換到比較高的價值，所以很多人願意付。
【指兩個蹺蹺板。】
我們再多看幾個例子。`,
  `先看一款大家都聽過的遊戲，Steam 上的《黑神話：悟空》。
【指中間那張。】它在 Steam 台灣原價一千兩百八，你可能覺得可以，就買了。
【指左邊。】如果今天特價半價，六百四，你會覺得大特價，一定要買。
【指右邊。】但如果它貴一倍，變成兩千五百六，你可能就要想一下：這個價錢，換得到我想要的快樂嗎？
同一款遊戲，東西沒變，變的是成本。成本越高，你就越會認真比較，它的價值撐不撐得起這個價錢。`,
  `再來一個。假設你現在要買手機，而且沒有預算上限，錢不是問題。iPhone 18 Pro 四萬四千九起，最新的摺疊機 iPhone Duo 七萬四千九起。你選哪一支？
錢不是問題，又是最新的，很多人會選 Duo。`,
  `但 Duo 開賣才兩週，就出了這些新聞。
有人開合沒幾次，內螢幕就沿著轉軸裂開；台灣也有首批災情，報導說內螢幕維修要三萬七千多；iFixit 拆機懷疑是轉軸的設計壓到螢幕。
【指三則新聞。】
這些問題會讓你覺得它的價值沒那麼高，可能壞、修很貴，等於要付出的成本變多了。
這時候有些人就會改選 18 Pro，因為對他來說，18 Pro 的價錢沒有大於它帶來的價值。
就算錢不是問題，選擇還是會變，因為價值和成本的天平變了。`,
  `不過，錢不是問題的人畢竟是少數。對大部分人來說，同樣的價錢，感受到的成本差很多。
回到剛剛的 ChatGPT，最便宜的付費方案一個月二十美金，換成台幣大約六百五十塊。在台灣拿最低時薪，要打工三個多小時才付得起。
【指右邊。】
但在舊金山，最低時薪將近二十美金，工作一個小時就付完了。
再看一百美金的方案，台灣要打工十六個多小時，等於兩天的班；舊金山只要五個小時左右。
同一個價錢，在不同地方、不同生活水準裡，要付出的成本完全不一樣。`,
  `為什麼台灣的軟體很難收錢？
我覺得最根本的原因是，同樣的價值，台灣人要付出的成本本來就比較高。剛剛看到了，同樣二十美金，台灣人要多工作好幾倍的時間。
【停一下。】
所以在台灣，就算提供一樣的價值，使用者付出的成本也比美國高很多。這是在台灣做新創一定要面對的現實。難，但不是不可能。`,
  `在台灣要讓人願意付錢，除了價錢，還有一種成本對做 App 的我們特別重要，就是使用體驗。
【卡片一張一張出來，挑幾個講。】
打開要等很久、一打開就逼你註冊、想做的事找不到按鈕、廣告關了一個又一個、通知一天跳十幾次、打到一半突然閃退。
這些都不用花錢，但每一個都在增加使用者付出的時間、耐心和心力。成本一高，再好的功能，他也不想用了。
反過來說，把體驗做好、把價錢調低，都是在幫使用者降低成本。`,
  `所以大家不付錢，常常是因為成本太高。那我們把單價調低，就等於降低大家要付出的成本。
拿我自己做的 App，半逢遇甲來說。課表、iLearn、公車、停車都收在一起，還有我整理的逢甲美食地圖。
如果它一個月收兩百塊，我很確定沒有人會買。但如果只要十塊呢？
【讓題目停在畫面上。】
如果現在半逢遇甲每個月收十塊，會付錢的舉手！
【數一下大概的比例，記起來，下一頁用。】`,
  `半逢遇甲現在每個月大概有六千個人在用。
【指著右邊，對應剛剛舉手的比例那一條。】
剛剛差不多是這個比例。這樣的比例，我一個月躺在家裡，就可以賺到這麼多。
當然，這還沒扣掉 Apple 的抽成和伺服器成本，App 也要一直維護，不是真的什麼都不用做。
但也看得出來，不是每個人都會付錢。那沒付錢的人，對 App 就沒有價值了嗎？`,
  `其實沒付錢的人，也很有價值。只要有人每天打開，就有變現的機會。
像半逢遇甲每個月有六千個人在用，這六千個人每天打開，就是一大群人的注意力，這就是流量。
先有使用者，因為你解決了需求，他們才會回來。持續有人看、有人找東西，才有流量，再看誰願意為這些注意力付錢。
像大家每天用 App 找宵夜，附近店家就會想讓這群人看到自己的餐點。
但有下載數，不等於有流量；有流量，也不是自動有收入。那注意力要怎麼變成錢？看看 Dcard 怎麼做。`,
  `Dcard 大家應該都用過吧？它不收你錢，那它靠什麼賺？
你每天滑 Dcard 看文章、看討論，Dcard 拿內容跟你換時間。你滑到的廣告、花的時間，就是你的成本，也就是注意力成本。
【沿著箭頭，從你指向 Dcard，再指向廣告商。】
誰想要這些注意力？廣告商。Dcard 上幾乎都是大學生，想賣東西給大學生的品牌，就會想讓你看到他們的產品。所以 Dcard 提供接觸這群人的機會，廣告商拿錢來換。
你沒有付錢，還是付出了東西。一個人的注意力很小，但很多人加起來，就變成很可觀的錢。這就是流量能帶來錢的原因。
不過也要誠實講，Dcard 是靠很大的使用者規模。六千個人的廣告收入其實很少，所以小 App 通常要搭配其他收費方式。`,
  `新創一定要想清楚商業模式，說白了就是：你怎麼收錢？App 收錢的方式不只一種，先記這五種就夠了。
訂閱制，使用者持續付費，換你持續解決問題。像社團排班工具，每月付費升級。
單次付費或內購，是為特定功能付錢。像活動修圖，付費解鎖素材包。
廣告，付錢的人換成店家。像宵夜資訊，店家買推薦版位，但要清楚標示，也別弄到同學不想用。
抽成或媒合，像二手教科書，促成交易後收服務費。
最後一種常被忘記：補助或贊助。如果你的 App 解決的是公共問題，像無障礙校園地圖，願意付錢的可能是政府，也可能是公益團體、基金會，或企業的社會責任計畫。補助、標案、贊助，其實也是一種收入，只是付錢的人不是使用者。
重點是誰付錢、他換到什麼。知道怎麼收之後，回頭看最根本的問題：題目要去哪裡找？`,
  `我會先找一件煩到大家願意每月付十塊解決的事。
你這禮拜被什麼煩到？選課、找室友、揪宵夜、二手教科書，還是找讀書夥伴？
【讓大家選一個有感的例子。】
接著去問正在被這件事困擾的人，現在怎麼解決，最麻煩的是哪一段，有沒有能用的工具。
選課很煩，可能只需要整理資訊，不一定得重寫一套大系統。先確認那個小麻煩，值不值得解決。
比起猜評審喜歡什麼，我更想聽到你真的問過使用者。`,
  `不過，我要誠實補充一個觀點，來自 Threads 上一位前輩的分享。
他說大一大二的學生做 App，最常做的就是美食地圖、資訊平台、交友、各種媒合。他三年看了至少二十組學生團隊做這些，幾乎沒有一組撐過半年，有的還賠了上百萬。
【指三張卡。】
原因很簡單。第一，市場只有一個校園，全校都用也才幾萬人。第二，使用者是學生，預算本來就很低。第三，換一間學校需求就不一樣，很難擴大。
老實說，我自己的半逢遇甲也是校園 App，所以我很清楚這個天花板在哪裡。
這些題目很適合拿來練習，但如果你想把它做成生意，一定要先問：這個需求，走得出校園嗎？`,
  `找到題目之後，我想請大家換個思維：不要再用比賽的方式去做，而是去想商業模式。
【指左邊。】比賽的思維，想的是評審喜歡什麼，做到 demo 那天就好，獎金就是終點。
【指右邊。】商業的思維，想的是使用者願意為什麼付錢，要做到有人每天在用，而收入會讓你一直做下去。
評審只看一次，使用者會一直回來。當你開始想商業模式，賺到的錢就會變成你繼續做下去的動機。
那如果商業模式還在摸索，暫時還賺不到錢呢？`,
  `順序很重要：不是先去比賽，再想要做什麼。而是先用商業的思維，把作品做出來、讓人用。
等你擁有作品，再拿它去爭取更多資源。像開場的 886，或是這些比賽和計畫，獎金、補助、輔導、投資人，都是讓你把 App 做得更久的燃料。
【指四張卡。】
聯發科的「智在家鄉」，用科技解決台灣的社會問題，只有點子也能報，首獎二十萬，已經在營運的加速組首獎一百萬。
教育部 U-start，跟學校育成中心一起申請，第一階段補助五十萬，表現好的再拿三十五到一百萬。
國科會 FITI，四關每關都有錢，最後決選一百萬創業基金，2027 第一梯次十二月底截止，現在就能報。
戰國策，十八到三十五歲都能報、免報名費，總獎金三十二萬，得獎有機會進駐新北青創基地。
拿到這些資源，是為了讓你有機會做更多想做的事，甚至用你的 App 改變這個世界。`,
  `台灣很常被說是代工的地方。台灣人有一個很棒的特性：只要有人把任務交給我們，我們可以把它做得非常、非常好。
【停一下。】
但賈伯斯當初在車庫的時候，從來沒有人跟他說，未來會變成現在這個樣子。沒有人交代他任務，是他自己想像出來的。
這就是新創的精神。如果你也想跟賈伯斯一樣，發揮自己的創意，靠自己的手，做出一個這個世界上還沒有的東西，請大膽地去想像。`,
  `最後，如果現在給你一個機會，你會做什麼？
聽完今天，我希望大家心裡有不一樣的答案。不是先想評審喜歡什麼，而是先找到一件大家願意付錢的事，把它做出來、讓人用，再拿作品去爭取更多資源。
作品不一定要得獎才能證明自己。有人用、有人覺得它有價值，它就已經證明了。
那下一步是什麼？很簡單，來找我。
我在這裡負責的，就是陪大家培養出有商業模式、或是願意創業的團隊。想把 App 做出商業模式，或是有想創業的念頭，帶一個想法來就好。我自己也想創業，也在找願意一起做事的夥伴。
【停一下。】
就像開場說的：創業，其實沒有你想像中那麼難。我是瑞瑞，謝謝大家。
【右邊是我的 IG QR，可以停一下讓大家掃。】`,
];

export default [
  TitleCover,
  Question300,
  Studio886,
  teamPicpet,
  casePicpet,
  teamTellitnow,
  caseTellitnow,
  teamSugarai,
  caseSugarai,
  teamLfg,
  caseLfg,
  teamPeeps,
  casePeeps,
  caseKardomo,
  NotAwards,
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
  GamePrices,
  PhoneChoice,
  PhoneNews,
  PricePerspective,
  WhyTaiwan,
  UxCost,
  BanfengPricing,
  LivePoll,
  Traffic,
  Instagram,
  BusinessModels,
  FindProblem,
  CampusCeiling,
  StillAlive,
  CompetitionIntro,
  Garage,
  Close,
] satisfies Page[];
