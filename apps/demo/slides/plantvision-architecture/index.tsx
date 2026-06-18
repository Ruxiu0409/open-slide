import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { Step, Steps, useSlidePageNumber } from '@open-slide/core';
import userPreview from './assets/user-preview.jpg';
import polycamIcon from './assets/polycam-icon.jpg';
import polycamModel from './assets/polycam-model.jpg';
import polycamLibrary from './assets/polycam-library.jpg';
import mlObjectTracking from './assets/ml-objecttracking.jpg';
import macRelay from './assets/mac-relay.jpg';
import rcpAnchor from './assets/rcp-anchor.jpg';
import mlClassifier from './assets/ml-classifier.jpg';

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

const RefRow = ({ tag, children }: { tag: string; children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 22, alignItems: 'baseline' }}>
    <span style={{ fontFamily: MONO, fontSize: 19, color: 'var(--osd-accent)', minWidth: 132, flexShrink: 0 }}>{tag}</span>
    <span style={{ fontSize: 25, lineHeight: 1.5, color: 'var(--osd-text)' }}>{children}</span>
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
      <AgendaRow n="01" title="系統概觀" sub="核心決定:辨識(CV)與空間追蹤(AR)兩條獨立管線、Apple 框架" />
      <AgendaRow n="02" title={<span style={{ color: 'var(--osd-accent)' }}>電腦視覺</span>} sub="tile 分類、投票、時間平滑、資訊卡、枯萎程度與趨勢" />
      <AgendaRow n="03" title={<span style={{ color: sky }}>擴增實境</span>} sub="物件追蹤、reference object 掃描、空間標籤、3D 生長動畫" />
      <AgendaRow n="04" title="收尾" sub="歷史紀錄、技術對應、挑戰、實作畫面與參考文獻" />
    </div>
  </Shell>
);

const Overview: Page = () => (
  <Shell eyebrow="System Overview">
    <Heading>PlantVision 是什麼</Heading>
    <div style={{ marginTop: 34, display: 'flex', gap: 48, flex: 1, alignItems: 'center' }}>
      <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <p style={{ fontSize: 26, lineHeight: 1.5, color: muted, margin: 0 }}>
          把一株真實植物,變成 Vision Pro 裡會跟著它的空間資訊卡。系統分成兩條獨立管線:一條負責「這是什麼、健不健康」,一條負責「它在空間哪裡」。
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
          使用者透過 Vision Pro 即時辨識植物,並以空間標籤與 3D 生長動畫呈現。
        </span>
      </div>
    </div>
  </Shell>
);

