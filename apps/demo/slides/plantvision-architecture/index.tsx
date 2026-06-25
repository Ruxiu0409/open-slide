import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { Step, Steps, useSlidePageNumber } from '@open-slide/core';
import userPreview from './assets/user-preview.jpg';
import polycamModel from './assets/polycam-model.jpg';
import polycamLibrary from './assets/polycam-library.jpg';
import mlObjectTracking from './assets/ml-objecttracking.jpg';
import macRelay from './assets/mac-relay.jpg';
import rcpAnchor from './assets/rcp-anchor.jpg';
import mlClassifier from './assets/ml-classifier.jpg';
import plantTracker from './assets/plant-tracker.jpg';
import infoCardReal from './assets/info-card-real.jpg';
import historyReal from './assets/history-real.jpg';
import polycamDemo from './assets/polycam-demo.mp4';
import recognitionDemo from './assets/recognition-demo.mp4';
import plantClassifierModel from './assets/plant-classifier-model.png';
import witherDemo from './assets/wither-demo.jpg';
import witherClassifierModel from './assets/wither-classifier-model.png';

export const design: DesignSystem = {
  palette: { bg: '#F4F8EF', text: '#22372A', accent: '#3B8E44' },
  fonts: {
    display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, sans-serif',
  },
  typeScale: { hero: 150, body: 36 },
  radius: 26,
};

// 超出 DesignSystem 形狀的色彩 / 字體留作純常數。
const MONO = 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, monospace';
const muted = '#5E7A66';
const dim = '#9DB0A2';
const amber = '#E0922A';
const sky = '#2F6FB5';
const surface = '#FFFFFF';
const surfaceHi = '#EAF3E4';
const hairline = '1px solid rgba(34, 55, 42, 0.12)';
const softShadow = '0 24px 50px -28px rgba(31, 60, 38, 0.22)';

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
} as const;

// 螢光筆重點:柔綠橫條從左掃到右(學自 steps-in-motion 的 m-sweep)。
// 放在 <Step> 內會在揭露時掃入;單獨使用則為靜態標示。
const SWEEP_CSS =
  '@keyframes pvSweep{from{background-size:0% 0.46em}to{background-size:100% 0.46em}}' +
  '.pv-mark{background-image:linear-gradient(rgba(91,229,154,0.55),rgba(91,229,154,0.55));background-repeat:no-repeat;background-position:left 92%;background-size:100% 0.46em;font-weight:700;border-radius:2px}' +
  '[data-osd-step="revealed"] .pv-mark{animation:pvSweep 620ms cubic-bezier(0.16,1,0.3,1) both}';
if (typeof document !== 'undefined' && !document.getElementById('pv-sweep-css')) {
  const styleEl = document.createElement('style');
  styleEl.id = 'pv-sweep-css';
  styleEl.textContent = SWEEP_CSS;
  document.head.appendChild(styleEl);
}

const Mark = ({ children }: { children: ReactNode }) => <span className="pv-mark">{children}</span>;

// 水彩葉片：角落點綴,呼應淺色植物風。
const Leaf = ({ style }: { style?: CSSProperties }) => (
  <svg width="300" height="300" viewBox="0 0 100 100" aria-hidden style={{ position: 'absolute', ...style }}>
    <path d="M50 3 C20 17 7 50 12 94 C56 94 94 60 93 16 C79 9 64 6 50 3 Z" fill="#BFE0AE" />
    <path d="M51 13 C45 42 36 67 19 87" stroke="#9ECB8C" strokeWidth="2.4" fill="none" strokeLinecap="round" />
  </svg>
);

// 淺色水彩底:角落葉叢 + 柔和綠色水洗。
const Glow = () => (
  <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(760px 520px at 90% 4%, rgba(91,160,90,0.12), transparent 62%),' +
          'radial-gradient(680px 620px at 2% 100%, rgba(91,160,90,0.10), transparent 60%)',
      }}
    />
    <Leaf style={{ top: -54, left: -64, transform: 'rotate(14deg)', opacity: 0.55 }} />
    <Leaf style={{ top: 36, left: 96, transform: 'rotate(-32deg) scale(0.62)', opacity: 0.4 }} />
    <Leaf style={{ bottom: -64, right: -54, transform: 'rotate(196deg)', opacity: 0.5 }} />
    <Leaf style={{ bottom: 44, right: 104, transform: 'rotate(150deg) scale(0.62)', opacity: 0.34 }} />
  </div>
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 22,
      letterSpacing: '0.24em',
      textTransform: 'uppercase',
      color: 'var(--osd-accent)',
    }}
  >
    {children}
  </div>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 56,
        left: 120,
        right: 120,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: MONO,
        fontSize: 20,
        color: dim,
        letterSpacing: '0.08em',
      }}
    >
      <span>PlantVision · 電腦視覺與擴增實境</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Shell = ({ eyebrow, children }: { eyebrow?: ReactNode; children: ReactNode }) => (
  <div
    style={{
      ...fill,
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <Glow />
    <div
      style={{
        position: 'relative',
        height: '100%',
        boxSizing: 'border-box',
        padding: '100px 120px 120px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {eyebrow ? <div style={{ marginBottom: 34 }}><Eyebrow>{eyebrow}</Eyebrow></div> : null}
      {children}
    </div>
    <Footer />
  </div>
);

const Heading = ({ children }: { children: ReactNode }) => (
  <div>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 64,
        fontWeight: 800,
        lineHeight: 1.08,
        letterSpacing: '-0.02em',
        margin: 0,
        color: '#1E5E2E',
      }}
    >
      {children}
    </h2>
    <div style={{ height: 4, width: 168, background: 'var(--osd-accent)', opacity: 0.8, borderRadius: 2, marginTop: 16 }} />
  </div>
);

const Lead = ({ children }: { children: ReactNode }) => (
  <p style={{ fontSize: 30, lineHeight: 1.5, color: muted, maxWidth: 1440, margin: '32px 0 0' }}>{children}</p>
);

const Point = ({ children }: { children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 22, alignItems: 'flex-start' }}>
    <span
      style={{
        width: 12,
        height: 12,
        borderRadius: 4,
        background: 'var(--osd-accent)',
        flexShrink: 0,
        marginTop: 15,
      }}
    />
    <span style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.5, color: 'var(--osd-text)' }}>{children}</span>
  </div>
);

const Card = ({ title, body, tag }: { title: ReactNode; body: ReactNode; tag?: ReactNode }) => (
  <div
    style={{
      flex: 1,
      background: surface,
      border: hairline,
      borderRadius: 'var(--osd-radius)',
      boxShadow: softShadow,
      padding: '40px 40px 44px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
    }}
  >
    {tag ? (
      <span style={{ fontFamily: MONO, fontSize: 18, color: 'var(--osd-accent)', letterSpacing: '0.14em' }}>{tag}</span>
    ) : null}
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 680 }}>{title}</div>
    <div style={{ fontSize: 26, lineHeight: 1.5, color: muted }}>{body}</div>
  </div>
);

const Code = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      fontFamily: MONO,
      fontSize: '0.92em',
      color: 'var(--osd-accent)',
      background: surfaceHi,
      padding: '2px 10px',
      borderRadius: 8,
    }}
  >
    {children}
  </span>
);

const Node = ({ tag, name, role }: { tag: string; name: string; role: string }) => (
  <div
    style={{
      flex: 1,
      background: surface,
      border: hairline,
      borderRadius: 'var(--osd-radius)',
      boxShadow: softShadow,
      padding: '32px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      minHeight: 220,
      justifyContent: 'center',
    }}
  >
    <span style={{ fontFamily: MONO, fontSize: 16, color: 'var(--osd-accent)', letterSpacing: '0.16em' }}>{tag}</span>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 720, lineHeight: 1.15 }}>{name}</div>
    <div style={{ fontSize: 21, lineHeight: 1.45, color: muted }}>{role}</div>
  </div>
);

