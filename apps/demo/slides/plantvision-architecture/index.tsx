import type { CSSProperties, ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { ImagePlaceholder, Step, Steps, useSlidePageNumber } from '@open-slide/core';

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

// 水彩葉片 — 角落點綴,呼應淺色植物風。
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
    <div style={{ height: 3, width: '100%', background: 'var(--osd-accent)', opacity: 0.7, borderRadius: 2, marginTop: 16 }} />
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
    <span style={{ fontFamily: MONO, fontSize: 22, color: muted }}>{range}</span>
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
      <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 27, fontWeight: 700 }}>{term}</span>
      <span style={{ fontFamily: MONO, fontSize: 17, color: dim, letterSpacing: '0.04em' }}>{en}</span>
    </div>
    <span style={{ fontSize: 24, lineHeight: 1.45, color: muted }}>{where}</span>
  </div>
);

const RefRow = ({ tag, children }: { tag: string; children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 22, alignItems: 'baseline' }}>
    <span style={{ fontFamily: MONO, fontSize: 19, color: 'var(--osd-accent)', minWidth: 132, flexShrink: 0 }}>{tag}</span>
    <span style={{ fontSize: 25, lineHeight: 1.5, color: 'var(--osd-text)' }}>{children}</span>
  </div>
);

const DemoShot = ({ caption }: { caption: string }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
    <ImagePlaceholder hint={caption} height={360} />
    <span style={{ fontSize: 22, color: muted, lineHeight: 1.4 }}>{caption}</span>
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
          gap: 18,
          alignItems: 'center',
          fontFamily: MONO,
          fontSize: 24,
          color: 'var(--osd-text)',
        }}
      >
        <span style={{ color: dim, letterSpacing: '0.14em', fontSize: 19 }}>組員</span>
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

const Agenda: Page = () => (
  <Shell eyebrow="Agenda">
    <Heading>報告路線</Heading>
    <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', gap: 28 }}>
      <Point>系統概觀,以及核心決定:辨識(CV)與空間追蹤(AR)是兩條獨立管線</Point>
      <Point><span style={{ color: 'var(--osd-accent)' }}>電腦視覺</span>:tile 分類、投票聚合、時間平滑、枯萎健康偵測</Point>
      <Point><span style={{ color: sky }}>擴增實境</span>:物件追蹤、reference object 掃描、空間標籤錨定</Point>
      <Point>技術名詞對應、挑戰與限制、Demo 與參考文獻</Point>
    </div>
  </Shell>
);

const Overview: Page = () => (
  <Shell eyebrow="System Overview">
    <Heading>PlantVision 是什麼</Heading>
    <Lead>
      把一株真實植物,變成 Vision Pro 裡會跟著它的空間資訊卡。系統有兩條獨立管線——一條負責「這是什麼、健不健康」,
      一條負責「它在空間哪裡」。
    </Lead>
    <div style={{ marginTop: 44, display: 'flex', gap: 32 }}>
      <Card tag="電腦視覺 · CV" title="辨識植物與健康" body="Mac 端跑 Core ML,判植物品種與枯萎程度,送回 plantID 與枯萎等級。" />
      <Card tag="擴增實境 · AR" title="空間追蹤與標籤" body="裝置端 ARKit 追固定植株,把資訊 UI 錨定在它附近的空間裡。" />
    </div>
    <p style={{ marginTop: 36, fontSize: 24, color: dim, lineHeight: 1.5 }}>
      基礎建設:Mac 擷取畫面 → Socket.IO 中繼 → Vision Pro,三者只靠網路對話。
    </p>
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
      兩個身分來源各自能單獨壞掉與退場——CV 掛了不影響 AR 定位,反之亦然。
    </p>
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
      <Point>植物常只佔鏡像一小塊、又偏離中心——單一中心裁切會直接漏掉</Point>
      <Point><Code>classifyScene</Code> 對一整排重疊 tile 各跑一次 <Code>PlantClassifier</Code></Point>
      <Point>每個 tile 是獨立的影像分類;<Code>"background"</Code> 是保留標籤,代表「沒有植物」</Point>
    </div>
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
      <Point>平手時回報「不確定」,而不是硬猜——寧可不顯示,也不要顯示錯的</Point>
      <Point>抽幀約每 0.1s 一張,窗內累積約 7 幀再投票</Point>
    </div>
  </Shell>
);

