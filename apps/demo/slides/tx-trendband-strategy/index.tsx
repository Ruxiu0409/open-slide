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
import type { ReactNode } from 'react';

export const design: DesignSystem = {
  palette: { bg: '#F4F1E8', text: '#1D1C1A', accent: '#B4432A' },
  fonts: {
    display: '"Songti TC", "Noto Serif TC", "PMingLiU", Georgia, serif',
    body: '-apple-system, BlinkMacSystemFont, "PingFang TC", "Noto Sans TC", "Microsoft JhengHei", sans-serif',
  },
  typeScale: { hero: 112, body: 32 },
  radius: 6,
};

const muted = '#77726A';
const rule = '#D8D2C4';
const soft = '#EAE5D8';
const slate = '#4A5560';
const grey = '#B0AA9E';
const pass = '#2F6B4F';
const mono = '"SF Mono", "JetBrains Mono", Menlo, Consolas, monospace';

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 260,
  exit: {
    duration: 260,
    easing: EASE_IN,
    keyframes: [{ opacity: 1 }, { opacity: 1 }],
  },
  enter: {
    duration: 260,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const keyframes = `
@keyframes txDraw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
.tx-draw { stroke-dasharray: 1; animation: txDraw 1600ms cubic-bezier(0.33, 0, 0.2, 1) both; }
`;

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
  color: 'var(--osd-text)',
  background: 'var(--osd-bg)',
  position: 'relative',
  overflow: 'hidden',
} as const;

const num = { fontVariantNumeric: 'tabular-nums lining-nums' } as const;

const eq0 = [
  100, 105, 106, 109, 114, 114, 116, 115, 121, 125, 127, 126, 118, 113, 116, 117, 119, 124, 127,
  127, 118, 117, 117, 124, 129, 129, 131, 134, 138, 143, 143, 145, 144, 154, 153, 150, 154, 143,
  148, 145, 139, 101, 121, 130, 136, 137, 143, 143, 142, 156, 155, 155, 169, 169, 177, 184, 186,
  190, 187, 195, 182, 195, 195, 190, 200, 213, 216, 225, 224, 229, 245, 253, 248, 251, 263, 252,
  259, 265, 273, 283, 291, 271, 263, 278, 277, 278, 293, 292, 290, 284, 285, 273, 290, 295, 295,
  286, 282, 287, 288, 300, 304, 291, 302, 299, 308, 306, 310, 305, 311, 302, 289, 287, 291, 280,
  282, 276, 265, 272, 283, 279, 273, 259, 252, 261, 263, 265, 274, 264, 255, 256, 241, 245, 231,
  228, 239, 263, 261, 264, 261, 258, 260, 271, 282, 282, 284, 283, 284, 292, 292, 288, 288, 286,
  293, 306, 316, 316, 320, 326, 328, 321, 313, 318, 319, 315, 317, 315, 323, 311, 323, 332, 335,
  335, 342, 343, 341, 341, 341, 344, 356, 364, 375, 371, 373, 365, 372, 387, 397, 408, 400, 420,
  432, 446, 455, 430, 408, 432, 433, 414, 426, 435, 430, 430, 417, 430, 412, 402, 418, 418, 426,
  425, 414, 416, 420, 413, 389, 388, 357, 332, 321, 358, 372, 382, 370, 395, 393, 412, 419, 417,
  429, 441, 430, 438, 449, 461, 463, 482, 496, 509, 503, 469, 491, 502, 500, 513,
];
const eq1 = [
  100, 100, 100, 100, 100, 100, 99, 97, 102, 107, 108, 107, 99, 94, 96, 98, 99, 104, 107, 107, 98,
  97, 98, 104, 109, 109, 111, 114, 118, 123, 123, 125, 124, 134, 133, 131, 134, 123, 129, 125, 119,
  111, 111, 111, 111, 111, 111, 111, 111, 120, 119, 120, 134, 134, 142, 148, 151, 155, 152, 159,
  146, 160, 160, 154, 165, 177, 180, 190, 189, 194, 210, 217, 213, 216, 228, 216, 223, 229, 238,
  248, 256, 236, 227, 243, 242, 242, 258, 256, 254, 249, 250, 238, 255, 260, 259, 250, 236, 236,
  237, 249, 253, 240, 251, 248, 256, 255, 259, 254, 260, 251, 235, 232, 234, 224, 224, 224, 224,
  224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224, 224,
  224, 224, 224, 224, 224, 224, 224, 224, 235, 235, 238, 237, 238, 245, 245, 241, 241, 239, 246,
  259, 269, 269, 273, 279, 281, 274, 266, 272, 272, 268, 270, 268, 276, 264, 269, 278, 280, 281,
  288, 288, 287, 287, 286, 290, 302, 309, 320, 317, 319, 311, 318, 333, 343, 354, 346, 366, 378,
  392, 400, 376, 351, 376, 376, 357, 370, 378, 373, 373, 360, 374, 356, 346, 361, 362, 370, 368,
  358, 359, 364, 356, 334, 334, 334, 334, 334, 334, 334, 334, 334, 333, 329, 331, 338, 336, 348,
  360, 349, 357, 368, 380, 382, 401, 415, 428, 422, 388, 409, 420, 419, 432,
];
const eq2 = [
  100, 100, 100, 100, 100, 100, 100, 97, 102, 107, 108, 107, 99, 95, 97, 99, 101, 105, 108, 108,
  100, 98, 99, 106, 110, 111, 112, 116, 119, 125, 125, 126, 126, 135, 135, 132, 136, 124, 130, 126,
  121, 110, 110, 110, 110, 110, 110, 110, 110, 113, 112, 113, 127, 127, 135, 141, 144, 148, 144,
  152, 139, 153, 152, 147, 158, 170, 173, 182, 182, 187, 203, 210, 206, 208, 220, 209, 216, 222,
  231, 241, 249, 229, 220, 236, 235, 235, 250, 249, 247, 242, 243, 231, 248, 253, 252, 243, 239,
  237, 237, 249, 252, 240, 251, 248, 256, 255, 259, 254, 260, 250, 235, 235, 235, 235, 235, 235,
  235, 235, 235, 235, 235, 235, 235, 235, 235, 235, 235, 235, 235, 235, 235, 235, 235, 235, 235,
  235, 235, 235, 235, 235, 235, 235, 236, 236, 238, 237, 238, 245, 245, 242, 241, 240, 247, 259,
  270, 270, 274, 279, 282, 275, 267, 272, 273, 269, 271, 269, 277, 265, 277, 286, 288, 289, 296,
  296, 295, 295, 294, 298, 310, 318, 329, 325, 327, 319, 326, 341, 351, 362, 354, 374, 386, 400,
  408, 384, 362, 386, 387, 368, 380, 388, 383, 384, 371, 384, 366, 356, 372, 372, 380, 379, 368,
  370, 374, 367, 343, 345, 345, 345, 345, 345, 345, 345, 345, 345, 345, 345, 345, 343, 355, 367,
  356, 364, 375, 387, 389, 408, 422, 435, 429, 395, 417, 427, 426, 439,
];
const yearStarts = [
  { year: '2019', i: 0 },
  { year: '2020', i: 35 },
  { year: '2021', i: 70 },
  { year: '2022', i: 105 },
  { year: '2023', i: 140 },
  { year: '2024', i: 174 },
  { year: '2025', i: 209 },
];

