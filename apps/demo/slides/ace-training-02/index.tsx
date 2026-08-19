import {
  type DesignSystem,
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
        bottom: 54,
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
      letterSpacing: '0.22em',
      color: 'var(--osd-accent)',
      textTransform: 'uppercase',
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

const Thesis = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 60,
      fontWeight: 700,
      letterSpacing: '-1.4px',
      lineHeight: 1.22,
      margin: '28px 0 0',
      color: onDark,
      maxWidth: 1500,
    }}
  >
    {children}
  </h2>
);

const Lede = ({ children }: { children: ReactNode }) => (
  <p style={{ fontSize: 32, lineHeight: 1.6, color: mutedStrong, margin: 0, maxWidth: 760 }}>
    {children}
  </p>
);

const Card = ({
  children,
  rule,
  width,
}: {
  children: ReactNode;
  rule?: string;
  width?: number | string;
}) => (
  <div
    style={{
      flex: width ? undefined : 1,
      width,
      background: surfaceCard,
      border: `1px solid ${hairline}`,
      borderTop: rule ? `3px solid ${rule}` : `1px solid ${hairline}`,
      borderRadius: 'var(--osd-radius)',
      padding: 36,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}
  >
    {children}
  </div>
);

const CardLabel = ({ children, tone }: { children: ReactNode; tone?: string }) => (
  <div style={{ ...num, fontSize: 24, fontWeight: 700, color: tone ?? 'var(--osd-accent)' }}>
    {children}
  </div>
);

const CardTitle = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 34, fontWeight: 700, color: onDark, lineHeight: 1.25 }}>{children}</div>
);

const CardBody = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 26, lineHeight: 1.6, color: muted }}>{children}</div>
);

const Row = ({ children, gap = 28 }: { children: ReactNode; gap?: number }) => (
  <div style={{ display: 'flex', gap, marginTop: 64, alignItems: 'stretch' }}>{children}</div>
);

const Bullet = ({ children, tone }: { children: ReactNode; tone?: string }) => (
  <div style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
    <span style={{ fontSize: 24, color: tone ?? 'var(--osd-accent)', lineHeight: 1.6 }}>—</span>
    <span style={{ fontSize: 29, lineHeight: 1.6, color: 'var(--osd-text)' }}>{children}</span>
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
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 36 }}>
      <Eyebrow>幹部訓練 · Officer Training</Eyebrow>
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
        從點子到上線的最短路徑
      </h1>
      <p
        style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.5, color: mutedStrong, margin: 0 }}
      >
        把模糊的想法，變成可以使用、測試、展示的東西。
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
    <Thesis>很多東西不是卡在技術，而是卡在「下一步」。</Thesis>
    <Row>
      <Card>
        <CardLabel>01</CardLabel>
        <CardTitle>點子變太大</CardTitle>
        <CardBody>一開始就想做完整系統</CardBody>
      </Card>
      <Card>
        <CardLabel>02</CardLabel>
        <CardTitle>路徑太模糊</CardTitle>
        <CardBody>畫面、資料、登入、同步一起想</CardBody>
      </Card>
      <Card>
        <CardLabel>03</CardLabel>
        <CardTitle>太晚看到結果</CardTitle>
        <CardBody>沒有 demo，也沒有真人回饋</CardBody>
      </Card>
    </Row>
    <p
      style={{ fontSize: 30, lineHeight: 1.6, color: mutedStrong, marginTop: 56, marginBottom: 0 }}
    >
      最短路徑先找出：什麼體驗最能代表這個東西的價值。
    </p>
    <Footer />
  </div>
);

const Divider6D: Page = () => (
  <div style={{ ...fill, justifyContent: 'center' }}>
    <span style={{ ...num, fontSize: 30, fontWeight: 700, color: 'var(--osd-accent)' }}>01</span>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 110,
        fontWeight: 700,
        letterSpacing: '-3px',
        lineHeight: 1.1,
        margin: '28px 0 0',
        color: onDark,
      }}
    >
      6D：從點子到上線
    </h2>
    <p style={{ fontSize: 34, color: mutedStrong, marginTop: 36, marginBottom: 0 }}>
      Discover · Decide · Design · Develop · Deploy · Distribute
    </p>
    <Footer />
  </div>
);

