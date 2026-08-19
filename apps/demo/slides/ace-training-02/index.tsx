import {
  type DesignSystem,
  ImagePlaceholder,
  type Page,
  type SlideMeta,
  type SlideTransition,
  Step,
  Steps,
  useSlidePageNumber,
} from '@open-slide/core';
import type { ReactNode } from 'react';

export const design: DesignSystem = {
  palette: { bg: '#0b0e11', text: '#eaecef', accent: '#fcd535' },
  fonts: {
    display:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang TC", "Noto Sans TC", Roboto, sans-serif',
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang TC", "Noto Sans TC", Roboto, sans-serif',
  },
  typeScale: { hero: 150, body: 36 },
  radius: 12,
};

// BinancePlex stand-in — every number on this deck renders tabular, per DESIGN.md.
const numeric = '"IBM Plex Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const surfaceCard = '#1e2329';
const surfaceElevated = '#2b3139';
const hairline = '#2b3139';
const muted = '#707a8a';
const mutedStrong = '#929aa5';
const onDark = '#ffffff';
const tradingUp = '#0ecb81';
const tradingDown = '#f6465d';

const PAD = 120;

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative',
  padding: PAD,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
} as const;

const num = {
  fontFamily: numeric,
  fontVariantNumeric: 'tabular-nums',
} as const;

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: PAD,
        right: PAD,
        bottom: 52,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 21,
        color: muted,
        letterSpacing: '0.08em',
      }}
    >
      <span>ACE CLUB · 幹部訓練 02</span>
      <span style={num}>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontSize: 25,
      fontWeight: 700,
      letterSpacing: '0.2em',
      color: 'var(--osd-accent)',
    }}
  >
    {children}
  </div>
);

const SectionTag = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      position: 'absolute',
      right: PAD,
      top: PAD,
      border: `1px solid ${hairline}`,
      borderRadius: 8,
      padding: '10px 20px',
      fontSize: 21,
      letterSpacing: '0.1em',
      color: mutedStrong,
    }}
  >
    {children}
  </div>
);

const Thesis = ({ children, size = 60 }: { children: ReactNode; size?: number }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      fontWeight: 700,
      letterSpacing: '-1.4px',
      lineHeight: 1.22,
      margin: '24px 0 0',
      color: onDark,
      maxWidth: 1560,
    }}
  >
    {children}
  </h2>
);

const Note = ({ children }: { children: ReactNode }) => (
  <p style={{ fontSize: 29, lineHeight: 1.6, color: mutedStrong, margin: 0 }}>{children}</p>
);

const Card = ({
  children,
  rule,
  width,
  pad = 34,
}: {
  children: ReactNode;
  rule?: string;
  width?: number | string;
  pad?: number;
}) => (
  <div
    style={{
      flex: width ? undefined : 1,
      width,
      background: surfaceCard,
      border: `1px solid ${hairline}`,
      borderTop: rule ? `3px solid ${rule}` : `1px solid ${hairline}`,
      borderRadius: 'var(--osd-radius)',
      padding: pad,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}
  >
    {children}
  </div>
);

const CardLabel = ({ children, tone }: { children: ReactNode; tone?: string }) => (
  <div style={{ ...num, fontSize: 23, fontWeight: 700, color: tone ?? 'var(--osd-accent)' }}>
    {children}
  </div>
);

const CardTitle = ({ children, size = 33 }: { children: ReactNode; size?: number }) => (
  <div style={{ fontSize: size, fontWeight: 700, color: onDark, lineHeight: 1.25 }}>{children}</div>
);

const CardBody = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 25, lineHeight: 1.55, color: muted }}>{children}</div>
);

const Row = ({
  children,
  gap = 26,
  top = 56,
}: {
  children: ReactNode;
  gap?: number;
  top?: number;
}) => <div style={{ display: 'flex', gap, marginTop: top, alignItems: 'stretch' }}>{children}</div>;

const Bullet = ({ children, tone }: { children: ReactNode; tone?: string }) => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
    <span style={{ fontSize: 22, color: tone ?? 'var(--osd-accent)', lineHeight: 1.6 }}>—</span>
    <span style={{ fontSize: 28, lineHeight: 1.55, color: 'var(--osd-text)' }}>{children}</span>
  </div>
);