const augClose = [
  23378, 23210, 22746, 22743, 22872, 22793, 22983, 22991, 22831, 23185, 23624, 23570, 23913, 23878,
  24000, 24367, 23808, 23853, 24002, 23679, 23383, 22909, 22379, 22830, 22095, 22261, 22246, 22290,
  22653, 21533, 19374, 20420, 21131, 20696, 21481, 21677, 21769, 21978, 21840, 22367, 22361, 22436,
  22200, 22100, 22129, 22206, 22146, 22401, 22176, 22323, 22227, 22070, 20947, 21183, 21319, 21073,
  21000,
];
const augMean = [
  18550, 18582, 18613, 18645, 18676, 18706, 18738, 18770, 18800, 18832, 18867, 18902, 18938, 18976,
  19013, 19052, 19087, 19121, 19158, 19193, 19227, 19260, 19291, 19322, 19351, 19381, 19411, 19439,
  19470, 19497, 19511, 19531, 19553, 19572, 19596, 19621, 19646, 19674, 19701, 19731, 19761, 19792,
  19821, 19851, 19881, 19911, 19942, 19974, 20003, 20032, 20060, 20087, 20108, 20130, 20153, 20174,
  20194,
];
const augRange = [
  292, 302, 316, 317, 323, 327, 325, 320, 314, 313, 322, 304, 322, 336, 338, 337, 354, 365, 366,
  358, 371, 380, 391, 397, 430, 435, 444, 449, 457, 496, 582, 646, 667, 673, 702, 703, 685, 687,
  683, 696, 679, 664, 642, 630, 599, 594, 580, 582, 585, 537, 443, 388, 404, 400, 376, 391, 398,
];

const linePath = (values: number[], w: number, h: number, min: number, max: number) =>
  values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / (max - min)) * h;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