const DStep = ({ label, name, desc }: { label: string; name: string; desc: string }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      flex: 1,
      paddingTop: 20,
      borderTop: `3px solid ${hairline}`,
    }}
  >
    <span style={{ ...num, fontSize: 22, fontWeight: 700, color: 'var(--osd-accent)' }}>
      {label}
    </span>
    <span style={{ fontSize: 30, fontWeight: 700, color: onDark }}>{name}</span>
    <span style={{ fontSize: 24, lineHeight: 1.55, color: muted }}>{desc}</span>
  </div>
);

const SixD: Page = () => (
  <div style={fill}>
    <Eyebrow>Framework</Eyebrow>
    <SectionTag>6D</SectionTag>
    <Thesis>6D 是從點子到上線的操作順序。</Thesis>
    <Row gap={24}>
      <DStep label="1D" name="Discover" desc="用一句話定義它" />
      <DStep label="2D" name="Decide" desc="找出核心體驗" />
      <DStep label="3D" name="Design" desc="把價值變成介面" />
      <DStep label="4D" name="Develop" desc="做出能展示的 demo" />
      <DStep label="5D" name="Deploy" desc="送到真人手上" />
      <DStep label="6D" name="Distribute" desc="收回饋再改" />
    </Row>
    <p
      style={{ fontSize: 30, lineHeight: 1.6, color: mutedStrong, marginTop: 64, marginBottom: 0 }}
    >
      6D 不是一路走到底的流程，而是每一輪都要問一次：現在最短的下一步是哪一個 D？
    </p>
    <Footer />
  </div>
);

const Blank = ({ children, width }: { children: ReactNode; width: number }) => (
  <span
    style={{
      display: 'inline-block',
      minWidth: width,
      padding: '0 14px',
      color: 'var(--osd-accent)',
      borderBottom: `2px solid ${surfaceElevated}`,
      textAlign: 'center',
    }}
  >
    {children}
  </span>
);

const Discover: Page = () => (
  <div style={fill}>
    <Eyebrow>1D Discover</Eyebrow>
    <SectionTag>Discover</SectionTag>
    <Thesis>不要先寫功能列表；先用一句話定義它。</Thesis>
    <Row>
      <Card>
        <CardLabel>幫誰</CardLabel>
        <CardTitle>target user</CardTitle>
        <CardBody>你心裡要浮得出一個具體的人</CardBody>
      </Card>
      <Card>
        <CardLabel>在哪卡住</CardLabel>
        <CardTitle>has this problem</CardTitle>
        <CardBody>那個情境現在有多痛</CardBody>
      </Card>
      <Card>
        <CardLabel>完成什麼</CardLabel>
        <CardTitle>achieve this result</CardTitle>
        <CardBody>用完之後他多了什麼</CardBody>
      </Card>
      <Card>
        <CardLabel>靠什麼做到</CardLabel>
        <CardTitle>core interaction</CardTitle>
        <CardBody>最關鍵的那一個動作</CardBody>
      </Card>
    </Row>
    <Footer />
  </div>
);

const DiscoverTemplate: Page = () => (
  <div style={fill}>
    <Eyebrow>1D Discover · 句型</Eyebrow>
    <SectionTag>換你填</SectionTag>
    <Thesis>把你的題目套進這四格。</Thesis>
    <div
      style={{
        marginTop: 64,
        fontSize: 40,
        lineHeight: 2,
        color: 'var(--osd-text)',
        maxWidth: 1560,
      }}
    >
      <div>
        <Blank width={260}>你的東西</Blank> 是給 <Blank width={300}>誰</Blank> 用的。
      </div>
      <div>
        它解決 <Blank width={420}>什麼問題</Blank> 。
      </div>
      <div>
        使用者可以 <Blank width={380}>做到什麼</Blank> ，
      </div>
      <div>
        核心互動是 <Blank width={420}>哪一個動作</Blank> 。
      </div>
    </div>
    <Footer />
  </div>
);