const Divider = ({ chapter, title, sub }: { chapter: string; title: string; sub?: string }) => (
  <div style={{ ...fill, justifyContent: 'center' }}>
    <span style={{ ...num, fontSize: 30, fontWeight: 700, color: 'var(--osd-accent)' }}>
      {chapter}
    </span>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 108,
        fontWeight: 700,
        letterSpacing: '-3px',
        lineHeight: 1.1,
        margin: '28px 0 0',
        color: onDark,
      }}
    >
      {title}
    </h2>
    {sub ? (
      <p style={{ fontSize: 33, color: mutedStrong, marginTop: 32, marginBottom: 0 }}>{sub}</p>
    ) : null}
    <Footer />
  </div>
);

const Cover: Page = () => (
  <div style={{ ...fill, justifyContent: 'center' }}>
    <div
      style={{
        position: 'absolute',
        top: PAD,
        left: PAD,
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: '0.3em',
        color: 'var(--osd-accent)',
      }}
    >
      ACE CLUB
    </div>
    <SectionTag>40 分鐘</SectionTag>
    <div
      style={{
        ...num,
        position: 'absolute',
        right: PAD,
        top: 300,
        fontSize: 320,
        fontWeight: 700,
        lineHeight: 1,
        color: surfaceCard,
        letterSpacing: '-12px',
      }}
    >
      02
    </div>
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 34 }}>
      <Eyebrow>幹部訓練 · Idea to App</Eyebrow>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 700,
          letterSpacing: '-4px',
          lineHeight: 1.05,
          margin: 0,
          color: onDark,
        }}
      >
        從點子到 App 的最短路徑
      </h1>
      <p
        style={{
          fontSize: 'var(--osd-size-body)',
          lineHeight: 1.5,
          color: mutedStrong,
          margin: 0,
          maxWidth: 1200,
        }}
      >
        把模糊的想法，變成可以使用、測試、展示、上架的東西。
      </p>
    </div>
    <Footer />
  </div>
);

const RecapRow = ({ label, text }: { label: string; text: string }) => (
  <div style={{ display: 'flex', gap: 40, alignItems: 'baseline' }}>
    <span style={{ ...num, fontSize: 30, fontWeight: 700, color: tradingUp, width: 60 }}>
      {label}
    </span>
    <span style={{ fontSize: 40, lineHeight: 1.5, color: 'var(--osd-text)' }}>{text}</span>
  </div>
);

const Recap: Page = () => (
  <div style={fill}>
    <Eyebrow>Recap</Eyebrow>
    <SectionTag>幹部訓練 01</SectionTag>
    <Thesis>上次講到哪</Thesis>
    <Steps>
      <div style={{ height: 64 }} />
      <Step>
        <div style={{ marginBottom: 36 }}>
          <RecapRow label="01" text="先找到一個真的會痛的問題" />
        </div>
      </Step>
      <Step>
        <div style={{ marginBottom: 36 }}>
          <RecapRow label="02" text="想清楚為什麼是你來做這件事" />
        </div>
      </Step>
      <Step>
        <RecapRow label="03" text="挑一個名字，訂一個網域" />
      </Step>
    </Steps>
    <Footer />
  </div>
);

const HomeworkStat: Page = () => (
  <div style={{ ...fill, justifyContent: 'center' }}>
    <Eyebrow>回家作業</Eyebrow>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 48, marginTop: 40 }}>
      <span
        style={{
          ...num,
          fontSize: 280,
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: '-10px',
          color: 'var(--osd-accent)',
        }}
      >
        1
      </span>
      <span style={{ fontSize: 64, fontWeight: 700, color: onDark, letterSpacing: '-1px' }}>
        個真的有人在用的東西
      </span>
    </div>
    <p style={{ fontSize: 'var(--osd-size-body)', color: muted, marginTop: 56, marginBottom: 0 }}>
      開學前交。就這一個，不用多。
    </p>
    <Footer />
  </div>
);

const TheRealEnemy: Page = () => (
  <div style={fill}>
    <Eyebrow>Opening</Eyebrow>
    <SectionTag>問題</SectionTag>
    <Thesis>很多 App 不是卡在技術，而是卡在「下一步」。</Thesis>
    <Row>
      <Card>
        <CardLabel>01</CardLabel>
        <CardTitle>點子變太大</CardTitle>
        <CardBody>一開始就想做完整系統</CardBody>
      </Card>
      <Card>
        <CardLabel>02</CardLabel>
        <CardTitle>路徑太模糊</CardTitle>
        <CardBody>UI、資料、同步、登入一起想</CardBody>
      </Card>
      <Card>
        <CardLabel>03</CardLabel>
        <CardTitle>太晚看到結果</CardTitle>
        <CardBody>沒有 demo，也沒有真人 feedback</CardBody>
      </Card>
    </Row>
    <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Note>最大的敵人不是技術，而是範圍太大、路徑太模糊、太遲看到真實結果。</Note>
      <Note>最短路徑先找出：什麼體驗最能代表這個 App 的價值。</Note>
    </div>
    <Footer />
  </div>
);