const Flow = ({ label }: { label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '0 6px' }}>
    <span style={{ fontFamily: MONO, fontSize: 15, color: dim, letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{label}</span>
    <span style={{ fontSize: 36, color: 'var(--osd-accent)', lineHeight: 1 }}>→</span>
  </div>
);

const StepRow = ({ n, children }: { n: string; children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 26, alignItems: 'center' }}>
    <span
      style={{
        fontFamily: MONO,
        fontSize: 22,
        fontWeight: 600,
        color: '#fff',
        borderRadius: '50%',
        width: 52,
        height: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        background: 'var(--osd-accent)',
        boxShadow: '0 6px 16px -6px rgba(59,142,68,0.6)',
      }}
    >
      {n}
    </span>
    <span style={{ fontSize: 31, lineHeight: 1.4, color: 'var(--osd-text)' }}>{children}</span>
  </div>
);

const Band = ({ range, label, color }: { range: string; label: string; color: string }) => (
  <div
    style={{
      flex: 1,
      background: surface,
      border: hairline,
      borderRadius: 18,
      padding: '26px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}
  >
    <span style={{ width: 44, height: 44, borderRadius: 12, background: color, boxShadow: `0 0 22px ${color}66` }} />
    <span style={{ fontFamily: MONO, fontSize: 25, color: muted }}>{range}</span>
    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 680 }}>{label}</span>
  </div>
);

const SectionDivider = ({ part, title, sub }: { part: string; title: string; sub: string }) => (
  <div
    style={{
      ...fill,
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 140px',
    }}
  >
    <Glow />
    <div style={{ position: 'relative' }}>
      <Eyebrow>{part}</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 116,
          fontWeight: 820,
          lineHeight: 1.02,
          letterSpacing: '-0.03em',
          margin: '28px 0 24px',
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: 34, color: muted, lineHeight: 1.45, maxWidth: 1300, margin: 0 }}>{sub}</p>
    </div>
  </div>
);

// 技術名詞對應表的一列。
const TermRow = ({ term, en, where }: { term: string; en: string; where: ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '420px 1fr',
      gap: 32,
      alignItems: 'center',
      padding: '18px 0',
      borderTop: hairline,
    }}
  >
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 700 }}>{term}</span>
      <span style={{ fontFamily: MONO, fontSize: 19, color: dim, letterSpacing: '0.04em' }}>{en}</span>
    </div>
    <span style={{ fontSize: 27, lineHeight: 1.45, color: muted }}>{where}</span>
  </div>
);


const GalleryCard = ({
  src,
  tag,
  caption,
  device,
  sh,
  stageH,
  flex = '1 1 0',
}: {
  src: string;
  tag: string;
  caption: string;
  device: 'phone' | 'mac';
  sh: number;
  stageH: number;
  flex?: string;
}) => (
  <div style={{ flex, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0 }}>
    <div style={{ height: stageH, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {device === 'phone' ? (
        <PhoneFrame src={src} alt={caption} island={false} sh={sh} />
      ) : (
        <MacbookFrame src={src} alt={caption} sh={sh} />
      )}
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span style={{ fontFamily: MONO, fontSize: 17, color: 'var(--osd-accent)', letterSpacing: '0.12em' }}>{tag}</span>
      <span style={{ fontSize: 24, color: 'var(--osd-text)', lineHeight: 1.4 }}>{caption}</span>
    </div>
  </div>
);

// ── 微動:整套 deck 共用一個安靜的 RISE，封面用稍長的 SETTLE。 ──
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 200,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const settle: SlideTransition = {
  duration: 280,
  exit: {
    duration: 160,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-6px)' },
    ],
  },
  enter: {
    duration: 280,
    delay: 100,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
    ],
  },
};

// ════════════════════════ Pages ════════════════════════

const Cover: Page = () => (
  <div
    style={{
      ...fill,
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 140px',
    }}
  >
    <Glow />
    <div style={{ position: 'relative' }}>
      <Eyebrow>電腦視覺與擴增實境 · 期末報告</Eyebrow>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 820,
          lineHeight: 0.98,
          letterSpacing: '-0.03em',
          margin: '34px 0 26px',
        }}
      >
        PlantVision
      </h1>
      <p style={{ fontSize: 40, lineHeight: 1.4, color: muted, maxWidth: 1240, margin: 0 }}>
        在 Vision Pro 上,用<span style={{ color: 'var(--osd-accent)' }}>電腦視覺</span>辨識植物與健康、
        用<span style={{ color: sky }}>擴增實境</span>把資訊空間錨定在真實植株旁。
      </p>
      <div
        style={{
          marginTop: 56,
          display: 'flex',
          gap: 22,
          alignItems: 'center',
          fontFamily: MONO,
          fontSize: 34,
          color: 'var(--osd-text)',
        }}
      >
        <span style={{ color: dim, letterSpacing: '0.14em', fontSize: 24 }}>組員</span>
        <span>蔡承曄</span>
        <span style={{ color: dim }}>·</span>
        <span>陳俊宇</span>
        <span style={{ color: dim }}>·</span>
        <span>曾柏諺</span>
      </div>
    </div>
  </div>
);
Cover.transition = settle;

const AgendaRow = ({ n, title, sub }: { n: string; title: ReactNode; sub: string }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 32, padding: '22px 4px', borderTop: hairline }}>
    <span style={{ fontFamily: MONO, fontSize: 42, fontWeight: 600, color: 'var(--osd-accent)', minWidth: 78, flexShrink: 0 }}>{n}</span>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 38, fontWeight: 740, color: '#1E5E2E', lineHeight: 1.1 }}>{title}</span>
      <span style={{ fontSize: 25, color: muted, lineHeight: 1.4 }}>{sub}</span>
    </div>
  </div>
);

const Agenda: Page = () => (
  <Shell eyebrow="本次報告">
    <Heading>Agenda</Heading>
    <div style={{ marginTop: 34, display: 'flex', flexDirection: 'column' }}>
      <AgendaRow n="01" title="系統概觀" sub="使用情境、核心決定:CV 與 AR 兩條獨立流程、面對的限制、Apple 框架與定位/尺度原理" />
      <AgendaRow n="02" title={<span style={{ color: 'var(--osd-accent)' }}>電腦視覺</span>} sub="tile 分類、投票、時間平滑、資訊卡、枯萎程度與趨勢" />
      <AgendaRow n="03" title={<span style={{ color: sky }}>擴增實境</span>} sub="物件追蹤、reference object 掃描、空間標籤" />
      <AgendaRow n="04" title="收尾" sub="歷史紀錄、技術對應、實作畫面" />
    </div>
  </Shell>
);

const Overview: Page = () => (
  <Shell eyebrow="System Overview">
    <Heading>PlantVision 是什麼</Heading>
    <div style={{ marginTop: 34, display: 'flex', gap: 48, flex: 1, alignItems: 'center' }}>
      <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <p style={{ fontSize: 26, lineHeight: 1.5, color: muted, margin: 0 }}>
          把一株真實植物,變成 Vision Pro 裡會跟著它的空間資訊卡。系統分成<Mark>兩條獨立流程</Mark>:一條負責「這是什麼、健不健康」,一條負責「它在空間哪裡」。
        </p>
        <Card tag="電腦視覺 · CV" title="辨識植物與健康" body="跑 Core ML 判植物品種與枯萎程度,輸出 plantID 與等級。" />
        <Card tag="擴增實境 · AR" title="空間追蹤與標籤" body="裝置端 ARKit 追固定植株,把資訊 UI 錨定在它附近。" />
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <img
          src={userPreview}
          alt="使用者透過 Vision Pro 看到植物與空間標籤的預覽"
          style={{ width: '100%', borderRadius: 'var(--osd-radius)', border: hairline, boxShadow: softShadow, display: 'block' }}
        />
        <span style={{ fontSize: 23, color: dim, lineHeight: 1.45 }}>
          使用者透過 Vision Pro 即時辨識植物,並以空間標籤呈現。
        </span>
      </div>
    </div>
  </Shell>
);