const DecideTrap: Page = () => (
  <div style={fill}>
    <Eyebrow>2D Decide</Eyebrow>
    <SectionTag>Decide</SectionTag>
    <Thesis>不要只找 MVP；找出核心體驗。</Thesis>
    <Row>
      <Card rule={tradingDown}>
        <CardLabel tone={tradingDown}>MVP 的陷阱</CardLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 4 }}>
          <Bullet tone={muted}>新增</Bullet>
          <Bullet tone={muted}>編輯 / 刪除</Bullet>
          <Bullet tone={muted}>分類、標籤</Bullet>
          <Bullet tone={muted}>通知、設定</Bullet>
        </div>
        <CardBody>功能少不代表價值清楚，那只是把大系統切小。</CardBody>
      </Card>
      <Card rule={tradingUp}>
        <CardLabel tone={tradingUp}>核心體驗</CardLabel>
        <CardTitle>我一打開，就知道現在該做什麼。</CardTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 4 }}>
          <Bullet tone={tradingUp}>一眼看到今天的重點</Bullet>
          <Bullet tone={tradingUp}>三秒內能加進去</Bullet>
          <Bullet tone={tradingUp}>隨手就能調整</Bullet>
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
    <Thesis>早期用範圍換速度，不是用品質換速度。</Thesis>
    <Row>
      <Card rule={tradingDown}>
        <CardLabel tone={tradingDown}>先不要做</CardLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 4 }}>
          <Bullet tone={tradingDown}>複雜的登入系統</Bullet>
          <Bullet tone={tradingDown}>完整後端與多平台同步</Bullet>
          <Bullet tone={tradingDown}>太完整的設計系統</Bullet>
          <Bullet tone={tradingDown}>太早做付費</Bullet>
          <Bullet tone={tradingDown}>太早做自動化</Bullet>
        </div>
      </Card>
      <Card rule={tradingUp}>
        <CardLabel tone={tradingUp}>先做出來</CardLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 4 }}>
          <Bullet tone={tradingUp}>一個清楚的主畫面</Bullet>
          <Bullet tone={tradingUp}>一條主要操作流程</Bullet>
          <Bullet tone={tradingUp}>資料先存在本機</Bullet>
          <Bullet tone={tradingUp}>可以給朋友試用</Bullet>
          <Bullet tone={tradingUp}>可以錄成 demo</Bullet>
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
      <ValueCard label="01" title="清楚" desc="一眼知道現在要做什麼" />
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
        <CardBody>最重要的內容要先被看到</CardBody>
      </Card>
      <Card>
        <CardLabel>02</CardLabel>
        <CardTitle>操作密度</CardTitle>
        <CardBody>主要動作要少、要近、要可預期</CardBody>
      </Card>
      <Card>
        <CardLabel>03</CardLabel>
        <CardTitle>狀態設計</CardTitle>
        <CardBody>空的、完成的、出錯的都有回饋</CardBody>
      </Card>
      <Card>
        <CardLabel>04</CardLabel>
        <CardTitle>產品感</CardTitle>
        <CardBody>文字、節奏、細節讓人願意信任</CardBody>
      </Card>
    </Row>
    <p
      style={{ fontSize: 30, lineHeight: 1.6, color: mutedStrong, marginTop: 56, marginBottom: 0 }}
    >
      介面的任務不是把所有功能塞進畫面，而是讓人一眼知道現在該做什麼。
    </p>
    <Footer />
  </div>
);

const GoalBlock = ({ tag, title, points }: { tag: string; title: string; points: ReactNode }) => (
  <Card>
    <CardLabel>{tag}</CardLabel>
    <CardTitle>{title}</CardTitle>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 8 }}>{points}</div>
  </Card>
);

const DesignGoals: Page = () => (
  <div style={fill}>
    <Eyebrow>3D Design</Eyebrow>
    <SectionTag>UI / UX</SectionTag>
    <Thesis>UI 求一致，UX 求快。</Thesis>
    <Row>
      <GoalBlock
        tag="UI 目標"
        title="統一的設計系統"
        points={
          <>
            <Bullet>獨特而且一致</Bullet>
            <Bullet>一眼就掌握得住</Bullet>
            <Bullet>一套規則走到底</Bullet>
          </>
        }
      />
      <GoalBlock
        tag="UX 目標"
        title="快速導航"
        points={
          <>
            <Bullet>滑一下就換到下一段</Bullet>
            <Bullet>主要區塊之間切換不用想</Bullet>
            <Bullet>回到首頁永遠只要一步</Bullet>
          </>
        }
      />
    </Row>
    <Footer />
  </div>
);