const CoreDecision: Page = () => (
  <Shell eyebrow="The Central Decision">
    <Heading>辨識與追蹤,刻意解耦</Heading>
    <div style={{ marginTop: 48, display: 'flex', gap: 40 }}>
      <Card
        tag="RECOGNITION · CV"
        title="Mac 分類 → 2D 視窗"
        body="決定『是什麼植物、多枯萎』。沒有結果就退回 demo 資料,UI 永遠有東西顯示。"
      />
      <Card
        tag="SPATIAL TRACKING · AR"
        title="裝置端 ARKit → 沉浸式標籤"
        body="決定『它在哪、是哪一株』,只看當下追到的 reference object,完全不依賴 Mac。"
      />
    </div>
    <p style={{ marginTop: 40, fontSize: 27, color: muted, lineHeight: 1.5 }}>
      兩個身分來源各自能單獨壞掉與退場，CV 掛了不影響 AR 定位,反之亦然。
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
        use="顯示空間標籤與植物 3D 生長動畫。"
      />
      <FrameworkCard
        tag="影像分析 · IMAGE"
        name="Vision"
        gives="影像請求管線、前處理與特徵分析。"
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
      <Point>每個 tile 是獨立的影像分類;<Code>"background"</Code> 是保留標籤,代表「沒有植物」</Point>
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

const ARDivider: Page = () => (
  <SectionDivider
    part="Part II · Augmented Reality"
    title="擴增實境"
    sub="用 ARKit 追固定植株的 6DoF 位姿,把資訊卡穩定錨定在真實空間裡，這條管線完全在裝置端,不碰 Mac。"
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

const PhoneFrame = ({ src, alt, island = true, sh = 664 }: { src: string; alt: string; island?: boolean; sh?: number }) => {
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
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }} />
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
    <div style={{ marginTop: 22, display: 'flex', gap: 48, flex: 1, alignItems: 'center' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Steps>
          <StepRow n="01">用 Polycam 掃描馬纓丹整株(含花盆),匯出 USDZ</StepRow>
          <Step><StepRow n="02">整株輪廓明顯,直接以「花盆＋植株」作為追蹤目標</StepRow></Step>
          <Step><StepRow n="03">匯入 Reality Composer Pro,在模型上標出花、葉等部位錨點</StepRow></Step>
          <Step><StepRow n="04">作為 reference object 餵給 ARKit,穩定定位與顯示標籤</StepRow></Step>
        </Steps>
      </div>
      <div style={{ flex: '0 0 40%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
        <PhoneFrame src={polycamModel} alt="Polycam 掃描出的馬纓丹 3D 模型" island={false} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src={polycamIcon} alt="Polycam" style={{ width: 38, height: 38, borderRadius: 9, border: hairline }} />
          <span style={{ fontSize: 22, color: muted }}>Polycam 掃描的馬纓丹 3D 模型</span>
        </div>
      </div>
    </div>
  </Shell>
);

const SpatialLabel: Page = () => (
  <Shell eyebrow="AR · Spatial Anchoring">
    <Heading>把資訊卡釘進真實空間</Heading>
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
      <ChallengeCard icon={<IconCamera />} title="取不到頭顯相機" body="visionOS 基於隱私不開放 App 取用 Vision Pro 的主鏡頭與穿透影像;改由 Mac 鏡像擷取畫面跑 CV,代價是多一段網路延遲。" />
      <ChallengeCard icon={<IconLeaf />} title="葉片晃動變形" body="改追花盆 / 底座 / marker,而非會晃動的葉片。" />
      <ChallengeCard icon={<IconData />} title="枯萎樣本偏少" body="iNaturalist 多為開花株,需自行補拍實機樣本。" />
      <ChallengeCard icon={<IconWaves />} title="單幀分類閃爍" body="tile 投票 + 時間平滑;平手寧可回報不確定。" />
    </div>
  </Shell>
);

const DemoSpatial: Page = () => (
  <Shell eyebrow="實作畫面 · 空間追蹤管線">
    <Heading>掃描 → 錨點 → 追蹤模型</Heading>
    <div style={{ marginTop: 28, display: 'flex', gap: 28, alignItems: 'flex-start' }}>
      <GalleryCard src={polycamLibrary} device="phone" sh={406} stageH={456} flex="0 0 232px" tag="POLYCAM" caption="實際掃描:馬纓丹、天竺葵兩盆植株" />
      <GalleryCard src={rcpAnchor} device="mac" sh={398} stageH={456} tag="REALITY COMPOSER PRO" caption="PlantAnchor:在模型上佈署部位錨點" />
      <GalleryCard src={mlObjectTracking} device="mac" sh={398} stageH={456} tag="CREATE ML" caption="Object Tracking 模板訓練追蹤模型" />
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
        caption="PlantClassifier 訓練資料:馬纓丹 175、background 175、天竺葵 114"
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

const References: Page = () => (
  <Shell eyebrow="References">
    <Heading>參考文獻與來源</Heading>
    <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 22 }}>
      <RefRow tag="ARKit">Object Tracking / ObjectTrackingProvider、Reference Objects(Apple Developer)</RefRow>
      <RefRow tag="Core ML">Image Classification 模型整合與推論(Apple Developer)</RefRow>
      <RefRow tag="Create ML">影像分類訓練(CLI 與 Create ML.app)</RefRow>
      <RefRow tag="RealityKit">Reality Composer Pro:錨點場景與部位座標</RefRow>
      <RefRow tag="Dataset">iNaturalist 馬纓丹影像(CC 授權)作為枯萎分類素材</RefRow>
      <RefRow tag="Networking">Socket.IO v4 即時訊息中繼</RefRow>
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
        <Point>CV 與 AR 拆成兩條獨立管線,各自能單獨壞掉與退場</Point>
        <Point>tile 投票 + 時間濾波,把單幀雜訊收斂成穩定判斷</Point>
        <Point>追花盆而非葉片、寧可回報不確定，務實面對真實世界的限制</Point>
      </div>
      <div style={{ marginTop: 52, fontFamily: MONO, fontSize: 22, color: dim }}>
        蔡承曄 · 陳俊宇 · 曾柏諺　·　感謝聆聽
      </div>
    </div>
  </div>
);

// ── 資訊卡的 key/value 列 ──
const InfoRow = ({ k, v }: { k: string; v: ReactNode }) => (
  <div style={{ display: 'flex', gap: 16, padding: '13px 0', borderTop: hairline, alignItems: 'baseline' }}>
    <span style={{ fontFamily: MONO, fontSize: 19, color: 'var(--osd-accent)', minWidth: 76, flexShrink: 0 }}>{k}</span>
    <span style={{ fontSize: 25, lineHeight: 1.45, color: 'var(--osd-text)' }}>{v}</span>
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
          <Point>辨識信心一併呈現;低於門檻時退回 demo 資料</Point>
          <Point>資料本地內建,relay 只傳 id + 信心,不傳整包資料</Point>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          background: surface,
          border: hairline,
          borderRadius: 'var(--osd-radius)',
          boxShadow: softShadow,
          padding: '30px 38px 34px',
        }}
      >
        <span style={{ fontFamily: MONO, fontSize: 18, color: 'var(--osd-accent)', letterSpacing: '0.14em' }}>辨識結果</span>
        <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 40, fontWeight: 800, color: '#1E5E2E', margin: '8px 0 6px' }}>馬纓丹</div>
        <div style={{ marginTop: 8 }}>
          <InfoRow k="學名" v="Lantana camara" />
          <InfoRow k="科屬" v="馬鞭草科 Verbenaceae" />
          <InfoRow k="形態" v="莖方形具逆刺、葉對生卵形粗糙、密集繖形花序" />
          <InfoRow k="照護" v="喜全日照與高溫、耐旱排水佳、花後修剪、全株含毒勿食" />
          <InfoRow k="信心" v={<span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>90%</span>} />
        </div>
      </div>
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