const WhyAR: Page = () => (
  <Shell eyebrow="Why AR · 使用情境">
    <Heading>為什麼要用 AR?因為手騰不出來</Heading>
    <Lead>
      照顧植物時,雙手常常都在忙—澆水、修剪、換盆,很難再掏出手機拍照、翻 App 查資料。AR 讓資訊直接浮在植株旁,免持、即時、就地對位。
    </Lead>
    <div style={{ marginTop: 'auto', marginBottom: 'auto', display: 'flex', gap: 40 }}>
      <Card tag="情境 · 雙手在忙" title="不必掏手機" body="一邊澆水、修剪,一邊就看到品種與健康,雙手不用停下來。" />
      <Card tag="情境 · 視線" title="資訊就在植株旁" body="標籤錨在這一株旁邊,視線不用在手機與植物之間來回切換。" />
      <Card tag="情境 · 對位" title="知道是哪一盆" body="多盆植物時,辨識與建議直接釘在對應植株上,不會張冠李戴。" />
    </div>
  </Shell>
);

const CoreDecision: Page = () => (
  <Shell eyebrow="The Central Decision">
    <Heading>辨識與追蹤,刻意拆開</Heading>
    <div style={{ marginTop: 48, display: 'flex', gap: 40 }}>
      <Card
        tag="RECOGNITION · CV"
        title="Mac 分類 → 2D 視窗"
        body="決定『是什麼植物、多枯萎』。只認訓練過的目標植物(馬纓丹、天竺葵);不是目標或沒有植物,就辨識成 Background。"
      />
      <Card
        tag="SPATIAL TRACKING · AR"
        title="裝置端 ARKit → 沉浸式標籤"
        body="決定『它在哪、是哪一株』,只看當下追到的 reference object,完全不依賴 Mac。"
      />
    </div>
    <p style={{ marginTop: 40, fontSize: 27, color: muted, lineHeight: 1.5 }}>
      兩個身分來源<Mark>各自能單獨壞掉與退場</Mark>,CV 掛了不影響 AR 定位,反之亦然。
    </p>
  </Shell>
);

const FrameworkCard = ({ tag, name, gives, use }: { tag: string; name: string; gives: ReactNode; use: ReactNode }) => (
  <div
    style={{
      background: surface,
      border: hairline,
      borderRadius: 'var(--osd-radius)',
      boxShadow: softShadow,
      padding: '28px 32px 30px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}
  >
    <span style={{ fontFamily: MONO, fontSize: 18, color: 'var(--osd-accent)', letterSpacing: '0.14em' }}>{tag}</span>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 760, color: '#1E5E2E' }}>{name}</div>
    <div style={{ fontSize: 25, lineHeight: 1.5, color: muted }}>
      <span style={{ color: 'var(--osd-accent)', fontWeight: 600 }}>Apple 提供　</span>
      {gives}
    </div>
    <div style={{ fontSize: 25, lineHeight: 1.5, color: 'var(--osd-text)' }}>
      <span style={{ color: dim, fontFamily: MONO, fontSize: 19 }}>我們用來　</span>
      {use}
    </div>
  </div>
);