const Divider6D: Page = () => (
  <Divider
    chapter="01"
    title="6D：從點子到 App"
    sub="Discover · Decide · Design · Develop · Deploy · Distribute"
  />
);

const DRow = ({
  label,
  name,
  zh,
  desc,
}: {
  label: string;
  name: string;
  zh: string;
  desc: string;
}) => (
  <div
    style={{
      display: 'flex',
      gap: 28,
      alignItems: 'baseline',
      paddingBottom: 18,
      borderBottom: `1px solid ${hairline}`,
    }}
  >
    <span style={{ ...num, fontSize: 22, fontWeight: 700, color: 'var(--osd-accent)', width: 52 }}>
      {label}
    </span>
    <span style={{ fontSize: 31, fontWeight: 700, color: onDark, width: 210 }}>{name}</span>
    <span style={{ fontSize: 27, fontWeight: 700, color: mutedStrong, width: 150 }}>{zh}</span>
    <span style={{ fontSize: 25, lineHeight: 1.5, color: muted }}>{desc}</span>
  </div>
);

const SixD: Page = () => (
  <div style={fill}>
    <Eyebrow>6D Framework</Eyebrow>
    <SectionTag>Framework</SectionTag>
    <Thesis>6D 是從 idea 到 App 的操作順序。</Thesis>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 52 }}>
      <DRow label="1D" name="Discover" zh="探索問題" desc="找到使用者、情境、痛點" />
      <DRow label="2D" name="Decide" zh="做出取捨" desc="選定最能代表價值的核心體驗" />
      <DRow label="3D" name="Design" zh="設計路徑" desc="把核心體驗收斂成一條主流程" />
      <DRow label="4D" name="Develop" zh="快速做出" desc="用 SwiftUI 與 AI 建出可互動版本" />
      <DRow label="5D" name="Deploy" zh="送去測試" desc="用 TestFlight 讓真人開始使用" />
      <DRow label="6D" name="Distribute" zh="取得回饋" desc="上架、分享、持續修正核心體驗" />
    </div>
    <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Note>6D 不是瀑布式流程，而是每次迭代都要問一次：現在最短的下一步是哪一個 D？</Note>
      <Note>最短路徑是縮短 Discover 到 Distribute 之間的距離。</Note>
    </div>
    <Footer />
  </div>
);

const SlotCard = ({ en, zh, ask }: { en: string; zh: string; ask: string }) => (
  <Card>
    <CardLabel>{en}</CardLabel>
    <CardTitle size={31}>{zh}</CardTitle>
    <CardBody>{ask}</CardBody>
  </Card>
);

const Discover: Page = () => (
  <div style={fill}>
    <Eyebrow>1D Discover</Eyebrow>
    <SectionTag>Discover</SectionTag>
    <Thesis>不要先寫功能列表；先用一句話定義 App。</Thesis>
    <Row>
      <SlotCard en="For" zh="target user" ask="幫誰？" />
      <SlotCard en="Who" zh="has this problem" ask="在哪個情境卡住？" />
      <SlotCard en="This app helps" zh="achieve this result" ask="完成什麼結果？" />
      <SlotCard en="By" zh="core interaction" ask="靠哪個互動做到？" />
    </Row>
    <Footer />
  </div>
);

const Fill = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      color: 'var(--osd-accent)',
      borderBottom: `2px solid ${surfaceElevated}`,
      padding: '0 10px',
    }}
  >
    {children}
  </span>
);

const DiscoverTemplate: Page = () => (
  <div style={fill}>
    <Eyebrow>1D Discover · 換你填</Eyebrow>
    <SectionTag>現場練習</SectionTag>
    <Thesis size={52}>把你的題目套進這四格。</Thesis>
    <div
      style={{
        marginTop: 56,
        fontSize: 38,
        lineHeight: 2.05,
        color: 'var(--osd-text)',
        maxWidth: 1600,
      }}
    >
      <div>
        <Fill>　　　　　　</Fill> 是給 <Fill>　　　　　　</Fill> 使用的 App。
      </div>
      <div>
        它解決 <Fill>　　　　　　　　</Fill> 的問題。
      </div>
      <div>
        使用者可以 <Fill>　　　　　　　　</Fill> ，
      </div>
      <div>
        核心互動是 <Fill>　　　　　　　　</Fill> 。
      </div>
    </div>
    <Footer />
  </div>
);