// ── 生長階段卡 ──
const StageCard = ({ pct, name, color }: { pct: string; name: string; color: string }) => (
  <div style={{ flex: 1, background: surface, border: hairline, borderRadius: 18, boxShadow: softShadow, padding: '26px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
    <span style={{ width: 46, height: 46, borderRadius: 12, background: color, boxShadow: `0 0 22px ${color}55` }} />
    <span style={{ fontFamily: MONO, fontSize: 24, color: muted }}>{pct}</span>
    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 720 }}>{name}</span>
  </div>
);

const Growth: Page = () => (
  <Shell eyebrow="AR · 3D Growth Animation">
    <Heading>3D 生長動畫:發芽到成熟</Heading>
    <div style={{ marginTop: 32, display: 'flex', gap: 22 }}>
      <StageCard pct="20%" name="發芽" color="#BFE0AE" />
      <StageCard pct="48%" name="長葉" color="#8FD08A" />
      <StageCard pct="74%" name="開花" color="#57B36A" />
      <StageCard pct="100%" name="成熟" color="#2E7D32" />
    </div>
    <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Point>RealityKit 程式生成各階段模型(花盆、莖、葉、花),不需外部 3D 檔</Point>
      <Point>以 <Code>scale</Code> / <Code>opacity</Code> / <Code>position</Code> 內插:莖 y 由 0.25 長到 1.0、葉漸進淡入、花於開花後才出現</Point>
      <Point>使用者用手勢控制播放、暫停、切換階段與重播(<Code>GrowthView</Code>)</Point>
    </div>
  </Shell>
);

// ── 歷史紀錄列 ──
const HistoryRow = ({ name, sci, conf, when }: { name: string; sci: string; conf: string; when: string }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '17px 0', borderTop: hairline }}>
    <span>
      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 27, fontWeight: 720, color: '#1E5E2E' }}>{name}</span>
      <span style={{ fontSize: 21, color: dim, fontStyle: 'italic', marginLeft: 12 }}>{sci}</span>
    </span>
    <span style={{ fontFamily: MONO, fontSize: 21, color: muted }}>
      <span style={{ color: 'var(--osd-accent)' }}>{conf}</span> · {when}
    </span>
  </div>
);

const History: Page = () => (
  <Shell eyebrow="App · History">
    <Heading>歷史紀錄</Heading>
    <div style={{ marginTop: 34, display: 'flex', gap: 48, flex: 1, alignItems: 'center' }}>
      <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <p style={{ fontSize: 26, lineHeight: 1.5, color: muted, margin: 0 }}>
          每次辨識可存進歷史,離線保存、隨時回顧整理。
        </p>
        <Point>記錄品種、學名、信心、來源與時間(<Code>PlantHistoryRecord</Code>)</Point>
        <Point>以 JSON 檔本地持久化(<Code>HistoryStore</Code>),重開仍在</Point>
        <Point><Code>HistoryView</Code> 清單呈現,可逐筆檢視與清除</Point>
      </div>
      <div
        style={{
          flex: 1,
          background: surface,
          border: hairline,
          borderRadius: 'var(--osd-radius)',
          boxShadow: softShadow,
          padding: '14px 36px 28px',
        }}
      >
        <HistoryRow name="馬纓丹" sci="Lantana camara" conf="90%" when="今天 17:45" />
        <HistoryRow name="天竺葵" sci="Pelargonium × hortorum" conf="92%" when="今天 16:20" />
        <HistoryRow name="馬纓丹" sci="Lantana camara" conf="88%" when="昨天 10:08" />
      </div>
    </div>
  </Shell>
);