const Wither: Page = () => (
  <Shell eyebrow="CV · Health Classification">
    <Heading>枯萎是「面積比例」,不是數幾塊</Heading>
    <Lead>
      第二個與辨識完全獨立的分類器,共用同一批 tile:每塊判 <Code>healthy</Code> / <Code>withered</Code>,
      枯萎比例 = 枯萎 ÷(健康＋枯萎),時間窗內取平均後分四級。
    </Lead>
    <div style={{ marginTop: 44, display: 'flex', gap: 24 }}>
      <Band range="< 10%" label="健康" color="#5BE59A" />
      <Band range="< 35%" label="輕微" color="#C8E06A" />
      <Band range="< 65%" label="中度" color={amber} />
      <Band range="≥ 65%" label="嚴重" color="#E2683E" />
    </div>
  </Shell>
);

const ARDivider: Page = () => (
  <SectionDivider
    part="Part II · Augmented Reality"
    title="擴增實境"
    sub="用 ARKit 追固定植株的 6DoF 位姿,把資訊卡穩定錨定在真實空間裡——這條管線完全在裝置端,不碰 Mac。"
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

const ReferenceObject: Page = () => (
  <Shell eyebrow="AR · Reference Object">
    <Heading>掃描什麼、錨定什麼</Heading>
    <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Steps>
        <StepRow n="01">用 iPhone 14 Pro Max 掃描目標,均勻光線、乾淨背景,匯出 USDZ</StepRow>
        <Step><StepRow n="02">優先追「花盆＋植株」;葉片晃動造成不穩就只追花盆</StepRow></Step>
        <Step><StepRow n="03">花盆太對稱,就貼一張 marker card 改用影像追蹤</StepRow></Step>
        <Step><StepRow n="04">永遠不要把 UI 錨在會晃動變形的單片葉子上</StepRow></Step>
      </Steps>
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

const Challenges: Page = () => (
  <Shell eyebrow="Challenges & Limits">
    <Heading>遇到的問題與取捨</Heading>
    <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 26 }}>
      <Point>取不到 Vision Pro 主鏡頭 → 改由 Mac 擷取鏡像跑 CV,代價是多一段網路延遲</Point>
      <Point>葉片晃動、遮擋、生長變形 → 追花盆 / 底座 / marker,而非葉片</Point>
      <Point>枯萎樣本偏少(iNaturalist 多是漂亮開花株)→ 需自行補拍實機取景樣本</Point>
      <Point>單幀分類會閃爍 → tile 投票 + 時間平滑;平手寧可回報不確定</Point>
    </div>
  </Shell>
);

const Demo: Page = () => (
  <Shell eyebrow="Demo">
    <Heading>實機畫面</Heading>
    <div style={{ marginTop: 44, display: 'flex', gap: 32 }}>
      <DemoShot caption="Vision Pro 沉浸式部位標籤錨在真實植株旁" />
      <DemoShot caption="2D 視窗:植物資訊 + 枯萎等級徽章" />
      <DemoShot caption="Mac relay：tile 分類與抽幀畫面" />
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
        <Point>追花盆而非葉片、寧可回報不確定——務實面對真實世界的限制</Point>
      </div>
      <div style={{ marginTop: 52, fontFamily: MONO, fontSize: 22, color: dim }}>
        蔡承曄 · 陳俊宇 · 曾柏諺　—　感謝聆聽
      </div>
    </div>
  </div>
);

export const meta: SlideMeta = {
  title: 'PlantVision · 電腦視覺與擴增實境期末報告',
  createdAt: '2026-06-17T08:24:19.553Z',
};

export default [
  Cover,
  Agenda,
  Overview,
  CoreDecision,
  CVDivider,
  TileVoting,
  Voting,
  Smoothing,
  Wither,
  ARDivider,
  ObjectTracking,
  ReferenceObject,
  SpatialLabel,
  TermMap,
  Challenges,
  Demo,
  References,
  Closing,
] satisfies Page[];