const DecideTrap: Page = () => (
  <div style={fill}>
    <Eyebrow>2D Decide</Eyebrow>
    <SectionTag>Decide</SectionTag>
    <Thesis>不要只找 MVP；找出 Core Experience。</Thesis>
    <Row>
      <Card rule={tradingDown} width={700}>
        <CardLabel tone={tradingDown}>MVP 的陷阱</CardLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 6 }}>
          <Bullet tone={muted}>新增 task</Bullet>
          <Bullet tone={muted}>編輯 / 刪除</Bullet>
          <Bullet tone={muted}>分類、Tag</Bullet>
          <Bullet tone={muted}>通知、設定</Bullet>
        </div>
        <div style={{ marginTop: 8 }}>
          <CardBody>功能少不一定代表價值清楚；它可能只是把大系統切小。</CardBody>
        </div>
      </Card>
      <Card rule={tradingUp}>
        <CardLabel tone={tradingUp}>Core Experience</CardLabel>
        <CardTitle size={36}>我一打開 App，就知道今天應該先做什麼。</CardTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 6 }}>
          <Bullet tone={tradingUp}>加入 task</Bullet>
          <Bullet tone={tradingUp}>出現在今日 agenda</Bullet>
          <Bullet tone={tradingUp}>和 calendar event 一起安排</Bullet>
          <Bullet tone={tradingUp}>快速調整今天的計劃</Bullet>
        </div>
      </Card>
    </Row>
    <Footer />
  </div>
);

const DecideScope: Page = () => (
  <div style={fill}>
    <Eyebrow>2D Decide</Eyebrow>
    <SectionTag>取捨</SectionTag>
    <Thesis>早期要用範圍換速度；不是用品質換速度。</Thesis>
    <Row>
      <Card rule={tradingDown}>
        <CardLabel tone={tradingDown}>先不要做</CardLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 6 }}>
          <Bullet tone={tradingDown}>複雜登入系統</Bullet>
          <Bullet tone={tradingDown}>完整後端與多平台同步</Bullet>
          <Bullet tone={tradingDown}>太完整的 design system</Bullet>
          <Bullet tone={tradingDown}>太早做 subscription</Bullet>
          <Bullet tone={tradingDown}>太早做 automation</Bullet>
        </div>
      </Card>
      <Card rule={tradingUp}>
        <CardLabel tone={tradingUp}>先做出來</CardLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 6 }}>
          <Bullet tone={tradingUp}>一個清楚的主畫面</Bullet>
          <Bullet tone={tradingUp}>一個主要操作流程</Bullet>
          <Bullet tone={tradingUp}>本地資料儲存</Bullet>
          <Bullet tone={tradingUp}>可以給朋友試用</Bullet>
          <Bullet tone={tradingUp}>可以錄 demo</Bullet>
        </div>
      </Card>
    </Row>
    <Footer />
  </div>
);

const ValueCard = ({ label, title, desc }: { label: string; title: string; desc: string }) => (
  <Card>
    <CardLabel>{label}</CardLabel>
    <CardTitle>{title}</CardTitle>
    <CardBody>{desc}</CardBody>
  </Card>
);

const DecideValues: Page = () => (
  <div style={fill}>
    <Eyebrow>2D Decide</Eyebrow>
    <SectionTag>核心價值</SectionTag>
    <Thesis>先定義核心價值，再決定設計方向。</Thesis>
    <Row>
      <ValueCard label="01" title="清楚" desc="一眼知道今天要做什麼" />
      <ValueCard label="02" title="快速" desc="操作不打斷思考" />
      <ValueCard label="03" title="簡潔" desc="只留下主要決策" />
      <ValueCard label="04" title="可靠" desc="每個狀態都值得信任" />
    </Row>
    <Footer />
  </div>
);