const bandPath = (
  upper: number[],
  lower: number[],
  w: number,
  h: number,
  min: number,
  max: number,
) => {
  const top = linePath(upper, w, h, min, max);
  const bottom = lower
    .map((v, i) => {
      const x = (i / (lower.length - 1)) * w;
      const y = h - ((v - min) / (max - min)) * h;
      return `L${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .reverse()
    .join(' ');
  return `${top} ${bottom} Z`;
};

const TopBar = ({ section }: { section: string }) => (
  <div
    style={{
      position: 'absolute',
      top: 52,
      left: 120,
      right: 120,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      fontSize: 22,
      letterSpacing: '0.08em',
      color: muted,
      paddingBottom: 14,
      borderBottom: `1px solid ${rule}`,
    }}
  >
    <span style={{ color: 'var(--osd-accent)', fontWeight: 600 }}>{section}</span>
    <span>智慧量化交易｜專題一 策略說明</span>
  </div>
);

const Footer = ({ source }: { source?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 44,
        left: 120,
        right: 120,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 20,
        color: muted,
        ...num,
      }}
    >
      <span>{source ?? ''}</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const DATA_SOURCE =
  '資料：臺灣期貨交易所 2017–2025 日行情與最後結算價｜Python 回測，尚未經 MultiCharts 實測';

const Frame = ({
  section,
  source,
  children,
}: {
  section: string;
  source?: string;
  children: ReactNode;
}) => (
  <div style={{ ...fill, padding: '136px 120px 100px' }}>
    <style>{keyframes}</style>
    <TopBar section={section} />
    {children}
    <Footer source={source} />
  </div>
);

const Heading = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 60,
      fontWeight: 700,
      lineHeight: 1.25,
      margin: 0,
      letterSpacing: '0.01em',
    }}
  >
    {children}
  </h2>
);

const Cover: Page = () => (
  <div style={fill}>
    <style>{keyframes}</style>
    <div
      style={{
        position: 'absolute',
        top: 180,
        left: 120,
        fontSize: 26,
        letterSpacing: '0.12em',
        color: 'var(--osd-accent)',
        fontWeight: 600,
      }}
    >
      智慧量化交易｜專題一 期中報告
    </div>
    <h1
      style={{
        position: 'absolute',
        top: 236,
        left: 120,
        margin: 0,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 700,
        lineHeight: 1.2,
      }}
    >
      台指期 200 日均線
      <br />
      加上波動緩衝帶
    </h1>
    <p
      style={{
        position: 'absolute',
        top: 540,
        left: 120,
        margin: 0,
        fontSize: 36,
        color: muted,
      }}
    >
      只做多的長期趨勢策略：怎麼想、怎麼寫、測出來怎樣
    </p>
    <svg
      width={1680}
      height={200}
      viewBox="0 0 1680 200"
      style={{ position: 'absolute', left: 120, top: 680 }}
      aria-hidden
    >
      <path
        d={`${linePath(eq2, 1680, 200, 90, 450)} L1680,200 L0,200 Z`}
        fill="var(--osd-accent)"
        opacity={0.07}
      />
      <path
        d={linePath(eq2, 1680, 200, 90, 450)}
        fill="none"
        stroke="var(--osd-accent)"
        strokeWidth={3}
        opacity={0.75}
      />
    </svg>
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 72,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 26,
        color: muted,
        borderTop: `1px solid ${rule}`,
        paddingTop: 20,
      }}
    >
      <span>報告人　姓名｜學號</span>
      <span style={num}>2026.10.27</span>
    </div>
  </div>
);

const ReasonCard = ({ label, title, body }: { label: string; title: string; body: string }) => (
  <div
    style={{
      flex: 1,
      borderTop: '3px solid var(--osd-text)',
      paddingTop: 28,
    }}
  >
    <div
      style={{ fontSize: 22, color: 'var(--osd-accent)', letterSpacing: '0.1em', fontWeight: 600 }}
    >
      {label}
    </div>
    <div style={{ fontSize: 34, fontWeight: 700, marginTop: 12 }}>{title}</div>
    <p style={{ fontSize: 26, lineHeight: 1.6, color: slate, margin: '16px 0 0' }}>{body}</p>
  </div>
);

const Question: Page = () => (
  <Frame section="01 策略發想">
    <div style={{ fontSize: 26, color: muted, letterSpacing: '0.1em' }}>研究問題</div>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 58,
        fontWeight: 700,
        lineHeight: 1.35,
        margin: '18px 0 0',
      }}
    >
      長期均線能不能在扣掉成本之後，
      <br />
      讓台指期<span style={{ color: 'var(--osd-accent)' }}>回撤變小、Sharpe 變高</span>？
    </h2>
    <p style={{ fontSize: 30, color: muted, margin: '36px 0 0' }}>
      比的是風險調整後的表現，不是誰賺最多。結果也可以是「沒有比較好」。
    </p>
    <div style={{ display: 'flex', gap: 48, marginTop: 80 }}>
      <ReasonCard
        label="為什麼是均線"
        title="有研究可以參考"
        body="Moskowitz、Ooi、Pedersen（2012）的時間序列動能；Faber 用 10 個月均線，大約就是 200 日。"
      />
      <ReasonCard
        label="為什麼要規則少"
        title="規則少，能人工核對"
        body="一條線、兩個方向。每個訊號都能回到 K 線圖上一根一根對。"
      />
      <ReasonCard
        label="為什麼只做多"
        title="先只測「何時退場」"
        body="不放空，才能單獨看出「什麼時候該退出多單」，不把放空的效果混進來。"
      />
    </div>
  </Frame>
);

const RuleRow = ({ when, then }: { when: string; then: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 36, height: 96 }}>
    <div
      style={{
        width: 420,
        height: 80,
        background: soft,
        borderRadius: 'var(--osd-radius)',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 32,
        fontSize: 32,
        fontWeight: 700,
        ...num,
      }}
    >
      {when}
    </div>
    <div style={{ fontSize: 36, color: 'var(--osd-accent)' }}>→</div>
    <div style={{ fontSize: 36 }}>{then}</div>
  </div>
);

const RuleV1: Page = () => (
  <Frame section="02 策略撰寫｜第一版">
    <Heading>第一版：200 日均線，只做多一口</Heading>
    <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Steps>
        <Step>
          <RuleRow when="收盤 ＞ 200 日均線" then="下一個交易日開盤，買進一口" />
        </Step>
        <Step>
          <RuleRow when="收盤 ＜ 200 日均線" then="下一個交易日開盤，全部平倉" />
        </Step>
        <Step>
          <RuleRow when="剛好等於均線" then="維持原狀。不放空、不加碼、不另設停損" />
        </Step>
      </Steps>
    </div>
    <p
      style={{
        marginTop: 64,
        fontSize: 28,
        color: slate,
        borderLeft: '4px solid var(--osd-accent)',
        paddingLeft: 24,
        lineHeight: 1.6,
      }}
    >
      訊號在收盤後才確認，成交放在下一根 K 棒的開盤，所以不會用到當下還不知道的價格。
    </p>
  </Frame>
);

const DEMO_N = 80;
const demoMa = Array.from({ length: DEMO_N }, (_, t) => 100 + 0.08 * t);
const demoPrice = demoMa.map(
  (m, t) =>
    m +
    7 * Math.sin(0.42 * t + 0.6) +
    3.5 * Math.sin(1.3 * t) +
    (t > 58 ? (t - 58) * 1.1 : 0) -
    (t < 6 ? 4 : 0),
);

const demoSignals = (band: number) => {
  let long = false;
  const out: { t: number; side: 'buy' | 'sell' }[] = [];
  for (let t = 0; t < DEMO_N; t++) {
    if (!long && demoPrice[t] > demoMa[t] + band) {
      long = true;
      out.push({ t, side: 'buy' });
    } else if (long && demoPrice[t] < demoMa[t] - band) {
      long = false;
      out.push({ t, side: 'sell' });
    }
  }
  return out;
};

const WhipsawPanel = ({ title, band }: { title: string; band: number }) => {
  const w = 810;
  const h = 380;
  const min = 86;
  const max = 142;
  const signals = demoSignals(band);
  const yOf = (v: number) => h - ((v - min) / (max - min)) * h;
  const xOf = (t: number) => (t / (DEMO_N - 1)) * w;
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 30, fontWeight: 700 }}>{title}</span>
        <span style={{ fontSize: 30, color: 'var(--osd-accent)', fontWeight: 700, ...num }}>
          進出 {signals.length} 次
        </span>
      </div>
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        style={{ marginTop: 16, background: '#FBF9F3', border: `1px solid ${rule}` }}
        aria-hidden
      >
        {band > 0 && (
          <path
            d={bandPath(
              demoMa.map((m) => m + band),
              demoMa.map((m) => m - band),
              w,
              h,
              min,
              max,
            )}
            fill="var(--osd-accent)"
            opacity={0.1}
          />
        )}
        <path
          d={linePath(demoMa, w, h, min, max)}
          fill="none"
          stroke={slate}
          strokeWidth={2}
          strokeDasharray="8 6"
        />
        <path
          d={linePath(demoPrice, w, h, min, max)}
          fill="none"
          stroke="var(--osd-text)"
          strokeWidth={2.5}
        />
        {signals.map((s) => (
          <circle
            key={s.t}
            cx={xOf(s.t)}
            cy={yOf(demoPrice[s.t])}
            r={9}
            fill={s.side === 'buy' ? 'var(--osd-accent)' : '#FBF9F3'}
            stroke="var(--osd-accent)"
            strokeWidth={3}
          />
        ))}
      </svg>
    </div>
  );
};

const Weakness: Page = () => (
  <Frame section="03 分析弱點">
    <Heading>價格貼著均線來回，就會一直進出</Heading>
    <p style={{ fontSize: 30, color: muted, margin: '20px 0 0' }}>
      每來回一次是 1,000 元手續費，再加上進出兩邊的滑價。盤整越久，成本越多。
    </p>
    <div style={{ display: 'flex', gap: 60, marginTop: 52 }}>
      <WhipsawPanel title="只有一條均線" band={0} />
      <WhipsawPanel title="均線上下加一段緩衝" band={8} />
    </div>
    <div style={{ display: 'flex', gap: 40, marginTop: 24, fontSize: 22, color: muted }}>
      <span>● 買進　○ 賣出　虛線＝均線　淺紅＝緩衝帶</span>
      <span style={{ marginLeft: 'auto' }}>示意圖，不是真實行情</span>
    </div>
  </Frame>
);

const FormulaRow = ({ name, value }: { name: string; value: string }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'baseline',
      gap: 24,
      padding: '18px 0',
      borderBottom: `1px solid ${rule}`,
      fontSize: 32,
    }}
  >
    <span
      style={{
        width: 120,
        fontFamily: 'var(--osd-font-display)',
        fontWeight: 700,
        color: 'var(--osd-accent)',
      }}
    >
      {name}
    </span>
    <span>{value}</span>
  </div>
);

const BandRule = ({ when, then }: { when: string; then: string }) => (
  <div
    style={{ display: 'flex', alignItems: 'baseline', gap: 20, fontSize: 32, padding: '16px 0' }}
  >
    <span style={{ fontWeight: 700, width: 220 }}>{when}</span>
    <span style={{ color: 'var(--osd-accent)' }}>→</span>
    <span>{then}</span>
  </div>
);

const Tick = ({
  x,
  label,
  sub,
  strong,
}: {
  x: number;
  label: string;
  sub: string;
  strong?: boolean;
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: 0,
      transform: 'translateX(-50%)',
      textAlign: 'center',
    }}
  >
    <div
      style={{
        width: 2,
        height: 28,
        background: strong ? 'var(--osd-accent)' : 'var(--osd-text)',
        margin: '0 auto',
      }}
    />
    <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8, ...num }}>{label}</div>
    <div style={{ fontSize: 22, color: muted }}>{sub}</div>
  </div>
);

const BandRuleV2: Page = () => (
  <Frame section="04 修正策略">
    <Heading>改版：在均線上下各留一段緩衝</Heading>
    <div style={{ display: 'flex', gap: 100, marginTop: 48 }}>
      <div style={{ width: 760 }}>
        <FormulaRow name="M" value="最近 200 日收盤價的平均" />
        <FormulaRow name="A" value="最近 20 日真實波幅（TR）的平均" />
        <FormulaRow name="上緣" value="M ＋ A" />
        <FormulaRow name="下緣" value="M － A" />
      </div>
      <div style={{ flex: 1 }}>
        <Steps>
          <Step>
            <BandRule when="收盤 ＞ 上緣" then="轉為做多一口" />
          </Step>
          <Step>
            <BandRule when="收盤 ＜ 下緣" then="轉為空手" />
          </Step>
          <Step>
            <BandRule when="夾在中間" then="維持原本的狀態" />
          </Step>
        </Steps>
      </div>
    </div>
    <div style={{ marginTop: 64, fontSize: 26, color: muted }}>例：均線 20,000 點，A ＝ 200 點</div>
    <div style={{ position: 'relative', height: 120, marginTop: 20 }}>
      <div
        style={{
          position: 'absolute',
          left: 380,
          width: 920,
          top: 0,
          height: 28,
          background: 'var(--osd-accent)',
          opacity: 0.12,
        }}
      />
      <div
        style={{ position: 'absolute', left: 0, right: 300, top: 14, height: 2, background: rule }}
      />
      <Tick x={380} label="19,800" sub="下緣" strong />
      <Tick x={840} label="20,000" sub="均線" />
      <Tick x={1300} label="20,200" sub="上緣" strong />
      <div
        style={{
          position: 'absolute',
          left: 1440,
          top: -4,
          fontSize: 26,
          color: slate,
          lineHeight: 1.5,
        }}
      >
        收在 20,100：
        <br />
        空手不買，持有續抱
      </div>
    </div>
  </Frame>
);

const CodeLine = ({ children, dim }: { children?: ReactNode; dim?: boolean }) => (
  <div style={{ color: dim ? '#8C877C' : '#EDE8DC', whiteSpace: 'pre' }}>{children || ' '}</div>
);

const Kw = ({ children }: { children: ReactNode }) => (
  <span style={{ color: '#E8A07F' }}>{children}</span>
);

const CodeNote = ({ title, body }: { title: string; body: string }) => (
  <div style={{ borderTop: `1px solid ${rule}`, paddingTop: 20 }}>
    <div style={{ fontSize: 28, fontWeight: 700, fontFamily: mono }}>{title}</div>
    <p style={{ fontSize: 25, lineHeight: 1.55, color: slate, margin: '10px 0 0' }}>{body}</p>
  </div>
);

const Code: Page = () => (
  <Frame section="04 修正策略｜PowerLanguage">
    <Heading>程式：同一支訊號切換三個版本</Heading>
    <div style={{ display: 'flex', gap: 56, marginTop: 44 }}>
      <div
        style={{
          width: 1080,
          background: '#23211E',
          borderRadius: 'var(--osd-radius)',
          padding: '36px 40px',
          fontFamily: mono,
          fontSize: 23,
          lineHeight: 1.6,
        }}
      >
        <CodeLine dim>{'{ FCU_TrendBand_Signal（節錄） }'}</CodeLine>
        <CodeLine>TrendMean = Average(Close, MALength);</CodeLine>
        <CodeLine>TrueRangeValue = MaxList(High - Low,</CodeLine>
        <CodeLine>{'    AbsValue(High - Close[1]), AbsValue(Low - Close[1]));'}</CodeLine>
        <CodeLine>RangeMean = Average(TrueRangeValue, RangeLength);</CodeLine>
        <CodeLine>UpperBand = TrendMean + BandWidth;</CodeLine>
        <CodeLine>LowerBand = TrendMean - BandWidth;</CodeLine>
        <CodeLine />
        <CodeLine>
          <Kw>if</Kw> Close {'>'} UpperBand <Kw>then</Kw> TargetLong = True
        </CodeLine>
        <CodeLine>
          <Kw>else if</Kw> Close {'<'} LowerBand <Kw>then</Kw> TargetLong = False;
        </CodeLine>
        <CodeLine />
        <CodeLine>
          <Kw>if</Kw> (MarketPosition = 0) <Kw>and</Kw> TargetLong <Kw>then</Kw>
        </CodeLine>
        <CodeLine>
          {'    '}
          <Kw>Buy</Kw> ("TrendLong") 1 Contract <Kw>Next Bar At Market</Kw>
          {';'}
        </CodeLine>
        <CodeLine>
          <Kw>if</Kw> (MarketPosition = 1) <Kw>and</Kw> (<Kw>not</Kw> TargetLong) <Kw>then</Kw>
        </CodeLine>
        <CodeLine>
          {'    '}
          <Kw>Sell</Kw> ("TrendExit") <Kw>Next Bar At Market</Kw>
          {';'}
        </CodeLine>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <CodeNote
          title="Mode 0／1／2"
          body="0 一直做多、1 原始均線、2 加緩衝帶。BandWidth 在 Mode 1 是 0。"
        />
        <CodeNote title="Next Bar At Market" body="收盤確認訊號，隔天開盤成交，沒有未來函數。" />
        <CodeNote title="Sell，不是 SellShort" body="出場只平多單，不會誤開一口空單。" />
      </div>
    </div>
  </Frame>
);

const SettingRow = ({
  item,
  required,
  ours,
  head,
}: {
  item: string;
  required: string;
  ours: string;
  head?: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      height: head ? 56 : 80,
      borderBottom: head ? '2px solid var(--osd-text)' : `1px solid ${rule}`,
      fontSize: head ? 24 : 30,
      color: head ? muted : 'var(--osd-text)',
      letterSpacing: head ? '0.08em' : undefined,
      ...num,
    }}
  >
    <span style={{ width: 260, fontWeight: head ? 400 : 700 }}>{item}</span>
    <span style={{ width: 440, color: head ? muted : slate }}>{required}</span>
    <span style={{ flex: 1 }}>{ours}</span>
  </div>
);

const Settings: Page = () => (
  <Frame section="05 回測方法">
    <Heading>回測設定：照專題規定走</Heading>
    <div style={{ marginTop: 52 }}>
      <SettingRow head item="項目" required="課堂要求" ours="這次的設定" />
      <SettingRow
        item="回測區間"
        required="至少五年"
        ours="2019–2025，共七年（2017–18 只拿來暖機）"
      />
      <SettingRow item="商品週期" required="分 K 或日 K" ours="台指期 TX，只取日盤，日 K" />
      <SettingRow item="結算" required="參與結算" ours="到期日用官方最後結算價平倉" />
      <SettingRow item="交易量" required="一口，不加碼" ours="一口，不加碼、不放空" />
      <SettingRow item="手續費" required="來回 1,000 元" ours="來回 1,000 元，另計每邊 1 點滑價" />
      <SettingRow item="起始資金" required="100 萬" ours="100 萬" />
    </div>
    <p style={{ marginTop: 40, fontSize: 26, color: muted, ...num }}>
      資料：期交所年度日行情整理出 2,194 根近月日 K，並逐一核對 108 次月結算。
    </p>
  </Frame>
);

const TimelineNode = ({ day, title, body }: { day: string; title: string; body: string }) => (
  <div style={{ flex: 1, position: 'relative', paddingTop: 52 }}>
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 28,
        height: 28,
        borderRadius: 14,
        background: 'var(--osd-accent)',
      }}
    />
    <div
      style={{ fontSize: 24, color: 'var(--osd-accent)', fontWeight: 600, letterSpacing: '0.08em' }}
    >
      {day}
    </div>
    <div style={{ fontSize: 34, fontWeight: 700, marginTop: 10 }}>{title}</div>
    <p style={{ fontSize: 26, color: slate, lineHeight: 1.55, margin: '12px 40px 0 0' }}>{body}</p>
  </div>
);

const Settlement: Page = () => (
  <Frame section="05 回測方法｜結算">
    <Heading>結算日：用官方結算價出場，不用收盤價</Heading>
    <div style={{ position: 'relative', display: 'flex', marginTop: 72 }}>
      <div
        style={{ position: 'absolute', top: 13, left: 14, right: 0, height: 2, background: rule }}
      />
      <TimelineNode
        day="結算日"
        title="持倉全部出場"
        body="以期交所公告的最後結算價計算損益，不另加滑價。"
      />
      <TimelineNode
        day="隔一天"
        title="收盤後重新判斷"
        body="方向沒變就保留做多的目標，但手上已經沒有合約。"
      />
      <TimelineNode
        day="再隔一天"
        title="開盤買進新月份"
        body="所以每次結算後至少空手一天，三個版本都一樣。"
      />
    </div>
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 48, marginTop: 80 }}>
      <div
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 140,
          fontWeight: 700,
          lineHeight: 1,
          color: 'var(--osd-accent)',
          ...num,
        }}
      >
        45<span style={{ fontSize: 72, color: muted }}> / 108</span>
      </div>
      <p style={{ fontSize: 30, lineHeight: 1.6, margin: '0 0 8px', maxWidth: 820 }}>
        2017–2025 的 108 次月結算裡，有 45
        次當天收盤價跟官方結算價不一樣。直接拿收盤價當結算價會算錯。
      </p>
    </div>
  </Frame>
);

const PeriodSegment = ({
  flex,
  label,
  years,
  color,
}: {
  flex: number;
  label: string;
  years: string;
  color: string;
}) => (
  <div style={{ flex, display: 'flex', flexDirection: 'column', gap: 10 }}>
    <div
      style={{
        height: 88,
        background: color,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 28,
        fontSize: 32,
        fontWeight: 700,
        color: color === soft ? 'var(--osd-text)' : '#FBF9F3',
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: 24, color: muted, ...num }}>{years}</div>
  </div>
);

const ModeCard = ({
  mode,
  title,
  body,
  highlight,
}: {
  mode: string;
  title: string;
  body: string;
  highlight?: boolean;
}) => (
  <div
    style={{
      flex: 1,
      border: `2px solid ${highlight ? 'var(--osd-accent)' : rule}`,
      borderRadius: 'var(--osd-radius)',
      padding: '26px 30px',
    }}
  >
    <div style={{ fontSize: 22, fontFamily: mono, color: highlight ? 'var(--osd-accent)' : muted }}>
      {mode}
    </div>
    <div style={{ fontSize: 32, fontWeight: 700, marginTop: 8 }}>{title}</div>
    <p style={{ fontSize: 25, color: slate, lineHeight: 1.5, margin: '10px 0 0' }}>{body}</p>
  </div>
);

const NoOverfit: Page = () => (
  <Frame section="05 回測方法｜避免過度配適">
    <Heading>先把規則定死，再看結果</Heading>
    <div style={{ display: 'flex', gap: 6, marginTop: 56 }}>
      <PeriodSegment flex={3} label="開發" years="2019–2021" color={slate} />
      <PeriodSegment flex={1} label="驗證" years="2022" color={grey} />
      <PeriodSegment
        flex={3}
        label="保留（最後才看）"
        years="2023–2025"
        color="var(--osd-accent)"
      />
    </div>
    <div style={{ display: 'flex', gap: 32, marginTop: 56 }}>
      <ModeCard mode="MODE 0" title="多單參考組" body="一直做多一口，結算規則跟另外兩版相同。" />
      <ModeCard mode="MODE 1" title="原始 200 日均線" body="第一版，留下來當對照。" />
      <ModeCard mode="MODE 2" title="均線＋緩衝帶" body="這次的主角。" highlight />
    </div>
    <p style={{ marginTop: 48, fontSize: 28, color: slate, ...num }}>
      200 日、20 日、1 倍這三個數字，在第一次跑回測前就寫進設定檔，之後沒有改過。
    </p>
  </Frame>
);

const EndLabel = ({
  y,
  color,
  name,
  value,
}: {
  y: number;
  color: string;
  name: string;
  value: string;
}) => (
  <g transform={`translate(1430, ${y})`}>
    <text x={0} y={0} fontSize={22} fill={muted} dominantBaseline="middle">
      {name}
    </text>
    <text
      x={0}
      y={30}
      fontSize={28}
      fontWeight={700}
      fill={color}
      dominantBaseline="middle"
      style={num}
    >
      {value}
    </text>
  </g>
);

const EquityChart = () => {
  const active = useIsActivePage();
  const w = 1400;
  const h = 560;
  const min = 50;
  const max = 550;
  const n = eq0.length;
  const yOf = (v: number) => h - ((v - min) / (max - min)) * h;
  const xOf = (i: number) => (i / (n - 1)) * w;
  const draw = active ? 'tx-draw' : undefined;
  return (
    <svg width={1680} height={h + 50} viewBox={`-60 0 1680 ${h + 50}`} aria-hidden>
      {[100, 200, 300, 400, 500].map((v) => (
        <g key={v}>
          <line x1={0} x2={w} y1={yOf(v)} y2={yOf(v)} stroke={rule} strokeWidth={1} />
          <text
            x={-12}
            y={yOf(v)}
            fontSize={20}
            fill={muted}
            textAnchor="end"
            dominantBaseline="middle"
            style={num}
          >
            {v}
          </text>
        </g>
      ))}
      {yearStarts.map((y) => (
        <text key={y.year} x={xOf(y.i) + 8} y={h + 34} fontSize={22} fill={muted} style={num}>
          {y.year}
        </text>
      ))}
      <rect x={xOf(112)} y={0} width={xOf(141) - xOf(112)} height={h} fill={soft} opacity={0.7} />
      <text
        x={(xOf(112) + xOf(141)) / 2}
        y={yOf(140)}
        fontSize={22}
        fill={muted}
        textAnchor="middle"
      >
        2022 大多空手
      </text>
      <path
        className={draw}
        pathLength={1}
        d={linePath(eq0, w, h, min, max)}
        fill="none"
        stroke={grey}
        strokeWidth={2.5}
      />
      <path
        className={draw}
        pathLength={1}
        d={linePath(eq1, w, h, min, max)}
        fill="none"
        stroke={slate}
        strokeWidth={2.5}
      />
      <path
        className={draw}
        pathLength={1}
        d={linePath(eq2, w, h, min, max)}
        fill="none"
        stroke="var(--osd-accent)"
        strokeWidth={4}
      />
      <EndLabel y={yOf(513) - 30} color="#8E897E" name="多單參考組" value="+413.12 萬" />
      <EndLabel y={yOf(439) - 6} color="var(--osd-accent)" name="均線＋緩衝帶" value="+339.08 萬" />
      <EndLabel y={yOf(432) + 52} color={slate} name="原始均線" value="+332.02 萬" />
    </svg>
  );
};

const Equity: Page = () => (
  <Frame section="06 檢視績效｜2019–2025" source={DATA_SOURCE}>
    <Heading>七年下來，三個版本都有賺</Heading>
    <div style={{ fontSize: 22, color: muted, marginTop: 14 }}>
      每日權益（萬元，含未平倉損益），起始 100 萬
    </div>
    <div style={{ marginTop: 28, marginLeft: 0 }}>
      <EquityChart />
    </div>
  </Frame>
);

const MetricRow = ({
  name,
  a,
  b,
  c,
  head,
  badge,
}: {
  name: string;
  a: string;
  b: string;
  c: string;
  head?: boolean;
  badge?: string;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      height: head ? 64 : 82,
      borderBottom: head ? '2px solid var(--osd-text)' : `1px solid ${rule}`,
      fontSize: head ? 26 : 34,
      ...num,
    }}
  >
    <span style={{ width: 420, fontSize: head ? 24 : 30, color: head ? muted : 'var(--osd-text)' }}>
      {name}
    </span>
    <span style={{ width: 360, textAlign: 'right', color: head ? muted : slate }}>{a}</span>
    <span style={{ width: 360, textAlign: 'right', color: head ? muted : slate }}>{b}</span>
    <span
      style={{
        flex: 1,
        textAlign: 'right',
        fontWeight: 700,
        color: 'var(--osd-accent)',
        position: 'relative',
      }}
    >
      {badge && (
        <span
          style={{
            fontSize: 20,
            fontWeight: 600,
            border: '1.5px solid var(--osd-accent)',
            borderRadius: 4,
            padding: '2px 10px',
            marginRight: 18,
            verticalAlign: 'middle',
          }}
        >
          {badge}
        </span>
      )}
      {c}
    </span>
  </div>
);

const Compare: Page = () => (
  <Frame section="06 檢視績效｜三版比較" source={DATA_SOURCE}>
    <Heading>緩衝帶版：交易最少，獲利因子最高</Heading>
    <div style={{ marginTop: 44, paddingRight: 20 }}>
      <MetricRow head name="2019–2025 全期" a="多單參考組" b="原始均線" c="均線＋緩衝帶" />
      <MetricRow name="淨利" a="413.12 萬" b="332.02 萬" c="339.08 萬" />
      <MetricRow name="每日權益最大回撤" a="176.34 萬" b="89.34 萬" c="89.34 萬" />
      <MetricRow name="完整交易筆數" a="85" b="83" c="68" />
      <MetricRow name="獲利因子" a="2.06" b="2.07" c="2.45" badge="≥ 2 課堂加分" />
      <MetricRow name="Sharpe（日報酬，年化）" a="1.15" b="1.14" c="1.16" />
      <MetricRow name="勝率" a="67%" b="63%" c="71%" />
    </div>
    <p style={{ marginTop: 32, fontSize: 26, color: slate }}>
      多單參考組賺最多，回撤也大一倍。很大一部分獲利，其實來自台股這幾年一直漲。
    </p>
  </Frame>
);

const DeltaRow = ({
  name,
  from,
  to,
  good,
}: {
  name: string;
  from: string;
  to: string;
  good?: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'baseline',
      height: 88,
      borderBottom: `1px solid ${rule}`,
      ...num,
    }}
  >
    <span style={{ width: 230, fontSize: 28, color: muted }}>{name}</span>
    <span style={{ width: 170, fontSize: 40, textAlign: 'right', color: slate }}>{from}</span>
    <span style={{ width: 70, fontSize: 32, textAlign: 'center', color: muted }}>→</span>
    <span style={{ fontSize: 40, fontWeight: 700, color: good ? pass : 'var(--osd-accent)' }}>
      {to}
    </span>
  </div>
);

const Bar = ({
  label,
  value,
  width,
  positive,
}: {
  label: string;
  value: string;
  width: number;
  positive?: boolean;
}) => (
  <div style={{ marginBottom: 36 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, ...num }}>
      <span style={{ color: slate }}>{label}</span>
      <span style={{ fontWeight: 700, color: positive ? pass : 'var(--osd-accent)' }}>{value}</span>
    </div>
    <div style={{ height: 30, marginTop: 10, background: soft }}>
      <div style={{ width, height: 30, background: positive ? pass : 'var(--osd-accent)' }} />
    </div>
  </div>
);

const Holdout: Page = () => (
  <Frame section="06 檢視績效｜保留期" source={DATA_SOURCE}>
    <Heading>保留期 2023–2025：交易變少，Sharpe 沒變好</Heading>
    <div style={{ display: 'flex', gap: 100, marginTop: 52 }}>
      <div style={{ width: 760 }}>
        <div style={{ fontSize: 24, color: muted, letterSpacing: '0.08em', marginBottom: 8 }}>
          原始均線 → 緩衝帶
        </div>
        <Steps>
          <Step>
            <DeltaRow name="完整交易" from="39" to="33" good />
          </Step>
          <Step>
            <DeltaRow name="訊號出場" from="6" to="1" good />
          </Step>
          <Step>
            <DeltaRow name="Sharpe" from="1.352" to="1.322" />
          </Step>
          <Step>
            <DeltaRow name="淨利（萬）" from="207.80" to="204.00" />
          </Step>
        </Steps>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 24, color: muted, letterSpacing: '0.08em', marginBottom: 28 }}>
          差在哪裡（元）
        </div>
        <Steps>
          <Step>
            <Bar label="少交易，省下手續費＋滑價" value="+8,200" width={130} positive />
          </Step>
          <Step>
            <Bar label="進出時機變慢，價差少賺" value="−46,200" width={730} />
          </Step>
          <Step>
            <Bar label="扣完成本，淨利" value="−38,000" width={600} />
          </Step>
        </Steps>
      </div>
    </div>
    <p
      style={{
        marginTop: 28,
        fontSize: 30,
        fontWeight: 700,
        borderLeft: '4px solid var(--osd-accent)',
        paddingLeft: 24,
      }}
    >
      事前訂的「交易變少，而且 Sharpe 提高」沒有成立。
    </p>
  </Frame>
);

const CheckRow = ({ ok, title, detail }: { ok: boolean; title: string; detail: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 40,
      height: 128,
      borderBottom: `1px solid ${rule}`,
    }}
  >
    <div
      style={{
        width: 72,
        height: 72,
        borderRadius: 36,
        flexShrink: 0,
        background: ok ? pass : 'var(--osd-accent)',
        color: '#FBF9F3',
        fontSize: 40,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {ok ? '✓' : '✗'}
    </div>
    <div style={{ width: 560, fontSize: 34, fontWeight: 700 }}>{title}</div>
    <div style={{ fontSize: 30, color: slate, ...num }}>{detail}</div>
  </div>
);

const Threshold: Page = () => (
  <Frame section="06 檢視績效｜作業門檻" source={DATA_SOURCE}>
    <Heading>作業門檻：兩項通過，一項沒過</Heading>
    <div style={{ marginTop: 40 }}>
      <CheckRow ok title="淨利 ＞ 120 萬" detail="339.08 萬" />
      <CheckRow ok title="近三年績效為正" detail="2023：60.14 萬　2024：76.70 萬　2025：67.16 萬" />
      <CheckRow
        ok={false}
        title="最大策略虧損 ＜ 最大年獲利"
        detail={
          <>
            最大回撤 <b style={{ color: 'var(--osd-accent)' }}>89.34 萬</b> ＞ 最大年獲利 76.70 萬
          </>
        }
      />
    </div>
    <p style={{ marginTop: 48, fontSize: 28, lineHeight: 1.6, color: slate, maxWidth: 1500 }}>
      只看平倉後的權益，最大回撤是 57.38
      萬，表面上會過。但持倉中的帳面虧損一樣是風險，所以不換成比較好看的算法。
    </p>
  </Frame>
);

const AugChart = () => {
  const w = 1000;
  const h = 560;
  const min = 17900;
  const max = 24800;
  const n = augClose.length;
  const yOf = (v: number) => h - ((v - min) / (max - min)) * h;
  const xOf = (i: number) => (i / (n - 1)) * w;
  const upper = augMean.map((m, i) => m + augRange[i]);
  const lower = augMean.map((m, i) => m - augRange[i]);
  return (
    <svg width={1100} height={h + 90} viewBox={`-90 -40 1100 ${h + 90}`} aria-hidden>
      {[19000, 21000, 23000].map((v) => (
        <g key={v}>
          <line x1={0} x2={w} y1={yOf(v)} y2={yOf(v)} stroke={rule} />
          <text
            x={-12}
            y={yOf(v)}
            fontSize={20}
            fill={muted}
            textAnchor="end"
            dominantBaseline="middle"
            style={num}
          >
            {v.toLocaleString('en-US')}
          </text>
        </g>
      ))}
      <path d={bandPath(upper, lower, w, h, min, max)} fill="var(--osd-accent)" opacity={0.1} />
      <path
        d={linePath(lower, w, h, min, max)}
        fill="none"
        stroke="var(--osd-accent)"
        strokeWidth={1.5}
        opacity={0.6}
      />
      <path
        d={linePath(augMean, w, h, min, max)}
        fill="none"
        stroke={slate}
        strokeWidth={2}
        strokeDasharray="8 6"
      />
      <path
        d={linePath(augClose, w, h, min, max)}
        fill="none"
        stroke="var(--osd-text)"
        strokeWidth={3}
      />
      <circle
        cx={xOf(15)}
        cy={yOf(augClose[15])}
        r={9}
        fill="var(--osd-bg)"
        stroke="var(--osd-text)"
        strokeWidth={3}
      />
      <text
        x={xOf(15)}
        y={yOf(augClose[15]) - 22}
        fontSize={22}
        textAnchor="middle"
        fill="var(--osd-text)"
      >
        7/11 權益高點
      </text>
      <circle cx={xOf(30)} cy={yOf(augClose[30])} r={10} fill="var(--osd-accent)" />
      <text
        x={xOf(30) + 18}
        y={yOf(augClose[30]) + 8}
        fontSize={22}
        fill="var(--osd-accent)"
        fontWeight={700}
      >
        8/5 收 19,374
      </text>
      <text
        x={w - 4}
        y={yOf(lower[n - 1]) + 30}
        fontSize={20}
        fill="var(--osd-accent)"
        textAnchor="end"
      >
        下緣
      </text>
      <text x={w - 4} y={yOf(augMean[n - 1]) - 14} fontSize={20} fill={slate} textAnchor="end">
        200 日均線
      </text>
      <text x={0} y={h + 36} fontSize={22} fill={muted} style={num}>
        2024/6/20
      </text>
      <text x={w} y={h + 36} fontSize={22} fill={muted} textAnchor="end" style={num}>
        9/10
      </text>
    </svg>
  );
};

const Stat = ({ value, label }: { value: string; label: string }) => (
  <div style={{ borderTop: `1px solid ${rule}`, paddingTop: 18 }}>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 52, fontWeight: 700, ...num }}>
      {value}
    </div>
    <div style={{ fontSize: 24, color: slate, marginTop: 6, lineHeight: 1.5 }}>{label}</div>
  </div>
);

const Crash: Page = () => (
  <Frame section="06 檢視績效｜最大回撤" source={DATA_SOURCE}>
    <Heading>最大回撤出在 2024 年 8 月 5 日</Heading>
    <div style={{ display: 'flex', gap: 40, marginTop: 36 }}>
      <AugChart />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 30 }}>
        <div>
          <div style={{ fontSize: 24, color: muted }}>7/11 → 8/5 權益回撤</div>
          <div
            style={{
              fontFamily: 'var(--osd-font-display)',
              fontSize: 96,
              fontWeight: 700,
              color: 'var(--osd-accent)',
              lineHeight: 1.1,
              ...num,
            }}
          >
            −89.34 萬
          </div>
        </div>
        <Stat value="18,929" label="8/5 的下緣。收盤 19,374 還在上面，所以沒出場" />
        <Stat value="−43.18 萬" label="8/5 單日帳上損失，緩衝帶太寬來不及反應" />
      </div>
    </div>
  </Frame>
);

const SummaryCol = ({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: ReactNode;
}) => (
  <div style={{ flex: 1, borderTop: `4px solid ${color}`, paddingTop: 24 }}>
    <div style={{ fontSize: 36, fontWeight: 700, color }}>{title}</div>
    <ul
      style={{
        margin: '24px 0 0',
        paddingLeft: 30,
        fontSize: 28,
        lineHeight: 1.55,
        color: 'var(--osd-text)',
      }}
    >
      {children}
    </ul>
  </div>
);

const Summary: Page = () => (
  <Frame section="07 總結">
    <Heading>優缺點與下一步</Heading>
    <div style={{ display: 'flex', gap: 56, marginTop: 56 }}>
      <SummaryCol title="優點" color={pass}>
        <li style={{ marginBottom: 20, listStyle: 'disc' }}>規則少，每個訊號都能人工核對</li>
        <li style={{ marginBottom: 20, listStyle: 'disc' }}>交易從 83 筆降到 68 筆</li>
        <li style={{ listStyle: 'disc' }}>獲利因子 2.45，全期淨利 339 萬</li>
      </SummaryCol>
      <SummaryCol title="缺點" color="var(--osd-accent)">
        <li style={{ marginBottom: 20, listStyle: 'disc' }}>急跌時反應慢，回撤超過年獲利</li>
        <li style={{ marginBottom: 20, listStyle: 'disc' }}>結算後至少空手一天，會錯過行情</li>
        <li style={{ listStyle: 'disc' }}>獲利大多來自台股長期上漲</li>
      </SummaryCol>
      <SummaryCol title="下一步" color={slate}>
        <li style={{ marginBottom: 20, listStyle: 'disc' }}>加一個定義清楚的保護性出場</li>
        <li style={{ marginBottom: 20, listStyle: 'disc' }}>在 MultiCharts 編譯、匯出 .pla</li>
        <li style={{ listStyle: 'disc' }}>和元大 TXF1 的資料逐筆對帳</li>
      </SummaryCol>
    </div>
    <p style={{ marginTop: 64, fontSize: 28, color: muted }}>
      保留期已經用掉了。之後的新版本要另外找一段沒看過的資料來驗證。
    </p>
  </Frame>
);

export const meta: SlideMeta = {
  title: '台指期 200 日均線＋波動緩衝帶',
  createdAt: '2026-10-19T09:01:40.677Z',
};

export default [
  Cover,
  Question,
  RuleV1,
  Weakness,
  BandRuleV2,
  Code,
  Settings,
  Settlement,
  NoOverfit,
  Equity,
  Compare,
  Holdout,
  Threshold,
  Crash,
  Summary,
] satisfies Page[];

export const notes: (string | undefined)[] = [
  `大家好，我這次專題做的是台指期的長期均線策略。
先講結論：七年回測有賺，但有一項作業門檻沒過，我會把原因講清楚。`,
  `一開始想問的問題很單純：用長期均線決定要不要持有，能不能讓台指期少跌一點？
我比的是回撤跟 Sharpe，不是比誰賺最多。
選均線是因為有研究可以參考，Moskowitz 他們的時間序列動能，還有 Faber 的十個月均線，大概就是 200 日。
只做多，是想先單獨看「什麼時候該退場」這件事。`,
  `第一版規則只有三條。
收盤在均線上面，隔天開盤買一口；跌破就隔天開盤平倉；剛好等於就不動。
重點是訊號收盤才確認、隔天才成交，這樣不會偷看到未來的價格。`,
  `這版的問題在盤整。
價格在均線附近晃來晃去，就會一直買、一直賣。
右邊是示意圖，同一段假行情，單一條線進出十一次，加了緩衝帶只剩三次。
每次來回一千塊手續費，再加滑價，次數一多就很傷。`,
  `所以第二版在均線上下各加一段距離，距離用最近二十天的平均真實波幅。
突破上緣才買，跌破下緣才出場，中間就維持原狀。
舉例：均線兩萬、波幅兩百，上緣兩萬零兩百、下緣一萬九千八。
收在兩萬零一百的時候，空手就不買，有部位就續抱。
用波幅當距離的好處是市場越震盪，緩衝就越寬。`,
  `程式是用 PowerLanguage 寫的，同一支訊號用 Mode 參數切三個版本，比較的時候只要改一個數字。
成交都用 Next Bar At Market，出場用 Sell 而不是 SellShort，避免不小心開了空單。`,
  `回測設定都照專題規定：七年、日盤日 K、一口、來回一千、一百萬起始資金。
另外每邊再多算一點滑價，比規定保守一點。
資料是從期交所官網下載的年度日行情，整理出兩千一百多根近月日 K。`,
  `結算這塊花了比較多時間。
到期那天我們用期交所公告的最後結算價出場，不是用收盤價。
因為對了一下，108 次結算裡有 45 次收盤價跟結算價不同。
結算完隔天收盤再判斷，再隔一天開盤才進新月份合約，三個版本都用同一套規則。`,
  `為了避免看完結果再改參數，我先把資料切成三段：開發、驗證、保留。
三個參數 200、20、1 倍在第一次回測前就寫死了。
然後三個版本一起比：一直做多的參考組、原始均線、還有加緩衝帶的版本。`,
  `這是七年的權益曲線。三條都有賺。
灰色是一直做多，賺最多但起伏也最大。
2022 年台股下跌那段，兩個均線版大部分時間都空手，所以是平的。
2024 年 8 月那個大缺口，等一下會單獨講。`,
  `數字放在一起看：緩衝帶版交易最少，68 筆；獲利因子 2.45，有到課堂的加分門檻。
但最大回撤跟原始版一樣是 89 萬。
一直做多的版本賺 413 萬，回撤卻是 176 萬，所以這幾年的獲利很大一部分是台股自己在漲。`,
  `最關鍵的是保留期，2023 到 2025，這段是最後才看的。
交易確實變少，訊號出場從 6 次變 1 次。
但 Sharpe 從 1.352 掉到 1.322，淨利也少了將近四萬。
拆開來看：少交易省了八千二，但進出時機變慢，價差少賺了四萬六。
所以我事前訂的判準，「交易少而且 Sharpe 變好」，沒有成立。`,
  `對照作業門檻，淨利跟近三年都過了。
沒過的是最大回撤：89 萬比最大年獲利 76 萬還大。
如果只看平倉後的權益，回撤是 57 萬，會過，但持倉中的虧損也是真的，所以我不換算法。`,
  `這個回撤就出在 2024 年 8 月 5 日，台股那天大跌。
收盤 19,374，雖然跌破均線，但還在緩衝帶下緣上面，所以緩衝帶版沒有出場，那天帳上就少了 43 萬。
這也是緩衝帶的代價：盤整時少進出，急跌時就反應慢。`,
  `最後整理一下。
優點是規則簡單、交易變少、獲利因子不錯。
缺點是急跌反應慢、結算後會空手一天、獲利很大部分來自大盤上漲。
下一步是加一個清楚的保護性出場，然後到 MultiCharts 上編譯、匯出 pla 檔，跟元大的 TXF1 資料對帳。
謝謝大家。`,
];