export const meta: SlideMeta = {
  title: 'PlantVision · 電腦視覺與擴增實境期末報告',
  createdAt: '2026-06-17T08:24:19.553Z',
};

export const notes: (string | undefined)[] = [
  '開場:我們做的是 PlantVision,一個在 Apple Vision Pro 上的植物辨識 App,結合電腦視覺與擴增實境。組員介紹。',
  '報告分四段:系統概觀、電腦視覺、擴增實境,最後收尾。先講為什麼把辨識和空間追蹤拆開。',
  'PlantVision 把真實植物變成會跟著它的空間資訊卡。系統有兩條獨立管線:一條管「是什麼、健不健康」,一條管「它在空間哪裡」。右圖是使用者實際看到的畫面。',
  '核心設計:辨識(CV)在 Mac 端跑、空間追蹤(AR)在裝置端跑,兩者刻意解耦,任一邊壞掉另一邊照常運作。',
  '整個系統站在 Apple 的四個框架上:ARKit 管空間追蹤、RealityKit 管 3D 與標籤、Vision 管影像前處理、Core ML 跑模型。我們是組合既有能力,不是從零造。',
  '進入第一段:電腦視覺。流程是抽幀→tile 分類→投票→時間平滑→分級。',
  '關鍵做法:不是只裁中間一塊,而是把整幀切成很多重疊小塊(tile)各自分類,因為植物常偏離中心。底下有 tile 的名詞解釋。',
  '每塊 tile 投票,看最高票和次高票差多少、有幾塊佐證,夠穩才下判斷,否則回報不確定。門檻是用真實截圖調出來的。',
  '單幀會抖,所以在約 0.7 秒的時間窗做多數決壓掉閃爍;平手時寧可說不確定,也不要顯示錯的。',
  '辨識完成後對應本地植物資料庫,組出資訊卡:中文名、學名、科屬、形態、照護、信心。這裡用我們實際辨識的馬纓丹當例子,可一鍵加入歷史。',
  '健康偵測:用第二個分類器,把枯萎當成「面積比例」問題分四級;再用時間窗判斷在惡化、好轉還是穩定,給使用者趨勢提示。',
  '進入第二段:擴增實境。這條管線完全在裝置端,用 ARKit 追植株的 6DoF 位姿。',
  '裝置端自己決定位置和身分,只看當下追到哪個 reference object,不依賴 Mac。需要實機與 world-sensing 權限。',
  '怎麼做出 reference object:用 Polycam 掃描整株馬纓丹含花盆、匯出 USDZ,匯入 Reality Composer Pro 標部位錨點,再餵給 ARKit。右邊是我們真實掃出來的 3D 模型。',
  '追到位姿後,在 ImmersiveSpace 把部位標籤錨在物件局部座標。新增植物幾乎零程式碼,丟模型 + 加一筆 profile 即可。',
  '另一個 RealityKit 應用:3D 生長動畫,從發芽、長葉、開花到成熟四階段,用程式生成模型加 scale/opacity 內插,使用者可手勢控制播放。',
  '辨識過的植物會存進歷史紀錄,本地 JSON 持久化,可隨時回顧與清除。',
  '把用到的 CV / AR 技術名詞對應到我們的實作,方便對照課程內容。',
  '遇到的四個主要問題與取捨:拿不到主鏡頭、葉片晃動、樣本偏少、單幀閃爍,各自怎麼解。',
  '實作畫面(一)空間追蹤管線:Polycam 掃描、Reality Composer Pro 佈錨點、Create ML 訓練 Object Tracking 模型。',
  '實作畫面(二)辨識與中繼:Create ML 的 PlantClassifier 訓練資料(馬纓丹/background/天竺葵),以及 Mac 端抽幀經 Socket.IO 中繼。',
  '參考用到的 Apple 框架文件與資料來源。',
  '總結三點:CV 與 AR 解耦、tile 投票加時間平滑收斂雜訊、務實面對真實限制。謝謝聆聽。',
];

export default [
  Cover,
  Agenda,
  Overview,
  CoreDecision,
  AppleStack,
  CVDivider,
  TileVoting,
  Voting,
  Smoothing,
  InfoCard,
  Wither,
  ARDivider,
  ObjectTracking,
  ReferenceObject,
  SpatialLabel,
  Growth,
  History,
  TermMap,
  Challenges,
  DemoSpatial,
  DemoRecognition,
  References,
  Closing,
] satisfies Page[];