const DesignPage: Page = () => (
  <div style={fill}>
    <Eyebrow>3D Design</Eyebrow>
    <SectionTag>Design</SectionTag>
    <Thesis>Design 是把價值變成清楚好用的介面。</Thesis>
    <Row>
      <Card>
        <CardLabel>01</CardLabel>
        <CardTitle>資訊層級</CardTitle>
        <CardBody>今天最重要的內容要先被看到</CardBody>
      </Card>
      <Card>
        <CardLabel>02</CardLabel>
        <CardTitle>操作密度</CardTitle>
        <CardBody>主要動作要少、近、可預期</CardBody>
      </Card>
      <Card>
        <CardLabel>03</CardLabel>
        <CardTitle>狀態設計</CardTitle>
        <CardBody>空狀態、完成、拖曳後都有回饋</CardBody>
      </Card>
      <Card>
        <CardLabel>04</CardLabel>
        <CardTitle>產品感</CardTitle>
        <CardBody>文字、節奏、細節讓 App 被信任</CardBody>
      </Card>
    </Row>
    <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Note>UI/UX 的任務不是把所有功能塞進畫面，而是讓使用者一眼知道現在該做什麼。</Note>
      <Note>先設計主畫面重點、主要按鈕位置、輸入方式，以及完成後的回饋。</Note>
    </div>
    <Footer />
  </div>
);

const DesignUI: Page = () => (
  <div style={fill}>
    <Eyebrow>3D Design</Eyebrow>
    <SectionTag>UI</SectionTag>
    <Thesis>UI 目標：統一的設計系統</Thesis>
    <Row>
      <div style={{ width: 760, display: 'flex', flexDirection: 'column', gap: 26 }}>
        <Card>
          <CardLabel>01</CardLabel>
          <CardTitle>獨特且一致</CardTitle>
        </Card>
        <Card>
          <CardLabel>02</CardLabel>
          <CardTitle>一眼掌握</CardTitle>
        </Card>
        <Card>
          <CardLabel>03</CardLabel>
          <CardTitle>統一設計系統</CardTitle>
        </Card>
      </div>
      <div style={{ flex: 1, display: 'flex', gap: 26 }}>
        <ImagePlaceholder hint="設計參考板（Pinterest moodboard）" />
        <ImagePlaceholder hint="Logo 探索草稿" />
      </div>
    </Row>
    <Footer />
  </div>
);

const DesignUX: Page = () => (
  <div style={fill}>
    <Eyebrow>3D Design</Eyebrow>
    <SectionTag>UX</SectionTag>
    <Thesis>UX 目標：快速導航</Thesis>
    <Row>
      <Card>
        <CardLabel>01</CardLabel>
        <CardTitle size={38}>可以滑動瀏覽不同日期</CardTitle>
      </Card>
      <Card>
        <CardLabel>02</CardLabel>
        <CardTitle size={38}>可以在規劃器與專案之間快速切換</CardTitle>
      </Card>
    </Row>
    <Footer />
  </div>
);

const DevelopDemoFirst: Page = () => (
  <div style={fill}>
    <Eyebrow>4D Develop</Eyebrow>
    <SectionTag>Demo first</SectionTag>
    <Thesis>Develop 的目標：做出能展示、能試用、能迭代的 demo。</Thesis>
    <Row>
      <Card>
        <CardLabel>01</CardLabel>
        <CardTitle>做出主畫面</CardTitle>
        <CardBody>先讓人知道這個 App 是做什麼的</CardBody>
      </Card>
      <Card>
        <CardLabel>02</CardLabel>
        <CardTitle>跑完核心流程</CardTitle>
        <CardBody>從加入內容到看到結果都能走一次</CardBody>
      </Card>
      <Card>
        <CardLabel>03</CardLabel>
        <CardTitle>錄下 60 秒 demo</CardTitle>
        <CardBody>確認別人不用解釋也看得懂</CardBody>
      </Card>
      <Card>
        <CardLabel>04</CardLabel>
        <CardTitle>改下一版</CardTitle>
        <CardBody>每一輪只修最影響體驗的地方</CardBody>
      </Card>
    </Row>
    <div style={{ marginTop: 52, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Note>先讓核心體驗被看見。</Note>
      <Note>不是先把所有功能做完，而是做出一段可以操作、可以展示、可以得到回饋的主流程。</Note>
    </div>
    <Footer />
  </div>
);

const ToolChip = ({ name, does }: { name: string; does: string }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      border: `1px solid ${hairline}`,
      borderRadius: 'var(--osd-radius)',
      background: surfaceCard,
      padding: '28px 36px',
    }}
  >
    <span style={{ fontSize: 40, fontWeight: 700, color: onDark }}>{name}</span>
    <span style={{ fontSize: 25, color: muted }}>{does}</span>
  </div>
);