const AppleStack: Page = () => (
  <Shell eyebrow="Built on Apple Frameworks">
    <Heading>站在 Apple 的框架上</Heading>
    <p style={{ fontSize: 27, color: muted, lineHeight: 1.45, margin: '26px 0 0', maxWidth: 1440 }}>
      整個系統不是從零造輪子,而是組合 Apple 在 visionOS 上提供的能力，空間感知、3D 渲染、影像分析與裝置端推論。
    </p>
    <div style={{ marginTop: 34, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
      <FrameworkCard
        tag="空間感知 · TRACKING"
        name="ARKit"
        gives="平面偵測、World/Anchor、6DoF 物件追蹤(ObjectTrackingProvider)、world-sensing。"
        use="在真實空間定位固定植株,提供位姿。"
      />
      <FrameworkCard
        tag="3D 渲染 · RENDERING"
        name="RealityKit"
        gives="Entity / Anchor 場景、3D 模型載入、材質與動畫,並與 ARKit anchor 綁定。"
        use="顯示空間標籤。"
      />
      <FrameworkCard
        tag="影像分析 · IMAGE"
        name="Vision"
        gives="影像請求流程、前處理與特徵分析。"
        use="把鏡像畫面整理成可分類的輸入。"
      />
      <FrameworkCard
        tag="裝置端推論 · ML"
        name="Core ML"
        gives="on-device 模型推論,低延遲、不上傳雲端。"
        use="跑植物分類模型,輸出 plantID 與信心。"
      />
    </div>
  </Shell>
);

// reference object 的 boundingBox 欄位小卡。
const BoxChip = ({ field, desc }: { field: string; desc: string }) => (
  <div
    style={{
      flex: 1,
      background: surface,
      border: hairline,
      borderRadius: 18,
      boxShadow: softShadow,
      padding: '24px 24px 26px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}
  >
    <span style={{ fontFamily: MONO, fontSize: 26, color: 'var(--osd-accent)', fontWeight: 600 }}>{field}</span>
    <span style={{ fontSize: 23, lineHeight: 1.45, color: muted }}>{desc}</span>
  </div>
);

const Positioning: Page = () => (
  <Shell eyebrow="Apple Frameworks · Positioning">
    <Heading>怎麼定位?6DoF 位姿與座標變換</Heading>
    <p style={{ fontSize: 26, color: muted, lineHeight: 1.45, margin: '24px 0 0', maxWidth: 1480 }}>
      ARKit 的 <Code>ObjectTrackingProvider</Code> 持續吐出 <Code>ObjectAnchor</Code>，每個 anchor 都帶一個位姿矩陣，標籤要落在哪、轉幾度,全靠它。
    </p>
    <div style={{ marginTop: 30, display: 'flex', alignItems: 'center' }}>
      <Node tag="物件 LOCAL · RCP" name="部位錨點座標" role="花/葉位置,公尺,固定烘在模型上" />
      <Flow label="套用位姿" />
      <Node tag="ARKit · ObjectAnchor" name="4×4 位姿矩陣" role="originFromAnchorTransform,位置＋旋轉(6DoF),每幀更新" />
      <Flow label="對齊" />
      <Node tag="世界座標" name="眼前真實空間" role="標籤穩定釘在植株旁" />
    </div>
    <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Point>把整株標籤子樹的 root 對齊到 <Code>originFromAnchorTransform</Code>;部位錨點隨矩陣一起被變換到世界座標</Point>
      <Point><Code>isTracked</Code> 為真才更新位置,暫時 lost 就先把標籤藏起來,不讓它漂在錯的地方</Point>
      <Point>位姿每幀會抖 → 指數平滑(<Code>alpha 0.25</Code>)壓掉;使用者鎖定時凍結 pose</Point>
    </div>
  </Shell>
);

const Scale: Page = () => (
  <Shell eyebrow="Apple Frameworks · Scale">
    <Heading>大小怎麼抓?reference object 的真實尺度</Heading>
    <p style={{ fontSize: 26, color: muted, lineHeight: 1.45, margin: '24px 0 0', maxWidth: 1480 }}>
      尺度不是 runtime 估的，掃描/訓練時就把真實世界大小烘進 <Code>.referenceobject</Code>。每個 <Code>ObjectAnchor</Code> 都附一個以公尺為單位的 <Code>boundingBox</Code>。
    </p>
    <div style={{ marginTop: 30, display: 'flex', gap: 20 }}>
      <BoxChip field="min / max" desc="物件框的兩個對角(公尺)" />
      <BoxChip field="center" desc="框的幾何中心" />
      <BoxChip field="extent" desc="長寬高三軸尺寸" />
    </div>
    <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Point>reference object 設為 <Code>gravity-aligned</Code> 並排除底面,桌上盆栽站得穩、不會上下顛倒</Point>
      <Point>一切都是真實公尺,部位錨點(物件 local 公尺)自動落在正確實體位置與大小,不必用相機估距</Point>
      <Point>第一次追到就印出 <Code>boundingBox</Code> 核對「追蹤框 vs 模型框」;整片一致偏移用 <Code>frameCorrection</Code> 補常數平移(變形漂移修不了)</Point>
    </div>
  </Shell>
);

const CVDivider: Page = () => (
  <SectionDivider
    part="Part I · Computer Vision"
    title="電腦視覺"
    sub="抽幀 → tile 分類 → 投票聚合 → 時間平滑 → 枯萎分級。讓單張畫面的雜訊,收斂成穩定的判斷。"
  />
);
CVDivider.transition = settle;

const TileVoting: Page = () => (
  <Shell eyebrow="CV · Image Classification">
    <Heading>滿幀 tile 分類,而非中心裁切</Heading>
    <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Point>植物常只佔鏡像一小塊、又偏離中心，單一中心裁切會直接漏掉</Point>
      <Point><Code>classifyScene</Code> 對一整排重疊 tile 各跑一次 <Code>PlantClassifier</Code></Point>
      <Point>每個 tile 是獨立的影像分類;<Code>"Background"</Code> 是保留標籤,代表「沒有植物」</Point>
    </div>
    <p style={{ marginTop: 'auto', marginBottom: 0, fontSize: 21, color: dim, lineHeight: 1.5, borderTop: hairline, paddingTop: 18 }}>
      ※ <span style={{ color: 'var(--osd-accent)', fontFamily: MONO }}>tile</span>:把整幀畫面切成的一塊塊重疊小方格,每塊各自獨立送進模型分類。
    </p>
  </Shell>
);

const Voting: Page = () => (
  <Shell eyebrow="CV · Vote Aggregation">
    <Heading>把多個 tile 的票聚合成一個答案</Heading>
    <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Point><Code>resolveScene</Code> 統計各 tile 的投票,看最高票與次高票的差距</Point>
      <Point>需要足夠的「票差」與「佐證 tile 數」才下判斷,否則回報不確定</Point>
      <Point>門檻(<Code>minimumVoteMargin</Code>、<Code>minimumCorroboratingTiles</Code>)是對真實截圖調出來的</Point>
    </div>
  </Shell>
);

const Smoothing: Page = () => (
  <Shell eyebrow="CV · Temporal Filtering">
    <Heading>用時間維度壓掉閃爍</Heading>
    <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Point>每幀的結果仍會抖動;<Code>TemporalLabelSmoother</Code> 在 ~0.7s 窗內做多數決</Point>
      <Point>平手時回報「不確定」,而不是硬猜，寧可不顯示,也不要顯示錯的</Point>
      <Point>抽幀約每 0.1s 一張,窗內累積約 7 幀再投票</Point>
    </div>
  </Shell>
);

const Wither: Page = () => (
  <Shell eyebrow="CV · Health Classification">
    <Heading>枯萎程度與趨勢</Heading>
    <p style={{ fontSize: 27, color: muted, lineHeight: 1.45, margin: '26px 0 0', maxWidth: 1480 }}>
      與辨識獨立的分類器,共用同一批 tile:每塊判 <Code>healthy</Code> / <Code>withered</Code>,枯萎比例 = 枯萎 ÷(健康＋枯萎),時間窗取平均後分四級。
    </p>
    <div style={{ marginTop: 30, display: 'flex', gap: 22 }}>
      <Band range="< 10%" label="健康" color="#5BE59A" />
      <Band range="< 35%" label="輕微" color="#C8E06A" />
      <Band range="< 65%" label="中度" color={amber} />
      <Band range="≥ 65%" label="嚴重" color="#E2683E" />
    </div>
    <div style={{ marginTop: 26 }}>
      <span style={{ fontFamily: MONO, fontSize: 18, color: 'var(--osd-accent)', letterSpacing: '0.14em' }}>趨勢 · TREND</span>
      <div style={{ marginTop: 14, display: 'flex', gap: 22 }}>
        <TrendChip arrow="↗" label="惡化" modifier="狀況似乎正在惡化" color="#C9572A" />
        <TrendChip arrow="→" label="穩定" modifier="近期狀況穩定" color={muted} />
        <TrendChip arrow="↘" label="好轉" modifier="狀況似乎正在好轉" color="#3B8E44" />
      </div>
    </div>
  </Shell>
);

// 全版枯萎程度 Demo:實機資訊卡的健康/枯萎比例,整頁滿版呈現。
const WitherDemo: Page = () => (
  <div style={{ ...fill, position: 'relative', background: '#000', overflow: 'hidden' }}>
    <img
      src={witherDemo}
      alt="Vision Pro 上的植物健康資訊卡:枯萎面積比例與健康等級"
      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
    />
  </div>
);
WitherDemo.transition = settle;

const WitherModel: Page = () => (
  <Shell eyebrow="實作畫面 · 健康模型">
    <Heading>健康模型:WitherClassifier</Heading>
    <div style={{ marginTop: 30, display: 'flex', gap: 48, flex: 1, alignItems: 'center' }}>
      <div style={{ flex: '0 0 38%', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <p style={{ fontSize: 26, lineHeight: 1.5, color: muted, margin: 0 }}>
          判斷健康用的另一顆 Core ML 影像分類模型,與辨識模型獨立、共用同一批 tile。
        </p>
        <Point>型別 <Code>Image Classifier</Code>(Core ML),僅 <Code>17 KB</Code>,完全在裝置端推論</Point>
        <Point>兩個類別標籤:<Code>healthy</Code>、<Code>withered</Code>(健康／枯萎)</Point>
        <Point>以 <Code>Create ML 27.0.0</Code> 訓練,支援 iOS / macOS / visionOS</Point>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <img
          src={witherClassifierModel}
          alt="Xcode 中 WitherClassifier.mlmodel 的詳情頁"
          style={{ width: '100%', borderRadius: 'var(--osd-radius)', border: hairline, boxShadow: softShadow, display: 'block' }}
        />
        <span style={{ fontSize: 21, color: dim, lineHeight: 1.4 }}>
          Xcode:WitherClassifier.mlmodel 詳情(Image Classifier · 17 KB · 2 類標籤)
        </span>
      </div>
    </div>
  </Shell>
);

const CareAdvice: Page = () => (
  <Shell eyebrow="CV · On-Device LLM · WWDC26">
    <Heading>用 Foundation Models 生成照護建議</Heading>
    <p style={{ fontSize: 26, color: muted, lineHeight: 1.45, margin: '24px 0 0', maxWidth: 1480 }}>
      把辨識到的品種、枯萎程度與趨勢,交給 Apple 在 WWDC26 推出的 <Code>Foundation Models</Code> 框架,
      由完全在裝置端跑的大型語言模型,生成口語化、貼近當下狀況的照護建議。
    </p>
    <div style={{ marginTop: 30, display: 'flex', alignItems: 'center' }}>
      <Node tag="輸入 · 辨識結果" name="品種＋健康" role="plantID、枯萎比例與惡化／穩定／好轉趨勢" />
      <Flow label="送入 prompt" />
      <Node tag="ON-DEVICE LLM" name="LanguageModelSession" role="端側模型推論,不上傳雲端" />
      <Flow label="@Generable" />
      <Node tag="輸出 · 照護建議" name="結構化文字" role="澆水、光照、修剪等個人化建議" />
    </div>
    <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Point>端側推論,隱私、離線、零雲端成本;不需自備伺服器或 API 金鑰</Point>
      <Point><Code>@Generable</Code> 結構化輸出,生成內容直接對應資訊卡欄位,不必手動解析</Point>
      <Point>比固定的 <Code>WitherAdviceCatalog</Code> 更貼近實際狀況,也能用自然語言追問</Point>
    </div>
  </Shell>
);

const ARDivider: Page = () => (
  <SectionDivider
    part="Part II · Augmented Reality"
    title="擴增實境"
    sub="用 ARKit 追固定植株的 6DoF 位姿,把資訊卡穩定錨定在真實空間裡，這條流程完全在裝置端,不碰 Mac。"
  />
);
ARDivider.transition = settle;

const ObjectTracking: Page = () => (
  <Shell eyebrow="AR · Object Tracking">
    <Heading>裝置端自己決定位置與身分</Heading>
    <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Point>ARKit <Code>ObjectTrackingProvider</Code> 追預先建立的 <Code>.referenceobject</Code></Point>
      <Point>位置與身分都由「當下追到哪個物件」決定,給出 6DoF 位姿持續更新</Point>
      <Point>需要 world-sensing 授權與實機;模擬器退回 <Code>SyntheticPlantSceneView</Code></Point>
    </div>
  </Shell>
);

const PhoneFrame = ({ src, videoSrc, alt, island = true, sh = 664 }: { src?: string; videoSrc?: string; alt: string; island?: boolean; sh?: number }) => {
  const sw = Math.round(sh * 0.467);
  const pad = Math.max(9, Math.round(sh * 0.0195));
  const sr = Math.round(sh * 0.075);
  return (
    <div
      style={{
        width: sw + pad * 2,
        padding: pad,
        borderRadius: sr + pad,
        background: 'linear-gradient(150deg, #444946 0%, #2C302E 55%, #3A3F3C 100%)',
        boxShadow: '0 34px 64px -26px rgba(0,0,0,0.5), inset 0 0 0 2px rgba(255,255,255,0.07)',
        flexShrink: 0,
      }}
    >
      <div style={{ position: 'relative', width: sw, height: sh, borderRadius: sr, overflow: 'hidden', background: '#000' }}>
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            controls
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
        ) : (
          <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
        )}
        {island ? (
          <div
            style={{
              position: 'absolute',
              top: Math.round(sh * 0.022),
              left: '50%',
              transform: 'translateX(-50%)',
              width: Math.round(sw * 0.28),
              height: Math.round(sw * 0.082),
              background: '#000',
              borderRadius: 13,
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

// MacBook 外殼:固定 16:10 螢幕比例 + 深色邊框 + 銀色底座凹槽。sh = 螢幕高度。
const MacbookFrame = ({ src, alt, sh }: { src: string; alt: string; sh: number }) => {
  const sw = Math.round(sh * 1.6);
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
      <div
        style={{
          background: '#0C0D0E',
          borderRadius: 14,
          padding: 10,
          boxShadow: softShadow,
          border: '1px solid rgba(0,0,0,0.35)',
        }}
      >
        <div style={{ width: sw, height: sh, overflow: 'hidden', borderRadius: 5, background: '#0b0c0d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src={src}
            alt={alt}
            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }}
          />
        </div>
      </div>
      <div
        style={{
          position: 'relative',
          width: 'calc(100% + 30px)',
          height: 15,
          background: 'linear-gradient(180deg, #d8dadf 0%, #aeb2b8 55%, #979ba1 100%)',
          borderRadius: '0 0 11px 11px',
          boxShadow: '0 12px 20px -12px rgba(0,0,0,0.45)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 118,
            height: 8,
            background: '#bfc3c9',
            borderRadius: '0 0 7px 7px',
            boxShadow: 'inset 0 -2px 3px rgba(0,0,0,0.22)',
          }}
        />
      </div>
    </div>
  );
};

const ReferenceObject: Page = () => (
  <Shell eyebrow="AR · Reference Object">
    <Heading>掃描什麼、錨定什麼</Heading>
    <div style={{ marginTop: 14, display: 'flex', gap: 40, flex: 1, alignItems: 'center' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Steps>
          <StepRow n="01">用 Polycam 掃描馬纓丹整株(含花盆),匯出 USDZ</StepRow>
          <Step><StepRow n="02">整株輪廓明顯,直接以「花盆＋植株」作為追蹤目標</StepRow></Step>
          <Step><StepRow n="03">匯入 Reality Composer Pro,在模型上標出花、葉等部位錨點</StepRow></Step>
          <Step><StepRow n="04">作為 reference object 餵給 ARKit,穩定定位與顯示標籤</StepRow></Step>
        </Steps>
      </div>
      <div style={{ flex: '0 0 46%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <PhoneFrame src={polycamModel} alt="Polycam 掃描出的馬纓丹 3D 模型" island={false} sh={724} />
      </div>
    </div>
  </Shell>
);

const ModelStep = ({ n, t, d }: { n: string; t: string; d: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, background: surface, border: hairline, borderRadius: 20, boxShadow: softShadow, padding: '30px 36px' }}>
    <span style={{ fontFamily: MONO, fontSize: 18, color: 'var(--osd-accent)', letterSpacing: '0.12em' }}>STEP {n}</span>
    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 720 }}>{t}</span>
    <span style={{ fontSize: 24, color: muted, lineHeight: 1.45 }}>{d}</span>
  </div>
);

const VideoDemo: Page = () => (
  <Shell eyebrow="Demo · 製作 3D 模型">
    <Heading>用 Polycam 製作馬纓丹模型</Heading>
    <div style={{ marginTop: 18, flex: 1, display: 'flex', gap: 36, alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <ModelStep n="1" t="環繞拍攝" d="繞著馬纓丹多角度拍攝整株與花盆" />
        <ModelStep n="2" t="自動建模" d="Polycam 生成 3D 網格與材質" />
      </div>
      <PhoneFrame videoSrc={polycamDemo} alt="馬纓丹 Polycam 掃描影片" island={false} sh={660} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <ModelStep n="3" t="匯出 USDZ" d="取得標準 3D 模型檔" />
        <ModelStep n="4" t="用於追蹤" d="匯入 RCP、餵給 ARKit 追蹤" />
      </div>
    </div>
  </Shell>
);

const SpatialLabel: Page = () => (
  <Shell eyebrow="AR · Spatial Anchoring">
    <Heading>把空間標籤釘進真實空間</Heading>
    <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Point>在 <Code>ImmersiveSpace</Code> 內,把部位標籤錨在物件局部座標(來自 RCP 場景)</Point>
      <Point>新增可追蹤植物零程式碼:丟進 <Code>.referenceobject</Code> + 加一筆 profile 即可</Point>
      <Point><Code>frameCorrection</Code> 修整株固定偏移;形變漂移則修不了</Point>
    </div>
  </Shell>
);

const TermMap: Page = () => (
  <Shell eyebrow="Concepts → PlantVision">
    <Heading>用到的 CV / AR 技術</Heading>
    <div style={{ marginTop: 36 }}>
      <TermRow term="影像分類" en="Image Classification" where={<>Core ML 的 PlantClassifier 判品種、WitherClassifier 判健康</>} />
      <TermRow term="滑動視窗切塊" en="Sliding-Window Tiling" where={<>滿幀重疊 tile,涵蓋偏離中心、佔比很小的植株</>} />
      <TermRow term="投票聚合" en="Vote Aggregation" where={<>resolveScene 以票差 + 佐證 tile 數決定是否下判斷</>} />
      <TermRow term="時間濾波" en="Temporal Filtering" where={<>~0.7s 窗多數決 / 取平均,壓掉單幀閃爍</>} />
      <TermRow term="6DoF 物件追蹤" en="6DoF Object Tracking" where={<>ARKit ObjectTrackingProvider 追 reference object 位姿</>} />
      <TermRow term="空間錨定" en="Spatial Anchoring" where={<>ImmersiveSpace 內把標籤錨在花盆附近的世界座標</>} />
    </div>
  </Shell>
);

const IconBadge = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      width: 60,
      height: 60,
      borderRadius: 16,
      background: surfaceHi,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
    }}
  >
    {children}
  </span>
);

const svgProps = {
  width: 30,
  height: 30,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: '#3B8E44',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

const IconCamera = () => (
  <svg {...svgProps} aria-hidden>
    <path d="M3 8h3l1.5-2h7L16 8h5v11H3z" />
    <circle cx="12" cy="13" r="3.2" />
  </svg>
);
const IconLeaf = () => (
  <svg {...svgProps} aria-hidden>
    <path d="M5 19c8 0 14-5 14-14C8 5 5 11 5 19z" />
    <path d="M5 19 13 11" />
  </svg>
);
const IconData = () => (
  <svg {...svgProps} aria-hidden>
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
    <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
  </svg>
);
const IconWaves = () => (
  <svg {...svgProps} aria-hidden>
    <path d="M2 9c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
    <path d="M2 15c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
  </svg>
);

const ChallengeCard = ({ icon, title, body }: { icon: ReactNode; title: string; body: string }) => (
  <div
    style={{
      background: surface,
      border: hairline,
      borderRadius: 'var(--osd-radius)',
      boxShadow: softShadow,
      padding: '30px 34px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}
  >
    <IconBadge>{icon}</IconBadge>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 740, color: '#1E5E2E' }}>{title}</div>
    <div style={{ fontSize: 26, lineHeight: 1.5, color: muted }}>{body}</div>
  </div>
);

const Challenges: Page = () => (
  <Shell eyebrow="Challenges & Limits">
    <Heading>遇到的問題與取捨</Heading>
    <div style={{ marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26 }}>
      <ChallengeCard icon={<IconCamera />} title="取不到裝置相機" body="visionOS 基於隱私不開放 App 取用 Vision Pro 的主鏡頭與穿透影像;改由 Mac 鏡像擷取畫面跑 CV,代價是多一段網路延遲。" />
      <ChallengeCard icon={<IconLeaf />} title="葉片晃動變形" body="改追花盆 / 底座 / marker,而非會晃動的葉片。" />
      <ChallengeCard icon={<IconData />} title="枯萎樣本偏少" body="iNaturalist 多為開花株,需自行補拍實機樣本。" />
      <ChallengeCard icon={<IconWaves />} title="畫面會閃爍" body="用多幀投票加時間平滑穩定判斷;平手寧可回報不確定。" />
    </div>
  </Shell>
);

const DemoSpatial: Page = () => (
  <Shell eyebrow="實作畫面 · 掃描與錨點">
    <Heading>掃描 → 標記錨點</Heading>
    <div style={{ marginTop: 24, display: 'flex', gap: 28, alignItems: 'center', justifyContent: 'center' }}>
      <GalleryCard src={polycamLibrary} device="phone" sh={452} stageH={508} flex="0 0 auto" tag="POLYCAM" caption="掃描馬纓丹、天竺葵兩盆植株" />
      <span style={{ fontSize: 60, color: 'var(--osd-accent)', flexShrink: 0, paddingBottom: 56 }}>→</span>
      <GalleryCard src={rcpAnchor} device="mac" sh={430} stageH={508} flex="0 0 auto" tag="REALITY COMPOSER PRO" caption="在模型上佈署花、葉部位錨點" />
    </div>
  </Shell>
);

const DemoTracking: Page = () => (
  <Shell eyebrow="實作畫面 · 追蹤模型">
    <Heading>訓練出可追蹤的物件</Heading>
    <div style={{ marginTop: 30, display: 'flex', gap: 44, justifyContent: 'center', alignItems: 'flex-start' }}>
      <GalleryCard src={mlObjectTracking} device="mac" sh={460} stageH={520} tag="CREATE ML" caption="Object Tracking 模板:餵入掃描資料訓練" />
      <GalleryCard src={plantTracker} device="mac" sh={460} stageH={520} tag="REFERENCE OBJECT" caption="產出 PlantTracker.referenceobject:gravity-aligned、排除底面" />
    </div>
  </Shell>
);

const DemoRecognition: Page = () => (
  <Shell eyebrow="實作畫面 · 辨識與中繼">
    <Heading>影像分類與抽幀中繼</Heading>
    <div style={{ marginTop: 30, display: 'flex', gap: 44, justifyContent: 'center', alignItems: 'flex-start' }}>
      <GalleryCard
        src={mlClassifier}
        device="mac"
        sh={466}
        stageH={526}
        tag="CREATE ML"
        caption="PlantClassifier 訓練資料:馬纓丹 175、Background 175、天竺葵 114"
      />
      <GalleryCard
        src={macRelay}
        device="mac"
        sh={466}
        stageH={526}
        tag="MAC FRAME RELAY"
        caption="Mac 端抽幀、跑分類,經 Socket.IO 中繼送出"
      />
    </div>
  </Shell>
);

// 資料集統計表的一列(head=表頭、foot=合計)。
const DsRow = ({
  cells,
  head,
  foot,
}: {
  cells: [ReactNode, ReactNode, ReactNode, ReactNode, ReactNode];
  head?: boolean;
  foot?: boolean;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1.9fr 1fr 1fr 1fr 1fr',
      gap: 16,
      alignItems: 'center',
      padding: '20px 28px',
      borderTop: head ? 'none' : hairline,
      background: head || foot ? surfaceHi : 'transparent',
    }}
  >
    {cells.map((c, i) => (
      <span
        key={i}
        style={{
          fontFamily: i === 0 && !head ? 'var(--osd-font-display)' : MONO,
          fontSize: head ? 22 : 28,
          fontWeight: foot || (i === 0 && !head) ? 700 : 400,
          textAlign: i === 0 ? 'left' : 'right',
          color: head ? muted : 'var(--osd-text)',
          letterSpacing: head ? '0.06em' : 0,
        }}
      >
        {c}
      </span>
    ))}
  </div>
);

const Dataset: Page = () => (
  <Shell eyebrow="CV · 訓練資料集">
    <Heading>訓練資料集:三類、695 張</Heading>
    <p style={{ fontSize: 26, color: muted, lineHeight: 1.45, margin: '22px 0 0', maxWidth: 1480 }}>
      為了訓練 <Code>PlantClassifier</Code>,我們自建影像資料集,切成訓練 / 驗證 / 測試三組;含兩種目標植物與一個背景類。
    </p>
    <div style={{ marginTop: 26, background: surface, border: hairline, borderRadius: 'var(--osd-radius)', boxShadow: softShadow, overflow: 'hidden' }}>
      <DsRow head cells={['類別', '訓練', '驗證', '測試', '合計']} />
      <DsRow cells={[<>馬纓丹 <span style={{ fontFamily: MONO, fontSize: 19, color: dim }}>lantana-camara</span></>, '175', '35', '52', '262']} />
      <DsRow cells={[<>天竺葵 <span style={{ fontFamily: MONO, fontSize: 19, color: dim }}>pelargonium-hortorum</span></>, '114', '23', '34', '171']} />
      <DsRow cells={[<>背景 <span style={{ fontFamily: MONO, fontSize: 19, color: dim }}>background</span></>, '175', '35', '52', '262']} />
      <DsRow foot cells={['合計', '464', '93', '138', '695']} />
    </div>
    <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Point>三類:兩種目標植物(馬纓丹、天竺葵)＋ <Code>background</Code>(沒有目標植物,用來壓低誤報)</Point>
      <Point>自行拍攝建立,植物影像為 HEIF、背景為 JPG;依固定比例切訓練 / 驗證 / 測試</Point>
    </div>
  </Shell>
);

const ClassifierModel: Page = () => (
  <Shell eyebrow="實作畫面 · 辨識模型">
    <Heading>辨識模型:PlantClassifier</Heading>
    <div style={{ marginTop: 30, display: 'flex', gap: 48, flex: 1, alignItems: 'center' }}>
      <div style={{ flex: '0 0 38%', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <p style={{ fontSize: 26, lineHeight: 1.5, color: muted, margin: 0 }}>
          辨識用的就是這顆 Core ML 影像分類模型,在 Xcode 裡可直接檢視它的型別、大小與類別標籤。
        </p>
        <Point>型別 <Code>Image Classifier</Code>(Core ML),僅 <Code>13 KB</Code>,完全在裝置端推論</Point>
        <Point>三個類別標籤:<Code>background</Code>、<Code>lantana-camara</Code>、<Code>pelargonium-hortorum</Code></Point>
        <Point>以 <Code>Create ML 6.2</Code> 訓練,支援 iOS / macOS / visionOS 17+</Point>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <img
          src={plantClassifierModel}
          alt="Xcode 中 PlantClassifier.mlmodel 的詳情頁"
          style={{ width: '100%', borderRadius: 'var(--osd-radius)', border: hairline, boxShadow: softShadow, display: 'block' }}
        />
        <span style={{ fontSize: 21, color: dim, lineHeight: 1.4 }}>
          Xcode:PlantClassifier.mlmodel 詳情(Image Classifier · 13 KB · 3 類標籤)
        </span>
      </div>
    </div>
  </Shell>
);


const Closing: Page = () => (
  <div
    style={{
      ...fill,
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '0 140px',
    }}
  >
    <Glow />
    <div style={{ position: 'relative' }}>
      <Eyebrow>Takeaways</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 88,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          margin: '30px 0 44px',
        }}
      >
        三件值得帶走的事
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        <Steps>
          <Step><Point>CV 與 AR 拆成<Mark>兩條獨立流程</Mark>,各自能單獨壞掉與退場</Point></Step>
          <Step><Point><Mark>tile 投票 + 時間濾波</Mark>,把單幀雜訊收斂成穩定判斷</Point></Step>
          <Step><Point>追花盆而非葉片、<Mark>寧可回報不確定</Mark>,務實面對真實世界的限制</Point></Step>
        </Steps>
      </div>
      <div style={{ marginTop: 52, fontFamily: MONO, fontSize: 22, color: dim }}>
        蔡承曄 · 陳俊宇 · 曾柏諺　·　感謝聆聽
      </div>
    </div>
  </div>
);

const InfoCard: Page = () => (
  <Shell eyebrow="CV · Result & Info">
    <Heading>辨識結果 → 資訊卡</Heading>
    <div style={{ marginTop: 34, display: 'flex', gap: 48, flex: 1, alignItems: 'center' }}>
      <div style={{ flex: '0 0 42%', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <p style={{ fontSize: 26, lineHeight: 1.5, color: muted, margin: 0 }}>
          辨識出 <Code>plantID</Code> 後,對應本地植物資料庫,組出一張資訊卡;使用者可一鍵「加入歷史紀錄」。
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Point>顯示中文名、學名、科屬、形態特徵與照護建議</Point>
          <Point>辨識信心一併呈現;低於門檻就判定為 Background,不顯示資訊卡</Point>
          <Point>資料本地內建,relay 只傳 id + 信心,不傳整包資料</Point>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <img
          src={infoCardReal}
          alt="Vision Pro 上的植物資訊卡(馬纓丹)"
          style={{ width: '100%', borderRadius: 'var(--osd-radius)', border: hairline, boxShadow: softShadow, display: 'block' }}
        />
        <span style={{ fontSize: 21, color: dim, lineHeight: 1.4 }}>
          實機:Vision Pro 上的資訊卡(辨識 100% · 健康 · 枯萎 0%)
        </span>
      </div>
    </div>
  </Shell>
);

const RecognitionDemo: Page = () => (
  <Shell eyebrow="Demo · 即時辨識">
    <Heading>實機:即時辨識植物</Heading>
    <div style={{ marginTop: 24, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{ flex: 1, minHeight: 0, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video
          src={recognitionDemo}
          autoPlay
          loop
          muted
          playsInline
          controls
          style={{ maxWidth: '82%', maxHeight: '100%', borderRadius: 'var(--osd-radius)', border: hairline, boxShadow: softShadow, display: 'block', background: '#000' }}
        />
      </div>
      <span style={{ fontSize: 22, color: dim, lineHeight: 1.4 }}>
        實機錄影:Vision Pro 對準植株,即時辨識並彈出資訊卡。
      </span>
    </div>
  </Shell>
);

// ── 健康趨勢小卡 ──
const TrendChip = ({ arrow, label, modifier, color }: { arrow: string; label: string; modifier: string; color: string }) => (
  <div style={{ flex: 1, background: surface, border: hairline, borderRadius: 18, padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 8 }}>
    <span style={{ fontSize: 40, lineHeight: 1, color }}>{arrow}</span>
    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 28, fontWeight: 720 }}>{label}</span>
    <span style={{ fontSize: 22, color: muted, lineHeight: 1.4 }}>{modifier}</span>
  </div>
);

const History: Page = () => (
  <Shell eyebrow="App · History">
    <Heading>歷史紀錄</Heading>
    <div style={{ marginTop: 34, display: 'flex', gap: 48, flex: 1, alignItems: 'center' }}>
      <div style={{ flex: '0 0 42%', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <p style={{ fontSize: 26, lineHeight: 1.5, color: muted, margin: 0 }}>
          每次辨識可存進歷史,離線保存、隨時回顧整理。
        </p>
        <Point>記錄品種、學名、信心、來源與時間(<Code>PlantHistoryRecord</Code>)</Point>
        <Point>以 JSON 檔本地持久化(<Code>HistoryStore</Code>),重開仍在</Point>
        <Point><Code>HistoryView</Code> 清單呈現,可逐筆檢視與清除</Point>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <img
          src={historyReal}
          alt="Vision Pro 上的歷史紀錄視窗(天竺葵、馬纓丹各 100%)"
          style={{ width: '100%', borderRadius: 'var(--osd-radius)', border: hairline, boxShadow: softShadow, display: 'block' }}
        />
        <span style={{ fontSize: 21, color: dim, lineHeight: 1.4 }}>
          實機:Vision Pro 上的歷史紀錄(天竺葵、馬纓丹各 100% · 來源 Mac Relay)
        </span>
      </div>
    </div>
  </Shell>
);

export const meta: SlideMeta = {
  title: 'PlantVision · 電腦視覺與擴增實境期末報告',
  createdAt: '2026-06-17T08:24:19.553Z',
};

export const notes: (string | undefined)[] = [
  '大家好,我們這組的專題是 PlantVision,一個在 Apple Vision Pro 上的植物辨識應用。它結合電腦視覺和擴增實境:用相機認出植物、判斷健不健康,再把資訊直接顯示在你眼前的真實植株旁邊。組員是蔡承曄、陳俊宇、曾柏諺,今天由我們一起報告。',
  '先說明今天的順序。第一段講系統概觀,特別是我們最重要的一個設計決定。第二段講電腦視覺,也就是怎麼把畫面變成穩定的辨識結果。第三段講擴增實境,怎麼把資訊釘在空間裡。最後是歷史紀錄、技術對應跟實作畫面。',
  '先給大家一個整體印象。PlantVision 要做的,是把一株真實植物,變成 Vision Pro 裡會跟著它移動的空間資訊卡。整個系統其實分成兩條獨立的流程:一條負責「這是什麼植物、健不健康」,另一條負責「它在空間中的哪裡」。右邊這張圖,就是使用者戴上裝置實際看到的樣子。',
  '在講技術之前,先說為什麼要用 AR。照顧植物的時候,雙手其實常常都在忙—澆水、修剪、換盆,這時候很難再掏出手機拍照、翻 App 查資料。我們希望資訊直接浮在植株旁邊,免持、即時。所以情境有三個重點:第一,雙手在忙時不必掏手機;第二,資訊就在植株旁,視線不用在手機跟植物之間來回切換;第三,多盆植物時,辨識跟建議會直接釘在對應的那一株上,不會認錯盆。',
  '這頁是我們最關鍵的設計決定:把辨識和空間追蹤刻意拆開。辨識在 Mac 端跑 Core ML,決定是什麼植物、多枯萎;空間追蹤在裝置端用 ARKit,決定它在哪、是哪一株。好處是兩邊各自獨立:辨識壞掉不會影響定位,定位斷了也不影響辨識,整個系統更穩。',
  '在進入細節前,先講我們遇到的限制,這也解釋了後面為什麼這樣設計。第一,visionOS 基於隱私不開放 App 取用裝置相機,所以我們改用 Mac 鏡像擷取畫面來跑辨識。第二,葉片會晃、會變形,所以我們追花盆而不是葉片。第三,枯萎樣本很少,得自己補拍。第四,畫面會閃,用多幀投票加時間平滑解決。',
  '我們不是從零造輪子,而是站在 Apple 的框架上。ARKit 負責空間感知和物件追蹤,RealityKit 負責 3D 渲染與空間標籤,Vision 負責影像前處理,Core ML 負責在裝置端跑模型。我們做的,是把這四個能力組合起來。',
  '先深入講框架怎麼幫我們定位。ARKit 的 ObjectTrackingProvider 會一直吐出 ObjectAnchor,每個都帶一個四乘四的位姿矩陣 originFromAnchorTransform,同時表達位置跟旋轉,也就是六個自由度。我們的做法是:花跟葉的部位錨點是先在模型的物件座標系裡用公尺烘好的固定值,runtime 把整株標籤的 root 對齊到這個矩陣,部位錨點就跟著被變換到眼前的世界座標。另外,只有 isTracked 為真才更新位置,暫時追丟就先把標籤藏起來;位姿每幀會抖,我們用 alpha 0.25 的指數平滑壓掉,使用者鎖定時則直接凍結。',
  '再來是大小怎麼抓。重點是:尺度不是 runtime 即時估的,而是掃描跟訓練的時候就把真實世界大小烘進 referenceobject 了。ARKit 追到後,每個 anchor 都附一個以公尺為單位的 boundingBox,有 min、max 兩個對角、中心 center,還有長寬高 extent。我們把 reference object 設成 gravity-aligned、排除底面,桌上的盆栽就站得穩、不會顛倒。因為一切都是真實公尺,部位錨點直接落在正確的實體位置跟大小,不需要另外用相機估距離。第一次追到時我們會把 boundingBox 印出來,核對追蹤框跟模型框是不是同一個座標系;如果整片標籤一致偏移一個常數,就用 frameCorrection 補,但變形造成的飄移修不了。',
  '接下來進入第一大段:電腦視覺。這段的目標,是把一張張會抖動的畫面,收斂成一個穩定可信的辨識結果。流程是:抽幀、切成小塊分類、投票、時間平滑,最後分級。',
  '第一步是分類。我們不是只裁畫面正中間那一塊,因為植物常常只佔畫面一小角、又偏離中心。所以我們把整張畫面切成很多重疊的小方格,也就是 tile,每一塊各自送進模型分類。底下有 tile 的解釋。另外 Background 是一個保留標籤,代表這塊沒有植物。',
  '每塊 tile 都會投一票,我們再把這些票聚合成一個答案。看最高票跟第二名差多少、有幾塊互相佐證,夠明確才下判斷,不夠就回報不確定。這些門檻不是隨便設的,是拿真實截圖一張一張調出來的。',
  '就算單張畫面判對了,連續看還是會跳動。所以我們在大約 0.7 秒的時間窗內做多數決,把單幀的閃爍壓掉。如果票數平手,我們寧可顯示不確定,也不要硬猜一個錯的答案。',
  '辨識跟中繼這條線:左邊是 Create ML 的 PlantClassifier 訓練資料,有馬纓丹、天竺葵跟背景三類;右邊是我們的 Mac Frame Relay,負責抽幀、跑分類,再透過 Socket.IO 把結果送回 Vision Pro。',
  '辨識出植物之後,系統會用這個 plantID 去對應本地的植物資料庫,組出一張資訊卡。像這裡的馬纓丹,會顯示中文名、學名、科屬、形態特徵、照護建議,還有辨識信心。使用者可以一鍵把它加入歷史紀錄。這些資料是本地內建的,網路上只傳一個 id 跟信心值。',
  '辨識模型的訓練資料是我們自己建的,總共三個類別、六百九十五張:馬纓丹兩百六十二張、天竺葵一百七十一張,還有一個背景類兩百六十二張。背景類很重要,它代表畫面裡沒有目標植物,可以壓低誤報。每一類都再切成訓練、驗證、測試三組;植物是用 HEIF 拍的,背景則是 JPG。',
  '這是辨識用的模型本身,在 Xcode 裡打開 PlantClassifier.mlmodel 就能看到。它是一顆 Core ML 的影像分類器,只有 13KB,完全在裝置端跑;類別標籤剛好三類:background、lantana-camara、pelargonium-hortorum,對應背景、馬纓丹跟天竺葵。是用 Create ML 6.2 訓練出來的。',
  '這段是實機錄影,實際示範即時辨識:戴著 Vision Pro 對準植株,Mac 端抽幀跑分類,辨識結果穩定下來後,就在眼前彈出剛剛講的那張資訊卡。',
  '除了認出品種,我們還會判斷健康。我們把枯萎當成一個「面積比例」的問題:每塊 tile 判健康或枯萎,枯萎比例就是枯萎的塊數除以有植物的塊數,再分成四級。另外也會看時間上的趨勢,是在惡化、穩定還是好轉,給使用者更有用的提示。',
  '判斷健康用的就是這顆 WitherClassifier,在 Xcode 裡打開就能看到。它是一顆 Core ML 的影像分類器,只有 17KB,完全在裝置端跑;類別只有兩類:healthy 跟 withered,也就是健康和枯萎。是用 Create ML 27.0.0 訓練的,作者蔡承曄。',
  '這頁是實機畫面:資訊卡下半部就是剛剛講的健康判斷,可以看到枯萎面積比例、健康等級,還有狀況是惡化、穩定還是好轉的趨勢提示。',
  '判斷完健康之後,我們進一步用 Apple 在這次 WWDC26 推出的 Foundation Models 框架,生成照護建議。做法是把辨識到的品種、枯萎比例跟趨勢當成輸入,交給一個完全在裝置端跑的大型語言模型,用 LanguageModelSession 生成澆水、光照、修剪這類的建議。好處有三:第一,端側推論,隱私、離線、零雲端成本;第二,用 @Generable 拿到結構化輸出,直接對應資訊卡欄位;第三,比原本固定的 WitherAdviceCatalog 更貼近當下狀況,還能用自然語言追問。',
  '進入第二大段:擴增實境。這條流程完全在裝置端跑,不依賴 Mac。核心是用 ARKit 去追蹤固定那一株植物的位置和角度。',
  'ARKit 的 ObjectTrackingProvider 會去追我們事先建立好的參考物件。位置跟身分,都由當下追到哪個物件來決定,並持續更新它的六自由度位姿。這個功能需要實機跟空間感知權限,在模擬器上會退回我們做的合成場景。',
  '怎麼做出參考物件?我們用 Polycam 把整株馬纓丹連花盆掃描下來、匯出 USDZ;因為整株輪廓夠明顯,就直接拿花盆加植株當追蹤目標。再匯入 Reality Composer Pro,在模型上標出花、葉的部位錨點,最後餵給 ARKit。右邊就是我們真實掃出來的 3D 模型。',
  '這段影片是用 Polycam 製作馬纓丹模型的過程:環繞拍攝整株與花盆、Polycam 自動生成 3D 網格與材質,再匯出 USDZ,給後面的 ARKit 追蹤用。',
  '這是實作畫面的掃描與錨點:左邊用 Polycam 實際掃描馬纓丹跟天竺葵,右邊在 Reality Composer Pro 把花、葉的部位錨點標在模型上。',
  '接著訓練追蹤模型:用 Create ML 的 Object Tracking 模板餵入掃描資料,產出右邊這個 PlantTracker.referenceobject。它就是 ARKit 實際拿來追蹤的物件,設定成 gravity-aligned、排除底面,很適合放在桌上的盆栽。',
  '追到位置之後,我們在沉浸式空間裡,把部位標籤錨定在物件的局部座標上,這些座標來自剛剛的 Reality Composer Pro 場景。要新增一種可追蹤的植物幾乎不用寫程式,丟進參考物件、加一筆設定就好。如果整株有固定偏移,可以用 frameCorrection 校正。',
  '辨識過的植物會存進歷史紀錄,右邊就是實機畫面。每一筆會記錄品種、學名、信心、來源跟時間,像這裡天竺葵和馬纓丹都是 100%、來源是 Mac Relay。資料用 JSON 在本地保存,App 重開也還在,使用者可以在清單裡逐筆檢視,也可以一鍵清除。',
  '這頁把課堂上的電腦視覺跟擴增實境名詞,對應到我們實際用在哪裡,方便大家對照:影像分類、滑動視窗切塊、投票聚合、時間濾波,還有六自由度物件追蹤跟空間錨定。',
  '最後總結三點。第一,我們把辨識跟空間追蹤拆成兩條獨立流程,各自能單獨運作。第二,用 tile 投票加上時間平滑,把單幀的雜訊收斂成穩定的判斷。第三,我們很務實地面對真實世界的限制,像是追花盆而不是葉片、寧可說不確定。以上是我們的報告,謝謝大家。',
];

export default [
  Cover,
  Agenda,
  Overview,
  WhyAR,
  CoreDecision,
  Challenges,
  AppleStack,
  Positioning,
  Scale,
  CVDivider,
  TileVoting,
  Voting,
  Smoothing,
  DemoRecognition,
  InfoCard,
  Dataset,
  ClassifierModel,
  RecognitionDemo,
  Wither,
  WitherModel,
  WitherDemo,
  CareAdvice,
  ARDivider,
  ObjectTracking,
  ReferenceObject,
  VideoDemo,
  DemoSpatial,
  DemoTracking,
  SpatialLabel,
  History,
  TermMap,
  Closing,
] satisfies Page[];
