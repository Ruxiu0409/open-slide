import type { ReactNode } from 'react';
import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { Step, Steps, useSlidePageNumber } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#0B1310', text: '#ECF3EE', accent: '#5BE59A' },
  fonts: {
    display: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif',
    body: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, sans-serif',
  },
  typeScale: { hero: 164, body: 36 },
  radius: 26,
};

// 超出 DesignSystem 形狀的色彩 / 字體留作純常數。
const MONO = 'ui-monospace, "SF Mono", SFMono-Regular, Menlo, monospace';
const muted = '#86A394';
const dim = '#5C7567';
const amber = '#F2B14C';
const surface = 'rgba(255, 255, 255, 0.045)';
const surfaceHi = 'rgba(255, 255, 255, 0.075)';
const hairline = '1px solid rgba(255, 255, 255, 0.10)';
const softShadow = '0 30px 70px -30px rgba(0, 0, 0, 0.6)';

const fill = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
} as const;

// visionOS 風的柔光 — 每頁背景一抹植物綠輝光。
const Glow = () => (
  <div
    aria-hidden
    style={{
      position: 'absolute',
      inset: 0,
      background:
        'radial-gradient(900px 600px at 82% 12%, rgba(91,229,154,0.16), transparent 60%),' +
        'radial-gradient(700px 700px at 6% 96%, rgba(91,229,154,0.07), transparent 60%)',
      pointerEvents: 'none',
    }}
  />
);

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontFamily: MONO,
      fontSize: 22,
      letterSpacing: '0.26em',
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
      <span>PlantVision · visionOS</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Shell = ({
  eyebrow,
  children,
}: {
  eyebrow?: ReactNode;
  children: ReactNode;
}) => (
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
        padding: '104px 120px 120px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {eyebrow ? <div style={{ marginBottom: 36 }}><Eyebrow>{eyebrow}</Eyebrow></div> : null}
      {children}
    </div>
    <Footer />
  </div>
);

const Heading = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 68,
      fontWeight: 760,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      margin: 0,
    }}
  >
    {children}
  </h2>
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
        marginTop: 16,
        boxShadow: '0 0 16px rgba(91,229,154,0.5)',
      }}
    />
    <span style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.5, color: '#D6E4DB' }}>
      {children}
    </span>
  </div>
);

const Card = ({
  title,
  body,
  tag,
}: {
  title: ReactNode;
  body: ReactNode;
  tag?: ReactNode;
}) => (
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
      <span style={{ fontFamily: MONO, fontSize: 18, color: 'var(--osd-accent)', letterSpacing: '0.14em' }}>
        {tag}
      </span>
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

// ── 元件拓樸用的節點與箭頭 ──
const Node = ({ tag, name, role }: { tag: string; name: string; role: string }) => (
  <div
    style={{
      flex: 1,
      background: surface,
      border: hairline,
      borderRadius: 'var(--osd-radius)',
      boxShadow: softShadow,
      padding: '36px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      minHeight: 280,
      justifyContent: 'center',
    }}
  >
    <span style={{ fontFamily: MONO, fontSize: 17, color: 'var(--osd-accent)', letterSpacing: '0.16em' }}>{tag}</span>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 720, lineHeight: 1.15 }}>{name}</div>
    <div style={{ fontSize: 23, lineHeight: 1.45, color: muted }}>{role}</div>
  </div>
);

const Flow = ({ label }: { label: string }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '0 8px' }}>
    <span style={{ fontFamily: MONO, fontSize: 16, color: dim, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{label}</span>
    <span style={{ fontSize: 40, color: 'var(--osd-accent)', lineHeight: 1 }}>→</span>
  </div>
);

const StepRow = ({ n, children }: { n: string; children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 26, alignItems: 'center' }}>
    <span
      style={{
        fontFamily: MONO,
        fontSize: 22,
        color: 'var(--osd-accent)',
        border: hairline,
        borderRadius: 10,
        width: 52,
        height: 52,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        background: surface,
      }}
    >
      {n}
    </span>
    <span style={{ fontSize: 31, lineHeight: 1.4, color: '#D6E4DB' }}>{children}</span>
  </div>
);

// 枯萎分級的色帶。
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
      <Eyebrow>visionOS · Spatial Plant Intelligence</Eyebrow>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 820,
          lineHeight: 0.98,
          letterSpacing: '-0.03em',
          margin: '36px 0 28px',
        }}
      >
        PlantVision
      </h1>
      <p style={{ fontSize: 42, lineHeight: 1.45, color: muted, maxWidth: 1180, margin: 0 }}>
        三個跨網路協作的元件,把一株真實植物變成 Vision Pro 裡會跟著走的空間資訊。
        <br />
        一場關於架構取捨的拆解。
      </p>
    </div>
  </div>
);
Cover.transition = {
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

const Agenda: Page = () => (
  <Shell eyebrow="Agenda">
    <Heading>我們會走過這幾件事</Heading>
    <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 30 }}>
      <Point>系統的三個元件,以及它們為什麼不直連</Point>
      <Point>核心決定:辨識與空間追蹤是兩個獨立的身分來源</Point>
      <Point>Relay 端到端資料流、抽幀投票與時間平滑</Point>
      <Point>枯萎偵測模型,以及貫穿全案的工程哲學</Point>
    </div>
  </Shell>
);