const DevelopTools: Page = () => (
  <div style={fill}>
    <Eyebrow>4D Develop</Eyebrow>
    <SectionTag>工具</SectionTag>
    <Thesis>Codex 或 Claude Code：把 demo 做出來。</Thesis>
    <div style={{ display: 'flex', gap: 26, marginTop: 56 }}>
      <ToolChip name="Codex" does="在既有專案裡分小步改、跑驗證" />
      <ToolChip name="Claude Code" does="讀懂整個 repo，一路做到能跑" />
    </div>
    <h3
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 88,
        fontWeight: 700,
        letterSpacing: '-2.4px',
        lineHeight: 1.12,
        margin: '64px 0 0',
        color: onDark,
      }}
    >
      AI writes. <span style={{ color: 'var(--osd-accent)' }}>You decide.</span>
    </h3>
    <div style={{ marginTop: 32 }}>
      <Note>挑一個用就好。你負責看結果、決定下一步，讓它加速你的每一次修改。</Note>
    </div>
    <Footer />
  </div>
);

const DevelopProduct: Page = () => (
  <div style={fill}>
    <Eyebrow>4D Develop</Eyebrow>
    <SectionTag>產品體驗</SectionTag>
    <Thesis size={52}>把 demo 變成看得見、摸得到的產品體驗。</Thesis>
    <div style={{ flex: 1, marginTop: 48, marginBottom: 96, display: 'flex' }}>
      <ImagePlaceholder hint="你的 App 實機畫面或 demo 錄影截圖" />
    </div>
    <Footer />
  </div>
);

const ChainStep = ({ label, text }: { label: string; text: string }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      flex: 1,
      paddingTop: 18,
      borderTop: `3px solid ${hairline}`,
    }}
  >
    <span style={{ ...num, fontSize: 21, fontWeight: 700, color: 'var(--osd-accent)' }}>
      {label}
    </span>
    <span style={{ fontSize: 28, fontWeight: 700, color: onDark, lineHeight: 1.3 }}>{text}</span>
  </div>
);

const Testing: Page = () => (
  <div style={fill}>
    <Eyebrow>5D 送測 → 6D 回饋</Eyebrow>
    <SectionTag>Deploy</SectionTag>
    <Thesis>可以被測試，比看起來完成更重要。</Thesis>
    <Row gap={22}>
      <ChainStep label="01" text="原型" />
      <ChainStep label="02" text="內部版本" />
      <ChainStep label="03" text="TestFlight" />
      <ChainStep label="04" text="5 位真實使用者" />
      <ChainStep label="05" text="回饋" />
      <ChainStep label="06" text="修正核心流程" />
    </Row>
    <div style={{ marginTop: 64, display: 'flex', alignItems: 'baseline', gap: 28 }}>
      <span style={{ fontSize: 23, letterSpacing: '0.18em', color: 'var(--osd-accent)' }}>
        原則
      </span>
      <span style={{ fontSize: 46, fontWeight: 700, color: onDark, letterSpacing: '-1px' }}>
        不要等完美才給人試。
      </span>
    </div>
    <div style={{ marginTop: 28 }}>
      <Note>早一點知道：這個東西有沒有真的幫到人。</Note>
    </div>
    <Footer />
  </div>
);

const Feedback: Page = () => (
  <div style={fill}>
    <Eyebrow>5D Deploy → 6D Distribute</Eyebrow>
    <SectionTag>回饋</SectionTag>
    <Thesis size={52}>收集真實使用者回饋，才知道下一步該改什麼。</Thesis>
    <div style={{ flex: 1, marginTop: 48, marginBottom: 96, display: 'flex' }}>
      <ImagePlaceholder hint="使用者回饋看板或訪談整理" />
    </div>
    <Footer />
  </div>
);

const Ship: Page = () => (
  <div style={fill}>
    <Eyebrow>5D 上架 → 6D 推廣</Eyebrow>
    <SectionTag>Distribute</SectionTag>
    <Thesis>正式上線不是結束；是把 App 送到更多人面前。</Thesis>
    <Row gap={22}>
      <ChainStep label="01" text="正式版本" />
      <ChainStep label="02" text="上傳到 App Store" />
      <ChainStep label="03" text="正式發佈" />
      <ChainStep label="04" text="推廣給更多受眾" />
      <ChainStep label="05" text="觀察反應" />
      <ChainStep label="06" text="改善產品" />
    </Row>
    <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <Note>上架：把版本送上去，讓任何人都能取得。</Note>
      <Note>推廣：觸及更廣的受眾，然後回到觀察與改善，再跑一輪。</Note>
    </div>
    <Footer />
  </div>
);