const DevelopDemoFirst: Page = () => (
  <div style={fill}>
    <Eyebrow>4D Develop</Eyebrow>
    <SectionTag>Demo first</SectionTag>
    <Thesis>做出能展示、能試用、能改的 demo。</Thesis>
    <Row>
      <Card>
        <CardLabel>01</CardLabel>
        <CardTitle>做出主畫面</CardTitle>
        <CardBody>先讓人知道這是做什麼的</CardBody>
      </Card>
      <Card>
        <CardLabel>02</CardLabel>
        <CardTitle>跑完核心流程</CardTitle>
        <CardBody>從進去到看到結果能走一次</CardBody>
      </Card>
      <Card>
        <CardLabel>03</CardLabel>
        <CardTitle>錄 60 秒 demo</CardTitle>
        <CardBody>別人不用你解釋也看得懂</CardBody>
      </Card>
      <Card>
        <CardLabel>04</CardLabel>
        <CardTitle>改下一版</CardTitle>
        <CardBody>每輪只修最影響體驗的地方</CardBody>
      </Card>
    </Row>
    <p
      style={{ fontSize: 30, lineHeight: 1.6, color: mutedStrong, marginTop: 56, marginBottom: 0 }}
    >
      不是先把所有功能做完，而是先做出一段可以操作、可以展示、可以拿到回饋的主流程。
    </p>
    <Footer />
  </div>
);

const DevelopTools: Page = () => (
  <div style={{ ...fill, justifyContent: 'center' }}>
    <Eyebrow>4D Develop</Eyebrow>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 100,
        fontWeight: 700,
        letterSpacing: '-2.5px',
        lineHeight: 1.12,
        margin: '32px 0 0',
        color: onDark,
      }}
    >
      AI writes.
      <br />
      <span style={{ color: 'var(--osd-accent)' }}>You decide.</span>
    </h2>
    <p
      style={{ fontSize: 34, lineHeight: 1.6, color: mutedStrong, marginTop: 44, marginBottom: 0 }}
    >
      一邊看著結果，一邊讓 AI 加速下一次修改。取捨、品質、產品感覺還是你的。
    </p>
    <Footer />
  </div>
);

const ToolRow = ({ stage, tool, use }: { stage: string; tool: string; use: string }) => (
  <div
    style={{
      display: 'flex',
      gap: 40,
      alignItems: 'baseline',
      paddingBottom: 24,
      borderBottom: `1px solid ${hairline}`,
    }}
  >
    <span style={{ ...num, fontSize: 22, color: 'var(--osd-accent)', width: 210 }}>{stage}</span>
    <span style={{ fontSize: 34, fontWeight: 700, color: onDark, width: 250 }}>{tool}</span>
    <span style={{ fontSize: 27, lineHeight: 1.5, color: muted }}>{use}</span>
  </div>
);

const ToolChain: Page = () => (
  <div style={fill}>
    <Eyebrow>工具鏈</Eyebrow>
    <SectionTag>Case</SectionTag>
    <Thesis>每個 D 都有適合的工具。</Thesis>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 56 }}>
      <ToolRow stage="1D → 3D" tool="Stitch" use="快速跑出多個畫面草稿，看資訊架構和視覺語氣" />
      <ToolRow stage="3D → 4D" tool="Lovable" use="做成可以點的網頁原型，驗證流程和文案" />
      <ToolRow stage="4D" tool="Rork" use="變成手機原型，測手感和新增流程" />
      <ToolRow stage="4D → 5D" tool="Bitrig" use="推向原生實作，靠近可上架的結構" />
      <ToolRow stage="4D → 6D" tool="Codex" use="接進真實 repo，分小步改、跑 build、驗證" />
    </div>
    <p
      style={{ fontSize: 28, lineHeight: 1.6, color: mutedStrong, marginTop: 48, marginBottom: 0 }}
    >
      第一版永遠不是答案，是拿來問下一個問題的假設。
    </p>
    <Footer />
  </div>
);

const FlowStep = ({ label, text }: { label: string; text: string }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      flex: 1,
      paddingTop: 20,
      borderTop: `3px solid ${hairline}`,
    }}
  >
    <span style={{ ...num, fontSize: 22, fontWeight: 700, color: 'var(--osd-accent)' }}>
      {label}
    </span>
    <span style={{ fontSize: 29, fontWeight: 700, color: onDark, lineHeight: 1.3 }}>{text}</span>
  </div>
);