const Topology: Page = () => (
  <Shell eyebrow="System Overview">
    <Heading>三個元件,只靠網路對話</Heading>
    <div style={{ marginTop: 64, display: 'flex', alignItems: 'stretch', gap: 4 }}>
      <Node tag="MAC" name="MacFrameRelay" role="擷取 Vision Pro 鏡像、跑 Core ML 分類、送出結果" />
      <Flow label="Socket.IO" />
      <Node tag="RELAY" name="SocketIORelayServer" role="Node.js 中繼,用配對碼把訊息路由到正確房間" />
      <Flow label="Socket.IO" />
      <Node tag="VISION" name="PlantVision" role="visionOS app:2D 視窗資訊 + 沉浸式部位標籤" />
    </div>
    <p style={{ marginTop: 48, fontSize: 28, color: muted, lineHeight: 1.5, maxWidth: 1400 }}>
      沒有任何裝置對裝置的直連——所有訊息都繞過中繼伺服器。
    </p>
  </Shell>
);

const WhyRelay: Page = () => (
  <Shell eyebrow="Design Rationale">
    <Heading>為什麼刻意不直連?</Heading>
    <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 30 }}>
      <Point>校園網路常封鎖 broadcast、mDNS 與 peer 連線——直連根本建不起來</Point>
      <Point>改用一台公開可達的 Socket.IO 中繼,雙方只要連得到它就能配對</Point>
      <Point>代價是多一跳延遲;換來的是「在任何網路下都能 demo」的可靠度</Point>
    </div>
  </Shell>
);

const TwoIdentities: Page = () => (
  <Shell eyebrow="The Central Decision">
    <Heading>兩個獨立的「身分」來源</Heading>
    <div style={{ marginTop: 56, display: 'flex', gap: 40 }}>
      <Card
        tag="RECOGNITION"
        title="Mac 中繼 → 2D 視窗"
        body="Mac 分類出 plantID,驅動視窗與詳情頁的內容。它決定『這是什麼植物』。"
      />
      <Card
        tag="SPATIAL TRACKING"
        title="裝置端 ARKit → 沉浸式標籤"
        body="ObjectTrackingProvider 從追到的 reference object 決定位置與身分,完全不依賴 Mac。"
      />
    </div>
    <p style={{ marginTop: 44, fontSize: 28, color: muted, lineHeight: 1.5 }}>
      <Code>tracking</Code> 管位置,<Code>recognition</Code> 管平面 UI 的身分。別把兩者耦合在一起。
    </p>
  </Shell>
);

const RecognitionPath: Page = () => (
  <Shell eyebrow="Path A · Recognition">
    <Heading>辨識:Mac 說了算,但可退場</Heading>
    <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 30 }}>
      <Point>Mac 分類一幀畫面,只送出 <Code>plantID</Code> 與信心值</Point>
      <Point><Code>PlantVisionModel</Code> 對應本地 <Code>PlantDatabase</Code>,驅動視窗 / 詳情頁</Point>
      <Point>Mac 沒送模型結果時,app 退回 demo 植物資料——永遠有東西可顯示</Point>
    </div>
  </Shell>
);

const SpatialPath: Page = () => (
  <Shell eyebrow="Path B · Spatial Tracking">
    <Heading>追蹤:裝置端自己決定一切</Heading>
    <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 30 }}>
      <Point>on-device ARKit <Code>ObjectTrackingProvider</Code> 追固定的 reference object</Point>
      <Point>位置與身分都由「當下追到哪個 .referenceobject」決定,不碰 Mac 中繼</Point>
      <Point>UI 錨在花盆 / 底座,不錨在會晃動變形的單片葉子上</Point>
    </div>
  </Shell>
);

const Pipeline: Page = () => (
  <Shell eyebrow="Relay Data Flow">
    <Heading>一幀畫面的端到端旅程</Heading>
    <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 22 }}>
      <Steps>
        <StepRow n="01">ScreenCaptureKit 每 ~0.1s 擷取一幀鏡像</StepRow>
        <Step><StepRow n="02">滑動重疊 tile 跑 PlantClassifier,resolveScene 聚合投票</StepRow></Step>
        <Step><StepRow n="03">TemporalLabelSmoother 在 ~0.7s 窗內多數決,壓掉單幀閃爍</StepRow></Step>
        <Step><StepRow n="04">Mac 送出 frameResult(plantID、confidence、尺寸、時間)</StepRow></Step>
        <Step><StepRow n="05">Relay 只轉給同房間的 vision 角色</StepRow></Step>
        <Step><StepRow n="06">手寫的極簡 Socket.IO 客戶端解析成 RelayFramePayload</StepRow></Step>
        <Step><StepRow n="07">decideDisplay 狀態機決定:忽略 / 保留 / 刷新 / 切換</StepRow></Step>
      </Steps>
    </div>
  </Shell>
);