const Checklist: Page = () => (
  <div style={fill}>
    <Eyebrow>Closing checklist</Eyebrow>
    <SectionTag>自我檢查</SectionTag>
    <Thesis>用 6D 檢查你的 App 是否真的往前推進。</Thesis>
    <Row top={72}>
      <Card rule="var(--osd-accent)" pad={44}>
        <CardTitle size={46}>Can I demo it?</CardTitle>
        <div style={{ marginTop: 12 }}>
          <CardBody>如果不能展示，就還沒有完成 Develop。</CardBody>
        </div>
      </Card>
      <Card rule="var(--osd-accent)" pad={44}>
        <CardTitle size={46}>Can I learn from it?</CardTitle>
        <div style={{ marginTop: 12 }}>
          <CardBody>如果沒有真人回饋，就還沒有完成 Distribute。</CardBody>
        </div>
      </Card>
    </Row>
    <Footer />
  </div>
);

const Summary: Page = () => (
  <div style={fill}>
    <Eyebrow>重點總結</Eyebrow>
    <SectionTag>Closing</SectionTag>
    <Thesis>最短路徑不是最快寫完最多功能。</Thesis>
    <div style={{ marginTop: 40 }}>
      <Note>而是用 6D 讓你的點子變成一個真實的人可以使用、可以理解、可以給你回饋的 App。</Note>
    </div>
    <Row top={56}>
      <Card>
        <CardLabel>其他重點 01</CardLabel>
        <CardBody>每個點子都獨一無二，但影響力有高低；你需要用真實使用證明它。</CardBody>
      </Card>
      <Card>
        <CardLabel>其他重點 02</CardLabel>
        <CardBody>把 AI 當成學習助手，加速你的學習，讓你在產品開發上做出更好的判斷。</CardBody>
      </Card>
    </Row>
    <Footer />
  </div>
);

const OneLine: Page = () => (
  <div style={{ ...fill, justifyContent: 'center' }}>
    <Eyebrow>一句話總結</Eyebrow>
    <p
      style={{
        fontSize: 44,
        fontWeight: 700,
        lineHeight: 1.55,
        color: onDark,
        letterSpacing: '-0.8px',
        margin: '44px 0 0',
        maxWidth: 1620,
      }}
    >
      用 Discover、Decide、Design、Develop、Deploy、Distribute，把 App 點子拆成核心體驗，透過
      SwiftUI、AI 編碼流程和 TestFlight 回饋循環，走出從想法到真實 iOS App 的最短路徑。
    </p>
    <Footer />
  </div>
);

const DividerUs: Page = () => <Divider chapter="02" title="我們這學期怎麼跑" />;

const RoleRow = ({ label, title, desc }: { label: string; title: string; desc: string }) => (
  <div
    style={{
      display: 'flex',
      gap: 48,
      alignItems: 'baseline',
      paddingBottom: 32,
      borderBottom: `1px solid ${hairline}`,
    }}
  >
    <span style={{ ...num, fontSize: 28, fontWeight: 700, color: 'var(--osd-accent)', width: 60 }}>
      {label}
    </span>
    <span style={{ fontSize: 40, fontWeight: 700, color: onDark, width: 320 }}>{title}</span>
    <span style={{ fontSize: 30, lineHeight: 1.5, color: muted }}>{desc}</span>
  </div>
);

const Roles: Page = () => (
  <div style={fill}>
    <Eyebrow>分工</Eyebrow>
    <SectionTag>幹部</SectionTag>
    <Thesis>誰做什麼</Thesis>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginTop: 64 }}>
      <RoleRow label="01" title="決定方向" desc="決定要做什麼，更要決定不做什麼。" />
      <RoleRow label="02" title="做出東西" desc="讓它跑起來，能點開就贏一半。" />
      <RoleRow label="03" title="讓人知道" desc="沒人知道的好東西，等於不存在。" />
    </div>
    <Footer />
  </div>
);