const Testing: Page = () => (
  <div style={fill}>
    <Eyebrow>5D 送測 → 6D 回饋</Eyebrow>
    <SectionTag>Deploy</SectionTag>
    <Thesis>可以被測試，比看起來完成更重要。</Thesis>
    <Row gap={24}>
      <FlowStep label="01" text="原型" />
      <FlowStep label="02" text="內部版本" />
      <FlowStep label="03" text="給 5 個真人試" />
      <FlowStep label="04" text="收回饋" />
      <FlowStep label="05" text="修核心流程" />
    </Row>
    <div style={{ marginTop: 72, display: 'flex', alignItems: 'baseline', gap: 28 }}>
      <span style={{ fontSize: 24, letterSpacing: '0.18em', color: 'var(--osd-accent)' }}>
        原則
      </span>
      <span style={{ fontSize: 46, fontWeight: 700, color: onDark, letterSpacing: '-1px' }}>
        不要等到完美才給人試。
      </span>
    </div>
    <p
      style={{ fontSize: 30, lineHeight: 1.6, color: mutedStrong, marginTop: 32, marginBottom: 0 }}
    >
      早一點知道：這個東西有沒有真的幫到人。
    </p>
    <Footer />
  </div>
);

const Ship: Page = () => (
  <div style={fill}>
    <Eyebrow>5D 上架 → 6D 推廣</Eyebrow>
    <SectionTag>Distribute</SectionTag>
    <Thesis>上線不是結束，是把它送到更多人面前。</Thesis>
    <Row>
      <Card>
        <CardLabel>01</CardLabel>
        <CardTitle>正式發佈</CardTitle>
        <CardBody>把它推到一個真的能被打開的地方</CardBody>
      </Card>
      <Card>
        <CardLabel>02</CardLabel>
        <CardTitle>推廣出去</CardTitle>
        <CardBody>沒人知道的好東西，等於不存在</CardBody>
      </Card>
      <Card>
        <CardLabel>03</CardLabel>
        <CardTitle>觀察反應</CardTitle>
        <CardBody>看真實數字，不要看自己的感覺</CardBody>
      </Card>
      <Card>
        <CardLabel>04</CardLabel>
        <CardTitle>改善產品</CardTitle>
        <CardBody>回到最短的下一步，再跑一輪</CardBody>
      </Card>
    </Row>
    <Footer />
  </div>
);

const Checklist: Page = () => (
  <div style={fill}>
    <Eyebrow>Checklist</Eyebrow>
    <SectionTag>自我檢查</SectionTag>
    <Thesis>用兩句話檢查你有沒有真的往前推進。</Thesis>
    <Row>
      <Card rule="var(--osd-accent)">
        <CardTitle>Can I demo it?</CardTitle>
        <CardBody>如果不能展示，就還沒有完成 Develop。</CardBody>
      </Card>
      <Card rule="var(--osd-accent)">
        <CardTitle>Can I learn from it?</CardTitle>
        <CardBody>如果沒有真人回饋，就還沒有完成 Distribute。</CardBody>
      </Card>
    </Row>
    <Footer />
  </div>
);

const DividerUs: Page = () => (
  <div style={{ ...fill, justifyContent: 'center' }}>
    <span style={{ ...num, fontSize: 30, fontWeight: 700, color: 'var(--osd-accent)' }}>02</span>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 110,
        fontWeight: 700,
        letterSpacing: '-3px',
        lineHeight: 1.1,
        margin: '28px 0 0',
        color: onDark,
      }}
    >
      我們這學期怎麼跑
    </h2>
    <Footer />
  </div>
);

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

const Summary: Page = () => (
  <div style={fill}>
    <Eyebrow>重點總結</Eyebrow>
    <SectionTag>Closing</SectionTag>
    <Thesis>最短路徑不是最快寫完最多功能。</Thesis>
    <div
      style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 1560 }}
    >
      <Lede>而是讓你的點子變成一個真人可以使用、可以理解、可以給你回饋的東西。</Lede>
      <Lede>每個點子都獨一無二，但影響力有高低；你需要用真實的使用去證明它。</Lede>
      <Lede>把 AI 當成學習助手，加速你的學習，讓你在產品上做出更好的判斷。</Lede>
    </div>
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
  title: 'ACE Club 幹部訓練 02 · 從點子到上線的最短路徑',
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
  DesignGoals,
  DevelopDemoFirst,
  DevelopTools,
  ToolChain,
  Testing,
  Ship,
  Checklist,
  DividerUs,
  Roles,
  Rhythm,
  WhenStuck,
  Homework,
  Summary,
  Closing,
] satisfies Page[];