const TileVoting: Page = () => (
  <Shell eyebrow="Classification">
    <Heading>不是一次中心裁切,而是滿幀投票</Heading>
    <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 30 }}>
      <Point>植物常只佔鏡像的一小塊、偏離中心——單一中心裁切會錯過</Point>
      <Point><Code>classifyScene</Code> 跑一整排重疊 tile,各自投票</Point>
      <Point><Code>resolveScene</Code> 用票差與佐證 tile 數聚合;不夠穩就回報不確定</Point>
    </div>
  </Shell>
);

const Smoothing: Page = () => (
  <Shell eyebrow="Temporal Smoothing">
    <Heading>用時間換掉閃爍</Heading>
    <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 30 }}>
      <Point><Code>TemporalLabelSmoother.record</Code> 在 ~0.7s 窗內做多數決</Point>
      <Point>平手時回報「不確定」,而不是硬猜一個答案</Point>
      <Point>門檻是拿真實截圖調出來的——別憑感覺亂改</Point>
    </div>
  </Shell>
);

const Pairing: Page = () => (
  <Shell eyebrow="Pairing Protocol">
    <Heading>配對:同一組碼才進得了房間</Heading>
    <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 30 }}>
      <Point>兩端都 emit <Code>join</Code>,帶 role(<Code>mac</Code> / <Code>vision</Code>)與配對碼</Point>
      <Point>房間是 <Code>pair:&lt;code&gt;</Code>;frameResult 只收 mac、只轉 vision</Point>
      <Point>預設碼 <Code>482913</Code>,預設中繼 <Code>http://127.0.0.1:8080</Code></Point>
    </div>
  </Shell>
);

const WitherIntro: Page = () => (
  <Shell eyebrow="Health Detection">
    <Heading>枯萎是「面積比例」,不是數幾塊</Heading>
    <p style={{ marginTop: 40, fontSize: 32, color: muted, lineHeight: 1.5, maxWidth: 1400 }}>
      第二個與辨識完全獨立的模型,共用同一批 tile;枯萎比例 = 枯萎 tile ÷(健康＋枯萎 tile),再分四級。
    </p>
    <div style={{ marginTop: 52, display: 'flex', gap: 24 }}>
      <Band range="< 10%" label="健康" color="#5BE59A" />
      <Band range="< 35%" label="輕微" color="#C8E06A" />
      <Band range="< 65%" label="中度" color={amber} />
      <Band range="≥ 65%" label="嚴重" color="#E2683E" />
    </div>
  </Shell>
);

const WitherPipeline: Page = () => (
  <Shell eyebrow="WitherClassifier">
    <Heading>各跑各的,只共用切好的 tile</Heading>
    <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 30 }}>
      <Point>每個 tile 判 <Code>healthy</Code> / <Code>withered</Code>;信心不足視為無植物</Point>
      <Point><Code>TemporalWitherSmoother</Code> 在時間窗內取平均(連續值,不用多數決)</Point>
      <Point>找不到模型時 Mac 只是不送枯萎欄位——向後相容,不影響辨識</Point>
    </div>
  </Shell>
);

const Philosophy: Page = () => (
  <Shell eyebrow="Engineering Conventions">
    <Heading>讓棘手邏輯可被單測</Heading>
    <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 30 }}>
      <Point>難判斷的決策抽成純靜態函式,獨立單元測試——這是反覆出現的刻意模式</Point>
      <Point>投票門檻都對著真實 held-out 截圖調過,有證據才改</Point>
      <Point>新增可追蹤植物零程式碼:丟進 .referenceobject + 加一筆 profile 即可</Point>
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
          fontSize: 96,
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          margin: '32px 0 48px',
        }}
      >
        三件值得帶走的事
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <Point>把識別與空間追蹤拆成兩個獨立來源,各自能單獨壞掉與退場</Point>
        <Point>用中繼換可靠度、用投票與平滑換穩定度——都是務實取捨</Point>
        <Point>純函式 + 真實資料調參,讓「魔法數字」變成可驗證的工程</Point>
      </div>
    </div>
  </div>
);

export const meta: SlideMeta = {
  title: 'PlantVision · 空間植物辨識架構拆解',
  createdAt: '2026-06-17T08:24:19.553Z',
};

export default [
  Cover,
  Agenda,
  Topology,
  WhyRelay,
  TwoIdentities,
  RecognitionPath,
  SpatialPath,
  Pipeline,
  TileVoting,
  Smoothing,
  Pairing,
  WitherIntro,
  WitherPipeline,
  Philosophy,
  Closing,
] satisfies Page[];