const SlotRow = ({ time, text }: { time: string; text: string }) => (
  <div style={{ display: 'flex', gap: 48, alignItems: 'baseline' }}>
    <span style={{ ...num, fontSize: 44, fontWeight: 700, color: onDark, width: 180 }}>{time}</span>
    <span style={{ fontSize: 38, lineHeight: 1.5, color: mutedStrong }}>{text}</span>
  </div>
);

const Rhythm: Page = () => (
  <div style={fill}>
    <Eyebrow>每週四 · Thursday</Eyebrow>
    <SectionTag>節奏</SectionTag>
    <Thesis>社課只做三件事</Thesis>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 64 }}>
      <SlotRow time="15 min" text="上禮拜做完了什麼，卡在哪裡" />
      <SlotRow time="40 min" text="動手做，不開會" />
      <SlotRow time="05 min" text="說出下禮拜要交的東西" />
    </div>
    <Footer />
  </div>
);

const StuckRow = ({ when, then }: { when: string; then: string }) => (
  <div style={{ display: 'flex', gap: 32, alignItems: 'baseline' }}>
    <span style={{ fontSize: 38, fontWeight: 700, color: onDark, width: 300 }}>{when}</span>
    <span style={{ fontSize: 32, color: 'var(--osd-accent)' }}>→</span>
    <span style={{ fontSize: 34, lineHeight: 1.5, color: muted }}>{then}</span>
  </div>
);

const WhenStuck: Page = () => (
  <div style={fill}>
    <Eyebrow>卡住的時候</Eyebrow>
    <SectionTag>求救</SectionTag>
    <Thesis>先看你卡在哪一種</Thesis>
    <Steps>
      <div style={{ height: 72 }} />
      <Step>
        <div style={{ marginBottom: 44 }}>
          <StuckRow when="卡在技術" then="先問 AI，二十分鐘還是不會，再開口問人" />
        </div>
      </Step>
      <Step>
        <div style={{ marginBottom: 44 }}>
          <StuckRow when="卡在方向" then="回去問那三個真的會用的人" />
        </div>
      </Step>
      <Step>
        <StuckRow when="卡在沒動力" then="把範圍砍一半，做得完比做得大重要" />
      </Step>
    </Steps>
    <Footer />
  </div>
);

const Homework: Page = () => (
  <div style={fill}>
    <Eyebrow>下週要交的</Eyebrow>
    <SectionTag>Homework</SectionTag>
    <Thesis>三樣，缺一不可</Thesis>
    <Steps>
      <div style={{ height: 64 }} />
      <Step>
        <div style={{ marginBottom: 36 }}>
          <RecapRow label="01" text="一句話說清楚你在做什麼" />
        </div>
      </Step>
      <Step>
        <div style={{ marginBottom: 36 }}>
          <RecapRow label="02" text="三個會用的人的名字" />
        </div>
      </Step>
      <Step>
        <RecapRow label="03" text="一個現在就能點開的連結" />
      </Step>
    </Steps>
    <Footer />
  </div>
);

const Closing: Page = () => (
  <div style={{ ...fill, justifyContent: 'center' }}>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 150,
        fontWeight: 700,
        letterSpacing: '-4px',
        lineHeight: 1.05,
        margin: 0,
        color: onDark,
      }}
    >
      做完再說
    </h2>
    <p
      style={{
        fontSize: 'var(--osd-size-body)',
        color: 'var(--osd-accent)',
        marginTop: 40,
        marginBottom: 0,
      }}
    >
      下週四見。
    </p>
    <Footer />
  </div>
);

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

const sectionBreak: SlideTransition = {
  duration: 460,
  exit: { duration: 180, easing: EASE_IN, keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: {
    duration: 240,
    delay: 300,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(8px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

Divider6D.transition = sectionBreak;
DividerUs.transition = sectionBreak;

export const meta: SlideMeta = {
  title: 'ACE Club 幹部訓練 02 · 從點子到 App 的最短路徑',
  createdAt: '2026-08-19T06:15:08.662Z',
};

export default [
  Cover,
  Recap,
  HomeworkStat,
  TheRealEnemy,
  Divider6D,
  SixD,
  Discover,
  DiscoverTemplate,
  DecideTrap,
  DecideScope,
  DecideValues,
  DesignPage,
  DesignUI,
  DesignUX,
  DevelopDemoFirst,
  DevelopTools,
  DevelopProduct,
  Testing,
  Feedback,
  Ship,
  Checklist,
  Summary,
  OneLine,
  DividerUs,
  Roles,
  Rhythm,
  WhenStuck,
  Homework,
  Closing,
] satisfies Page[];
